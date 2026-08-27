package services

import (
	"context"
	"errors"
	"strings"
	"testing"
)

type recordingProvider struct {
	systemPrompt string
	message      string
}

func (p *recordingProvider) Generate(
	ctx context.Context,
	systemPrompt string,
	message string,
) (string, error) {
	p.systemPrompt = systemPrompt
	p.message = message

	return "test response", nil
}

func TestChatServiceChat(t *testing.T) {
	provider := &recordingProvider{}

	service := NewChatService(provider)

	const userMessage = "Tell me something about distributed systems."

	response, err := service.Chat(
		context.Background(),
		userMessage,
	)

	if err != nil {
		t.Fatalf(
			"expected no error, got %v",
			err,
		)
	}

	if response != "test response" {
		t.Fatalf(
			"expected %q, got %q",
			"test response",
			response,
		)
	}

	if !strings.Contains(
		provider.systemPrompt,
		"You are NezAI",
	) {
		t.Fatal(
			"expected system prompt to contain NezAI",
		)
	}

	if !strings.Contains(
		provider.systemPrompt,
		"Joseph Amos Ekpe",
	) {
		t.Fatal(
			"expected system prompt to contain Joseph",
		)
	}

	if provider.message != userMessage {
		t.Fatalf(
			"expected message %q, got %q",
			userMessage,
			provider.message,
		)
	}
}

type failingProvider struct{}

func (failingProvider) Generate(
	ctx context.Context,
	systemPrompt string,
	message string,
) (string, error) {
	return "", errors.New("provider failed")
}

func TestChatServiceChatProviderError(t *testing.T) {
	service := NewChatService(failingProvider{})

	_, err := service.Chat(
		context.Background(),
		"Tell me something about distributed systems.",
	)

	if err == nil {
		t.Fatal("expected an error, got nil")
	}
}

func TestConversationStoreLimit(t *testing.T) {
	store := NewConversationStore(4)

	ctx := context.Background()
	conversationID := "test-conversation"

	for i := 0; i < 6; i++ {
		err := store.Add(
			ctx,
			conversationID,
			ConversationMessage{
				Role:    "user",
				Content: "message",
			},
		)

		if err != nil {
			t.Fatalf(
				"unexpected error adding message: %v",
				err,
			)
		}
	}

	history, err := store.Get(
		ctx,
		conversationID,
	)

	if err != nil {
		t.Fatalf(
			"unexpected error getting history: %v",
			err,
		)
	}

	if len(history) != 4 {
		t.Fatalf(
			"expected 4 messages, got %d",
			len(history),
		)
	}
}

func TestConversationStoreIsolation(t *testing.T) {
	store := NewConversationStore(10)

	ctx := context.Background()

	err := store.Add(
		ctx,
		"conversation-a",
		ConversationMessage{
			Role:    "user",
			Content: "A",
		},
	)
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}

	err = store.Add(
		ctx,
		"conversation-b",
		ConversationMessage{
			Role:    "user",
			Content: "B",
		},
	)
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}

	historyA, err := store.Get(
		ctx,
		"conversation-a",
	)
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}

	historyB, err := store.Get(
		ctx,
		"conversation-b",
	)
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}

	if len(historyA) != 1 {
		t.Fatalf(
			"expected conversation A to contain 1 message, got %d",
			len(historyA),
		)
	}

	if historyA[0].Content != "A" {
		t.Fatalf(
			"expected A, got %q",
			historyA[0].Content,
		)
	}

	if len(historyB) != 1 {
		t.Fatalf(
			"expected conversation B to contain 1 message, got %d",
			len(historyB),
		)
	}

	if historyB[0].Content != "B" {
		t.Fatalf(
			"expected B, got %q",
			historyB[0].Content,
		)
	}
}

func TestBuildConversationPrompt(t *testing.T) {
	history := []ConversationMessage{
		{
			Role:    "user",
			Content: "Tell me about Task API.",
		},
		{
			Role:    "assistant",
			Content: "Task API is a Go-based CRUD REST API.",
		},
		{
			Role:    "user",
			Content: "Tell me more.",
		},
	}

	prompt := buildConversationPrompt(
		"You are NezAI.",
		history,
	)

	if !strings.Contains(
		prompt,
		"Tell me about Task API.",
	) {
		t.Fatal(
			"expected previous user message in conversation prompt",
		)
	}

	if !strings.Contains(
		prompt,
		"Task API is a Go-based CRUD REST API.",
	) {
		t.Fatal(
			"expected previous assistant response in conversation prompt",
		)
	}

	if !strings.Contains(
		prompt,
		"latest message is the current question",
	) {
		t.Fatal(
			"expected latest-question instruction",
		)
	}
}
