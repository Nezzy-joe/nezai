package main

import (
	"fmt"
	"net/url"
	"os"
)

type Config struct {
	OllamaBaseURL string
	OllamaModel   string
}

func loadConfig() (Config, error) {
	baseURL := os.Getenv("OLLAMA_BASE_URL")
	if baseURL == "" {
		baseURL = "http://localhost:11434"
	}

	model := os.Getenv("OLLAMA_MODEL")
	if model == "" {
		model = "gemma3:1b"
	}

	parsedURL, err := url.Parse(baseURL)
	if err != nil {
		return Config{}, fmt.Errorf("invalid OLLAMA_BASE_URL: %w", err)
	}

	if parsedURL.Scheme == "" || parsedURL.Host == "" {
		return Config{}, fmt.Errorf("invalid OLLAMA_BASE_URL: must include scheme and host")
	}

	if model == "" {
		return Config{}, fmt.Errorf("OLLAMA_MODEL cannot be empty")
	}

	return Config{
		OllamaBaseURL: baseURL,
		OllamaModel:   model,
	}, nil
}
