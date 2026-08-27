package handlers

import (
	"encoding/json"
	"net/http"
	"strings"

	"github.com/Nezzy-joe/nezai/backend/services"
)

type ChatRequest struct {
	ConversationID string `json:"conversation_id"`
	Message        string `json:"message"`
}

type ChatResponse struct {
	ConversationID string `json:"conversation_id"`
	Message        string `json:"message"`
	Response       string `json:"response"`
}

func Chat(service *services.ChatService) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")

		if r.Method != http.MethodPost {
			http.Error(
				w,
				"Method not allowed",
				http.StatusMethodNotAllowed,
			)
			return
		}

		var request ChatRequest

		if err := json.NewDecoder(r.Body).Decode(&request); err != nil {
			http.Error(
				w,
				"Invalid JSON",
				http.StatusBadRequest,
			)
			return
		}

		request.Message = strings.TrimSpace(request.Message)
		request.ConversationID = strings.TrimSpace(request.ConversationID)

		if request.Message == "" {
			http.Error(
				w,
				"Message is required",
				http.StatusBadRequest,
			)
			return
		}

		if request.ConversationID == "" {
			http.Error(
				w,
				"Conversation ID is required",
				http.StatusBadRequest,
			)
			return
		}

		response, err := service.ChatWithConversation(
			r.Context(),
			request.ConversationID,
			request.Message,
		)

		if err != nil {
			http.Error(
				w,
				err.Error(),
				http.StatusInternalServerError,
			)
			return
		}

		result := ChatResponse{
			ConversationID: request.ConversationID,
			Message:        request.Message,
			Response:       response,
		}

		if err := json.NewEncoder(w).Encode(result); err != nil {
			http.Error(
				w,
				"Failed to encode response",
				http.StatusInternalServerError,
			)
		}
	}
}
