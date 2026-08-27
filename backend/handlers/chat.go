package handlers

import (
	"encoding/json"
	"net/http"

	"github.com/Nezzy-joe/nezai/backend/services"
)

type ChatRequest struct {
	Message string `json:"message"`
}

type ChatResponse struct {
	Message  string `json:"message"`
	Response string `json:"response"`
}

func Chat(services *services.ChatService) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")

		if r.Method != http.MethodPost {
			http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
			return
		}

		var request ChatRequest

		err := json.NewDecoder(r.Body).Decode(&request)
		if err != nil {
			http.Error(w, "Invalid JSON", http.StatusBadRequest)
			return
		}

		if request.Message == "" {
			http.Error(w, "Message is required", http.StatusBadRequest)
			return
		}

		response, err := services.Chat(r.Context(), request.Message)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		ChatResponse := ChatResponse{
			Message:  request.Message,
			Response: response,
		}
		json.NewEncoder(w).Encode(ChatResponse)
	}
}
