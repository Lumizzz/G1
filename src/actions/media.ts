"use server";

import { createServerClientInstance } from "@/lib/supabase/server";

export async function uploadMedia(file: FormData) {
  const supabase = await createServerClientInstance();
  const uploadedFile = file.get("file") as File;
  if (!uploadedFile) return { success: false, error: "No file provided" };

  const fileName = `${Date.now()}-${uploadedFile.name.replace(/\s/g, "-")}`;
  const { data, error } = await supabase.storage.from("media").upload(fileName, uploadedFile, {
    cacheControl: "3600",
    upsert: false,
  });

  if (error) return { success: false, error: error.message };

  const { data: publicUrlData } = supabase.storage.from("media").getPublicUrl(fileName);
  const url = publicUrlData.publicUrl;

  const { data: mediaRecord, error: dbError } = await supabase.from("media").insert({
    file_name: uploadedFile.name,
    file_type: uploadedFile.type,
    file_size: uploadedFile.size,
    url,
    alt_text: "",
  }).select().single();

  if (dbError) return { success: false, error: dbError.message };

  return { success: true, data: mediaRecord };
}

export async function getMedia() {
  const supabase = await createServerClientInstance();
  const { data, error } = await supabase.from("media").select("*").order("created_at", { ascending: false });
  if (error) return { error: error.message, data: null };
  return { data, error: null };
}

export async function deleteMedia(id: number) {
  const supabase = await createServerClientInstance();
  const { data: mediaItem } = await supabase.from("media").select("url").eq("id", id).single();

  if (mediaItem?.url) {
    const match = mediaItem.url.match(/\/public\/(.+)$/);
    if (match) {
      await supabase.storage.from("media").remove([match[1]]);
    }
  }

  const { error } = await supabase.from("media").delete().eq("id", id);
  if (error) return { success: false, error: error.message };
  return { success: true };
}
