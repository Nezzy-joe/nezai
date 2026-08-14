export default function About() {
    return (
 <section
        id="about"
        className="border-t border-zinc-900 px-6 py-24" >
       
      <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[1fr_1.5fr]">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-zinc-500">
            About
          </p>

          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Backend first. AI forward.
          </h2>
        </div>

           <div className="space-y-6 text-base leading-8 text-zinc-400">
            <p>
                I&apos;m Joseph Amos Ekpe, a Backend AI Engineer focused on building reliable backend systems and exploring practical ways to integrate AI into software products.
            </p>

            <p>
                My primary engineering focus is backend development with Go. I enjoy designing APIs, working with database, authentication, and building services that are structured to be understandable,maintainable, and reliable.
            </p>

            <p>
                My AI engineering work has expanded my interest from simply building software to understanding how AI can become part of the engineering workflow and the product themselves.
            </p>

            <p>
                I&apos;m continuously learning,building,testing ideas, and documenting what i learn as i work toward becoming a stronger backend engineer capable of building dependable AI-powered systems.
            </p>


            <div className="grid gap-6 border-t border-zinc-900 pt-8 sm:grid-cols-3">
                <div>
                    <h3 className="font-medium text-white">Backend</h3>
                    <p className="mt-2 text-sm leading-6 text-zinc-500">GO, REST APIs, PostgreSQL, authentication</p>
                </div>


            <div>
                <h3 className="font-medium text-white">AI Engineering</h3>
                <p className="mt-2 text-sm leading-6 text-zinc-500">
                    LLMs, AI-assisted development, AI applications
                </p>
            </div>

            <div>
                <h3 className="font-medium text-white">Foundation</h3>
                <p className="mt-2 text-sm leading-6 text-zinc-500">Google IT Support Certified</p>
            </div>


            </div>

           </div>
           
           </div>

        </section>
    );
}