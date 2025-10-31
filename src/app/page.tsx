import HomeHeader from "@/components/home/home-header";
import HomeGallery from "@/components/home/HomeGallery";
import { getUser } from "@/utils/supabase/server";
import GalleryFetchPage from "./admin/GalleryFetchPage";

export default async function Home() {
  const user = await getUser();
  return (
    <div>
      <HomeHeader user={user} />
      <GalleryFetchPage />
      <HomeGallery />
    </div>
  );
}
