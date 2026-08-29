import Link from "next/link";

import About from "./components/About";
import NezAIChat from "./components/NezAIChat";
import Projects from "./components/Projects";
import Writing from "./components/Writing";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <section className="mx-auto flex min-h-[92vh] max-w-6xl items-center px-6 py-24">
        <div className="max-w-4xl">
          <p className="mb-6 text-xs font-medium uppercase tracking-[0.35em] text-zinc-600">
            Joseph Amos Ekpe · Backend AI Engineer
          </p>

          <h1 className="max-w-4xl text-5xl font-semibold tracking-tight sm:text-7xl lg:text-8xl">
            Building intelligent systems at the intersection of{" "}
            <span className="text-zinc-500">backend engineering</span> and AI.
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-8 text-zinc-400">
            I build reliable backend systems with Go and explore practical
            ways to integrate AI into software products.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/#work"
              className="rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition hover:bg-zinc-200"
            >
              View my work
            </Link>

            <Link
              href="/#agent"
              className="rounded-full border border-zinc-700 px-6 py-3 text-sm font-medium text-white transition hover:border-zinc-500 hover:bg-zinc-900"
            >
              Meet NezAI
            </Link>

            <a
              href="/Joseph_Amos_Ekpe_IT_Support_CV_1.pdf"
              download
              className="rounded-full border border-zinc-900 px-6 py-3 text-sm font-medium text-zinc-400 transition hover:border-zinc-700 hover:text-white"
            >
              Download CV
            </a>
          </div>

          <div className="mt-12 flex flex-wrap gap-x-6 gap-y-3 text-xs uppercase tracking-[0.2em] text-zinc-700">
            <span>Go</span>
            <span>PostgreSQL</span>
            <span>REST APIs</span>
            <span>AI</span>
            <span>Ollama</span>
          </div>
        </div>
      </section>

      <About />
      <Projects />
      <Writing />
      <NezAIChat />
      <Footer />
    </main>
  );
}