#!/usr/bin/env tsx

import { createServerClientInstance } from "./lib/supabase/server";

async function main() {
  console.log("Seeding database...");

  const supabase = await createServerClientInstance();

  // This script assumes schema is already applied via supabase/schema.sql
  // You can run additional seed data here if needed

  console.log("Database seeding complete!");
  console.log("Remember to:");
  console.log("1. Create Supabase storage buckets: media, logos, avatars (all public)");
  console.log("2. Visit /admin to log in and manage content");
  console.log("3. Configure AI settings in Admin Dashboard");
}

main().catch(console.error);