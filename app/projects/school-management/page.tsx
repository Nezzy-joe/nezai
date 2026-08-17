export default function SchoolManagementPage() {
  return (
    <main className="min-h-screen bg-black px-6 py-24 text-white">
      <div className="mx-auto max-w-4xl">
        <header>
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-zinc-600">
            Case Study · 02
          </p>

          <h1 className="mt-6 text-5xl font-semibold tracking-tight sm:text-6xl">
            School Management System
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-400">
            A Go-based backend system for managing core school operations
            with PostgreSQL and JWT-protected API routes.
          </p>
        </header>

        {/* Overview */}
        <section className="mt-24 border-t border-zinc-900 pt-12">
          <p className="text-sm font-medium uppercase tracking-[0.25em] text-zinc-600">
            01 · Overview
          </p>

          <div className="mt-6 grid gap-10 md:grid-cols-[1fr_2fr]">
            <h2 className="text-3xl font-semibold">
              Building a structured backend for school operations.
            </h2>

            <div className="space-y-5 text-base leading-8 text-zinc-400">
              <p>
                The School Management System is a backend application built
                strictly with Go, with PostgreSQL providing persistent data
                storage.
              </p>

              <p>
                The system is designed around core school operations including
                students, admissions, classes, fees, and academic results.
              </p>

              <p>
                Authentication and protected API routes were implemented with
                JWT-based authorization, giving the system a clear foundation
                for controlling access to backend resources.
              </p>
            </div>
          </div>
        </section>

        {/* Technology */}
        <section className="mt-24 border-t border-zinc-900 pt-12">
          <p className="text-sm font-medium uppercase tracking-[0.25em] text-zinc-600">
            Technology
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {["Go", "PostgreSQL", "JWT", "REST API", "bcrypt"].map(
              (technology) => (
                <span
                  key={technology}
                  className="rounded-full bg-zinc-900 px-3 py-1.5 text-xs text-zinc-400"
                >
                  {technology}
                </span>
              )
            )}
          </div>
        </section>
{/* Problem */}
<section className="mt-24 border-t border-zinc-900 pt-12">
  <p className="text-sm font-medium uppercase tracking-[0.25em] text-zinc-600">
    02 · The Problem
  </p>

  <div className="mt-6 max-w-3xl">
    <h2 className="text-3xl font-semibold">
      Building a backend foundation for a growing school management system.
    </h2>

    <div className="mt-6 space-y-5 text-base leading-8 text-zinc-400">
      <p>
        The project started with the need for a structured backend capable of
        managing core school data rather than relying on disconnected or
        temporary application state.
      </p>

      <p>
        The system needed persistent storage for users, students, and subjects,
        while also establishing authentication and protected access to backend
        resources.
      </p>

      <p>
        The longer-term goal is to expand this foundation into a broader school
        management platform covering academic results, grading, termly reports,
        broadsheets, fees, and administrative workflows.
      </p>

      <p>
        The challenge was therefore to build the backend incrementally while
        keeping the foundation structured enough to support those future
        capabilities.
      </p>
    </div>
  </div>

  <div className="mt-10 grid gap-4 md:grid-cols-2">
    {[
      {
        title: "Persistent school data",
        description:
          "Move core application data into PostgreSQL so it can be stored and retrieved reliably.",
      },
      {
        title: "User authentication",
        description:
          "Provide registration and login functionality while protecting user credentials with bcrypt.",
      },
      {
        title: "Protected resources",
        description:
          "Use JWT-based authentication to control access to protected API routes.",
      },
      {
        title: "Student management",
        description:
          "Establish backend functionality for creating and retrieving student records.",
      },
      {
        title: "Subject management",
        description:
          "Establish backend functionality for creating and retrieving subjects.",
      },
      {
        title: "Future academic workflows",
        description:
          "Create a foundation that can later support results, grading, reports, broadsheets, fees, and administrative features.",
      },
    ].map((item) => (
      <article
        key={item.title}
        className="border border-zinc-900 p-6"
      >
        <h3 className="font-medium text-white">
          {item.title}
        </h3>

        <p className="mt-3 text-sm leading-7 text-zinc-500">
          {item.description}
        </p>
      </article>
    ))}
  </div>
</section>
{/* Architecture */}
<section className="mt-24 border-t border-zinc-900 pt-12">
  <p className="text-sm font-medium uppercase tracking-[0.25em] text-zinc-600">
    03 · Architecture
  </p>

  <div className="mt-6 max-w-3xl">
    <h2 className="text-3xl font-semibold">
      A Go backend connected to persistent PostgreSQL storage.
    </h2>

    <p className="mt-6 text-base leading-8 text-zinc-400">
      The system is built with Go and uses the standard net/http package for
      handling HTTP requests. PostgreSQL provides persistent data storage,
      with lib/pq used to connect the Go application to the database.
    </p>

    <p className="mt-5 text-base leading-8 text-zinc-400">
      Authentication is handled through bcrypt password hashing and
      JSON Web Tokens (JWT). Protected API resources require a valid
      authentication token.
    </p>
  </div>

  {/* Architecture flow */}
  <div className="mt-12 border border-zinc-900 bg-zinc-950 p-8">
    <p className="text-xs uppercase tracking-[0.2em] text-zinc-600">
      Request flow
    </p>

    <div className="mt-8 space-y-4 font-mono text-sm">
      <div className="border border-zinc-900 px-5 py-4 text-zinc-300">
        Client
      </div>

      <div className="pl-5 text-zinc-700">↓</div>

      <div className="border border-zinc-900 px-5 py-4 text-zinc-300">
        Go HTTP API · net/http
      </div>

      <div className="pl-5 text-zinc-700">↓</div>

      <div className="border border-zinc-900 px-5 py-4 text-zinc-300">
        JWT Authentication / Protected Routes
      </div>

      <div className="pl-5 text-zinc-700">↓</div>

      <div className="border border-zinc-900 px-5 py-4 text-zinc-300">
        PostgreSQL · lib/pq
      </div>
    </div>
  </div>

  {/* Architecture responsibilities */}
  <div className="mt-10 grid gap-4 md:grid-cols-2">
    {[
      {
        title: "Go HTTP layer",
        description:
          "The backend uses Go's net/http package to handle HTTP requests and expose API functionality.",
      },
      {
        title: "PostgreSQL",
        description:
          "Persistent application data is stored in PostgreSQL rather than being kept only in application memory.",
      },
      {
        title: "Password security",
        description:
          "User passwords are hashed with bcrypt rather than being stored as plain text.",
      },
      {
        title: "JWT authentication",
        description:
          "Authenticated users receive JWT-based credentials that are used when accessing protected resources.",
      },
    ].map((item) => (
      <article
        key={item.title}
        className="border border-zinc-900 p-6"
      >
        <h3 className="font-medium text-white">
          {item.title}
        </h3>

        <p className="mt-3 text-sm leading-7 text-zinc-500">
          {item.description}
        </p>
      </article>
    ))}
  </div>
</section>
{/* Engineering Challenges */}
<section className="mt-24 border-t border-zinc-900 pt-12">
  <p className="text-sm font-medium uppercase tracking-[0.25em] text-zinc-600">
    04 · Engineering Challenges
  </p>

  <div className="mt-6 max-w-3xl">
    <h2 className="text-3xl font-semibold">
      The difficult part was making each layer work together reliably.
    </h2>

    <div className="mt-6 space-y-5 text-base leading-8 text-zinc-400">
      <p>
        Building the system was not a straight line from database design to
        working API. Several implementation problems appeared along the way,
        particularly around database access, authentication, routing, and
        debugging API behavior.
      </p>

      <p>
        Instead of treating those problems as failures to hide, I used them as
        part of the development process: identify the failure, trace it back to
        its source, make the correction, and verify the result.
      </p>
    </div>
  </div>

  <div className="mt-12 space-y-4">
    {[
      {
        number: "01",
        title: "Database connectivity and permissions",
        description:
          "Connecting the Go application to PostgreSQL exposed configuration and database permission issues that had to be diagnosed before the API could reliably interact with persistent data.",
      },
      {
        number: "02",
        title: "Authentication implementation",
        description:
          "JWT authentication required making decisions around token generation, signing, and protected API access rather than treating authentication as an afterthought.",
      },
      {
        number: "03",
        title: "Protected API routes",
        description:
          "Authentication middleware had to be integrated with the API so that protected resources could distinguish authenticated requests from unauthenticated ones.",
      },
      {
        number: "04",
        title: "Debugging API failures",
        description:
          "Some endpoints did not work correctly on the first implementation. Debugging involved tracing requests through the Go server, checking the database interaction, and correcting the underlying implementation.",
      },
      {
        number: "05",
        title: "Small mistakes with visible consequences",
        description:
          "A simple naming mistake in the project affected how a status value was displayed. Finding the typo, correcting it, and refreshing the application reinforced the importance of checking the complete data flow rather than assuming the backend response is correct.",
      },
    ].map((challenge) => (
      <article
        key={challenge.number}
        className="grid gap-6 border border-zinc-900 p-6 md:grid-cols-[80px_1fr]"
      >
        <span className="text-sm text-zinc-600">
          {challenge.number}
        </span>

        <div>
          <h3 className="text-lg font-medium text-white">
            {challenge.title}
          </h3>

          <p className="mt-3 text-sm leading-7 text-zinc-500">
            {challenge.description}
          </p>
        </div>
      </article>
    ))}
  </div>

  <blockquote className="mt-10 border-l border-zinc-700 pl-6 text-lg leading-8 text-zinc-300">
    Building the backend taught me that debugging is not separate from
    engineering. It is part of the process of understanding how the system
    actually behaves.
  </blockquote>
</section>

{/* Current Implementation */}
<section className="mt-24 border-t border-zinc-900 pt-12">
  <p className="text-sm font-medium uppercase tracking-[0.25em] text-zinc-600">
    05 · Current Implementation
  </p>

  <div className="mt-6 max-w-3xl">
    <h2 className="text-3xl font-semibold">
      The backend foundation is working; the academic platform is still growing.
    </h2>

    <p className="mt-6 text-base leading-8 text-zinc-400">
      The current implementation focuses on establishing the core backend
      capabilities required for the larger school management platform.
      Authentication, database persistence, student management, and subject
      management are currently implemented.
    </p>
  </div>

  <div className="mt-12 grid gap-4 md:grid-cols-2">
    {[
      {
        status: "Implemented",
        title: "User registration",
        description:
          "Users can register through the Go backend, with passwords protected using bcrypt hashing.",
      },
      {
        status: "Implemented",
        title: "User login",
        description:
          "The backend authenticates users and generates JWT credentials for authenticated sessions.",
      },
      {
        status: "Implemented",
        title: "JWT-protected routes",
        description:
          "Protected API resources require valid authentication credentials before they can be accessed.",
      },
      {
        status: "Implemented",
        title: "PostgreSQL persistence",
        description:
          "The application connects to PostgreSQL and uses persistent database storage for its backend data.",
      },
      {
        status: "Implemented",
        title: "Student management",
        description:
          "The current API supports creating and retrieving student records.",
      },
      {
        status: "Implemented",
        title: "Subject management",
        description:
          "The current API supports creating and retrieving subject records.",
      },
    ].map((item) => (
      <article
        key={item.title}
        className="border border-zinc-900 p-6"
      >
        <div className="flex items-center justify-between gap-4">
          <h3 className="font-medium text-white">
            {item.title}
          </h3>

          <span className="text-xs uppercase tracking-wider text-zinc-600">
            {item.status}
          </span>
        </div>

        <p className="mt-3 text-sm leading-7 text-zinc-500">
          {item.description}
        </p>
      </article>
    ))}
  </div>

  <div className="mt-10 border border-zinc-900 p-6">
    <p className="text-xs uppercase tracking-[0.2em] text-zinc-600">
      Current API foundation
    </p>

    <div className="mt-6 grid gap-3 sm:grid-cols-2">
      {[
        "Authentication",
        "JWT authorization",
        "Student records",
        "Subject records",
        "PostgreSQL",
        "Go REST API",
      ].map((item) => (
        <div
          key={item}
          className="border border-zinc-900 px-4 py-3 text-sm text-zinc-400"
        >
          {item}
        </div>
      ))}
    </div>
  </div>
</section>
{/* Roadmap */}
<section className="mt-24 border-t border-zinc-900 pt-12">
  <p className="text-sm font-medium uppercase tracking-[0.25em] text-zinc-600">
    06 · Roadmap
  </p>

  <div className="mt-6 max-w-3xl">
    <h2 className="text-3xl font-semibold">
      Expanding the backend from its foundation into a complete academic workflow.
    </h2>

    <p className="mt-6 text-base leading-8 text-zinc-400">
      The current implementation establishes the authentication, persistence,
      student, and subject foundations. The next stages focus on building the
      academic and administrative workflows on top of that foundation.
    </p>
  </div>

  <div className="mt-12 space-y-4">
    {[
      {
        number: "01",
        title: "Result management",
        description:
          "Introduce backend support for recording and managing student academic results.",
      },
      {
        number: "02",
        title: "Grade calculation",
        description:
          "Build the grading logic required to convert student scores into academic grades.",
      },
      {
        number: "03",
        title: "Term-based results",
        description:
          "Organize academic results across first term, second term, and third term within an academic session.",
      },
      {
        number: "04",
        title: "GPA and CGPA",
        description:
          "Introduce GPA and cumulative GPA calculations based on the system's academic grading structure.",
      },
      {
        number: "05",
        title: "Broadsheet generation",
        description:
          "Generate broader academic reports that allow administrators to review student performance across subjects.",
      },
      {
        number: "06",
        title: "Excel score uploads",
        description:
          "Support importing student scores from Excel files to make large-scale result entry more practical.",
      },
      {
        number: "07",
        title: "Fees management",
        description:
          "Extend the backend to support school fee records and related financial workflows.",
      },
      {
        number: "08",
        title: "Admin dashboard",
        description:
          "Provide an administrative interface for managing students, subjects, results, and other school resources.",
      },
      {
        number: "09",
        title: "Role-based access control",
        description:
          "Introduce differentiated permissions for administrators, teachers, and students.",
      },
    ].map((item) => (
      <article
        key={item.number}
        className="grid gap-6 border border-zinc-900 p-6 md:grid-cols-[80px_1fr]"
      >
        <span className="text-sm text-zinc-600">
          {item.number}
        </span>

        <div>
          <h3 className="text-lg font-medium text-white">
            {item.title}
          </h3>

          <p className="mt-3 text-sm leading-7 text-zinc-500">
            {item.description}
          </p>
        </div>
      </article>
    ))}
  </div>

  <div className="mt-10 border border-zinc-900 p-6">
    <p className="text-xs uppercase tracking-[0.2em] text-zinc-600">
      Academic workflow
    </p>

    <div className="mt-6 flex flex-wrap items-center gap-3 text-sm">
      {[
        "Subjects",
        "Scores",
        "Grades",
        "Term 1",
        "Term 2",
        "Term 3",
        "GPA",
        "CGPA",
        "Broadsheet",
      ].map((item, index, items) => (
        <div key={item} className="flex items-center gap-3">
          <span className="border border-zinc-900 px-4 py-2 text-zinc-400">
            {item}
          </span>

          {index < items.length - 1 && (
            <span className="text-zinc-700">→</span>
          )}
        </div>
      ))}
    </div>
  </div>
</section>
{/* Evidence */}
<section className="mt-24 border-t border-zinc-900 pt-12">
  <p className="text-sm font-medium uppercase tracking-[0.25em] text-zinc-600">
    07 · Evidence
  </p>

  <div className="mt-6 max-w-3xl">
    <h2 className="text-3xl font-semibold">
      Explore the implementation.
    </h2>

    <p className="mt-6 text-base leading-8 text-zinc-400">
      This case study documents the engineering direction and current state of
      the project. The repository contains the actual Go backend,
      authentication implementation, PostgreSQL integration, student and
      subject functionality, and the ongoing development work.
    </p>
  </div>

  <div className="mt-10 grid gap-4 md:grid-cols-2">
    <a
      href="https://github.com/Nezzy-joe/school-system"
      target="_blank"
      rel="noopener noreferrer"
      className="group border border-zinc-900 p-6 transition-colors hover:border-zinc-700"
    >
      <p className="text-xs uppercase tracking-[0.2em] text-zinc-600">
        Repository
      </p>

      <h3 className="mt-5 text-xl font-medium text-white">
        School Management System
      </h3>

      <p className="mt-3 text-sm leading-7 text-zinc-500">
        Explore the Go source code, PostgreSQL integration, authentication
        implementation, and project documentation.
      </p>

      <span className="mt-8 block text-sm text-white">
        View repository →
      </span>
    </a>

    <div className="border border-zinc-900 p-6">
      <p className="text-xs uppercase tracking-[0.2em] text-zinc-600">
        Stack
      </p>

      <h3 className="mt-5 text-xl font-medium text-white">
        Backend technologies
      </h3>

      <div className="mt-5 flex flex-wrap gap-2">
        {[
          "Go",
          "net/http",
          "PostgreSQL",
          "lib/pq",
          "JWT",
          "bcrypt",
          "REST API",
        ].map((technology) => (
          <span
            key={technology}
            className="rounded-full bg-zinc-900 px-3 py-1.5 text-xs text-zinc-400"
          >
            {technology}
          </span>
        ))}
      </div>
    </div>
  </div>

  <div className="mt-10 border-l border-zinc-700 pl-6">
    <p className="text-lg leading-8 text-zinc-300">
      The project is intentionally being developed incrementally, with the
      current backend foundation serving as the base for the larger academic
      and administrative workflows planned for the system.
    </p>
  </div>
</section>
      </div>
    </main>
  );
}