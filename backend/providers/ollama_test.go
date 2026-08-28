package providers

import (
	"context"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"
)

func TestOllamaProviderGenerate(t *testing.T) {
	server := httptest.NewServer(
		http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			if r.Method != http.MethodPost {
				t.Fatalf(
					"expected POST, got %s",
					r.Method,
				)
			}

			if r.URL.Path != "/api/chat" {
				t.Fatalf(
					"expected /api/chat, got %s",
					r.URL.Path,
				)
			}

			var request ollamaRequest

			if err := json.NewDecoder(r.Body).Decode(&request); err != nil {
				t.Fatalf(
					"failed to decode request body: %v",
					err,
				)
			}

			if request.Model != "gemma3:1b" {
				t.Fatalf(
					"expected model gemma3:1b, got %s",
					request.Model,
				)
			}

			if len(request.Messages) != 2 {
				t.Fatalf(
					"expected 2 messages, got %d",
					len(request.Messages),
				)
			}

			if request.Messages[0].Role != "system" {
				t.Fatalf(
					"expected first message role system, got %s",
					request.Messages[0].Role,
				)
			}

			if request.Messages[0].Content != "You are NezAI." {
				t.Fatalf(
					"unexpected system prompt: %q",
					request.Messages[0].Content,
				)
			}

			if request.Messages[1].Role != "user" {
				t.Fatalf(
					"expected second message role user, got %s",
					request.Messages[1].Role,
				)
			}

			if request.Messages[1].Content != "Hello NezAI" {
				t.Fatalf(
					"unexpected user message: %q",
					request.Messages[1].Content,
				)
			}

			if request.Stream {
				t.Fatal("expected stream to be false")
			}

			w.Header().Set(
				"Content-Type",
				"application/json",
			)

			w.WriteHeader(http.StatusOK)

			_, _ = w.Write([]byte(`{
				"message": {
					"role": "assistant",
					"content": "Hello from fake Ollama"
				},
				"done": true
			}`))
		}),
	)

	defer server.Close()

	provider := NewOllamaProvider(
		server.URL,
		"gemma3:1b",
		"")

	response, err := provider.Generate(
		context.Background(),
		"You are NezAI.",
		"Hello NezAI",
	)

	if err != nil {
		t.Fatalf(
			"expected no error, got %v",
			err,
		)
	}

	if response != "Hello from fake Ollama" {
		t.Fatalf(
			"expected %q, got %q",
			"Hello from fake Ollama",
			response,
		)
	}
}

func TestOllamaProviderGenerateServerError(t *testing.T) {
	server := httptest.NewServer(
		http.HandlerFunc(func(
			w http.ResponseWriter,
			r *http.Request,
		) {
			http.Error(
				w,
				"internal server error",
				http.StatusInternalServerError,
			)
		}),
	)

	defer server.Close()

	provider := NewOllamaProvider(
		server.URL,
		"gemma3:1b",
		"")

	_, err := provider.Generate(
		context.Background(),
		"You are NezAI.",
		"Hello NezAI",
	)

	if err == nil {
		t.Fatal("expected an error, got nil")
	}
}

func TestOllamaProviderGenerateContextCancellation(t *testing.T) {
	server := httptest.NewServer(
		http.HandlerFunc(func(
			w http.ResponseWriter,
			r *http.Request,
		) {
			<-r.Context().Done()
		}),
	)

	defer server.Close()

	provider := NewOllamaProvider(
		server.URL,
		"gemma3:1b",
		"")

	ctx, cancel := context.WithCancel(
		context.Background(),
	)

	cancel()

	_, err := provider.Generate(
		ctx,
		"You are NezAI.",
		"Hello NezAI",
	)

	if err == nil {
		t.Fatal(
			"expected context cancellation error",
		)
	}
}
