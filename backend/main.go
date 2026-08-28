package main

import (
	"context"
	"encoding/json"
	"errors"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/Nezzy-joe/nezai/backend/handlers"
	"github.com/Nezzy-joe/nezai/backend/providers"
	"github.com/Nezzy-joe/nezai/backend/services"
)

type HealthResponse struct {
	Status  string `json:"status"`
	Service string `json:"service"`
}

func healthHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	response := HealthResponse{
		Status:  "ok",
		Service: "nezai-backend",
	}

	if err := json.NewEncoder(w).Encode(response); err != nil {
		log.Printf("health response error: %v", err)
	}
}

func main() {
	config, err := loadConfig()
	if err != nil {
		log.Fatalf("configuration error: %v", err)
	}

	var aiProvider providers.AIProvider

	switch config.AIProvider {
	case "ollama":
		aiProvider = providers.NewOllamaProvider(
			config.OllamaBaseURL,
			config.OllamaModel,
			config.OllamaAPIKey,
		)

	case "openrouter":
		aiProvider = providers.NewOpenRouterProvider(
			config.OpenRouterBaseURL,
			config.OpenRouterModel,
			config.OpenRouterAPIKey,
		)
	}

	chatService := services.NewChatServiceWithMemoryAndFallback(
		aiProvider,
		services.NewConversationStore(10),
		os.Getenv("ENVIRONMENT") == "production",
	)

	mux := http.NewServeMux()

	mux.HandleFunc("/health", healthHandler)
	mux.HandleFunc("/api/v1/chat", handlers.Chat(chatService))

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	server := &http.Server{
		Addr:         "0.0.0.0:" + port,
		Handler:      corsMiddleware(requestIDMiddleware(mux)),
		ReadTimeout:  10 * time.Second,
		WriteTimeout: 5 * time.Minute,
		IdleTimeout:  60 * time.Second,
	}

	go func() {
		log.Printf("NezAI backend listening on %s", server.Addr)

		if err := server.ListenAndServe(); err != nil &&
			!errors.Is(err, http.ErrServerClosed) {
			log.Fatalf("server failed: %v", err)
		}
	}()

	stop := make(chan os.Signal, 1)

	signal.Notify(
		stop,
		os.Interrupt,
		syscall.SIGTERM,
	)

	<-stop

	log.Println("Shutting down NezAI backend...")

	ctx, cancel := context.WithTimeout(
		context.Background(),
		10*time.Second,
	)
	defer cancel()

	if err := server.Shutdown(ctx); err != nil {
		log.Printf("server shutdown error: %v", err)
	}

	log.Println("NezAI backend stopped")
}
