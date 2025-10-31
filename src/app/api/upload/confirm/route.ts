import { db } from "@/db";
import { galleryImages } from "@/db/schema";
import { getUser } from "@/utils/supabase/server";
import { getSupabaseStorageClient } from "@/utils/supabase/storage";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(request: Request){
  try {
    //checking admin 
    const user = await getUser();
    if(!user || user.email !== process.env.ADMIN_EMAIL){
      return NextResponse.json({error: "Unauthorized admin access"}, {status: 401})
    }
    const {recordId, filePath} = await request.json();
    if(!recordId || !filePath){
      return NextResponse.json({error: "Missing required fileds"}, {status: 400})
    }
    //get public url for the uploaded file 
    const supabase = getSupabaseStorageClient();
    const {data} = supabase.storage.from('gallery-main').getPublicUrl(filePath);

    //update database record with actual image url 
    await db.update(galleryImages).set({imageUrl: data.publicUrl}).where(eq(galleryImages.id, recordId))
    return NextResponse.json({
      success: true,
      imageUrl: data.publicUrl
    });
  } catch (error) {
    console.error("Confirm upload error:", error);
    return NextResponse.json({error: "Internal server error:"},{status: 500})
  }
}