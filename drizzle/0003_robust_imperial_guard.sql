ALTER TABLE "gallery_images" RENAME COLUMN "user_id" TO "uploaded_by";--> statement-breakpoint
ALTER TABLE "gallery_images" DROP CONSTRAINT "gallery_images_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "gallery_images" ADD COLUMN "category" varchar(50);--> statement-breakpoint
ALTER TABLE "gallery_images" ADD COLUMN "is_public" boolean DEFAULT true NOT NULL;--> statement-breakpoint
ALTER TABLE "gallery_images" ADD CONSTRAINT "gallery_images_uploaded_by_users_id_fk" FOREIGN KEY ("uploaded_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;