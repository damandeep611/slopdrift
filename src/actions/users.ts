"use server"

import { db } from "@/db";
import { users } from "@/db/schema";
import { getSupabaseAuth, getUser } from "@/utils/supabase/server";
import { Provider } from "@supabase/supabase-js";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const loginAction = async (provider: Provider) => {
  try {
    const { data, error } = await getSupabaseAuth().signInWithOAuth({
      provider,
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth`,
      },
    });
    if (error) throw error;
    return { errorMessage: null, url: data.url };
  } catch (error) {
    return { errorMessage: "Error logging in", error };
  }
};

export async function createOrUpdateUserProfile() {
  const supabaseUser = await getUser();
  if (!supabaseUser) {
    return { error: "Not authenticated" };
  }
  //create user profile for new users
  try {
    //check if user exits
    const existingUser = await db.query.users.findFirst({
      where: eq(users.id, supabaseUser.id),
    });
    //determine role based on admin email
    const isAdmin = supabaseUser.email === process.env.ADMIN_EMAIL;
    const role = isAdmin ? "admin" : "user";
    if (existingUser) {
      //update existing user in case of role change
      await db
        .update(users)
        .set({
          name:
            supabaseUser.user_metadata?.full_name ||
            supabaseUser.email?.split("@")[0],
          avatarUrl: supabaseUser.user_metadata?.avatar_url,
          role: role, //update role if admin email changes
        })
        .where(eq(users.id, supabaseUser.id));

      return { user: existingUser, isNewUser: false };
    } else {
      //creating user is not existing user exits
      const [newUser] = await db
        .insert(users)
        .values({
          id: supabaseUser.id,
          email: supabaseUser.email!,
          name:
            supabaseUser.user_metadata?.full_name ||
            supabaseUser.email?.split("@")[0],
          avatarUrl: supabaseUser.user_metadata?.avatar_url,
          role: role,
        })
        .returning();
      return { user: newUser, isNewUser: true };
    }
  } catch (error) {
    console.error("Error creating/updating User", error);
    return { error: "Failed to create user Profile" };
  }
}



export const userLogoutAction = async ()=> {
  const supabase = getSupabaseAuth();
  await supabase.signOut();
  revalidatePath("/");
  redirect("/")
}