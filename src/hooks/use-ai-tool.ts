import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { runAI } from "@/lib/ai.functions";

type Tool = "email" | "summary" | "tasks" | "research" | "chat";

export function useAITool(tool: Tool) {
  const run = useServerFn(runAI);
  const [loading, setLoading] = useState(false);

  async function generate(prompt: string): Promise<string> {
    setLoading(true);
    try {
      const res = await run({
        data: { tool, messages: [{ role: "user", content: prompt }] },
      });
      return res.content;
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Something went wrong";
      toast.error(msg);
      return "";
    } finally {
      setLoading(false);
    }
  }

  return { generate, loading };
}
