import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

export async function updateSession(request: NextRequest){
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // protected routes
  const protectedRoutes = ["/admin", "/profile", "/settings"];
  const adminRoutes = ["/admin/dashboard"];
  // user routes
  const isProtectedRoutes = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );
  // admin routes
  const isAdminRoute = adminRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

  //when accessing protected routes without auth
  if (!user && (isProtectedRoutes || isAdminRoute)) {
    const url = request.nextUrl.clone();
    url.pathname = "/auth";
    url.searchParams.set("next", request.nextUrl.pathname);
    return NextResponse.redirect(url);
  }

  // if user try to access admin route without admin access
  if (user && isAdminRoute && user.email !== process.env.ADMIN_EMAIL) {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }
  // redirect authenticated users away from auth and admin
  if (user && request.nextUrl.pathname.startsWith("/auth")) {
    const isAdmin = user.email === process.env.ADMIN_EMAIL;
    const url = request.nextUrl.clone();
    url.pathname = isAdmin ? "/admin/dashboard" : "/";
    return NextResponse.redirect(url);
  }
  return supabaseResponse;
}