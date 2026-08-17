export default function TaskApiPage() {
  return (
    <main className="min-h-screen bg-black px-6 py-24 text-white">
      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <header className="max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-zinc-500">
          Case Study . 01
          </p>

          <h1 className="mt-6 text-5xl font-semibold tracking-tight sm:text-6xl">
            Task API
          </h1>

          <p className="mt-6 text-xl leading-8 text-zinc-400">
            From &quot;Build a CRUD API&quot; to an engineeres prompt.
          </p>

          <div className="mt-8 flex flex-wrap gap-2">
            {[
              "Go",
              "REST API",
              "CRUD",
              "AI-assisted engineering",
            ].map((technology) => (
              <span 
              key={technology}
              className="rounded-full bg-zinc-900 px-3 py-1.5 text-xs text-zinc-400"
              >
                {technology}

              </span>

            ))}

          </div>
        </header>

        {/*Overview */}
        <section className="mt-24 border-t border-zinc-900 pt-12">
          <p className="text-sm font-medium uppercase tracking-[0.25em] text-zinc-600">
            01 . Overview
          </p>

          <div className="mt-6 grid gap-10 md:grid-cols-[1fr_2fr]">
            <h2 className="text-2xl font-semibold">
              A CRUD assignment became an experiment in engineering with AI.
            </h2>
            
            <div className="space-y-5 text-base leading text-zinc-400">
              <p>
                The Task API was built as part of my backend engineering work during Week 2 of the FlyRank AI internship.
              </p>

              <p>
                The project started with a straightforward goal: build a CRUD API. I used the assignment as an opportunity to explore a 
                different question - what changes when an AI system is treated as an engineering collaborator rather than
                simply a tool for generating code?
              </p>

              <p>
                The result became an experiment in improving the instructions given to the AI 
                and evaluating the implemnetation that came back.
              </p>
            </div>
          </div>
        </section>

        {/* Problem */}
        <section className="mt-24 border-t border-zinc-900 pt-12">
          <p className="text-sm font-medium uppercase tracking-[0.25em] text-zinc-600">
            02 . The problem
          </p>

          <div className="mt-6 max-w-3xl">
            <h2 className="text-3xl font-semibold">
              A working answer is automatically an engineered solution.
            </h2>

            <div className="mt-6 space-y-5 text-base leading-8 text-zinc-400">
              <p>
                A request such as &quot;Build a CRUD API&quot; communicates a goal, but it leaves 
                many implementation decision unspecified.
              </p>

              <p>
                When working with an AI coding assistant, those missing details
                matter. The quality of the result depends not only on the
                model, but also on how clearly the engineering problem is
                communicated.
              </p>
              <p>
                That led to the central question behind this project:
              </p>
            </div>

            <blockquote className="mt-8 border-l border-zinc-700 pl-6 text-xl leading-8 text-zinc-300">
              What happens when you stop treating AI like a code generator and start treating it like an engineering collaborator?
            </blockquote>
          </div>
        </section>

        
        {/* Prompt ladder */}

  <section className="mt-24 border-t border-zinc-900 pt-12">
  <p className="text-sm font-medium uppercase tracking-[0.25em] text-zinc-600">
    03 · Prompt ladder
  </p>

  <div className="mt-6 max-w-3xl">
    <h2 className="text-3xl font-semibold">
      From a one-line request to a reusable engineering specification.
    </h2>

    <p className="mt-6 text-base leading-8 text-zinc-400">
      I progressively added context, structure, output expectations, and
      quality requirements to the prompt. Each version was designed to
      reduce ambiguity and make the expected implementation clearer.
    </p>
  </div>

  <div className="mt-12 space-y-0">
    {[
      {
        number: "01",
        title: "Baseline Prompt",
        label: "Weak",
        prompt: "Build a CRUD REST API in Go.",
        improvement:
          "The starting point was intentionally simple. The AI had the broad task, but many implementation decisions were left unspecified.",
      },
      {
        number: "02",
        title: "Add Clear Goal",
        label: "Version 1",
        prompt:
          "Build a CRUD REST API in Go that allows users to create, read, update, and delete tasks.",
        improvement:
          "The API now had a specific purpose instead of leaving the AI to infer what the CRUD resource should be.",
      },
      {
        number: "03",
        title: "Add Technology Stack",
        label: "Version 2",
        prompt:
          "Use Go, the standard net/http package, Gorilla Mux for routing, and in-memory storage.",
        improvement:
          "The implementation was constrained to the technologies I actually wanted rather than allowing the AI to choose frameworks.",
      },
      {
        number: "04",
        title: "Add Project Structure",
        label: "Version 3",
        prompt:
          "Organize the project into handlers, models, and main.go.",
        improvement:
          "The generated project followed a clearer organization, making the code easier to maintain.",
      },
      {
        number: "05",
        title: "Add Output Format",
        label: "Version 4",
        prompt:
          "Include complete source code, setup instructions, and Swagger documentation.",
        improvement:
          "The AI was no longer asked for code alone. The expected deliverables became explicit and consistent.",
      },
      {
        number: "06",
        title: "Add Quality Requirements",
        label: "Final reusable prompt",
        prompt:
          "Follow RESTful conventions, return proper HTTP status codes and JSON responses, document every endpoint, and follow Go best practices.",
        improvement:
          "The final prompt added quality expectations and produced an implementation much closer to the intended engineering standard.",
      },
    ].map((step) => (
      <article
        key={step.number}
        className="grid gap-6 border-t border-zinc-900 py-8 md:grid-cols-[70px_270px_1fr]"
      >
        <span className="text-sm text-zinc-600">
          {step.number}
        </span>

        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-medium text-white">
              {step.title}
            </h3>

            <span className="border border-zinc-800 px-2 py-1 text-[10px] uppercase tracking-wider text-zinc-500">
              {step.label}
            </span>
          </div>
        </div>

        <div>
          <div className="border border-zinc-900 bg-zinc-950 p-4">
            <p className="font-mono text-sm leading-7 text-zinc-300">
              {step.prompt}
            </p>
          </div>

          <p className="mt-4 text-sm leading-7 text-zinc-500">
            {step.improvement}
          </p>
        </div>
      </article>
    ))}
  </div>
  {/* Honest reflection */}
<section className="mt-24 border-t border-zinc-900 pt-12">
  <p className="text-sm font-medium uppercase tracking-[0.25em] text-zinc-600">
    04 · Honest reflection
  </p>

  <div className="mt-6 grid gap-10 md:grid-cols-[1fr_2fr]">
    <h2 className="text-3xl font-semibold">
      Not every prompt improvement produced the improvement I expected.
    </h2>

    <div className="space-y-6">
      <p className="text-base leading-8 text-zinc-400">
        One of the most useful observations came from Version 2. Simply
        specifying the programming language made the implementation
        Go-specific, but the generated project was still fairly generic.
      </p>

      <p className="text-base leading-8 text-zinc-400">
        The bigger improvement came from explaining how I wanted the project
        organized. Giving the AI structural context had a more noticeable
        effect on the maintainability of the generated solution.
      </p>

      <div className="border-l border-zinc-700 pl-6">
        <p className="text-lg leading-8 text-zinc-300">
          The lesson was not simply &quot;add more detail.&quot; The useful
          detail was the detail that reduced important engineering ambiguity.
        </p>
      </div>
    </div>
  </div>
</section>


       {/* Engineering outcome */}
<section className="mt-24 border-t border-zinc-900 pt-12">
  <p className="text-sm font-medium uppercase tracking-[0.25em] text-zinc-600">
    05 · Engineering outcome
  </p>

  <div className="mt-6 max-w-3xl">
    <h2 className="text-3xl font-semibold">
      The final prompt produced a more complete engineering deliverable.
    </h2>

    <p className="mt-6 text-base leading-8 text-zinc-400">
      The final reusable prompt moved beyond simply asking the AI to generate
      CRUD code. It defined the expected architecture, API behavior,
      documentation, setup instructions, and quality standards.
    </p>
  </div>

  <div className="mt-10 grid gap-4 md:grid-cols-2">
    {[
      {
        title: "RESTful conventions",
        description:
          "The API was expected to follow established REST conventions rather than simply exposing CRUD operations.",
      },
      {
        title: "HTTP status codes",
        description:
          "Responses were expected to use appropriate HTTP status codes for different API outcomes.",
      },
      {
        title: "JSON responses",
        description:
          "The API contract included consistent JSON responses rather than leaving response formatting unspecified.",
      },
      {
        title: "Swagger documentation",
        description:
          "Every endpoint was expected to have Swagger documentation as part of the deliverable.",
      },
      {
        title: "Project structure",
        description:
          "The implementation was organized into handlers, models, and main.go.",
      },
      {
        title: "Setup instructions",
        description:
          "The deliverable included instructions for getting the project running.",
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

  <div className="mt-10 border border-zinc-900 bg-zinc-950 p-6">
    <p className="text-sm uppercase tracking-[0.2em] text-zinc-600">
      Result
    </p>

    <p className="mt-4 text-lg leading-8 text-zinc-300">
      The final prompt generated code that was much closer to production
      quality and required considerably less editing.
    </p>
  </div>
</section>

{/* What I learned */}
<section className="mt-24 border-t border-zinc-900 pt-12">
  <p className="text-sm font-medium uppercase tracking-[0.25em] text-zinc-600">
    06 · What I learned
  </p>

  <div className="mt-6 max-w-3xl">
    <h2 className="text-3xl font-semibold">
      Better AI output starts with better engineering context.
    </h2>

    <p className="mt-6 text-base leading-8 text-zinc-400">
      This exercise changed how I think about prompting AI for software
      development. The goal is not simply to write a longer prompt. The goal
      is to provide the context that helps the AI understand the engineering
      problem clearly.
    </p>
  </div>

  <div className="mt-10 grid gap-4 md:grid-cols-3">
    <article className="border border-zinc-900 p-6">
      <p className="text-sm text-zinc-600">01</p>

      <h3 className="mt-4 font-medium text-white">
        Context
      </h3>

      <p className="mt-3 text-sm leading-7 text-zinc-500">
        Give the AI enough context to understand what is actually being
        built.
      </p>
    </article>

    <article className="border border-zinc-900 p-6">
      <p className="text-sm text-zinc-600">02</p>

      <h3 className="mt-4 font-medium text-white">
        Structure
      </h3>

      <p className="mt-3 text-sm leading-7 text-zinc-500">
        Define important project organization and implementation expectations
        instead of leaving them ambiguous.
      </p>
    </article>

    <article className="border border-zinc-900 p-6">
      <p className="text-sm text-zinc-600">03</p>

      <h3 className="mt-4 font-medium text-white">
        Quality
      </h3>

      <p className="mt-3 text-sm leading-7 text-zinc-500">
        Specify the output and quality requirements that determine whether the
        result is actually useful.
      </p>
    </article>
  </div>

  <div className="mt-10 border-l border-zinc-700 pl-6">
    <p className="text-lg leading-8 text-zinc-300">
      I learned that effective AI-assisted engineering is less about asking
      AI to write code and more about giving it a clear, reusable engineering
      specification.
    </p>
  </div>
</section>

         {/* Evidence */}
<section className="mt-24 border-t border-zinc-900 pt-12">
  <p className="text-sm font-medium uppercase tracking-[0.25em] text-zinc-600">
    07 · Evidence
  </p>

  <div className="mt-6 max-w-3xl">
    <h2 className="text-3xl font-semibold">
      Explore the implementation and the full story.
    </h2>

    <p className="mt-6 text-base leading-8 text-zinc-400">
      The case study summarizes the engineering thinking behind the project.
      The repository contains the implementation, while the Medium article
      documents the full Week 2 journey and prompt-engineering experiment.
    </p>
  </div>

  <div className="mt-10 grid gap-4 md:grid-cols-2">
    <a
      href="https://github.com/Nezzy-joe/task-api"
      target="_blank"
      rel="noopener noreferrer"
      className="group border border-zinc-900 p-6 transition hover:border-zinc-700"
    >
      <p className="text-sm uppercase tracking-[0.2em] text-zinc-600">
        Repository
      </p>

      <h3 className="mt-4 text-xl font-semibold text-white">
        Task API on GitHub
      </h3>

      <p className="mt-3 text-sm leading-7 text-zinc-500">
        Explore the Go implementation and project source code.
      </p>

      <span className="mt-6 inline-block text-sm font-medium text-white transition group-hover:text-zinc-400">
        View repository →
      </span>
    </a>

    <a
      href="https://medium.com/@nezzyjoe08/from-build-a-crud-api-to-an-engineered-prompt-my-week-2-journey-at-flyrank-ai-3995e0c42250"
      target="_blank"
      rel="noopener noreferrer"
      className="group border border-zinc-900 p-6 transition hover:border-zinc-700"
    >
      <p className="text-sm uppercase tracking-[0.2em] text-zinc-600">
        Article
      </p>

      <h3 className="mt-4 text-xl font-semibold text-white">
        Week 2 Journey on Medium
      </h3>

      <p className="mt-3 text-sm leading-7 text-zinc-500">
        Read the complete story behind the prompt ladder, model comparison,
        and lessons from the experiment.
      </p>

      <span className="mt-6 inline-block text-sm font-medium text-white transition group-hover:text-zinc-400">
        Read the article →
      </span>
    </a>
  </div>

  <div className="mt-10 flex flex-wrap gap-2">
    {["Go", "net/http", "Gorilla Mux", "REST API", "CRUD", "JSON"].map(
      (technology) => (
        <span
          key={technology}
          className="rounded-full bg-zinc-900 px-3 py-1.5 text-xs text-zinc-500"
        >
          {technology}
        </span>
      )
    )}
  </div>
</section>

        </section>

        </div>
    </main>
  );
}