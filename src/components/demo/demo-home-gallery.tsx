'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Home,
  Compass,
  FolderHeart,
  Sparkles,
  Settings,
  Search,
 
  User,
  Heart,
  ThumbsDown,
  Copy,
} from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ModeToggle } from '../theme/mode-toggle';

// Types
interface GalleryImage {
  id: string;
  url: string;
  prompt: string;
  promptSnippet: string;
  model: string;
  category: string;
  likes: number;
  isLiked: boolean;
  height: number;
}

// Mock Data - Manual Image Array
const mockImages: GalleryImage[] = [
  {
    id: '1',
    url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4',
    prompt: 'A cozy wooden cabin nestled in misty mountains during golden hour, surrounded by pine trees',
    promptSnippet: 'A cozy wooden cabin nestled in misty mountains...',
    model: 'Midjourney v6',
    category: 'Landscape',
    likes: 342,
    isLiked: false,
    height: 600,
  },
  {
    id: '2',
    url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e',
    prompt: 'Majestic mountain peaks covered in snow under a starlit sky',
    promptSnippet: 'Majestic mountain peaks covered in snow...',
    model: 'DALL-E 3',
    category: 'Nature',
    likes: 128,
    isLiked: false,
    height: 450,
  },
  {
    id: '3',
    url: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e',
    prompt: 'Ancient forest with rays of sunlight filtering through tall trees',
    promptSnippet: 'Ancient forest with rays of sunlight...',
    model: 'Stable Diffusion XL',
    category: 'Nature',
    likes: 891,
    isLiked: false,
    height: 700,
  },
  {
    id: '4',
    url: 'https://images.unsplash.com/photo-1426604966848-d7adac402bff',
    prompt: 'Serene lake reflecting mountains at sunset',
    promptSnippet: 'Serene lake reflecting mountains at sunset...',
    model: 'Midjourney v6',
    category: 'Landscape',
    likes: 456,
    isLiked: false,
    height: 500,
  },
  {
    id: '5',
    url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e',
    prompt: 'Misty forest path winding through autumn trees',
    promptSnippet: 'Misty forest path winding through autumn trees...',
    model: 'DALL-E 3',
    category: 'Fantasy',
    likes: 234,
    isLiked: false,
    height: 650,
  },
  {
    id: '6',
    url: 'https://images.unsplash.com/photo-1511497584788-876760111969',
    prompt: 'Crystal clear waterfall in tropical rainforest',
    promptSnippet: 'Crystal clear waterfall in tropical rainforest...',
    model: 'Stable Diffusion XL',
    category: 'Nature',
    likes: 567,
    isLiked: false,
    height: 550,
  },
  {
    id: '7',
    url: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05',
    prompt: 'Northern lights dancing over snowy landscape',
    promptSnippet: 'Northern lights dancing over snowy landscape...',
    model: 'Midjourney v6',
    category: 'Landscape',
    likes: 789,
    isLiked: false,
    height: 600,
  },
  {
    id: '8',
    url: 'https://images.unsplash.com/photo-1518623489648-a173ef7824f3',
    prompt: 'Enchanted forest with glowing mushrooms and fireflies',
    promptSnippet: 'Enchanted forest with glowing mushrooms...',
    model: 'DALL-E 3',
    category: 'Fantasy',
    likes: 923,
    isLiked: false,
    height: 480,
  },
  {
    id: '9',
    url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4',
    prompt: 'Dramatic cliff overlooking stormy ocean waves',
    promptSnippet: 'Dramatic cliff overlooking stormy ocean...',
    model: 'Stable Diffusion XL',
    category: 'Landscape',
    likes: 345,
    isLiked: false,
    height: 620,
  },
  {
    id: '10',
    url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e',
    prompt: 'Peaceful zen garden with cherry blossoms',
    promptSnippet: 'Peaceful zen garden with cherry blossoms...',
    model: 'Midjourney v6',
    category: 'Nature',
    likes: 456,
    isLiked: false,
    height: 530,
  },
  {
    id: '11',
    url: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e',
    prompt: 'Futuristic cityscape with neon lights at night',
    promptSnippet: 'Futuristic cityscape with neon lights...',
    model: 'DALL-E 3',
    category: 'Sci-Fi',
    likes: 678,
    isLiked: false,
    height: 580,
  },
  {
    id: '12',
    url: 'https://images.unsplash.com/photo-1426604966848-d7adac402bff',
    prompt: 'Desert dunes under starry night sky',
    promptSnippet: 'Desert dunes under starry night sky...',
    model: 'Stable Diffusion XL',
    category: 'Landscape',
    likes: 234,
    isLiked: false,
    height: 490,
  },
  {
    id: '13',
    url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e',
    prompt: 'Mystical castle on floating island in clouds',
    promptSnippet: 'Mystical castle on floating island...',
    model: 'Midjourney v6',
    category: 'Fantasy',
    likes: 890,
    isLiked: false,
    height: 670,
  },
  {
    id: '14',
    url: 'https://images.unsplash.com/photo-1511497584788-876760111969',
    prompt: 'Tropical beach with turquoise water and palm trees',
    promptSnippet: 'Tropical beach with turquoise water...',
    model: 'DALL-E 3',
    category: 'Nature',
    likes: 567,
    isLiked: false,
    height: 520,
  },
  {
    id: '15',
    url: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05',
    prompt: 'Snowy mountain village during winter evening',
    promptSnippet: 'Snowy mountain village during winter...',
    model: 'Stable Diffusion XL',
    category: 'Landscape',
    likes: 445,
    isLiked: false,
    height: 590,
  },
];

