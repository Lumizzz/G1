import { createServerClientInstance } from "@/lib/supabase/server";

export async function getSeoByPageKey(pageKey: string) {
  const supabase = await createServerClientInstance();
  const { data, error } = await supabase.from("seo_settings").select("*").eq("page_key", pageKey).single();
  if (error) return null;
  return data;
}

export async function updateSeo(pageKey: string, data: Record<string, unknown>) {
  const supabase = await createServerClientInstance();
  const { data: existing } = await supabase.from("seo_settings").select("id").eq("page_key", pageKey).single();
  let error;
  if (existing) {
    const { error: updateError } = await supabase.from("seo_settings").update(data).eq("page_key", pageKey);
    error = updateError;
  } else {
    const { error: insertError } = await supabase.from("seo_settings").insert({ page_key: pageKey, ...data });
    error = insertError;
  }
  if (error) return { success: false, error: error.message };
  return { success: true };
}
