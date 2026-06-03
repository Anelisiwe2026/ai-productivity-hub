import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ListChecks } from "lucide-react";
import { AIToolShell } from "@/components/ai-tool-shell";
import { useAITool } from "@/hooks/use-ai-tool";

export const Route = createFileRoute("/tasks")({
  head: () => ({ meta: [{ title: "AI Task Planner — Workhub AI" }] }),
  component: TasksPage,
});

function TasksPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const { generate, loading } = useAITool("tasks");

  const onRun = async () => {
    const r = await generate(`Create a prioritized plan for this:\n\n${input}`);
    if (r) setOutput(r);
  };

  return (
    <AIToolShell
      title="AI Task Planner"
      description="Describe your goal or workload. Get a prioritized plan with time estimates and a suggested schedule."
      icon={<ListChecks className="h-6 w-6 text-primary-foreground" />}
      inputLabel="What do you need to get done?"
      inputPlaceholder="e.g. Ship the Q3 marketing campaign by Friday: landing page, 3 emails, social posts, and analytics setup."
      cta="Plan Tasks"
      input={input} setInput={setInput}
      output={output} setOutput={setOutput}
      loading={loading} onRun={onRun}
    />
  );
}
