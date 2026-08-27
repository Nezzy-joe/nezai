import Link from "next/link";
import {
  FaGithub,
  FaLinkedin,
  FaFilePdf,
  FaArrowUp,
} from "react-icons/fa";
import {
  SiGo,
  SiNextdotjs,
  SiOllama,
  SiPostgresql,
  SiReact,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-900 px-6 py-14">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="text-sm font-semibold text-white">
              Joseph Amos Ekpe
            </p>

            <p className="mt-2 max-w-sm text-sm leading-6 text-zinc-600">
              Backend engineering, AI engineering, and practical systems.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-4 text-sm text-zinc-500">
            <Link
              href="/#work"
              className="transition-colors hover:text-white"
            >
              Work
            </Link>

            <Link
              href="/#writing"
              className="transition-colors hover:text-white"
            >
              Writing
            </Link>

            <Link
              href="/#agent"
              className="transition-colors hover:text-white"
            >
              NezAI
            </Link>

            <a
              href="/joseph-amos-ekpe-cv.pdf"
              download
              className="inline-flex items-center gap-2 transition-colors hover:text-white"
            >
              <FaFilePdf className="text-xs" />
              CV
            </a>

            <a
              href="https://github.com/Nezzy-joe"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 transition-colors hover:text-white"
              aria-label="GitHub"
            >
              <FaGithub className="text-base" />
              GitHub
            </a>

            <a
              href="https://www.linkedin.com/in/joseph-amos-ekpe-4ab791181/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 transition-colors hover:text-white"
              aria-label="LinkedIn"
            >
              <FaLinkedin className="text-base" />
              LinkedIn
            </a>
          </div>
        </div>

        <div className="mt-12 border-t border-zinc-950 pt-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-700">
                Built with
              </p>

              <div className="mt-4 flex flex-wrap items-center gap-5">
                <span className="inline-flex items-center gap-2 text-sm text-zinc-500">
                  <SiNextdotjs className="text-base text-zinc-400" />
                  Next.js
                </span>

                <span className="inline-flex items-center gap-2 text-sm text-zinc-500">
                  <SiReact className="text-base text-zinc-400" />
                  React
                </span>

                <span className="inline-flex items-center gap-2 text-sm text-zinc-500">
                  <SiTypescript className="text-base text-zinc-400" />
                  TypeScript
                </span>

                <span className="inline-flex items-center gap-2 text-sm text-zinc-500">
                  <SiTailwindcss className="text-base text-zinc-400" />
                  Tailwind
                </span>

                <span className="inline-flex items-center gap-2 text-sm text-zinc-500">
                  <SiGo className="text-base text-zinc-400" />
                  Go
                </span>

                <span className="inline-flex items-center gap-2 text-sm text-zinc-500">
                  <SiPostgresql className="text-base text-zinc-400" />
                  PostgreSQL
                </span>

                <span className="inline-flex items-center gap-2 text-sm text-zinc-500">
                  <SiOllama className="text-base text-zinc-400" />
                  Ollama
                </span>
              </div>
            </div>

            <Link
              href="/"
              className="inline-flex items-center gap-2 self-start text-xs uppercase tracking-[0.18em] text-zinc-700 transition-colors hover:text-white"
            >
              Back to top
              <FaArrowUp className="text-[10px]" />
            </Link>
          </div>
        </div>

        <div className="mt-10 border-t border-zinc-950 pt-6">
          <div className="flex flex-col gap-2 text-xs text-zinc-700 sm:flex-row sm:items-center sm:justify-between">
            <p>© {new Date().getFullYear()} Joseph Amos Ekpe</p>
            <p>Built as part of the FlyRank Backend AI Engineering journey.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}