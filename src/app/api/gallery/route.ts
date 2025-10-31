import { db } from "@/db";
import { galleryImages } from "@/db/schema";
import { and, desc, eq, notLike } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const images = await db
      .select()
      .from(galleryImages)
      .where(
        and(
          eq(galleryImages.isPublic, true),
          notLike(galleryImages.imageUrl, "pending-%")
        )
      )
      .orderBy(desc(galleryImages.createdAt));

    return NextResponse.json({ images });
  } catch (error) {
    console.error("Fetch images error:", error);
    return NextResponse.json(
      { error: "Failed to fetch images" },
      { status: 500 }
    );
  }
}
