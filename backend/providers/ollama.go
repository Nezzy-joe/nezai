package providers

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"strings"
	"time"
)

type OllamaProvider struct {
	BaseURL string
	Model   string
	Client  *http.Client
}

type ollamaMessage struct {
	Role    string `json:"role"`
	Content string `json:"content"`
}

type ollamaRequest struct {
	Model    string          `json:"model"`
	Messages []ollamaMessage `json:"messages"`
	Stream   bool            `json:"stream"`
	Options  map[string]any  `json:"options,omitempty"`
}

type ollamaResponse struct {
	Message ollamaMessage `json:"message"`
}

func NewOllamaProvider(baseURL string, model string) *OllamaProvider {
	return &OllamaProvider{
		BaseURL: strings.TrimRight(baseURL, "/"),
		Model:   model,
		Client: &http.Client{
			Timeout: 120 * time.Second,
		},
	}
}

func (p *OllamaProvider) Generate(
	ctx context.Context,
	systemPrompt string,
	message string,
) (string, error) {
	requestBody := ollamaRequest{
		Model: p.Model,
		Messages: []ollamaMessage{
			{
				Role:    "system",
				Content: systemPrompt,
			},
			{
				Role:    "user",
				Content: message,
			},
		},
		Stream: false,
		Options: map[string]any{
			"temperature": 0.2,
		},
	}

	body, err := json.Marshal(requestBody)
	if err != nil {
		return "", fmt.Errorf("marshal Ollama request: %w", err)
	}

	req, err := http.NewRequestWithContext(
		ctx,
		http.MethodPost,
		p.BaseURL+"/api/chat",
		bytes.NewReader(body),
	)
	if err != nil {
		return "", fmt.Errorf("create Ollama request: %w", err)
	}

	req.Header.Set("Content-Type", "application/json")

	resp, err := p.Client.Do(req)
	if err != nil {
		return "", fmt.Errorf("call Ollama: %w", err)
	}

	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return "", fmt.Errorf(
			"ollama returned status %d",
			resp.StatusCode,
		)
	}

	var result ollamaResponse

	if err := json.NewDecoder(resp.Body).Decode(&result); err != nil {
		return "", fmt.Errorf(
			"decode Ollama response: %w",
			err,
		)
	}

	response := strings.TrimSpace(result.Message.Content)

	if response == "" {
		return "", fmt.Errorf("ollama returned an empty response")
	}

	return response, nil
}