const navItems = [
  { id: 'home', label: 'Home', icon: Home, path: '/' },
  { id: 'explore', label: 'Explore', icon: Compass, path: '/explore' },
  { id: 'collections', label: 'Collections', icon: FolderHeart, path: '/collections' },
  { id: 'generate', label: 'Generate', icon: Sparkles, path: '/generate' },
];

export default function HomeGalleryPage() {
  const router = useRouter();
  const [activeNav, setActiveNav] = useState('home');
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);
  const [images, setImages] = useState<GalleryImage[]>(mockImages);

  const handleImageClick = (imageId: string) => {
    router.push(`/browse/${imageId}`);
  };

  const toggleLike = (imageId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setImages((prev) =>
      prev.map((img) =>
        img.id === imageId
          ? { ...img, isLiked: !img.isLiked, likes: img.isLiked ? img.likes - 1 : img.likes + 1 }
          : img
      )
    );
  };

  const copyPrompt = (prompt: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(prompt);
    // In production, show toast notification
  };

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 z-40 flex h-screen w-20 flex-col items-center border-r border-border bg-card py-6">
        {/* Logo/Brand */}
        <div className="mb-8 flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
          <Sparkles className="h-5 w-5" strokeWidth={1.5} />
        </div>

        {/* Navigation Items */}
        <nav className="flex flex-1 flex-col gap-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveNav(item.id)}
              className={`group flex flex-col items-center gap-1 rounded-xl px-4 py-3 transition-all ${
                activeNav === item.id
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:bg-secondary/50 hover:text-foreground'
              }`}
            >
              <item.icon
                className="h-5 w-5"
                strokeWidth={1.5}
              />
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Settings at Bottom */}
        <button className="group flex flex-col items-center gap-1 rounded-xl px-4 py-3 text-muted-foreground transition-all hover:bg-secondary/50 hover:text-foreground">
          <Settings className="h-5 w-5" strokeWidth={1.5} />
          <span className="text-[10px] font-medium">Settings</span>
        </button>
      </aside>

      {/* Main Content */}
      <main className="ml-20 flex-1">
        {/* Header */}
        <header className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur-sm">
          <div className="flex items-center justify-between px-6 py-4">
            {/* Search Bar */}
            <div className="flex flex-1 items-center gap-3 rounded-xl bg-secondary/50 px-4 py-2.5 max-w-xl">
              <Search className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
              <input
                type="text"
                placeholder="Search for AI images..."
                className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
              />
            </div>

            {/* Theme & Profile */}
            <div className="flex items-center gap-3">
              <ModeToggle/>
              <button className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <User className="h-4 w-4" strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </header>

        {/* Masonry Grid */}
        <div className="p-6">
          <div className="masonry-grid">
            {images.map((image, idx) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="masonry-item group relative cursor-pointer overflow-hidden rounded-xl"
                style={{ height: `${image.height}px` }}
                onMouseEnter={() => setHoveredImage(image.id)}
                onMouseLeave={() => setHoveredImage(null)}
                onClick={() => handleImageClick(image.id)}
              >
                <Image
                  src={image.url}
                  alt={image.promptSnippet}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />

                {/* Hover Overlay */}
                {hoveredImage === image.id && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 bg-linear-to-t from-overlay/90 via-overlay/40 to-transparent"
                  >
                    {/* Like & Dislike Buttons - Top Right */}
                    <div className="absolute right-3 top-3 flex gap-2">
                      <motion.button
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        onClick={(e) => toggleLike(image.id, e)}
                        className={`flex h-9 w-9 items-center justify-center rounded-lg backdrop-blur-md transition-all ${
                          image.isLiked
                            ? 'bg-destructive/90 text-destructive-foreground'
                            : 'bg-card/90 text-foreground hover:bg-card'
                        }`}
                      >
                        <Heart
                          className="h-4 w-4"
                          strokeWidth={1.5}
                          fill={image.isLiked ? 'currentColor' : 'none'}
                        />
                      </motion.button>
                      <motion.button
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.15 }}
                        className="flex h-9 w-9 items-center justify-center rounded-lg bg-card/90 text-foreground backdrop-blur-md hover:bg-card"
                      >
                        <ThumbsDown className="h-4 w-4" strokeWidth={1.5} />
                      </motion.button>
                    </div>

                    {/* Prompt Card - Bottom */}
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.1 }}
                      className="absolute bottom-0 left-0 right-0 p-4"
                    >
                      <div className="rounded-lg bg-card/95 p-3 backdrop-blur-md">
                        <p className="line-clamp-2 text-xs text-foreground/80">
                          {image.promptSnippet}
                        </p>
                        <div className="mt-2 flex items-center justify-between">
                          <span className="text-[10px] font-medium text-muted-foreground">
                            {image.model}
                          </span>
                          <button
                            onClick={(e) => copyPrompt(image.prompt, e)}
                            className="flex h-7 w-7 items-center justify-center rounded-md hover:bg-secondary/50"
                          >
                            <Copy className="h-3 w-3 text-muted-foreground" strokeWidth={1.5} />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      {/* Custom Masonry CSS */}
      <style jsx>{`
        .masonry-grid {
          column-count: 5;
          column-gap: 1rem;
        }

        @media (max-width: 1536px) {
          .masonry-grid {
            column-count: 4;
          }
        }

        @media (max-width: 1280px) {
          .masonry-grid {
            column-count: 3;
          }
        }

        @media (max-width: 768px) {
          .masonry-grid {
            column-count: 2;
          }
        }

        @media (max-width: 640px) {
          .masonry-grid {
            column-count: 1;
          }
        }

        .masonry-item {
          break-inside: avoid;
          margin-bottom: 1rem;
          position: relative;
        }
      `}</style>
    </div>
  );
}