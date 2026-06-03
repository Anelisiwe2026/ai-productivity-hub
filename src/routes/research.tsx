import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search } from "lucide-react";
import { AIToolShell } from "@/components/ai-tool-shell";
import { useAITool } from "@/hooks/use-ai-tool";

export const Route = createFileRoute("/research")({
  head: () => ({ meta: [{ title: "AI Research Assistant — Workhub AI" }] }),
  component: ResearchPage,
});

function ResearchPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const { generate, loading } = useAITool("research");

  const onRun = async () => {
    const r = await generate(`Research brief on:\n\n${input}`);
    if (r) setOutput(r);
  };

  return (
    <AIToolShell
      title="AI Research Assistant"
      description="Ask a question or describe a topic. Get a concise brief with key points and next questions."
      icon={<Search className="h-6 w-6 text-primary-foreground" />}
      inputLabel="What do you want to research?"
      inputPlaceholder="e.g. Compare top customer support platforms for a 50-person B2B SaaS company."
      cta="Research"
      input={input} setInput={setInput}
      output={output} setOutput={setOutput}
      loading={loading} onRun={onRun}
    />
  );
}
