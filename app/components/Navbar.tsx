import Link from "next/link";
export default function Navbar() {
    return(
        <header className="border-b border-zinc-900">
            <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
                 
                 
              <Link  href="/" 
                className="text-sm font-semibold tracking-tight text-white" >
                    NezAI
                </Link>

                <div className="flex items-center gap-6 text-sm text-zinc-400">

                    <a href="#about" 
                    className="transition-colors hover:text-white"
                    
                    >
                        About
                    </a>

                    <a href="#work"
                    className="transition-colors hover:text-white"
                    
                    >
                        Work

                    </a>

                    <a href="#writing"
                    className="transition-colors hover:text-white"
                    
                    >
                        Writing

                    </a>

                    <a href="#agent"
                    className="rounded-full border border-zinc-700 px-4 py-2 text-white transition-colors hover:bg-zinc-900"
                    
                    >
                        AI Agent

                    </a>

                </div>
            </nav>

        </header>
    );
}