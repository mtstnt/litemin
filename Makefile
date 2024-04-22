.PHONY: runfe buildbe

# Builds the FE to /internal/view/dist.
# Then embeds them into the executable.
runbe: buildfe buildbe
	./bin/litemin

buildbe: 
	go build -o bin/ ./cmd/litemin

runfe: 
	cd frontend && \
	pnpm run dev

buildfe:
	cd frontend && \
	pnpm run build