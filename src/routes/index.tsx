import { createFileRoute, Link } from "@tanstack/react-router";
import { Mail, FileText, ListChecks, Search, MessageSquare, ArrowRight, Sparkles } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard — Workhub AI" },
      { name: "description", content: "Your AI productivity dashboard for email, meetings, tasks, research, and chat." },
    ],
  }),
  component: Dashboard,
});

const tools = [
  { url: "/email", title: "Smart Email Generator", desc: "Draft polished, on-tone emails in seconds.", icon: Mail },
  { url: "/meeting", title: "Meeting Notes Summarizer", desc: "Turn raw notes into structured summaries & action items.", icon: FileText },
  { url: "/tasks", title: "AI Task Planner", desc: "Get a prioritized plan from a goal or backlog.", icon: ListChecks },
  { url: "/research", title: "AI Research Assistant", desc: "Quick briefs, comparisons, and next questions.", icon: Search },
  { url: "/chat", title: "AI Chatbot", desc: "A conversational assistant for everything else.", icon: MessageSquare },
];

function Dashboard() {
  return (
    <div className="mx-auto w-full max-w-6xl p-6 md:p-10">
      <section className="relative overflow-hidden rounded-2xl border bg-gradient-surface p-8 shadow-soft md:p-12">
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-gradient-primary opacity-20 blur-3xl" />
        <div className="relative">
          <div className="inline-flex items-center gap-2 rounded-full border bg-background/70 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur">
            <Sparkles className="h-3 w-3 text-primary" />
            Powered by AI
          </div>
          <h1 className="mt-4 max-w-2xl text-3xl font-semibold leading-tight md:text-5xl">
            Your AI co-pilot for everyday work.
          </h1>
          <p className="mt-3 max-w-xl text-muted-foreground md:text-lg">
            Generate emails, summarize meetings, plan your day, and research topics — all in
            one clean workspace.
          </p>
          <Link
            to="/chat"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-gradient-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-glow transition hover:opacity-90"
          >
            Start chatting <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold">Tools</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((t) => (
            <Link
              key={t.url}
              to={t.url}
              className="group rounded-xl border bg-card p-5 shadow-soft transition hover:-translate-y-0.5 hover:shadow-glow"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-primary text-primary-foreground shadow-glow">
                <t.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-semibold">{t.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{t.desc}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-primary opacity-0 transition group-hover:opacity-100">
                Open <ArrowRight className="h-3 w-3" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <p className="mt-10 text-center text-xs text-muted-foreground">
        Workhub AI may produce inaccurate information. Review outputs before acting on them.
      </p>
    </div>
  );
}
