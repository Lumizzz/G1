import { NextRequest, NextResponse } from "next/server";
import { createServerClientInstance } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, history } = body;

    const supabase = await createServerClientInstance();
    const { data: configData } = await supabase
      .from("ai_config")
      .select("*")
      .eq("key", "visitor_system_prompt")
      .single();

    const systemPrompt =
      configData?.value?.prompt ||
      "You are Aria, a helpful AI assistant for Aetheria. You help visitors learn about our services, find the right information, and connect with our team. Be warm, professional, and concise.";

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({
        reply:
          "Thanks for your interest! Our AI assistant is being configured. Please reach out to hello@aetheria.app and our team will help you directly.",
      });
    }

    const messages = [
      { role: "system", content: systemPrompt },
      ...(history || []).map((m: { role: string; content: string }) => ({
        role: m.role,
        content: m.content,
      })),
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
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || "I'm here to help! What would you like to know?";

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Visitor chat error:", error);
    return NextResponse.json({
      reply: "I'm having trouble right now. Please try again or contact our team directly.",
    });
  }
}