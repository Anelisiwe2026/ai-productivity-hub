import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { FileText } from "lucide-react";
import { AIToolShell } from "@/components/ai-tool-shell";
import { useAITool } from "@/hooks/use-ai-tool";

export const Route = createFileRoute("/meeting")({
  head: () => ({ meta: [{ title: "Meeting Notes Summarizer — Workhub AI" }] }),
  component: MeetingPage,
});

function MeetingPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const { generate, loading } = useAITool("summary");

  const onRun = async () => {
    const r = await generate(`Summarize these meeting notes:\n\n${input}`);
    if (r) setOutput(r);
  };

  return (
    <AIToolShell
      title="Meeting Notes Summarizer"
      description="Paste raw notes or a transcript. Get a structured summary with decisions and action items."
      icon={<FileText className="h-6 w-6 text-primary-foreground" />}
      inputLabel="Meeting notes or transcript"
      inputPlaceholder="Paste your raw meeting notes here…"
      cta="Summarize"
      input={input} setInput={setInput}
      output={output} setOutput={setOutput}
      loading={loading} onRun={onRun}
    />
  );
}
