"use server"

import { getSupabaseAuth } from "@/utils/supabase/server"
import { Provider } from "@supabase/supabase-js"
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const loginAction = async(provider: Provider)=> {
  try{
    const {data, error} = await getSupabaseAuth().signInWithOAuth({
      provider,
      options:{
        redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth`,
      },
    });
    if (error) throw error;
    return {errorMessage: null, url: data.url}
  }catch(error){
    return {errorMessage: "Error logging in", error}
  }
}


export const userLogoutAction = async ()=> {
  const supabase = getSupabaseAuth();
  await supabase.signOut();
  revalidatePath("/");
  redirect("/")
}