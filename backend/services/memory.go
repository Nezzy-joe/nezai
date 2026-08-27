package services

import (
	"context"
	"sync"
)

type ConversationMessage struct {
	Role    string
	Content string
}

type ConversationStore struct {
	mu            sync.RWMutex
	conversations map[string][]ConversationMessage
	maxMessages   int
}

func NewConversationStore(maxMessages int) *ConversationStore {
	if maxMessages < 2 {
		maxMessages = 10
	}

	return &ConversationStore{
		conversations: make(map[string][]ConversationMessage),
		maxMessages:   maxMessages,
	}
}

func (s *ConversationStore) Add(
	ctx context.Context,
	conversationID string,
	message ConversationMessage,
) error {
	if err := ctx.Err(); err != nil {
		return err
	}

	if conversationID == "" {
		return ErrEmptyConversationID
	}

	s.mu.Lock()
	defer s.mu.Unlock()

	history := append(
		s.conversations[conversationID],
		message,
	)

	if len(history) > s.maxMessages {
		history = history[len(history)-s.maxMessages:]
	}

	s.conversations[conversationID] = history

	return nil
}

func (s *ConversationStore) Get(
	ctx context.Context,
	conversationID string,
) ([]ConversationMessage, error) {
	if err := ctx.Err(); err != nil {
		return nil, err
	}

	if conversationID == "" {
		return nil, ErrEmptyConversationID
	}

	s.mu.RLock()
	defer s.mu.RUnlock()

	history := s.conversations[conversationID]

	result := make([]ConversationMessage, len(history))
	copy(result, history)

	return result, nil
}
