// Package handler implements the "Notify Me" endpoint as a Vercel Go
// serverless function. NOVA is a concept project, so this validates the
// request and returns a mock acknowledgement — nothing is persisted.
package handler

import (
	"encoding/json"
	"net/http"
	"regexp"
	"strings"
)

var emailRegex = regexp.MustCompile(`^[^\s@]+@[^\s@]+\.[^\s@]+$`)

type subscribeRequest struct {
	Email string `json:"email"`
}

type subscribeResponse struct {
	OK      bool   `json:"ok"`
	Message string `json:"message"`
}

func writeJSON(w http.ResponseWriter, status int, body subscribeResponse) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	_ = json.NewEncoder(w).Encode(body)
}

// Handler is the entrypoint Vercel's Go runtime invokes for POST /api/subscribe.
func Handler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		writeJSON(w, http.StatusMethodNotAllowed, subscribeResponse{OK: false, Message: "use POST"})
		return
	}

	var body subscribeRequest
	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		writeJSON(w, http.StatusBadRequest, subscribeResponse{OK: false, Message: "invalid request body"})
		return
	}

	email := strings.TrimSpace(body.Email)
	if !emailRegex.MatchString(email) {
		writeJSON(w, http.StatusBadRequest, subscribeResponse{OK: false, Message: "enter a valid email"})
		return
	}

	writeJSON(w, http.StatusOK, subscribeResponse{OK: true, Message: "You're on the (imaginary) list."})
}
