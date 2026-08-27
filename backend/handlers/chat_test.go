package handlers

import (
	"context"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"

	"github.com/Nezzy-joe/nezai/backend/providers"
	"github.com/Nezzy-joe/nezai/backend/services"
)

type failingProvider struct{}

func (failingProvider) Generate(
	ctx context.Context,
	systemPrompt string,
	message string,
) (string, error) {
	return "", context.Canceled
}

func TestChatHandlerSuccess(t *testing.T) {
	service := services.NewChatService(
		providers.FakeProvider{},
	)

	handler := Chat(service)

	const userMessage = "Tell me something about distributed systems."
	const conversationID = "test-conversation"

	req := httptest.NewRequest(
		http.MethodPost,
		"/api/v1/chat",
		strings.NewReader(
			`{"conversation_id":"test-conversation","message":"Tell me something about distributed systems."}`,
		),
	)

	recorder := httptest.NewRecorder()

	handler(recorder, req)

	if recorder.Code != http.StatusOK {
		t.Fatalf(
			"expected status %d, got %d",
			http.StatusOK,
			recorder.Code,
		)
	}

	responseBody := strings.TrimSpace(
		recorder.Body.String(),
	)

	if !strings.Contains(
		responseBody,
		`"conversation_id":"`+conversationID+`"`,
	) {
		t.Fatalf(
			"expected conversation ID, got %q",
			responseBody,
		)
	}

	if !strings.Contains(
		responseBody,
		`"message":"`+userMessage+`"`,
	) {
		t.Fatalf(
			"expected original message, got %q",
			responseBody,
		)
	}

	if !strings.Contains(
		responseBody,
		`"response":"Fake AI response to: `+userMessage+`"`,
	) {
		t.Fatalf(
			"expected fake AI response, got %q",
			responseBody,
		)
	}
}

func TestChatHandlerInvalidJSON(t *testing.T) {
	service := services.NewChatService(
		providers.FakeProvider{},
	)

	handler := Chat(service)

	req := httptest.NewRequest(
		http.MethodPost,
		"/api/v1/chat",
		strings.NewReader(`{"message":`),
	)

	recorder := httptest.NewRecorder()

	handler(recorder, req)

	if recorder.Code != http.StatusBadRequest {
		t.Fatalf(
			"expected status %d, got %d",
			http.StatusBadRequest,
			recorder.Code,
		)
	}
}

func TestChatHandlerEmptyMessage(t *testing.T) {
	service := services.NewChatService(
		providers.FakeProvider{},
	)

	handler := Chat(service)

	req := httptest.NewRequest(
		http.MethodPost,
		"/api/v1/chat",
		strings.NewReader(
			`{"conversation_id":"test-conversation","message":""}`,
		),
	)

	recorder := httptest.NewRecorder()

	handler(recorder, req)

	if recorder.Code != http.StatusBadRequest {
		t.Fatalf(
			"expected status %d, got %d",
			http.StatusBadRequest,
			recorder.Code,
		)
	}
}

func TestChatHandlerMethodNotAllowed(t *testing.T) {
	service := services.NewChatService(
		providers.FakeProvider{},
	)

	handler := Chat(service)

	req := httptest.NewRequest(
		http.MethodGet,
		"/api/v1/chat",
		nil,
	)

	recorder := httptest.NewRecorder()

	handler(recorder, req)

	if recorder.Code != http.StatusMethodNotAllowed {
		t.Fatalf(
			"expected status %d, got %d",
			http.StatusMethodNotAllowed,
			recorder.Code,
		)
	}
}

func TestChatHandlerMissingConversationID(t *testing.T) {
	service := services.NewChatService(
		providers.FakeProvider{},
	)

	handler := Chat(service)

	req := httptest.NewRequest(
		http.MethodPost,
		"/api/v1/chat",
		strings.NewReader(
			`{"message":"Hello NezAI"}`,
		),
	)

	recorder := httptest.NewRecorder()

	handler(recorder, req)

	if recorder.Code != http.StatusBadRequest {
		t.Fatalf(
			"expected status %d, got %d",
			http.StatusBadRequest,
			recorder.Code,
		)
	}
}

func TestChatHandlerServiceError(t *testing.T) {
	service := services.NewChatService(
		failingProvider{},
	)

	handler := Chat(service)

	const conversationID = "test-conversation"
	const userMessage = "Tell me something about distributed systems."

	req := httptest.NewRequest(
		http.MethodPost,
		"/api/v1/chat",
		strings.NewReader(
			`{"conversation_id":"test-conversation","message":"Tell me something about distributed systems."}`,
		),
	)

	recorder := httptest.NewRecorder()

	handler(recorder, req)

	if recorder.Code != http.StatusInternalServerError {
		t.Fatalf(
			"expected status %d, got %d",
			http.StatusInternalServerError,
			recorder.Code,
		)
	}

	_ = conversationID
	_ = userMessage
}
