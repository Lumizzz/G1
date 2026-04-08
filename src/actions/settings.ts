"use server";

import { createServerClientInstance } from "@/lib/supabase/server";

export async function getSiteSetting(key: string): Promise<Record<string, unknown> | null> {
  const supabase = await createServerClientInstance();
  const { data, error } = await supabase.from("site_settings").select("*").eq("key", key).single();
  if (error) return null;
  return data?.value as Record<string, unknown>;
}

export async function updateSiteSetting(key: string, value: Record<string, unknown>) {
  const supabase = await createServerClientInstance();
  // Upsert: update if exists, insert if not
  const { data: existing } = await supabase.from("site_settings").select("id").eq("key", key).single();

  let error;
  if (existing) {
    const { error: updateError } = await supabase.from("site_settings").update({ value }).eq("key", key);
    error = updateError;
  } else {
    const { error: insertError } = await supabase.from("site_settings").insert({ key, value });
    error = insertError;
  }

  if (error) return { success: false, error: error.message };
  return { success: true };
}