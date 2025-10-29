Docker usage for `chatbot-rasa-backend`

Build the image (from inside `chatbot-rasa-backend`):

```powershell
# Build
docker build -t chatbot-rasa-backend:latest .

# Run (maps host ./models to container /app/models and exposes port 5005)
# On PowerShell, use ${PWD} to reference the current directory
docker run -it --rm -p 5005:5005 -v "${PWD}/models:/app/models" chatbot-rasa-backend:latest
```

Notes:
- The Dockerfile installs `rasa` if `requirements.txt` is empty. For reproducible builds, pin your dependencies in `requirements.txt` (for example `rasa==3.5.0`).
- If a package requires system build tools, the Dockerfile includes basic build tools (`build-essential`, `gcc`). You can extend the list if needed.
- To run a custom Rasa command, override the container command, e.g.: `docker run ... chatbot-rasa-backend:latest rasa train`.
