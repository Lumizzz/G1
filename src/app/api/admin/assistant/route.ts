import { NextRequest, NextResponse } from "next/server";
import { createServerClientInstance } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, history, context } = body;

    const supabase = await createServerClientInstance();
    const { data: configData } = await supabase
      .from("ai_config")
      .select("*")
      .eq("key", "admin_system_prompt")
      .single();

    let systemPrompt =
      configData?.value?.prompt ||
      "You are an AI writing and strategy assistant for the Aetheria admin team. Help generate compelling copy, create SEO-friendly content, brainstorm marketing angles, and improve communication. Be direct, creative, and actionable.";

    if (context?.contentType) {
      systemPrompt += `\n\nContext: The user is working on a ${context.contentType} called "${context.title || ""}."`;
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({
        reply: "AI assistant requires an API key. Please configure it in Settings > AI.",
      });
    }

    const messages = [
      { role: "system", content: systemPrompt },
      ...(history || []).map((m: { role: string; content: string }) => ({ role: m.role, content: m.content })),
      { role: "user", content: message },
    ];

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || "gpt-4o",
        messages,
        temperature: 0.8,
        max_tokens: 1500,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || "I couldn't generate a response. Please try again.";

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Admin AI error:", error);
    return NextResponse.json({ reply: "Something went wrong. Please try again." });
  }
}
