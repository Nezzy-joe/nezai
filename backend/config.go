package main

import (
	"fmt"
	"net/url"
	"os"
)

type Config struct {
	AIProvider string

	OllamaBaseURL string
	OllamaModel   string
	OllamaAPIKey  string

	OpenRouterBaseURL string
	OpenRouterModel   string
	OpenRouterAPIKey  string
}

func loadConfig() (Config, error) {
	provider := os.Getenv("AI_PROVIDER")
	if provider == "" {
		provider = "ollama"
	}

	switch provider {
	case "ollama", "openrouter":
	default:
		return Config{}, fmt.Errorf(
			"invalid AI_PROVIDER %q: must be ollama or openrouter",
			provider,
		)
	}

	ollamaBaseURL := os.Getenv("OLLAMA_BASE_URL")
	if ollamaBaseURL == "" {
		ollamaBaseURL = "http://localhost:11434"
	}

	ollamaModel := os.Getenv("OLLAMA_MODEL")
	if ollamaModel == "" {
		ollamaModel = "gemma3:1b"
	}

	ollamaAPIKey := os.Getenv("OLLAMA_API_KEY")

	openRouterBaseURL := os.Getenv("OPENROUTER_BASE_URL")
	if openRouterBaseURL == "" {
		openRouterBaseURL = "https://openrouter.ai/api/v1"
	}

	openRouterModel := os.Getenv("OPENROUTER_MODEL")
	if openRouterModel == "" {
		openRouterModel = "openrouter/free"
	}

	openRouterAPIKey := os.Getenv("OPENROUTER_API_KEY")

	ollamaURL, err := url.Parse(ollamaBaseURL)
	if err != nil {
		return Config{}, fmt.Errorf(
			"invalid OLLAMA_BASE_URL: %w",
			err,
		)
	}

	if ollamaURL.Scheme == "" || ollamaURL.Host == "" {
		return Config{}, fmt.Errorf(
			"invalid OLLAMA_BASE_URL: must include scheme and host",
		)
	}

	openRouterURL, err := url.Parse(openRouterBaseURL)
	if err != nil {
		return Config{}, fmt.Errorf(
			"invalid OPENROUTER_BASE_URL: %w",
			err,
		)
	}

	if openRouterURL.Scheme == "" || openRouterURL.Host == "" {
		return Config{}, fmt.Errorf(
			"invalid OPENROUTER_BASE_URL: must include scheme and host",
		)
	}

	if ollamaModel == "" {
		return Config{}, fmt.Errorf(
			"OLLAMA_MODEL cannot be empty",
		)
	}

	if openRouterModel == "" {
		return Config{}, fmt.Errorf(
			"OPENROUTER_MODEL cannot be empty",
		)
	}

	return Config{
		AIProvider: provider,

		OllamaBaseURL: ollamaBaseURL,
		OllamaModel:   ollamaModel,
		OllamaAPIKey:  ollamaAPIKey,

		OpenRouterBaseURL: openRouterBaseURL,
		OpenRouterModel:   openRouterModel,
		OpenRouterAPIKey:  openRouterAPIKey,
	}, nil
}
