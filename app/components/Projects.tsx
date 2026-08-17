
const projects = [
    {
        number: "01",
        title: "Task API",
        description:
            "A GO-based CRUD REST API built as part of an AI-assisted engineering experiment. The project explores how progressively engineered prompts can influence the structure and quality of generated backend implementations.",
            stack: ["Go", "net/http", "REST API", "JSON"],
            status: "Completed",
            href: "https://github.com/Nezzy-joe/task-api",


    },
    {
        number: "02",
        title: "School Management System",
        description: 
        "A Go and PostgreSQL backend application featuring JWT authentication, middleware, protected API routes, and modules for managing students, results, admissions, classes, and fees. ",
        stack: ["Go", "PostgreSQL", "JWT", "REST API"],
        status: "Built",
        href: "https://github.com/Nezzy-joe/school-system",
    },
    {
        number: "03",
        title: "NezAI",
        description:
        "An AI-powered personal engineering platform designed to combine a professional portfolio with a personal AI agent. The project is being built to explore practical AI integration alongside backend engineering",
        stack: ["Next.js", "TypeScript", "Tailwind CSS", "AI"],
        status: "Building",
        href: "https://github.com/Nezzy-joe/nezai"
    },
];

export default function Project() {
    return (
        <section id="work" className="border-t border-zinc-900 px-6 py-24">
            <div className="mx-auto max-w-6xl">
                <div className="max-w-2xl">

                    <p className="text-sm font-medium uppercase tracking-[0.3em] text-zinc-500">
                        Selected Work
                    </p>

                    <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                        Engineering Projects
                    </h2>
                    
                    <p className="mt-5 text-base leading-7 text-zinc-400">
                        A selection of backend and AI engineering projects that document how i build, learn, and reason through problems. 
                    </p>
                </div>


                <div className="mt-16 divide-y divide-zinc-900 border-y border-zinc-900">
                    {projects.map((project) => (

                        <article
                        key={project.number}
                        className="grid gap-8 py-10 md:grid-cols-[80px_1fr_auto] md:items-start">
                            <span className="text-sm font-medium text-zinc-600">
                                {project.number}
                            </span>

                            <div>
                                <div className="flex flex-wrap items-center gap-3">
                                    <h3 className="text-2xl font-semibold text-white">
                                        {project.title}
                                    </h3>

                                    <span className="rounded-ful border border-zinc-800 px-3 py-1 text-xs text-zinc-500">
                                        {project.status}
                                    </span>
                                </div>


                                <p className="mt-4 max-w-2xl text-base leading-7 text-zinc-400">
                                    {project.description}
                                </p>

                                <div className="mt-6 flex flex-wrap gap-2">
                                    {project.stack.map((technology) => (
                                        <span 
                                        key={technology}
                                        className="rounded-full bg-zinc-900 px-3 py-1.5 text-xs text-zinc-400"
                                        >
                                            {technology}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {project.href && (
                                <a 
                                href={project.href}
                                target={project.href.startsWith("http") ? "_blank" : undefined}
                                rel={
                                    project.href.startsWith("http")
                                    ? "noopener noreferrer"
                                    : undefined
                                }
                                className="text-sm font-medium text-white transition hover:text-zinic-400"
                                >
                                    view project →
                                </a>
                            )}

                        </article>

                    ))}

                </div>

            </div>

        </section>
    );
}