package main

import (
	"log/slog"
	"net/http"

	"github.com/mtstnt/litemin/internal/handlers"
)

func main() {
	mux := handlers.Setup()

	slog.Info("[HTTP] Listening to :9000")
	http.ListenAndServe(":9000", mux)
}
