import { getSupabaseAuth } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request){
  const {searchParams, origin} = new URL(request.url)
  const code = searchParams.get("code");
  let next = searchParams.get("next") ?? "/";
  if(!next.startsWith("/")){
    next  = "/"
  }
  if(code){
    const supabase = getSupabaseAuth();
    const {data, error} = await supabase.exchangeCodeForSession(code);
    if(!error && data.user){
      const forwardedHost = request.headers.get("x-forwarded-host");
      const isLocalEnv = process.env.NODE_ENV === "development";
      if(isLocalEnv){
        return NextResponse.redirect(`${origin}${next}`);
      }else if(forwardedHost){
        return NextResponse.redirect(`https://${forwardedHost}${next}`);
      }else{
        return NextResponse.redirect(`${origin}${next}`)
      }
    }
  }
  return NextResponse.redirect(`${origin}/auth`)
}