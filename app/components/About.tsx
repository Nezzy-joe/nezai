import Image from "next/image";
import Link from "next/link";
import { FaGithub, FaArrowRight, FaFilePdf } from "react-icons/fa";

export default function About() {
  return (
    <section
      id="about"
      className="border-t border-zinc-900 px-6 py-24 sm:py-28"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-14 lg:grid-cols-[320px_1fr] lg:items-start lg:gap-20">
          {/* Portrait */}
          <div className="flex justify-center lg:justify-start">
            <div className="relative">
              <div className="overflow-hidden rounded-full border border-zinc-800 bg-zinc-950 p-2 shadow-2xl shadow-black/40">
                <Image
                  src="/joseph-amos-ekpe.png"
                  alt="Joseph Amos Ekpe"
                  width={300}
                  height={300}
                  priority
                  className="h-64 w-64 rounded-full object-cover object-top sm:h-72 sm:w-72"
                />
              </div>

              <div className="absolute -bottom-2 -right-2 rounded-full border border-zinc-800 bg-black px-3 py-1.5 text-xs font-medium text-zinc-300">
                Backend · AI
              </div>
            </div>
          </div>

          {/* About content */}
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.3em] text-zinc-500">
              About
            </p>

            <h2 className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight text-white sm:text-5xl">
              Backend first.{" "}
              <span className="text-zinc-500">AI forward.</span>
            </h2>

            <div className="mt-8 max-w-3xl space-y-6 text-base leading-8 text-zinc-400">
              <p>
                I&apos;m Joseph Amos Ekpe, a backend engineer focused on
                building reliable backend systems and exploring practical ways
                to integrate AI into software products.
              </p>

              <p>
                My primary engineering focus is backend development with Go. I
                enjoy designing APIs, working with databases and
                authentication, and building services that are structured to
                be understandable, maintainable, and reliable.
              </p>

              <p>
                My AI engineering work has expanded my interest from simply
                building software to understanding how AI can become part of
                both the engineering workflow and the products themselves.
              </p>

              <p>
                I&apos;m continuously learning, building, testing ideas, and
                documenting what I learn as I work toward becoming a stronger
                backend engineer capable of building dependable AI-powered
                systems.
              </p>
            </div>

            {/* Actions */}
            <div className="mt-10 flex flex-wrap gap-3">
           <Link
    href="/#work"
    className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-medium text-black transition hover:bg-zinc-200"
  >
    View my work
    <FaArrowRight className="text-xs" />
  </Link>

              <a
    href="/Joseph_Amos_Ekpe_IT_Support_CV_1.pdf"
    download
    className="inline-flex items-center gap-2 rounded-full border border-zinc-700 px-5 py-3 text-sm font-medium text-white transition hover:border-zinc-500 hover:bg-zinc-900"
  >
    <FaFilePdf className="text-sm" />
    Download CV
  </a>

          <a
    href="https://github.com/Nezzy-joe"
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center gap-2 rounded-full border border-zinc-900 px-5 py-3 text-sm font-medium text-zinc-300 transition hover:border-zinc-700 hover:text-white"
  >
    <FaGithub className="text-base" />
    GitHub
  </a>
            </div>
          </div>
        </div>

        {/* Technical pillars */}
        <div className="mt-20 grid gap-px overflow-hidden border border-zinc-900 bg-zinc-900 sm:grid-cols-3">
          <div className="bg-black p-7">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-600">
              01
            </p>

            <h3 className="mt-4 text-lg font-medium text-white">
              Backend
            </h3>

            <p className="mt-3 text-sm leading-7 text-zinc-500">
              Go, REST APIs, PostgreSQL, authentication, middleware, testing,
              and service design.
            </p>
          </div>

          <div className="bg-black p-7">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-600">
              02
            </p>

            <h3 className="mt-4 text-lg font-medium text-white">
              AI Engineering
            </h3>

            <p className="mt-3 text-sm leading-7 text-zinc-500">
              Local LLM integration, AI-assisted development, prompt
              engineering, and practical AI applications.
            </p>
          </div>

          <div className="bg-black p-7">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-600">
              03
            </p>

            <h3 className="mt-4 text-lg font-medium text-white">
              Foundation
            </h3>

            <p className="mt-3 text-sm leading-7 text-zinc-500">
              Google IT Support certified with a practical background in
              technical support, systems operations, and troubleshooting.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}