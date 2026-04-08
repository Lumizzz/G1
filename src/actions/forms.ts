"use server";

import { createServerClientInstance } from "@/lib/supabase/server";

interface LeadFormData {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  message?: string;
  source?: string;
}

export async function createLead(data: LeadFormData) {
  try {
    const supabase = await createServerClientInstance();
    const { error } = await supabase.from("leads").insert({
      name: data.name,
      email: data.email,
      company: data.company || null,
      phone: data.phone || null,
      message: data.message || null,
      source: data.source || "website",
      status: "new",
    });

    if (error) {
      console.error("Lead creation error:", error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err) {
    console.error("Lead creation error:", err);
    return { success: false, error: "Failed to submit form" };
  }
}

export async function subscribeNewsletter(email: string) {
  try {
    const supabase = await createServerClientInstance();
    const { error } = await supabase.from("newsletter_subscribers").insert({
      email,
      is_confirmed: false,
    });

    if (error) {
      if (error.code === "23505") {
        return { success: false, error: "This email is already subscribed." };
      }
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err) {
    console.error("Newsletter subscription error:", err);
    return { success: false, error: "Failed to subscribe" };
  }
}
