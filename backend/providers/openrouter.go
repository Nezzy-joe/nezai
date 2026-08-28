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

type OpenRouterProvider struct {
	BaseURL string
	Model   string
	APIKey  string
	Client  *http.Client
}

type openRouterMessage struct {
	Role    string `json:"role"`
	Content string `json:"content"`
}

type openRouterRequest struct {
	Model       string              `json:"model"`
	Messages    []openRouterMessage `json:"messages"`
	Temperature float64             `json:"temperature,omitempty"`
}

type openRouterChoice struct {
	Message openRouterMessage `json:"message"`
}

type openRouterResponse struct {
	Choices []openRouterChoice `json:"choices"`
}

func NewOpenRouterProvider(
	baseURL string,
	model string,
	apiKey string,
) *OpenRouterProvider {
	return &OpenRouterProvider{
		BaseURL: strings.TrimRight(baseURL, "/"),
		Model:   model,
		APIKey:  strings.TrimSpace(apiKey),
		Client: &http.Client{
			Timeout: 120 * time.Second,
		},
	}
}

func (p *OpenRouterProvider) Generate(
	ctx context.Context,
	systemPrompt string,
	message string,
) (string, error) {
	requestBody := openRouterRequest{
		Model: p.Model,
		Messages: []openRouterMessage{
			{
				Role:    "system",
				Content: systemPrompt,
			},
			{
				Role:    "user",
				Content: message,
			},
		},
		Temperature: 0.2,
	}

	body, err := json.Marshal(requestBody)
	if err != nil {
		return "", fmt.Errorf("marshal OpenRouter request: %w", err)
	}

	req, err := http.NewRequestWithContext(
		ctx,
		http.MethodPost,
		p.BaseURL+"/chat/completions",
		bytes.NewReader(body),
	)
	if err != nil {
		return "", fmt.Errorf("create OpenRouter request: %w", err)
	}

	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Authorization", "Bearer "+p.APIKey)

	resp, err := p.Client.Do(req)
	if err != nil {
		return "", fmt.Errorf("call OpenRouter: %w", err)
	}

	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return "", fmt.Errorf(
			"openrouter returned status %d",
			resp.StatusCode,
		)
	}

	var result openRouterResponse

	if err := json.NewDecoder(resp.Body).Decode(&result); err != nil {
		return "", fmt.Errorf(
			"decode OpenRouter response: %w",
			err,
		)
	}

	if len(result.Choices) == 0 {
		return "", fmt.Errorf("openrouter returned no choices")
	}

	response := strings.TrimSpace(
		result.Choices[0].Message.Content,
	)

	if response == "" {
		return "", fmt.Errorf("openrouter returned an empty response")
	}

	return response, nil
}
