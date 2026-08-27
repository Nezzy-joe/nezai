
"use client";

import { FormEvent, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function NezAIChat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedMessage = message.trim();

    if (!trimmedMessage || loading) {
      return;
    }

    setMessages((current) => [
      ...current,
      {
        role: "user",
        content: trimmedMessage,
      },
    ]);

    setMessage("");
    setLoading(true);

    try {
   const apiURL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080";

const response = await fetch(`${apiURL}/api/v1/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: trimmedMessage,
        }),
      });

      if (!response.ok) {
        throw new Error("Backend request failed");
      }

      const data = await response.json();

      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content: data.response,
        },
      ]);
    } catch (error) {
      console.error(error);

      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content:
            "I couldn't connect to the NezAI backend. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section
      id="agent"
      className="border-t border-zinc-900 px-6 py-24"
    >
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-zinc-500">
            Personal Agent
          </p>

          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Meet NezAI.
          </h2>

          <p className="mt-5 text-base leading-7 text-zinc-400">
            Ask questions about my engineering work, projects, backend
            experience, and the systems I&apos;m building.
          </p>
        </div>

        <div className="mt-12 overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950">
          <div className="min-h-[420px] space-y-6 p-6">
            {messages.length === 0 && (
              <div className="flex min-h-[360px] items-center justify-center text-center text-sm text-zinc-600">
                Ask NezAI something about Joseph&apos;s engineering work.
              </div>
            )}

            {messages.map((item, index) => (
              <div
                key={`${item.role}-${index}`}
                className={
                  item.role === "user"
                    ? "ml-auto max-w-3xl rounded-2xl bg-white px-5 py-4 text-sm leading-7 text-black"
                    :  "w-full rounded-2xl border border-zinc-800 bg-zinc-900/60 px-5 py-4 text-sm leading-7 text-zinc-300"
                }
              >
                {item.role === "assistant" ? (
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      h1: ({ children }) => (
                        <h1 className="mb-4 mt-2 text-2xl font-semibold text-white">
                          {children}
                        </h1>
                      ),

                      h2: ({ children }) => (
                        <h2 className="mb-3 mt-6 text-xl font-semibold text-white">
                          {children}
                        </h2>
                      ),

                      h3: ({ children }) => (
                        <h3 className="mb-2 mt-5 text-lg font-semibold text-white">
                          {children}
                        </h3>
                      ),

                      p: ({ children }) => (
                        <p className="mb-4 leading-7 last:mb-0">
                          {children}
                        </p>
                      ),

                      ul: ({ children }) => (
                        <ul className="mb-5 list-disc space-y-2 pl-6">
                          {children}
                        </ul>
                      ),

                      ol: ({ children }) => (
                        <ol className="mb-5 list-decimal space-y-2 pl-6">
                          {children}
                        </ol>
                      ),

                      li: ({ children }) => (
                        <li className="pl-1">{children}</li>
                      ),

                      strong: ({ children }) => (
                        <strong className="font-semibold text-white">
                          {children}
                        </strong>
                      ),

                      em: ({ children }) => (
                        <em className="italic text-zinc-200">
                          {children}
                        </em>
                      ),

                      blockquote: ({ children }) => (
                        <blockquote className="my-4 border-l-2 border-zinc-600 pl-4 italic text-zinc-400">
                          {children}
                        </blockquote>
                      ),

                      hr: () => (
                        <hr className="my-6 border-zinc-800" />
                      ),

                      code: ({ children, className }) => {
                        const isBlock = Boolean(
                          className?.includes("language-")
                        );

                        if (isBlock) {
                          return (
                            <code
                              className={`block overflow-x-auto font-mono text-sm text-zinc-300 ${className}`}
                            >
                              {children}
                            </code>
                          );
                        }

                        return (
                          <code className="rounded-md border border-zinc-800 bg-black px-1.5 py-0.5 font-mono text-[0.9em] text-zinc-200">
                            {children}
                          </code>
                        );
                      },

                      pre: ({ children }) => (
                        <pre className="my-5 overflow-x-auto rounded-xl border border-zinc-800 bg-black p-4">
                          {children}
                        </pre>
                      ),

                      a: ({ children, href }) => (
                        <a
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white underline underline-offset-4 hover:text-zinc-300"
                        >
                          {children}
                        </a>
                      ),

                      table: ({ children }) => (
                        <div className="my-5 overflow-x-auto">
                          <table className="w-full border-collapse text-sm">
                            {children}
                          </table>
                        </div>
                      ),

                      th: ({ children }) => (
                        <th className="border border-zinc-800 bg-zinc-900 px-3 py-2 text-left font-semibold text-white">
                          {children}
                        </th>
                      ),

                      td: ({ children }) => (
                        <td className="border border-zinc-800 px-3 py-2 text-zinc-300">
                          {children}
                        </td>
                      ),
                    }}
                  >
                    {item.content}
                  </ReactMarkdown>
                ) : (
                  item.content
                )}
              </div>
            ))}

            {loading && (
              <div className="flex w-full items-center gap-2 rounded-2xl border border-zinc-800 bg-zinc-900/60 px-5 py-4 text-sm text-zinc-500">
                <span>NezAI is thinking</span>
                <span className="animate-pulse">...</span>
              </div>
            )}
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex gap-3 border-t border-zinc-800 p-4"
          >
            <input
              type="text"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Ask NezAI..."
              disabled={loading}
              className="flex-1 rounded-xl border border-zinc-800 bg-black px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-zinc-600 disabled:opacity-50"
            />

            <button
              type="submit"
              disabled={loading || !message.trim()}
              className="rounded-xl bg-white px-5 py-3 text-sm font-medium text-black transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {loading ? "Thinking..." : "Send"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
