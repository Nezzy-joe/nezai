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

	json.NewEncoder(w).Encode(response)
}

func main() {
	config, err := loadConfig()
	if err != nil {
		log.Fatalf("configuration error: %v", err)
	}

	// Created the AI provider.
	ollamaProvider := providers.NewOllamaProvider(
		config.OllamaBaseURL,
		config.OllamaModel,
	)
	// Injected the provider into the chat service.
	chatService := services.NewChatService(ollamaProvider)

	// Created the HTTP router.
	mux := http.NewServeMux()

	mux.HandleFunc("/health", healthHandler)
	mux.HandleFunc("/api/v1/chat", handlers.Chat(chatService))

	// Created the HTTP server.
	server := &http.Server{
		Addr:         ":8080",
		Handler:      corsMiddleware(requestIDMiddleware(mux)),
		ReadTimeout:  10 * time.Second,
		WriteTimeout: 5 * time.Minute,
		IdleTimeout:  60 * time.Second,
	}

	// Started the server in a separate goroutine.
	go func() {
		log.Printf("NezAI backend listening on %s", server.Addr)

		if err := server.ListenAndServe(); err != nil && !errors.Is(err, http.ErrServerClosed) {
			log.Fatalf("server failed: %v", err)
		}
	}()

	// Waited for an interrupt or termination signal.
	stop := make(chan os.Signal, 1)

	signal.Notify(
		stop,
		os.Interrupt,
		syscall.SIGTERM,
	)

	<-stop

	log.Println("Shutting down NezAI backend...")

	// Gave active requests time to finish.
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
