# NezAI

> A personal engineering website and AI-powered personal agent built as a FlyRank Backend AI Engineering capstone.

NezAI combines a professional personal website, an engineering portfolio, and a personal AI agent.

## Why I built NezAI

The goal was to build a real end-to-end AI system rather than simply adding a chatbot to a portfolio.

The project demonstrates:

- backend engineering
- AI integration
- API design
- provider abstraction
- prompt engineering
- frontend/backend communication
- automated testing
- grounded responses for personal information

This project is part of my work during the FlyRank Backend AI Engineering internship.

## What NezAI does

### Personal engineering portfolio

The website presents:

- About section
- Engineering projects
- Technical writing
- Personal AI agent

### Personal AI agent

Visitors can ask NezAI about:

- Joseph Amos Ekpe
- engineering experience
- featured projects
- the School Management System
- NezAI
- general software engineering concepts

The backend separates verified portfolio information from open-ended AI generation.

## Architecture

```text
Browser
   |
   v
Next.js / TypeScript
   |
   | POST /api/v1/chat
   v
Go HTTP API
   |
   v
Chat Service
   |
   +----------------------+
   |                      |
   v                      v
Portfolio Knowledge    AI Provider
(verified facts)          |
   |                      v
   |                 Ollama /api/chat
   |                      |
   |                  Gemma 3 1B
   |                      |
   +----------+-----------+
              |
              v
           Response
              |
              v
           Browser
```

## Backend design

The backend uses a provider abstraction:

```go
type AIProvider interface {
    Generate(
        ctx context.Context,
        systemPrompt string,
        message string,
    ) (string, error)
}
```

The service passes the NezAI system instructions and the visitor's message separately to the provider.

The current provider is Ollama.

This makes the AI provider replaceable without changing the HTTP handler or service layer.

## Grounded portfolio responses

A language model is not treated as the source of truth for personal portfolio information.

Known portfolio questions are handled by application-controlled information.

The three featured projects are:

1. Task API
2. School Management System
3. NezAI

The School Management System is documented as a Go and PostgreSQL backend application with confirmed functionality including:

- authentication
- JWT authentication
- JWT middleware
- protected API routes
- student management
- results
- admissions
- classes
- fees

This prevents the model from inventing unsupported project features or professional experience.

## AI layer

NezAI uses:

- Ollama
- Gemma 3 1B

The backend uses Ollama's chat API and sends:

```text
system
  NezAI instructions and grounding rules

user
  Visitor's question
```

The model is therefore responsible for open-ended AI generation, while important portfolio facts remain under application control.

## Technology stack

### Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS

### Backend

- Go
- net/http
- REST API
- JSON
- middleware
- dependency injection
- automated tests

### AI

- Ollama
- Gemma 3 1B

### Development

- Git
- GitHub
- Ubuntu

## Project structure

```text
nezai/
├── app/
│   ├── components/
│   │   ├── About.tsx
│   │   ├── Navbar.tsx
│   │   ├── NezAIChat.tsx
│   │   ├── Projects.tsx
│   │   └── Writing.tsx
│   ├── projects/
│   │   ├── school-management/
│   │   └── task-api/
│   ├── writing/
│   │   └── week-2-engineered-prompt/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── backend/
│   ├── handlers/
│   │   ├── chat.go
│   │   └── chat_test.go
│   ├── providers/
│   │   ├── fake.go
│   │   ├── ollama.go
│   │   ├── ollama_test.go
│   │   └── provider.go
│   ├── services/
│   │   ├── agent.go
│   │   ├── chat.go
│   │   ├── chat_test.go
│   │   └── portfolio.go
│   ├── config.go
│   ├── main.go
│   └── middleware.go
├── public/
├── .env.local
├── package.json
└── README.md
```

## API

### Health

```http
GET /health
```

Test:

```bash
curl -i http://localhost:8080/health
```

Expected:

```json
{
  "status": "ok",
  "service": "nezai-backend"
}
```

### Chat

```http
POST /api/v1/chat
Content-Type: application/json
```

Example request:

```json
{
  "message": "What are Joseph's three featured engineering projects?"
}
```

## Running locally

### Requirements

- Node.js
- npm
- Go
- Ollama

Make sure Gemma is available:

```bash
ollama list
```

Install it when necessary:

```bash
ollama pull gemma3:1b
```

### Frontend configuration

Create `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:8080
```

### Start the backend

```bash
cd backend
go run .
```

Backend:

```text
http://localhost:8080
```

### Start the frontend

From the project root:

```bash
npm install
npm run dev
```

Open:

```text
http://localhost:3000
```

## Testing

### Backend

```bash
cd backend
go test ./...
```

The backend tests cover:

- ChatService behavior
- provider errors
- Ollama request handling
- context cancellation
- HTTP validation
- method validation
- successful responses

### Frontend

```bash
npm run lint
npm run build
```

## Engineering decisions

### Why Go?

Go gives this project:

- a clear HTTP stack
- explicit interfaces
- straightforward dependency injection
- strong typing
- built-in concurrency primitives
- a strong standard library

### Why Ollama?

Ollama allows local model inference without depending on a paid hosted inference API.

That made it suitable for developing the capstone within a zero-budget environment.

### Why Gemma 3 1B?

Gemma 3 1B is lightweight enough for local experimentation.

The limitation of a small model also reinforced an important design decision: the model should not be trusted as the source of truth for personal portfolio facts.

### Why separate portfolio knowledge from AI generation?

LLMs can produce plausible but incorrect information.

For a personal engineering website, an incorrect claim about a project or professional experience is worse than saying that the information is unavailable.

NezAI therefore keeps verified portfolio facts under application control while using the model for open-ended generation.

## Current limitations

This is a capstone project rather than a production-scale AI platform.

Current limitations include:

- local Ollama inference
- small 1B parameter model
- no persistent conversation memory
- no public-chat authentication
- no database-backed knowledge retrieval
- no production deployment architecture
- limited automated evaluation of model quality

## What I learned

Building NezAI required working across the complete path:

```text
Browser
→ Next.js
→ HTTP API
→ Go service
→ provider interface
→ Ollama
→ language model
→ HTTP response
→ browser
```

The key lesson was that integrating an LLM is not the same as building a reliable AI system.

The application needs engineering controls around the model:

- clear interfaces
- controlled knowledge
- validation
- testable services
- explicit provider boundaries
- predictable failure behavior

## Featured engineering work

### Task API

A Go-based CRUD REST API.

### School Management System

A Go and PostgreSQL backend application involving:

- authentication
- JWT authentication
- JWT middleware
- protected API routes
- student management
- results
- admissions
- classes
- fees

### NezAI

A personal AI engineering platform combining a professional website with a personal AI agent.

## Capstone context

NezAI was built as part of the FlyRank Backend AI Engineering internship.

The project combines:

- personal branding
- frontend development
- backend services
- AI integration
- grounded AI behavior
- testing
- documentation

## Author

**Joseph Amos Ekpe**

Backend engineering and AI engineering.

GitHub:

https://github.com/Nezzy-joe
