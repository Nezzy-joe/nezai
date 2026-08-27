import Link from "next/link";

const articles = [
  {
    title: 'From "Build a CRUD API" to an Engineered Prompt',
    description:
      "My Week 2 journey at FlyRank AI, exploring how a vague coding request can be transformed into a structured engineering prompt.",
    type: "Engineering",
    href: "/writing/week-2-engineered-prompt",
  },
];

export default function Writing() {
  return (
    <section
      id="writing"
      className="border-t border-zinc-900 px-6 py-24"
    >
      <div className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-zinc-600">
            Writing
          </p>

          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white">
            Notes from the engineering journey.
          </h2>

          <p className="mt-5 text-base leading-8 text-zinc-400">
            Writing about backend engineering, AI-assisted development,
            lessons learned, and the process behind building real systems.
          </p>
        </div>

        <div className="mt-12">
          {articles.map((article) => (
            <article
              key={article.title}
              className="group border border-zinc-900 p-6 transition-colors hover:border-zinc-700"
            >
              <p className="text-xs uppercase tracking-[0.2em] text-zinc-600">
                {article.type}
              </p>

              <h3 className="mt-4 text-xl font-medium text-white">
                {article.title}
              </h3>

              <p className="mt-3 max-w-2xl text-sm leading-7 text-zinc-500">
                {article.description}
              </p>

              <Link
                href={article.href}
                className="mt-6 inline-block text-sm text-white transition-colors hover:text-zinc-400"
              >
                Read article →
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}