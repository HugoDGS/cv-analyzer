# CV Analyzer

Upload a PDF resume and get instant AI-powered feedback — score, strengths, weaknesses, actionable suggestions, and section-by-section review. Optionally paste a job description to get a compatibility score.

Supports **OpenAI** (GPT-4o-mini) and **Anthropic** (Claude) — switchable via environment variable.

## Features

- **PDF upload** — drag & drop or click to select
- **Global score** — 0 to 100 with animated ring indicator
- **Strengths & weaknesses** — specific, not generic
- **Actionable suggestions** — prioritized list of improvements
- **Section review** — Contact, Summary, Experience, Education, Skills, Projects
- **Job match score** — paste a job description to see compatibility (0-100) with gap analysis
- **Multi-provider** — works with OpenAI or Anthropic, configured via `.env`

## Tech Stack

| Layer | Tech |
|-------|------|
| Backend | Python, FastAPI, pdfplumber |
| AI | OpenAI GPT-4o-mini / Anthropic Claude (configurable) |
| Frontend | React 18, Vite, Axios |
| DevOps | Docker, Docker Compose |

## Getting Started

### With Docker

```bash
cp server/.env.example server/.env
# Fill in your API key in server/.env
docker compose up --build
```

App runs at `http://localhost:5173`

### Without Docker

```bash
# Backend
cd server
python -m venv venv && source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env   # add your API key
uvicorn main:app --reload --port 8000

# Frontend (new terminal)
cd client
npm install
npm run dev
```

## Configuration

```env
# server/.env
LLM_PROVIDER=openai          # "openai" or "anthropic"
OPENAI_API_KEY=sk-...
OPENAI_MODEL=gpt-4o-mini
ANTHROPIC_API_KEY=sk-ant-...
ANTHROPIC_MODEL=claude-haiku-4-5-20251001
```

## API

| Method | Path | Body | Description |
|--------|------|------|-------------|
| POST | `/api/analyze` | `file` (PDF), `job_description?` (text) | Analyze a CV |
| GET | `/api/health` | — | Health check |
