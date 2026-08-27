package services

import "errors"

var (
	ErrEmptyMessage        = errors.New("message is required")
	ErrEmptyConversationID = errors.New("conversation ID is required")
)
