package providers

import "context"

type AIProvider interface {
	Generate(
		ctx context.Context,
		systemPrompt string,
		message string,
	) (string, error)
}
