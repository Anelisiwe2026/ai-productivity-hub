import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const GATEWAY_URL = "https://ai.gateway.lovable.dev/v1/chat/completions";

const SYSTEM_PROMPTS: Record<string, string> = {
  email:
    "You are a professional email writing assistant. Generate clear, well-structured, polite business emails. Output ONLY the email (subject + body) in markdown. Use a Subject: line first, then the body. Keep tone professional unless told otherwise.",
  summary:
    "You are an expert meeting notes summarizer. Given raw meeting notes or a transcript, produce a structured markdown summary with these sections: ## Overview, ## Key Discussion Points, ## Decisions, ## Action Items (as a checklist with owners if mentioned), ## Next Steps.",
  tasks:
    "You are an AI task planner for busy professionals. Given a goal or workload description, produce a prioritized markdown plan: ## Goals, ## Prioritized Tasks (numbered, with priority High/Med/Low and estimated time), ## Suggested Schedule (today / this week), ## Potential Blockers.",
  research:
    "You are a research assistant. Provide a concise, well-structured markdown brief: ## Summary, ## Key Points (bulleted), ## Considerations / Trade-offs, ## Suggested Next Questions. Be factual, neutral, and note when information may be outdated or uncertain.",
  chat:
    "You are a helpful, friendly AI workplace productivity assistant. Be concise, accurate, and format responses in markdown when useful.",
};

const messageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string().min(1).max(8000),
});

export const runAI = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      tool: z.enum(["email", "summary", "tasks", "research", "chat"]),
      messages: z.array(messageSchema).min(1).max(40),
    }),
  )
  .handler(async ({ data }) => {
    const apiKey = process.env.LOVABLE_API_KEY;
    if (!apiKey) throw new Error("LOVABLE_API_KEY is not configured");

    const res = await fetch(GATEWAY_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: SYSTEM_PROMPTS[data.tool] },
          ...data.messages,
        ],
      }),
    });

    if (!res.ok) {
      if (res.status === 429) {
        throw new Error("Rate limit reached. Please try again in a moment.");
      }
      if (res.status === 402) {
        throw new Error(
          "AI credits exhausted. Please add credits to your Lovable workspace.",
        );
      }
      const text = await res.text();
      console.error("AI gateway error", res.status, text);
      throw new Error("AI request failed. Please try again.");
    }

    const json = await res.json();
    const content: string =
      json.choices?.[0]?.message?.content ?? "No response generated.";
    return { content };
  });
