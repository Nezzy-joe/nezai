package services

import "strings"

type Project struct {
	Name         string
	Description  string
	Technologies []string
	Features     []string
}

var featuredProjects = []Project{
	{
		Name:        "Task API",
		Description: "A Go-based CRUD REST API.",
		Technologies: []string{
			"Go",
		},
	},
	{
		Name:        "School Management System",
		Description: "A Go and PostgreSQL backend application.",
		Technologies: []string{
			"Go",
			"PostgreSQL",
		},
		Features: []string{
			"authentication",
			"JWT authentication",
			"JWT middleware",
			"protected API routes",
			"student management",
			"results",
			"admissions",
			"classes",
			"fees",
		},
	},
	{
		Name:        "NezAI",
		Description: "A personal AI engineering platform combining a professional website with a personal AI agent.",
		Technologies: []string{
			"Next.js",
			"TypeScript",
			"Tailwind CSS",
			"Go",
			"REST APIs",
			"Ollama",
			"Gemma 3 1B",
		},
	},
}

func portfolioAnswer(message string) (string, bool) {
	q := strings.ToLower(strings.TrimSpace(message))

	switch {
	case strings.Contains(q, "who is joseph") ||
		strings.Contains(q, "who's joseph"):
		return "Joseph Amos Ekpe is a backend engineer focused on backend engineering, AI engineering, and practical AI-powered systems. His primary backend language is Go, and his work includes REST APIs, net/http, PostgreSQL, JWT authentication, middleware, testing, dependency injection, and concurrency.", true

	case strings.Contains(q, "three featured") ||
		strings.Contains(q, "featured engineering projects") ||
		strings.Contains(q, "featured projects"):
		return "Joseph's three featured engineering projects are:\n\n1. **Task API** — A Go-based CRUD REST API.\n2. **School Management System** — A Go and PostgreSQL backend application.\n3. **NezAI** — A personal AI engineering platform combining a professional website with a personal AI agent.", true

	case strings.Contains(q, "school management system") ||
		strings.Contains(q, "school system"):
		return "Joseph's School Management System is a Go and PostgreSQL backend application.\n\nConfirmed functionality includes:\n- Authentication\n- JWT authentication\n- JWT middleware\n- Protected API routes\n- Student management\n- Results\n- Admissions\n- Classes\n- Fees", true

	case strings.Contains(q, "task api"):
		return "Task API is a Go-based CRUD REST API.", true

	case strings.Contains(q, "nezai") ||
		strings.Contains(q, "personal ai agent"):
		return "NezAI is Joseph's personal AI engineering platform. It combines a professional website, an engineering portfolio, and a personal AI agent. Its current stack includes Next.js, TypeScript, Tailwind CSS, Go, REST APIs, Ollama, and Gemma 3 1B.", true

	case strings.Contains(q, "what is dependency injection") ||
		strings.Contains(q, "what's dependency injection") ||
		strings.Contains(q, "define dependency injection") ||
		strings.Contains(q, "why is dependency injection useful") ||
		strings.Contains(q, "dependency injection"):
		return "Dependency injection is a software design technique where a component receives the dependencies it needs from outside rather than creating them itself. In Go, this is commonly done by defining interfaces and passing implementations into functions or services. It reduces coupling and makes code easier to test and maintain.", true

	case strings.Contains(q, "what is an interface in go") ||
		strings.Contains(q, "what are interfaces in go") ||
		strings.Contains(q, "explain interfaces in go") ||
		strings.Contains(q, "go interfaces"):
		return "A Go interface defines a set of methods that a type can implement. Go uses implicit interface satisfaction, so a type implements an interface simply by providing the required methods. Interfaces are useful for abstraction, reducing coupling, and making code easier to test.", true
	}

	return "", false
}
