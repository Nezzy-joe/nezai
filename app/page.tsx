

import Projects from "./components/Projects";
import About from "./components/About";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <section className="mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-6 py-20">
        <p className="mb-6 text-sm font-medium uppercase tracking-[0.3em] text-zinc-400">
          NezAI
        </p>

        <h1 className="max-w-4xl text-5xl font-semibold tracking-tight sm:text-7xl">
          Building intelligent systems at the intersection of{" "}
          <span className="text-zinc-400">backend engineering</span> and AI.
        </h1>

        <p className="mt-8 max-w-2xl text-lg leading-8 text-zinc-400">
          I&apos;m Joseph Amos Ekpe, a Backend AI Engineer focused on building
          reliable backend systems and exploring practical AI-powered products.
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <a
            href="#about"
            className="rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition hover:bg-zinc-200"
          >
            About me
          </a>

          <a
            href="#agent"
            className="rounded-full border border-zinc-700 px-6 py-3 text-sm font-medium text-white transition hover:bg-zinc-900"
          >
            Meet NezAI
          </a>
        </div>
      </section>

      <About />
      <Projects />
    </main>
  );
}