import { createOrUpdateUserProfile } from "@/actions/users";
import { getSupabaseAuth } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  let next = searchParams.get("next") ?? "/";
  if (!next.startsWith("/")) {
    next = "/";
  }
  if (code) {
    const supabase = getSupabaseAuth();
    const { data, error } = await supabase.exchangeCodeForSession(code);
    if (!error && data.user) {
      //creating/updating user profile in database
      const result = await createOrUpdateUserProfile();
      if (result.error) {
        console.error("Failed to create User profile:", result.error);
        return NextResponse.redirect(`${origin}/error`);
      }
      //redirecting based on role
      const isAdmin = data.user.email === process.env.ADMIN_EMAIL;
      const redirectPath = isAdmin ? "/admin/dashboard" : next;
      const forwardedHost = request.headers.get("x-forwarded-host");
      const isLocalEnv = process.env.NODE_ENV === "development";
      if (isLocalEnv) {
        return NextResponse.redirect(`${origin}${redirectPath}`);
      } else if (forwardedHost) {
        return NextResponse.redirect(`https://${forwardedHost}${redirectPath}`);
      } else {
        return NextResponse.redirect(`${origin}${redirectPath}`);
      }
    }
  }
  return NextResponse.redirect(`${origin}/auth`);
}
