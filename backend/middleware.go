package main

import (
	"context"
	"crypto/rand"
	"encoding/hex"
	"log"
	"net/http"
	"os"
	"strings"
	"time"
)

type contextKey string

const requestIDKey contextKey = "requestID"

func generateRequestID() (string, error) {
	bytes := make([]byte, 16)

	_, err := rand.Read(bytes)
	if err != nil {
		return "", err
	}

	return hex.EncodeToString(bytes), nil
}

func requestIDFromContext(ctx context.Context) string {
	requestID, ok := ctx.Value(requestIDKey).(string)
	if !ok {
		return ""
	}

	return requestID
}

func requestIDMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		requestID, err := generateRequestID()
		if err != nil {
			http.Error(
				w,
				"failed to generate request ID",
				http.StatusInternalServerError,
			)
			return
		}

		ctx := context.WithValue(
			r.Context(),
			requestIDKey,
			requestID,
		)

		r = r.WithContext(ctx)

		start := time.Now()

		log.Printf(
			"request started id=%s method=%s path=%s",
			requestID,
			r.Method,
			r.URL.Path,
		)

		next.ServeHTTP(w, r)

		log.Printf(
			"request completed id=%s method=%s path=%s duration=%s",
			requestID,
			r.Method,
			r.URL.Path,
			time.Since(start),
		)
	})
}

func corsMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		allowedOrigin := os.Getenv("FRONTEND_URL")

		if allowedOrigin == "" {
			allowedOrigin = "http://localhost:3000"
		}

		allowedOrigin = strings.TrimRight(
			allowedOrigin,
			"/",
		)

		origin := strings.TrimRight(
			r.Header.Get("Origin"),
			"/",
		)

		// Only allow the configured frontend origin.
		if origin != "" && origin == allowedOrigin {
			w.Header().Set(
				"Access-Control-Allow-Origin",
				origin,
			)
			w.Header().Set(
				"Vary",
				"Origin",
			)
		}

		w.Header().Set(
			"Access-Control-Allow-Methods",
			"POST, GET, OPTIONS",
		)

		w.Header().Set(
			"Access-Control-Allow-Headers",
			"Content-Type",
		)

		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusNoContent)
			return
		}

		next.ServeHTTP(w, r)
	})
}
