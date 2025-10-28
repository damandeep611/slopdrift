import { cookies } from "next/headers"
import {createServerClient} from '@supabase/ssr'


export const getUser = async ()=> {
  const auth = getSupabaseAuth();
  const user = (await auth.getUser()).data.user;
  return user;
}


export const getSupabaseAuth = ()=> {
  const cookieStorePromise = cookies();

  const supabaseClient = createServerClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies:{
        async getAll(){
          const cookieStore = await cookieStorePromise;
          return cookieStore.getAll();
        },
        async setAll(cookiesToSet){
          try{
            const cookieStore = await cookieStorePromise;
            cookiesToSet.forEach(({name, value, options})=>
            cookieStore.set(name, value, options)
            );
          }catch(error){
            console.error("Error in cookies supabase client:", error)
          }
        },
      }
    }
  );
  return supabaseClient.auth;
}