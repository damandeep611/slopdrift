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
        getAll(){
          return request.cookies.getAll();
        },
        setAll(cookiesToSet){
          cookiesToSet.forEach(({name, value, options})=> 
          request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({name, value, options})=> 
          supabaseResponse.cookies.set(name, value,options)
          );
        },
      },
    }
  );

  const {
    data: {user},
  } = await supabase.auth.getUser();

  // protected routes 
  const protectedRoutes = ["/admin", "/profile", '/settings', '/admin/dashboard'];
  const isProtectedRoutes = protectedRoutes.some(route => request.nextUrl.pathname.startsWith(route))
  if(
     !user && isProtectedRoutes
  ){
   const url = request.nextUrl.clone();
   url.pathname = "/auth";
   url.searchParams.set("next", request.nextUrl.pathname);
   return NextResponse.redirect(url)
  }
  if(user && request.nextUrl.pathname.startsWith("/auth")){
    const url  = request.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url)

  }
  return supabaseResponse
}