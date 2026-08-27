package services

import (
	"context"
	"strings"

	"github.com/Nezzy-joe/nezai/backend/providers"
)

type ChatService struct {
	provider providers.AIProvider
}

func NewChatService(provider providers.AIProvider) *ChatService {
	return &ChatService{
		provider: provider,
	}
}

func (s *ChatService) Chat(
	ctx context.Context,
	message string,
) (string, error) {
	message = strings.TrimSpace(message)

	if message == "" {
		return "", ErrEmptyMessage
	}

	// Answer verified portfolio/technical knowledge deterministically.
	// This prevents the small local model from inventing facts about Joseph.
	if answer, ok := portfolioAnswer(message); ok {
		return answer, nil
	}

	// Everything else is handled by the AI provider.
	return s.provider.Generate(
		ctx,
		nezAISystemPrompt,
		message,
	)
}
