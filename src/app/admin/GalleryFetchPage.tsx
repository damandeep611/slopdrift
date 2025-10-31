"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type GalleryImage = {
  id: string;
  imageUrl: string;
  prompt: string;
  aiModel: string | null;
  category: string | null;
  createdAt: string;
};

export default function GalleryFetchPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchImages() {
      try {
        const response = await fetch("/api/gallery");
        const data = await response.json();
        setImages(data.images);
      } catch (error) {
        console.error("Failed to fetch images:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchImages();
  }, []);

  if (loading) {
    return <div className="p-8">Loading gallery...</div>;
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">AI Image Gallery</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((image) => (
          <div key={image.id} className="border rounded-lg overflow-hidden shadow-lg">
            <div className="relative h-64 w-full">
              <Image
                src={image.imageUrl}
                alt={image.prompt}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <p className="text-sm text-gray-600 mb-2">{image.prompt}</p>
              {image.aiModel && (
                <p className="text-xs text-gray-500">Model: {image.aiModel}</p>
              )}
              {image.category && (
                <p className="text-xs text-gray-500">Category: {image.category}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {images.length === 0 && (
        <p className="text-center text-gray-500">No images yet. Check back soon!</p>
      )}
    </div>
  );
}