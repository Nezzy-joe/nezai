package providers

import "context"

type FakeProvider struct{}

func (f FakeProvider) Generate(
	ctx context.Context,
	systemPrompt string,
	message string,
) (string, error) {
	return "Fake AI response to: " + message, nil
}
