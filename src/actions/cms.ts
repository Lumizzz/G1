"use server";

import { createServerClientInstance } from "@/lib/supabase/server";
import type { Json } from "@/types/database";

// HERO
export async function getHero() {
  const supabase = await createServerClientInstance();
  const { data, error } = await supabase.from("hero").select("*").single();
  if (error) return null;
  return data;
}

export async function updateHero(data: Record<string, unknown>) {
  const supabase = await createServerClientInstance();
  const { error } = await supabase.from("hero").update(data).eq("id", 1);
  if (error) return { success: false, error: error.message };
  return { success: true };
}

// SECTIONS
export async function getSections() {
  const supabase = await createServerClientInstance();
  const { data, error } = await supabase.from("sections").select("*").order("display_order");
  if (error) return [];
  return data;
}

export async function updateSection(id: number, data: Record<string, unknown>) {
  const supabase = await createServerClientInstance();
  const { error } = await supabase.from("sections").update(data).eq("id", id);
  if (error) return { success: false, error: error.message };
  return { success: true };
}

// FEATURES
export async function getFeatures() {
  const supabase = await createServerClientInstance();
  const { data, error } = await supabase.from("features").select("*").where("is_visible", "eq", true).order("display_order");
  if (error) return [];
  return data;
}

// SERVICES
export async function getServices() {
  const supabase = await createServerClientInstance();
  const { data, error } = await supabase.from("services").select("*").where("is_visible", "eq", true).order("display_order");
  if (error) return [];
  return data;
}

// PRICING
export async function getPricingPlans() {
  const supabase = await createServerClientInstance();
  const { data, error } = await supabase.from("pricing_plans").select("*").where("is_visible", "eq", true).order("display_order");
  if (error) return [];
  return data;
}

// FAQS
export async function getFaqs() {
  const supabase = await createServerClientInstance();
  const { data, error } = await supabase.from("faqs").select("*").where("is_visible", "eq", true).order("display_order");
  if (error) return [];
  return data;
}

// TESTIMONIALS
export async function getTestimonials() {
  const supabase = await createServerClientInstance();
  const { data, error } = await supabase.from("testimonials").select("*").where("is_visible", "eq", true).order("display_order");
  if (error) return [];
  return data;
}

// BLOG
export async function getPublishedBlogPosts() {
  const supabase = await createServerClientInstance();
  const { data, error } = await supabase.from("blog_posts").select("*").eq("status", "published").order("published_at", { ascending: false });
  if (error) return [];
  return data;
}

export async function getBlogPostBySlug(slug: string) {
  const supabase = await createServerClientInstance();
  const { data, error } = await supabase.from("blog_posts").select("*, profiles(full_name)").eq("slug", slug).eq("status", "published").single();
  if (error) return null;
  return data;
}

// CASE STUDIES
export async function getVisibleCaseStudies() {
  const supabase = await createServerClientInstance();
  const { data, error } = await supabase.from("case_studies").select("*").eq("is_visible", true).order("created_at", { ascending: false });
  if (error) return [];
  return data;
}

export async function getCaseStudyBySlug(slug: string) {
  const supabase = await createServerClientInstance();
  const { data, error } = await supabase.from("case_studies").select("*").eq("slug", slug).eq("is_visible", true).single();
  if (error) return null;
  return data;
}

// NAVIGATION
export async function getNavigation() {
  const supabase = await createServerClientInstance();
  const { data, error } = await supabase.from("navigation").select("*").where("is_visible", true).order("display_order");
  if (error) return [];
  return data;
}

// LEGAL
export async function getLegalPage(pageType: "privacy" | "terms" | "cookies") {
  const supabase = await createServerClientInstance();
  const { data, error } = await supabase.from("legal_pages").select("*").eq("page_type", pageType).eq("is_active", true).single();
  if (error) return null;
  return data;
}

// SEO
export async function getSeoByPageKey(pageKey: string) {
  const supabase = await createServerClientInstance();
  const { data, error } = await supabase.from("seo_settings").select("*").eq("page_key", pageKey).single();
  if (error) return null;
  return data;
}

// SITE SETTINGS
export async function getSiteSetting(key: string) {
  const supabase = await createServerClientInstance();
  const { data, error } = await supabase.from("site_settings").select("*").eq("key", key).single();
  if (error) return null;
  return data?.value as Json;
}

// GENERIC CRUD for admin
export async function getAllRows(table: string) {
  const supabase = await createServerClientInstance();
  const { data, error } = await supabase.from(table).select("*").order("created_at", { ascending: false });
  if (error) return { error: error.message, data: null };
  return { data, error: null };
}

export async function insertRow(table: string, data: Record<string, unknown>) {
  const supabase = await createServerClientInstance();
  const { error } = await supabase.from(table).insert(data);
  if (error) return { success: false, error: error.message };
  return { success: true };
}

export async function updateRow(table: string, id: number | string, data: Record<string, unknown>) {
  const supabase = await createServerClientInstance();
  const { error } = await supabase.from(table).update(data).eq("id", id);
  if (error) return { success: false, error: error.message };
  return { success: true };
}

export async function deleteRow(table: string, id: number | string) {
  const supabase = await createServerClientInstance();
  const { error } = await supabase.from(table).delete().eq("id", id);
  if (error) return { success: false, error: error.message };
  return { success: true };
}
