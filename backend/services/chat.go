package services

import (
	"context"
	"strings"

	"github.com/Nezzy-joe/nezai/backend/providers"
)

type ChatService struct {
	provider              providers.AIProvider
	memory                *ConversationStore
	allowProviderFallback bool
}

func NewChatService(provider providers.AIProvider) *ChatService {
	return NewChatServiceWithMemory(
		provider,
		NewConversationStore(10),
	)
}

func NewChatServiceWithMemory(
	provider providers.AIProvider,
	memory *ConversationStore,
) *ChatService {
	return &ChatService{
		provider:              provider,
		memory:                memory,
		allowProviderFallback: false,
	}
}

func NewChatServiceWithMemoryAndFallback(
	provider providers.AIProvider,
	memory *ConversationStore,
	allowProviderFallback bool,
) *ChatService {
	return &ChatService{
		provider:              provider,
		memory:                memory,
		allowProviderFallback: allowProviderFallback,
	}
}

func (s *ChatService) Chat(
	ctx context.Context,
	message string,
) (string, error) {
	return s.ChatWithConversation(ctx, "default", message)
}

func (s *ChatService) ChatWithConversation(
	ctx context.Context,
	conversationID string,
	message string,
) (string, error) {
	message = strings.TrimSpace(message)

	if message == "" {
		return "", ErrEmptyMessage
	}

	if conversationID == "" {
		return "", ErrEmptyConversationID
	}

	history, err := s.memory.Get(ctx, conversationID)
	if err != nil {
		return "", err
	}

	// Handle vague follow-up questions using the previous conversation
	// rather than asking the model to repeat the previous answer.
	if answer, ok := followUpAnswer(message, history); ok {
		if err := s.memory.Add(
			ctx,
			conversationID,
			ConversationMessage{
				Role:    "user",
				Content: message,
			},
		); err != nil {
			return "", err
		}

		if err := s.memory.Add(
			ctx,
			conversationID,
			ConversationMessage{
				Role:    "assistant",
				Content: answer,
			},
		); err != nil {
			return "", err
		}

		return answer, nil
	}

	// Save the visitor's message.
	if err := s.memory.Add(
		ctx,
		conversationID,
		ConversationMessage{
			Role:    "user",
			Content: message,
		},
	); err != nil {
		return "", err
	}

	// Answer verified portfolio knowledge deterministically.
	if answer, ok := portfolioAnswer(message); ok {
		if err := s.memory.Add(
			ctx,
			conversationID,
			ConversationMessage{
				Role:    "assistant",
				Content: answer,
			},
		); err != nil {
			return "", err
		}

		return answer, nil
	}

	// Re-read history so the latest user message is included.
	history, err = s.memory.Get(ctx, conversationID)
	if err != nil {
		return "", err
	}

	systemPrompt := buildConversationPrompt(
		nezAISystemPrompt,
		history,
	)

	response, err := s.provider.Generate(
		ctx,
		systemPrompt,
		message,
	)
	if err != nil {
		if !s.allowProviderFallback {
			return "", err
		}

		response = "I can answer verified questions about Joseph Amos Ekpe, his engineering projects, and NezAI. General AI generation is not currently available in this production deployment."
	}

	if err := s.memory.Add(
		ctx,
		conversationID,
		ConversationMessage{
			Role:    "assistant",
			Content: response,
		},
	); err != nil {
		return "", err
	}

	return response, nil
}

func followUpAnswer(
	message string,
	history []ConversationMessage,
) (string, bool) {
	q := strings.ToLower(strings.TrimSpace(message))

	isFollowUp := q == "more" ||
		q == "tell me more" ||
		q == "more about it" ||
		q == "tell me more about it" ||
		q == "can you explain more" ||
		q == "explain more" ||
		q == "go on" ||
		q == "continue"

	if !isFollowUp || len(history) < 2 {
		return "", false
	}

	// Search recent history for the first known project/topic.
	for i := len(history) - 1; i >= 0; i-- {
		content := strings.ToLower(history[i].Content)

		if strings.Contains(content, "task api") {
			return "Task API is confirmed as a Go-based CRUD REST API. At a general technical level, CRUD refers to Create, Read, Update, and Delete operations, while a REST API exposes resources and operations over HTTP. I don't have additional confirmed implementation details about Joseph's specific Task API beyond the documented information. You can inspect the repository for the implementation.", true
		}

		if strings.Contains(content, "school management system") {
			return "Joseph's School Management System is confirmed as a Go and PostgreSQL backend application with authentication, JWT authentication, JWT middleware, protected API routes, student management, results, admissions, classes, and fees. At a general technical level, PostgreSQL provides persistent relational storage and JWTs can be used to carry authentication information between a client and protected API routes. I don't have additional confirmed implementation details beyond the documented project information.", true
		}

		if strings.Contains(content, "nezai") {
			return "NezAI is Joseph's personal AI engineering platform combining a professional website, engineering portfolio, and personal AI agent. Its confirmed stack includes Next.js, TypeScript, Tailwind CSS, Go, REST APIs, Ollama, and Gemma 3 1B. The backend uses grounded portfolio knowledge for confirmed facts and an AI provider for general technical questions.", true
		}
	}

	return "", false
}

func buildConversationPrompt(
	systemPrompt string,
	history []ConversationMessage,
) string {
	if len(history) <= 1 {
		return systemPrompt
	}

	var builder strings.Builder

	builder.WriteString(systemPrompt)
	builder.WriteString("\n\n")
	builder.WriteString("RECENT CONVERSATION HISTORY\n")
	builder.WriteString(
		"Use this history only to understand follow-up questions and conversational context. " +
			"Do not treat it as permission to invent facts.\n\n",
	)

	for _, message := range history[:len(history)-1] {
		builder.WriteString(message.Role)
		builder.WriteString(": ")
		builder.WriteString(message.Content)
		builder.WriteString("\n\n")
	}

	builder.WriteString(
		"IMPORTANT: The visitor's latest message is the current question. " +
			"Answer it using the system instructions and relevant conversation history.\n",
	)

	return builder.String()
}
