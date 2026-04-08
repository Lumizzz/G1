"use server";

import { createServerClientInstance } from "@/lib/supabase/server";

export async function getAiConfig(key: string) {
  const supabase = await createServerClientInstance();
  const { data, error } = await supabase.from("ai_config").select("*").eq("key", key).single();
  if (error) return null;
  return data?.value;
}

export async function updateAiConfig(key: string, value: Record<string, unknown>) {
  const supabase = await createServerClientInstance();
  const { error } = await supabase.from("ai_config").update({ value }).eq("key", key);
  if (error) return { success: false, error: error.message };
  return { success: true };
}

export async function chatWithVisitor(message: string, history: { role: string; content: string }[]) {
  try {
    const supabase = await createServerClientInstance();

    // Get visitor system prompt from database
    const { data: configData } = await supabase.from("ai_config")
      .select("*").eq("key", "visitor_system_prompt").single();

    const systemPrompt = configData?.value?.prompt || "You are a helpful AI assistant for Aetheria.";

    // Get welcome message
    const { data: welcomeData } = await supabase.from("ai_config")
      .select("*").eq("key", "visitor_welcome_message").single();

    const welcomeMessage = welcomeData?.value?.message;

    // If no API key configured, return fallback
    if (!process.env.OPENAI_API_KEY) {
      return {
        reply: "Thanks for your interest! Our AI assistant is being configured. Please reach out to hello@aetheria.app and our team will help you directly.",
        captureLead: true,
      };
    }

    const messages = [
      { role: "system" as const, content: systemPrompt },
      ...history.map((m) => ({ role: m.role as "user" | "assistant", content: m.content })),
      { role: "user" as const, content: message },
    ];

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || "gpt-4o",
        messages,
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      return { reply: "I'm having trouble right now. Please try again or contact our team directly.", captureLead: true };
    }

    const json = await response.json();
    const reply = json.choices?.[0]?.message?.content || "I'm here to help! What would you like to know?";

    return { reply, captureLead: false };
  } catch (err) {
    console.error("Visitor chat error:", err);
    return { reply: "Something went wrong. Please try again.", captureLead: true };
  }
}

export async function askAdminAssistant(message: string, history: { role: string; content: string }[]) {
  try {
    const supabase = await createServerClientInstance();

    const { data: configData } = await supabase.from("ai_config")
      .select("*").eq("key", "admin_system_prompt").single();

    const systemPrompt = configData?.value?.prompt || "You are an AI assistant helping the admin team with content creation and strategy.";

    if (!process.env.OPENAI_API_KEY) {
      return { reply: "AI assistant requires an API key. Please configure it in Settings > AI." };
    }

    const messages = [
      { role: "system" as const, content: systemPrompt },
      ...history.map((m) => ({ role: m.role as "user" | "assistant", content: m.content })),
      { role: "user" as const, content: message },
    ];

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || "gpt-4o",
        messages,
        temperature: 0.8,
        max_tokens: 1500,
      }),
    });

    if (!response.ok) {
      return { reply: "AI service is temporarily unavailable. Please try again." };
    }

    const json = await response.json();
    const reply = json.choices?.[0]?.message?.content || "I wasn't able to generate a response. Please try again.";

    return { reply };
  } catch (err) {
    console.error("Admin AI error:", err);
    return { reply: "Something went wrong. Please try again." };
  }
}
