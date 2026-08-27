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
