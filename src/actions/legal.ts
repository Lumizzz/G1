"use server";

import { createServerClientInstance } from "@/lib/supabase/server";

export async function getLegalPage(pageType: "privacy" | "terms" | "cookies") {
  const supabase = await createServerClientInstance();
  const { data, error } = await supabase
    .from("legal_pages")
    .select("*")
    .eq("page_type", pageType)
    .eq("is_active", true)
    .single();
  if (error) return null;
  return data;
}

export async function updateLegalPage(pageType: "privacy" | "terms" | "cookies", data: Record<string, unknown>) {
  const supabase = await createServerClientInstance();
  const { error } = await supabase.from("legal_pages").update({ ...data, updated_at: new Date().toISOString(), last_updated: new Date().toISOString() }).eq("page_type", pageType);
  if (error) return { success: false, error: error.message };
  return { success: true };
}
