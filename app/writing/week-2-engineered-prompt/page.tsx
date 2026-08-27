export default function Week2Article() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-24">
      <header>
        <p className="text-sm font-medium uppercase tracking-[0.25em] text-zinc-600">
          Engineering · Week 2
        </p>

        <h1 className="mt-6 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          From &quot;Build a CRUD API&quot; to an Engineered Prompt
        </h1>

        <p className="mt-6 text-lg leading-8 text-zinc-400">
          How I moved from giving an AI coding assistant a simple request to
          treating it as an engineering collaborator.
        </p>
      </header>

      <div className="mt-16 space-y-12 text-base leading-8 text-zinc-400">
        <section>
          <p>
            During Week 2 of my backend engineering work, I used a CRUD API
            assignment as an experiment in AI-assisted engineering.
          </p>

          <p className="mt-6">
            The goal was not simply to get an AI system to generate code. I
            wanted to understand what happens when the AI is given enough
            engineering context to produce a more deliberate implementation.
          </p>
        </section>

        <section>
          <p className="text-sm font-medium uppercase tracking-[0.25em] text-zinc-600">
            The starting point
          </p>

          <h2 className="mt-4 text-2xl font-semibold text-white">
            A simple request
          </h2>

          <div className="mt-6 border border-zinc-900 bg-zinc-950 p-6 font-mono text-sm text-zinc-300">
            Build a CRUD REST API in Go.
          </div>

          <p className="mt-6">
            The request communicates a broad goal, but leaves many engineering
            decisions unspecified. The implementation could vary considerably
            depending on the assumptions made by the AI.
          </p>
        </section>

        <section>
          <p className="text-sm font-medium uppercase tracking-[0.25em] text-zinc-600">
            The prompt ladder
          </p>

          <h2 className="mt-4 text-2xl font-semibold text-white">
            Adding engineering context
          </h2>

          <p className="mt-6">
            I progressively refined the request by adding context, technical
            constraints, structure, output expectations, and quality
            requirements.
          </p>

          <div className="mt-8 space-y-4">
            <div className="border border-zinc-900 p-5">
              <h3 className="font-medium text-white">01 · Clear goal</h3>
              <p className="mt-2 text-sm">
                Define exactly what the API should accomplish.
              </p>
            </div>

            <div className="border border-zinc-900 p-5">
              <h3 className="font-medium text-white">
                02 · Technical context
              </h3>
              <p className="mt-2 text-sm">
                Specify the technologies and constraints that should guide the
                implementation.
              </p>
            </div>

            <div className="border border-zinc-900 p-5">
              <h3 className="font-medium text-white">
                03 · Define the structure
              </h3>
              <p className="mt-2 text-sm">
                Give the AI clearer expectations about how the solution should
                be organised.
              </p>
            </div>

            <div className="border border-zinc-900 p-5">
              <h3 className="font-medium text-white">
                04 · Specify the output
              </h3>
              <p className="mt-2 text-sm">
                Make the expected result explicit instead of leaving important
                implementation decisions open.
              </p>
            </div>

            <div className="border border-zinc-900 p-5">
              <h3 className="font-medium text-white">
                05 · Treat the prompt as a specification
              </h3>
              <p className="mt-2 text-sm">
                Move beyond simply asking for code and provide enough context
                for the AI to reason about the engineering task.
              </p>
            </div>
          </div>
        </section>

        <section>
          <p className="text-sm font-medium uppercase tracking-[0.25em] text-zinc-600">
            What changed
          </p>

          <h2 className="mt-4 text-2xl font-semibold text-white">
            The prompt became part of the engineering process
          </h2>

          <p className="mt-6">
            The experiment changed how I think about AI-assisted development.
            The quality of an AI-generated implementation depends heavily on
            the quality of the engineering context provided to the model.
          </p>

          <blockquote className="mt-8 border-l border-zinc-700 pl-6 text-lg text-zinc-300">
            Effective AI-assisted engineering is less about asking AI to write
            code and more about giving it a clear, reusable engineering
            specification.
          </blockquote>
        </section>

        <section>
          <p className="text-sm font-medium uppercase tracking-[0.25em] text-zinc-600">
            The lesson
          </p>

          <h2 className="mt-4 text-2xl font-semibold text-white">
            AI can accelerate implementation, but it does not remove
            responsibility
          </h2>

          <p className="mt-6">
            Generated code still needs to be inspected, tested, understood,
            and evaluated by the engineer. The role of the engineer is not
            removed by using AI; the engineer becomes responsible for directing
            and validating the implementation.
          </p>
        </section>

        <footer className="border-t border-zinc-900 pt-8">
          <p className="text-sm text-zinc-600">
            Written as part of my Week 2 AI-assisted engineering experiment.
          </p>
        </footer>
      </div>
    </main>
  );
}