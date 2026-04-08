"use server";

import { createServerClientInstance } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function login(formData: { email: string; password: string }) {
  try {
    const supabase = await createServerClientInstance();
    const { data, error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });

    if (error) {
      return { success: false, error: error.message };
    }

    if (data.user) {
      redirect("/admin");
    }

    return { success: true };
  } catch (err) {
    console.error("Login error:", err);
    return { success: false, error: "An unexpected error occurred" };
  }
}

export async function logout() {
  const supabase = await createServerClientInstance();
  await supabase.auth.signOut();
  redirect("/public/login");
}

export async function getCurrentUser() {
  const supabase = await createServerClientInstance();
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) return null;

  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single();
  return profile;
}

export async function getSession() {
  const supabase = await createServerClientInstance();
  const { data: { session } } = await supabase.auth.getSession();
  return session;
}
