
"use client";

import { useEffect, useRef, useState } from "react";

type Message = {
  id: number;
  role: "user" | "assistant";
  content: string;
  time: string;
};

const suggestions = [
  { label: "Projects", text: "Show me all projects" },
  { label: "CRM System", text: "Sales CRM System project" },
  { label: "Skills", text: "Show me all technologies and skills" },
  { label: "Experience", text: "Tell me about Amit's experience" },
  { label: "AI Work", text: "Tell me about Amit's AI work" },
  { label: "Contact", text: "How can I contact Amit?" },
  { label: "Education", text: "Tell me about Amit's education" },
  { label: "Services", text: "What services does Amit provide?" },
  { label: "Next.js", text: "Tell me everything about Next.js" },
  { label: "Gemini", text: "Tell me everything about Gemini" },
];

const technologyLinks = [
  "Next.js",
  "TypeScript",
  "Node.js",
  "MongoDB",
  "Socket.io",
  "React",
  "AI API",
  "Charts",
  "Tailwind",
  "Gemini",
];

const projectLinks = [
  "Sales CRM System",
  "AI Analytics Dashboard",
  "3D E-Commerce Storefront",
  "NoteFlow",
  "Amit.dev Portfolio",
  "Travel Discovery UI",
];

function formatTime(date: Date) {
  return date.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function getTechnologyPrompt(name: string) {
  return `${name} ke baare mein Amit ke portfolio ke according complete detailed information batao`;
}

function getProjectPrompt(name: string) {
  return `${name} project ke baare mein complete detailed information batao`;
}

export default function AIPortfolioPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: "assistant",
      content:
        "Hi! I'm Amit's AI Portfolio Assistant. Ask me about his projects, technologies, experience, education, services or contact details.",
      time: "",
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setInput(e.target.value);
  };

  async function sendMessage(customPrompt?: string) {
    const prompt = (customPrompt ?? input).trim();

    if (!prompt || loading) return;

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        role: "user",
        content: prompt,
        time: formatTime(new Date()),
      },
    ]);

    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: prompt,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error || "Something went wrong."
        );
      }

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          role: "assistant",
          content:
            data?.reply ||
            "Sorry, I couldn't generate a response.",
          time: formatTime(new Date()),
        },
      ]);
    } catch (error) {
      console.error(error);

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 2,
          role: "assistant",
          content:
            "Sorry, something went wrong. Please try again.",
          time: formatTime(new Date()),
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function renderClickableText(text: string) {
    const allLinks = [...technologyLinks, ...projectLinks];

    const sortedLinks = [...allLinks].sort(
      (a, b) => b.length - a.length
    );

    const regex = new RegExp(
      `(${sortedLinks.map(escapeRegExp).join("|")})`,
      "gi"
    );

    const parts = text.split(regex);

    return parts.map((part, index) => {
      const match = allLinks.find(
        (item) => item.toLowerCase() === part.toLowerCase()
      );

      if (!match) {
        return <span key={index}>{part}</span>;
      }

      const isProject = projectLinks.some(
        (project) =>
          project.toLowerCase() === match.toLowerCase()
      );

      return (
        <button
          key={index}
          type="button"
          onClick={() =>
            sendMessage(
              isProject
                ? getProjectPrompt(match)
                : getTechnologyPrompt(match)
            )
          }
          className="
            mx-0.5
            rounded-md
            px-1
            font-semibold
            text-violet-600
            underline
            underline-offset-2
            hover:bg-violet-100
            dark:text-violet-300
            dark:hover:bg-violet-500/10
          "
        >
          {part}
        </button>
      );
    });
  }

  function renderAssistantMessage(content: string) {
    const lines = content.split("\n");

    return (
      <div className="space-y-2 text-sm leading-6">
        {lines.map((line, index) => {
          const trimmed = line.trim();

          if (!trimmed) {
            return <div key={index} className="h-1" />;
          }

          if (trimmed.startsWith("### ")) {
            return (
              <h4
                key={index}
                className="pt-2 font-bold text-black dark:text-white"
              >
                {renderClickableText(
                  trimmed.replace("### ", "")
                )}
              </h4>
            );
          }

          if (trimmed.startsWith("## ")) {
            return (
              <h3
                key={index}
                className="pt-2 text-base font-bold text-black dark:text-white"
              >
                {renderClickableText(
                  trimmed.replace("## ", "")
                )}
              </h3>
            );
          }

          if (
            trimmed.startsWith("- ") ||
            trimmed.startsWith("* ")
          ) {
            return (
              <div
                key={index}
                className="flex items-start gap-2"
              >
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-500" />

                <div>
                  {renderClickableText(trimmed.slice(2))}
                </div>
              </div>
            );
          }

          if (/^\d+\.\s/.test(trimmed)) {
            const match = trimmed.match(/^(\d+)\.\s(.*)$/);

            return (
              <div
                key={index}
                className="flex items-start gap-2"
              >
                <span className="font-semibold text-violet-500">
                  {match?.[1]}.
                </span>

                <div>
                  {renderClickableText(
                    match?.[2] ?? trimmed
                  )}
                </div>
              </div>
            );
          }

          return (
            <p key={index}>
              {renderClickableText(trimmed)}
            </p>
          );
        })}
      </div>
    );
  }

  return (
    <main
      className="
        min-h-screen
        bg-[#f7f7fb]
        px-4
        py-8
        text-black
        dark:bg-[#08080d]
        dark:text-white
        sm:px-6
        lg:px-8
        
      "
    >
      <div className="mx-auto max-w-6xl">
        {/* Heading */}
        <br />
        <br />
        <br />
        <br />
        <div className="mb-6 text-center">
          <div
            className="
              mb-3
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-violet-200
              bg-white
              px-4
              py-2
              text-xs
              font-semibold
              text-violet-600
              dark:border-violet-500/20
              dark:bg-white/[0.04]
              dark:text-violet-300
            "
          >
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
            AI Portfolio Assistant
          </div>

          <h1 className="text-3xl font-black sm:text-4xl lg:text-5xl">
            Talk to{" "}
            <span className="bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
              Amit's AI
            </span>
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-sm text-black/50 dark:text-white/50 sm:text-base">
            Explore projects, technologies, experience,
            education and services.
          </p>
        </div>

        {/* Chat */}
        <div
          className="
            mx-auto
            flex
            h-[600px]
            w-full
            max-w-4xl
            min-h-0
            flex-col
            overflow-hidden
            rounded-3xl
            border
            border-black/10
            bg-white
            shadow-xl
            dark:border-white/10
            dark:bg-[#101016]
            sm:h-[620px]
          "
        >
          {/* Header */}
          <div
            className="
              flex
              h-[70px]
              shrink-0
              items-center
              justify-between
              border-b
              border-black/10
              px-4
              dark:border-white/10
              sm:px-6
            "
          >
            <div className="flex items-center gap-3">
              <div
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-2xl
                  bg-gradient-to-br
                  from-violet-600
                  to-fuchsia-500
                  text-sm
                  font-black
                  text-white
                "
              >
                AI
              </div>

              <div>
                <div className="text-sm font-bold">
                  Amit's Portfolio AI
                </div>

                <div className="flex items-center gap-1.5 text-[11px] text-black/40 dark:text-white/40">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  Online
                </div>
              </div>
            </div>

            <span className="hidden rounded-full border border-black/10 px-3 py-1.5 text-[10px] text-black/40 dark:border-white/10 dark:text-white/40 sm:block">
              Gemini AI
            </span>
          </div>

          {/* Messages */}
          <div
            className="
              min-h-0
              flex-1
              overflow-y-auto
              px-3
              py-4
              sm:px-5
              sm:py-5
            "
          >
            <div className="space-y-4">
              {messages.map((message) => {
                const isUser = message.role === "user";

                return (
                  <div
                    key={message.id}
                    className={`flex ${
                      isUser
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div
                      className={`
                        max-w-[88%]
                        rounded-2xl
                        px-4
                        py-3
                        text-sm
                        sm:max-w-[78%]
                        ${
                          isUser
                            ? "rounded-br-md bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white"
                            : "rounded-bl-md border border-black/10 bg-[#f7f7fa] text-black dark:border-white/10 dark:bg-white/[0.05] dark:text-white"
                        }
                      `}
                    >
                      {isUser ? (
                        <p className="whitespace-pre-wrap leading-6">
                          {message.content}
                        </p>
                      ) : (
                        renderAssistantMessage(
                          message.content
                        )
                      )}

                      {message.time && (
                        <div
                          className={`
                            mt-2
                            text-[9px]
                            ${
                              isUser
                                ? "text-white/55"
                                : "text-black/30 dark:text-white/25"
                            }
                          `}
                        >
                          {message.time}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}

              {loading && (
                <div className="flex justify-start">
                  <div className="rounded-2xl rounded-bl-md border border-black/10 bg-[#f7f7fa] px-4 py-3 dark:border-white/10 dark:bg-white/[0.05]">
                    <div className="flex gap-1.5">
                      <span className="h-2 w-2 animate-bounce rounded-full bg-violet-500 [animation-delay:-0.3s]" />
                      <span className="h-2 w-2 animate-bounce rounded-full bg-violet-500 [animation-delay:-0.15s]" />
                      <span className="h-2 w-2 animate-bounce rounded-full bg-violet-500" />
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Quick prompts */}
          <div
            className="
              h-[68px]
              shrink-0
              overflow-x-auto
              border-t
              border-black/10
              px-3
              py-3
              dark:border-white/10
              sm:px-5
            "
          >
            <div className="flex min-w-max gap-2">
              {suggestions.map((suggestion) => (
                <button
                  key={suggestion.label}
                  type="button"
                  disabled={loading}
                  onClick={() =>
                    sendMessage(suggestion.text)
                  }
                  className="
                    rounded-full
                    border
                    border-black/10
                    px-3
                    py-1.5
                    text-[11px]
                    font-semibold
                    text-black/60
                    hover:border-violet-300
                    hover:bg-violet-50
                    hover:text-violet-600
                    disabled:opacity-50
                    dark:border-white/10
                    dark:text-white/50
                    dark:hover:bg-violet-500/10
                    dark:hover:text-violet-300
                  "
                >
                  {suggestion.label}
                </button>
              ))}
            </div>
          </div>

          {/* Input */}
          <div
            className="
              h-[76px]
              shrink-0
              border-t
              border-black/10
              p-3
              dark:border-white/10
              sm:p-4
            "
          >
            <div
              className="
                flex
                h-[50px]
                items-center
                gap-2
                rounded-2xl
                border
                border-black/10
                bg-[#fafafa]
                px-3
                dark:border-white/10
                dark:bg-white/[0.03]
              "
            >
              <textarea
                value={input}
                onChange={handleInputChange}
                onKeyDown={(e) => {
                  if (
                    e.key === "Enter" &&
                    !e.shiftKey
                  ) {
                    e.preventDefault();
                    sendMessage();
                  }
                }}
                placeholder="Ask about Amit..."
                rows={1}
                disabled={loading}
                className="
                  !h-[40px]
                  !min-h-[40px]
                  !max-h-[40px]
                  flex-1
                  resize-none
                  overflow-y-auto
                  border-0
                  bg-transparent
                  py-2
                  text-sm
                  outline-none
                  placeholder:text-black/30
                  dark:placeholder:text-white/25
                "
              />

              <button
                type="button"
                onClick={() => sendMessage()}
                disabled={!input.trim() || loading}
                className="
                  flex
                  h-10
                  w-10
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  bg-gradient-to-r
                  from-violet-600
                  to-fuchsia-500
                  text-white
                  disabled:cursor-not-allowed
                  disabled:opacity-40
                "
              >
                ➤
              </button>
            </div>
          </div>
        </div>

        <p className="mt-4 text-center text-[10px] text-black/30 dark:text-white/25">
          Click highlighted projects and technologies for
          detailed information.
        </p>
      </div>
    </main>
  );
}
