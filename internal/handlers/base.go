package handlers

import (
	"fmt"
	"io/fs"
	"log/slog"
	"net/http"
	"net/url"
	"strings"

	"github.com/go-chi/chi/v5"
	"github.com/mtstnt/litemin/internal/view"
)

func Setup() *chi.Mux {
	entries, err := fs.ReadDir(view.FS, "dist")
	if err != nil {
		panic(err)
	}
	dirNames := make([]string, 0)
	for _, entry := range entries {
		dirNames = append(dirNames, entry.Name())
	}
	fmt.Printf("Excluded Directory Name: %+v\n", dirNames)

	mux := chi.NewMux()
	mux.Handle("/", FSPreRequestHandler("dist", dirNames, http.FileServer(http.FS(view.FS))))

	return mux
}

// FSPreRequestHandler adds the "dist" prefix to the request if the request accesses static files.
// Otherwise, it keeps the URL but renders index.html for the URL to be used by React Router.
func FSPreRequestHandler(prefix string, excludeDirNames []string, h http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		slog.Info(fmt.Sprintf("[HTTP] %s: %s", r.Method, r.URL.Path))

		// Don't prepend prefix on API endpoints.
		if strings.HasPrefix(r.URL.Path, "/api") {
			h.ServeHTTP(w, r)
			return
		}

		// TODO: Use better matcher (maybe a map or regex)
		// On public directory access, we prepend "dist" because the embedded FS
		// has an additional "dist" directory in the root.
		isPublicDirectoryAccess := false

		if r.URL.Path == "/" || r.URL.Path == "" {
			isPublicDirectoryAccess = true
		}

		for _, dirName := range excludeDirNames {
			if strings.HasPrefix(r.URL.Path, "/"+dirName) {
				isPublicDirectoryAccess = true
				break
			}
		}

		if isPublicDirectoryAccess {
			r2 := new(http.Request)
			*r2 = *r
			r2.URL = new(url.URL)
			*r2.URL = *r.URL
			r2.URL.Path = prefix + r.URL.Path
			r2.URL.RawPath = prefix + r.URL.RawPath
			h.ServeHTTP(w, r2)
			return
		}

		// If not a public access, render index.html, but keep the URL so React Router can catch that.
		http.ServeFileFS(w, r, view.FS, "dist/index.html")
	})
}
