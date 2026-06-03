import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail } from "lucide-react";
import { AIToolShell } from "@/components/ai-tool-shell";
import { useAITool } from "@/hooks/use-ai-tool";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const Route = createFileRoute("/email")({
  head: () => ({ meta: [{ title: "Smart Email Generator — Workhub AI" }] }),
  component: EmailPage,
});

function EmailPage() {
  const [input, setInput] = useState("");
  const [tone, setTone] = useState("professional");
  const [output, setOutput] = useState("");
  const { generate, loading } = useAITool("email");

  const onRun = async () => {
    const prompt = `Tone: ${tone}\n\nWrite an email for the following situation:\n${input}`;
    const r = await generate(prompt);
    if (r) setOutput(r);
  };

  return (
    <AIToolShell
      title="Smart Email Generator"
      description="Describe the situation, recipient, and goal. The AI will draft a polished email you can edit."
      icon={<Mail className="h-6 w-6 text-primary-foreground" />}
      inputLabel="What's the email about?"
      inputPlaceholder="e.g. Follow up with a client after a demo, asking for next steps and proposing a meeting next week."
      cta="Generate Email"
      input={input} setInput={setInput}
      output={output} setOutput={setOutput}
      loading={loading} onRun={onRun}
      extra={
        <div className="flex items-center gap-2">
          <label className="text-xs text-muted-foreground">Tone:</label>
          <Select value={tone} onValueChange={setTone}>
            <SelectTrigger className="h-8 w-40 bg-background"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="professional">Professional</SelectItem>
              <SelectItem value="friendly">Friendly</SelectItem>
              <SelectItem value="concise">Concise</SelectItem>
              <SelectItem value="persuasive">Persuasive</SelectItem>
              <SelectItem value="apologetic">Apologetic</SelectItem>
            </SelectContent>
          </Select>
        </div>
      }
    />
  );
}
