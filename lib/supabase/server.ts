import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

export async function createClient(options?: { serviceRole?: boolean }) {
  const cookieStore = await cookies()

  // Use service role key if requested (bypasses RLS for public data access)
  const key = options?.serviceRole ? process.env.SUPABASE_SERVICE_ROLE_KEY! : process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

  return createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, key, {
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options))
        } catch {
          // setAll called from Server Component - ignore if middleware handles cookies
        }
      },
    },
  })
}
