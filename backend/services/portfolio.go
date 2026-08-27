package services

import "strings"

type Project struct {
	Name         string
	Description  string
	Technologies []string
	Features     []string
	Status       string
	GitHub       string
}

var featuredProjects = []Project{
	{
		Name:        "Task API",
		Description: "A Go-based CRUD REST API built as part of Joseph's AI-assisted engineering work.",
		Technologies: []string{
			"Go",
			"net/http",
			"REST API",
			"JSON",
		},
		Features: []string{
			"CRUD operations",
			"HTTP request handling",
			"REST API design",
			"JSON-based communication",
		},
		Status: "Completed",
		GitHub: "https://github.com/Nezzy-joe/task-api",
	},
	{
		Name:        "School Management System",
		Description: "A Go and PostgreSQL backend application for managing core school data and backend workflows.",
		Technologies: []string{
			"Go",
			"PostgreSQL",
			"net/http",
			"REST API",
			"JWT",
			"bcrypt",
		},
		Features: []string{
			"authentication",
			"JWT authentication",
			"JWT middleware",
			"protected API routes",
			"student management",
			"subject management",
			"results",
			"admissions",
			"classes",
			"fees",
		},
		Status: "Built incrementally",
		GitHub: "https://github.com/Nezzy-joe/school-system",
	},
	{
		Name:        "NezAI",
		Description: "A personal AI engineering platform combining a professional website, engineering portfolio, and personal AI agent.",
		Technologies: []string{
			"Next.js",
			"TypeScript",
			"Tailwind CSS",
			"Go",
			"REST APIs",
			"Ollama",
			"Gemma 3 1B",
		},
		Features: []string{
			"personal engineering portfolio",
			"personal AI agent",
			"grounded portfolio knowledge",
			"local AI inference",
			"frontend/backend integration",
		},
		Status: "Building",
		GitHub: "https://github.com/Nezzy-joe/nezai",
	},
}

func portfolioAnswer(message string) (string, bool) {
	q := strings.ToLower(strings.TrimSpace(message))

	// Explicit request for all featured projects.
	if strings.Contains(q, "three featured") ||
		strings.Contains(q, "featured engineering projects") ||
		strings.Contains(q, "featured projects") {

		return "Joseph's three featured engineering projects are:\n\n" +
			"1. **Task API** — A Go-based CRUD REST API.\n" +
			"2. **School Management System** — A Go and PostgreSQL backend application.\n" +
			"3. **NezAI** — A personal AI engineering platform combining a professional website with a personal AI agent.", true
	}

	// Determine which topics the visitor is asking about.
	mentionsJoseph := strings.Contains(q, "joseph") ||
		strings.Contains(q, "joseph amos ekpe")

	mentionsTaskAPI := strings.Contains(q, "task api")

	mentionsSchool := strings.Contains(q, "school management system") ||
		strings.Contains(q, "school system")

	mentionsNezAI := strings.Contains(q, "nezai") ||
		strings.Contains(q, "personal ai agent")

	var sections []string

	// Joseph profile.
	if mentionsJoseph {
		sections = append(
			sections,
			"### Joseph Amos Ekpe\n\n"+
				"Joseph Amos Ekpe is a backend engineer focused on backend engineering, "+
				"AI engineering, and practical AI-powered systems.\n\n"+
				"His primary backend language is **Go**. His backend technologies and "+
				"engineering concepts include Go, REST APIs, net/http, PostgreSQL, "+
				"JWT authentication, middleware, HTTP services, API design, testing, "+
				"dependency injection, and concurrency.\n\n"+
				"He is also developing his AI engineering skills through the "+
				"FlyRank Backend AI Engineering internship.",
		)
	}

	// Task API.
	if mentionsTaskAPI {
		sections = append(
			sections,
			"### Task API\n\n"+
				"Task API is a **Go-based CRUD REST API** built as part of Joseph's "+
				"AI-assisted engineering work.\n\n"+
				"**Technology:**\n"+
				"- Go\n"+
				"- net/http\n"+
				"- REST API\n"+
				"- JSON\n\n"+
				"**Engineering focus:**\n"+
				"- CRUD operations\n"+
				"- HTTP request handling\n"+
				"- REST API design\n"+
				"- JSON-based communication\n\n"+
				"**Status:** Completed\n\n"+
				"**GitHub:** https://github.com/Nezzy-joe/task-api",
		)
	}

	// School Management System.
	if mentionsSchool {
		sections = append(
			sections,
			"### School Management System\n\n"+
				"Joseph's School Management System is a **Go and PostgreSQL backend "+
				"application** for managing core school data and backend workflows.\n\n"+
				"**Technology:**\n"+
				"- Go\n"+
				"- PostgreSQL\n"+
				"- net/http\n"+
				"- REST API\n"+
				"- JWT\n"+
				"- bcrypt\n\n"+
				"**Confirmed functionality:**\n"+
				"- Authentication\n"+
				"- JWT authentication\n"+
				"- JWT middleware\n"+
				"- Protected API routes\n"+
				"- Student management\n"+
				"- Subject management\n"+
				"- Results\n"+
				"- Admissions\n"+
				"- Classes\n"+
				"- Fees\n\n"+
				"**Status:** Built incrementally\n\n"+
				"The project is being expanded from its backend foundation into a "+
				"broader academic and administrative platform.\n\n"+
				"**GitHub:** https://github.com/Nezzy-joe/school-system",
		)
	}

	// NezAI.
	if mentionsNezAI {
		sections = append(
			sections,
			"### NezAI\n\n"+
				"NezAI is Joseph's personal AI engineering platform. It combines "+
				"a professional website, engineering portfolio, and personal AI agent.\n\n"+
				"**Technology:**\n"+
				"- Next.js\n"+
				"- TypeScript\n"+
				"- Tailwind CSS\n"+
				"- Go\n"+
				"- REST APIs\n"+
				"- Ollama\n"+
				"- Gemma 3 1B\n\n"+
				"**Current capabilities:**\n"+
				"- Personal engineering portfolio\n"+
				"- Personal AI agent\n"+
				"- Grounded portfolio knowledge\n"+
				"- Local AI inference\n"+
				"- Frontend/backend integration\n\n"+
				"**Status:** Building\n\n"+
				"**GitHub:** https://github.com/Nezzy-joe/nezai",
		)
	}

	if len(sections) > 0 {
		return strings.Join(sections, "\n\n"), true
	}

	// Verified technical explanation.
	if strings.Contains(q, "dependency injection") {
		return "Dependency injection is a software design technique where a component receives the dependencies it needs from outside rather than creating them itself. In Go, this is commonly done by defining interfaces and passing implementations into functions or services. It reduces coupling and makes code easier to test and maintain.", true
	}

	if strings.Contains(q, "interface") &&
		strings.Contains(q, "go") {
		return "A Go interface defines a set of methods that a type can implement. Go uses implicit interface satisfaction, so a type implements an interface simply by providing the required methods. Interfaces are useful for abstraction, reducing coupling, and making code easier to test.", true
	}

	return "", false
}
