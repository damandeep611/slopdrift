"use client"
import React, { useState } from 'react';
import { Home, Compass, Bookmark, Sparkles, Settings, Sun, User, Heart, ThumbsDown, Download, MoreHorizontal, Copy, Check, Search } from 'lucide-react';
import { Image, mockImages } from './demo-image-data';
import { ModeToggle } from '../theme/mode-toggle';




interface Category {
  id: string;
  name: string;
  image: string;
  count: number;
}

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

interface MasonryCardProps {
  image: Image;
  onClick: () => void;
  isLiked: boolean;
  isDisliked: boolean;
  onLike: () => void;
  onDislike: () => void;
}

interface DetailViewProps {
  image: Image;
  categories: Category[];
  discoveryImages: Image[];
  onImageClick: (image: Image) => void;
  onCopyPrompt: (prompt: string) => void;
  copiedPrompt: boolean;
  isLiked: boolean;
  isDisliked: boolean;
  onLike: () => void;
  onDislike: () => void;
}


const mockCategories: Category[] = [
  { id: 'cat1', name: 'Landscapes', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop', count: 234 },
  { id: 'cat2', name: 'Abstract Art', image: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=400&h=300&fit=crop', count: 189 },
  { id: 'cat3', name: 'Sci-Fi', image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop', count: 156 },
  { id: 'cat4', name: 'Animals', image: 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=400&h=300&fit=crop', count: 298 },
];

// Placeholder recommendation algorithm
function getRecommendedImages(currentImage: Image, allImages: Image[]): Image[] {
  // TODO: Replace with real recommendation algorithm from backend
  // Current logic: Filter by same category, then random selection
  const sameCategory = allImages.filter(
    img => img.id !== currentImage.id && img.category === currentImage.category
  );
  const otherImages = allImages.filter(
    img => img.id !== currentImage.id && img.category !== currentImage.category
  );
  
  return [...sameCategory, ...otherImages].slice(0, 8);
}

export default function DemoTimeline() {
  const [view, setView] = useState<'home' | 'detail'>('home');
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [likedImages, setLikedImages] = useState<Set<string>>(new Set());
  const [dislikedImages, setDislikedImages] = useState<Set<string>>(new Set());

  const handleImageClick = (image: Image) => {
    setSelectedImage(image);
    setView('detail');
    // In real Next.js app: router.push(`/gallery/${image.id}`)
  };

  const handleCopyPrompt = (prompt: string) => {
    navigator.clipboard.writeText(prompt);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  const toggleLike = (id: string) => {
    const newLiked = new Set(likedImages);
    if (newLiked.has(id)) {
      newLiked.delete(id);
    } else {
      newLiked.add(id);
      const newDisliked = new Set(dislikedImages);
      newDisliked.delete(id);
      setDislikedImages(newDisliked);
    }
    setLikedImages(newLiked);
  };

  const toggleDislike = (id: string) => {
    const newDisliked = new Set(dislikedImages);
    if (newDisliked.has(id)) {
      newDisliked.delete(id);
    } else {
      newDisliked.add(id);
      const newLiked = new Set(likedImages);
      newLiked.delete(id);
      setLikedImages(newLiked);
    }
    setDislikedImages(newDisliked);
  };

  const recommendedImages = selectedImage 
    ? getRecommendedImages(selectedImage, mockImages)
    : [];

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-20 border-r border-border bg-card/50">
        <div className="flex-1 flex flex-col items-center py-6 space-y-8">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-sm">
            <span className="text-xl font-bold text-primary-foreground">A</span>
          </div>

          <nav className="flex flex-col items-center space-y-8">
            <NavItem icon={Home} label="Home" active={view === 'home'} onClick={() => setView('home')} />
            <NavItem icon={Compass} label="Explore" />
            <NavItem icon={Bookmark} label="Collections" />
            <NavItem icon={Sparkles} label="Generate" />
          </nav>
        </div>

        <div className="pb-6 flex flex-col items-center">
          <NavItem icon={Settings} label="Settings" />
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 border-b border-border bg-card/50 backdrop-blur-sm px-6 flex items-center justify-between">
          <div className="flex-1 max-w-2xl">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search images..."
                className="w-full pl-11 pr-4 py-2.5 bg-muted/50 border border-border rounded-full text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring focus:border-ring transition-all"
              />
            </div>
          </div>
          <div className="flex items-center gap-3 ml-6">
            
              <ModeToggle/>
           
            <button className="w-9 h-9 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-sm">
              <User className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto">
          {view === 'home' ? (
            <HomeView
              images={mockImages}
              onImageClick={handleImageClick}
              likedImages={likedImages}
              dislikedImages={dislikedImages}
              toggleLike={toggleLike}
              toggleDislike={toggleDislike}
            />
          ) : selectedImage ? (
            <DetailView
              image={selectedImage}
              categories={mockCategories}
              discoveryImages={recommendedImages}
              onImageClick={handleImageClick}
              onCopyPrompt={handleCopyPrompt}
              copiedPrompt={copiedPrompt}
              isLiked={likedImages.has(selectedImage.id)}
              isDisliked={dislikedImages.has(selectedImage.id)}
              onLike={() => toggleLike(selectedImage.id)}
              onDislike={() => toggleDislike(selectedImage.id)}
            />
          ) : null}
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-card/95 backdrop-blur-sm border-t border-border flex items-center justify-around px-2">
        <MobileNavItem icon={Home} label="Home" active />
        <MobileNavItem icon={Compass} label="Explore" />
        <MobileNavItem icon={Bookmark} label="Collections" />
        <MobileNavItem icon={Sparkles} label="Generate" />
        <MobileNavItem icon={Settings} label="Settings" />
      </nav>
    </div>
  );
}

function NavItem({ icon: Icon, label, active, onClick }: NavItemProps) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center gap-1.5 transition-colors ${
        active ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
      }`}
    >
      <Icon className="w-5 h-5" strokeWidth={active ? 2.5 : 2} />
      <span className="text-[10px] font-medium tracking-wide">{label}</span>
    </button>
  );
}

function MobileNavItem({ icon: Icon, label, active }: { icon: React.ElementType; label: string; active?: boolean }) {
  return (
    <button
      className={`flex flex-col items-center gap-1 transition-colors ${
        active ? 'text-primary' : 'text-muted-foreground'
      }`}
    >
      <Icon className="w-5 h-5" strokeWidth={active ? 2.5 : 2} />
      <span className="text-[10px] font-medium">{label}</span>
    </button>
  );
}

function HomeView({ 
  images, 
  onImageClick, 
  likedImages, 
  dislikedImages, 
  toggleLike, 
  toggleDislike 
}: {
  images: Image[];
  onImageClick: (image: Image) => void;
  likedImages: Set<string>;
  dislikedImages: Set<string>;
  toggleLike: (id: string) => void;
  toggleDislike: (id: string) => void;
}) {
  return (
    <div className="p-4 md:p-6">
      <div className="masonry-grid">
        {images.map((image) => (
          <MasonryCard
            key={image.id}
            image={image}
            onClick={() => onImageClick(image)}
            isLiked={likedImages.has(image.id)}
            isDisliked={dislikedImages.has(image.id)}
            onLike={() => toggleLike(image.id)}
            onDislike={() => toggleDislike(image.id)}
          />
        ))}
      </div>

      <style jsx>{`
        .masonry-grid {
          column-count: 1;
          column-gap: 16px;
        }
        @media (min-width: 640px) {
          .masonry-grid {
            column-count: 2;
          }
        }
        @media (min-width: 1024px) {
          .masonry-grid {
            column-count: 5;
          }
        }
        @media (min-width: 1536px) {
          .masonry-grid {
            column-count: 6;
          }
        }
      `}</style>
    </div>
  );
}

function MasonryCard({ image, onClick, isLiked, isDisliked, onLike, onDislike }: MasonryCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="masonry-item group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <div className="relative rounded-xl overflow-hidden bg-card shadow-sm hover:shadow-xl transition-all duration-300">
        <img
          src={image.url}
          alt={image.prompt}
          className="w-full h-auto object-cover"
          loading="lazy"
        />

        {isHovered && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent">
            <div className="absolute top-3 right-3 flex gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onLike();
                }}
                className={`w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md transition-all shadow-lg ${
                  isLiked
                    ? 'bg-success text-success-foreground'
                    : 'bg-white/95 dark:bg-card/95 text-foreground hover:scale-110'
                }`}
              >
                <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} strokeWidth={2.5} />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDislike();
                }}
                className={`w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md transition-all shadow-lg ${
                  isDisliked
                    ? 'bg-destructive text-destructive-foreground'
                    : 'bg-white/95 dark:bg-card/95 text-foreground hover:scale-110'
                }`}
              >
                <ThumbsDown className={`w-4 h-4 ${isDisliked ? 'fill-current' : ''}`} strokeWidth={2.5} />
              </button>
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-4">
              <div className="bg-card/95 backdrop-blur-md rounded-lg p-3 shadow-lg border border-border/50">
                <p className="text-sm text-foreground line-clamp-2 leading-relaxed">
                  {image.prompt.slice(0, 80)}...
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .masonry-item {
          break-inside: avoid;
          margin-bottom: 16px;
        }
      `}</style>
    </div>
  );
}

function DetailView({
  image,
  categories,
  discoveryImages,
  onImageClick,
  onCopyPrompt,
  copiedPrompt,
  isLiked,
  isDisliked,
  onLike,
  onDislike
}: DetailViewProps) {
  const [showFullPrompt, setShowFullPrompt] = useState(false);

  return (
    <div className="min-h-screen">
      {/* Image Section - Constrained to viewport */}
      <div className="max-h-screen flex flex-col">
        <div className="flex-1 flex items-center justify-center bg-muted/30 p-6">
          <div className="w-full max-w-7xl">
            <div className="bg-card/50 backdrop-blur-sm rounded-2xl overflow-hidden shadow-2xl border border-border/50">
              {/* Action Bar */}
              <div className="px-6 py-4 border-b border-border/50 flex items-center justify-between bg-card/80 backdrop-blur-sm">
                <div className="flex gap-2">
                  <button
                    onClick={onLike}
                    className={`px-5 py-2.5 rounded-full flex items-center gap-2.5 font-medium text-sm transition-all ${
                      isLiked
                        ? 'bg-success text-success-foreground shadow-md'
                        : 'bg-muted/80 hover:bg-muted text-foreground'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} strokeWidth={2.5} />
                    Like
                  </button>
                  <button
                    onClick={onDislike}
                    className={`px-5 py-2.5 rounded-full flex items-center gap-2.5 font-medium text-sm transition-all ${
                      isDisliked
                        ? 'bg-destructive text-destructive-foreground shadow-md'
                        : 'bg-muted/80 hover:bg-muted text-foreground'
                    }`}
                  >
                    <ThumbsDown className={`w-4 h-4 ${isDisliked ? 'fill-current' : ''}`} strokeWidth={2.5} />
                    Dislike
                  </button>
                </div>
                <div className="flex gap-2">
                  <button className="px-5 py-2.5 bg-primary text-primary-foreground rounded-full flex items-center gap-2.5 font-medium text-sm hover:bg-primary/90 transition-all shadow-md">
                    <Download className="w-4 h-4" strokeWidth={2.5} />
                    Download
                  </button>
                  <button className="w-10 h-10 rounded-full bg-muted/80 hover:bg-muted flex items-center justify-center transition-colors">
                    <MoreHorizontal className="w-5 h-5" strokeWidth={2.5} />
                  </button>
                </div>
              </div>

              {/* Image - Constrained to viewport */}
              <div className="flex items-center justify-center p-8" style={{ maxHeight: 'calc(100vh - 200px)' }}>
                <img
                  src={image.url}
                  alt={image.prompt}
                  className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Metadata & Categories Section */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Prompt */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              <div>
                <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Prompt</h2>
                <p className={`text-base leading-relaxed text-foreground ${!showFullPrompt && 'line-clamp-3'}`}>
                  {image.prompt}
                </p>
                {image.prompt.length > 100 && (
                  <button
                    onClick={() => setShowFullPrompt(!showFullPrompt)}
                    className="mt-2 text-sm text-primary hover:text-primary/80 font-medium"
                  >
                    {showFullPrompt ? 'Show less' : 'Show more'}
                  </button>
                )}
              </div>
              <button
                onClick={() => onCopyPrompt(image.prompt)}
                className="px-6 py-3 bg-accent text-accent-foreground rounded-full flex items-center gap-2.5 hover:bg-accent/90 transition-all font-medium shadow-sm"
              >
                {copiedPrompt ? (
                  <>
                    <Check className="w-4 h-4" strokeWidth={2.5} />
                    Copied to clipboard
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" strokeWidth={2.5} />
                    Copy Prompt
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Generation Details */}
          <div>
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Details</h2>
            <div className="space-y-3 border-l-2 border-border pl-4">
              <DetailItem label="Model" value={image.model} />
              <DetailItem label="Resolution" value={image.resolution} />
              <DetailItem label="Quality" value={image.quality} />
              <DetailItem label="Style" value={image.style} />
            </div>
            <button className="w-full mt-6 px-6 py-3 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-all font-medium shadow-sm">
              Generate Similar
            </button>
          </div>
        </div>

        {/* Categories Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-semibold mb-6">Explore Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>

        {/* Discovery Section - Full Width */}
        <div>
          <h2 className="text-2xl font-semibold mb-6">More to Explore</h2>
          <div className="masonry-discover">
            {discoveryImages.map((img) => (
              <div
                key={img.id}
                className="masonry-item-discover cursor-pointer group"
                onClick={() => onImageClick(img)}
              >
                <img
                  src={img.url}
                  alt={img.prompt}
                  className="w-full h-auto rounded-xl shadow-sm group-hover:shadow-xl transition-all duration-300"
                />
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <button className="px-8 py-3 bg-secondary text-secondary-foreground rounded-full hover:bg-secondary/80 transition-colors font-medium shadow-sm">
              Load More
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .masonry-discover {
          column-count: 2;
          column-gap: 16px;
        }
        @media (min-width: 768px) {
          .masonry-discover {
            column-count: 4;
          }
        }
        @media (min-width: 1024px) {
          .masonry-discover {
            column-count: 5;
          }
        }
        @media (min-width: 1536px) {
          .masonry-discover {
            column-count: 6;
          }
        }
        .masonry-item-discover {
          break-inside: avoid;
          margin-bottom: 16px;
        }
      `}</style>
    </div>
  );
}

function DetailItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-sm font-medium text-foreground">{value}</span>
    </div>
  );
}

function CategoryCard({ category }: { category: Category }) {
  return (
    <div className="group cursor-pointer">
      <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300">
        <img
          src={category.image}
          alt={category.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-4">
          <h3 className="text-white font-semibold text-lg mb-1">{category.name}</h3>
          <p className="text-white/80 text-sm">{category.count} images</p>
        </div>
      </div>
    </div>
  );
}