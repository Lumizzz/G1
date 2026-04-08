import { createServerClient as createClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { Database } from "@/types/database";

export async function createServerClientInstance() {
  const cookieStore = await cookies();

  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookieOptions: {
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
      } as CookieOptions,
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(_cookiesToSet) {
          // Cookies should be set via the middleware, not here.
          // Server components can't mutate the request cookie jar directly.
          // See src/lib/supabase/middleware.ts for proper cookie handling.
          try {
            _cookiesToSet.forEach(({ name, value, options }) => {
              // Only attempt to set if possible — usually a no-op in SAs
              cookieStore.set(name, value, options);
            });
          } catch {
            // Reading cookies in server components without ability to set
          }
        },
      },
    }
  );
}
