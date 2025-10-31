"use client"

import { ModeToggle } from "@/components/theme/mode-toggle";
import { motion, Variants } from "framer-motion";
import {
  Upload,
  LogOut,
  X,
  LayoutDashboard,
  ImagePlus,
  Settings,
  Menu,
  Sparkles,
  Edit2,
  Trash2,
} from "lucide-react";
import { useState, useRef, ChangeEvent, DragEvent } from "react";

interface GalleryImage {
  id: string;
  url: string;
  prompt: string;
  model: string;
  settings?: {
    resolution?: string;
    quality?: string;
    steps?: number;
    seed?: number;
  };
  category: string;
  likes: number;
  isLiked: boolean;
}

export default function AdminDashboard() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [prompt, setPrompt] = useState("");
  const [model, setModel] = useState("");
  const [category, setCategory] = useState("");
  const [resolution, setResolution] = useState("");
  const [quality, setQuality] = useState("");
  const [steps, setSteps] = useState("");
  const [seed, setSeed] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Mock recent uploads data
  const [recentUploads] = useState<GalleryImage[]>([
    {
      id: "1",
      url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
      prompt: "A serene mountain landscape at sunset",
      model: "DALL-E 3",
      category: "Nature",
      likes: 0,
      isLiked: false,
    },
    {
      id: "2",
      url: "https://images.unsplash.com/photo-1469474968028-56623f02e42e",
      prompt: "Mystical forest path with rays of light",
      model: "Midjourney v6",
      category: "Nature",
      likes: 0,
      isLiked: false,
    },
    {
      id: "3",
      url: "https://image.lexica.art/full_jpg/d2994f02-9175-4f1a-9e86-527d570a2bb1",
      prompt: "Abstract colorful digital art composition",
      model: "Stable Diffusion XL",
      category: "Abstract",
      likes: 0,
      isLiked: false,
    },
    {
      id: "4",
      url: "https://image.lexica.art/full_jpg/7b334c62-d5bc-4fa4-9eaa-db2232c57fd6",
      prompt: "Modern digital creation with geometric patterns",
      model: "DALL-E 3",
      category: "Digital Art",
      likes: 0,
      isLiked: false,
    },
    {
      id: "5",
      url: "https://image.lexica.art/full_jpg/18f074fb-5717-4652-b596-675f29c917ad",
      prompt: "AI generated creative artwork",
      model: "Midjourney v6",
      category: "Creative",
      likes: 0,
      isLiked: false,
    },
    {
      id: "6",
      url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
      prompt: "Scenic landscape with dramatic clouds",
      model: "Stable Diffusion XL",
      category: "Landscape",
      likes: 0,
      isLiked: false,
    },
  ]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  };

  const handleFileSelect = (file: File) => {
    if (file && file.type.startsWith("image/")) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileSelect(file);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileSelect(file);
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) return;

    setIsUploading(true);
    // Simulate upload
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsUploading(false);

    // Reset form
    setSelectedFile(null);
    setPreviewUrl("");
    setPrompt("");
    setModel("");
    setCategory("");
    setResolution("");
    setQuality("");
    setSteps("");
    setSeed("");
  };

  const removeSelectedFile = () => {
    setSelectedFile(null);
    setPreviewUrl("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const isUploadDisabled =
    !selectedFile || !prompt || !model || !category || isUploading;

  return (
    <div className="min-h-screen bg-background flex">
      {/* Compact Sidebar */}
      <aside
        onMouseEnter={() => setSidebarExpanded(true)}
        onMouseLeave={() => setSidebarExpanded(false)}
        className={`fixed lg:static inset-y-0 left-0 z-50 ${
          sidebarExpanded ? "w-56" : "w-16"
        } bg-sidebar border-r border-sidebar-border transition-all duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="h-full flex flex-col">
          {/* Logo & Theme Toggle */}
          <div className="h-16 flex items-center justify-between px-4 border-b border-sidebar-border">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shrink-0">
                <Sparkles size={18} className="text-primary-foreground" />
              </div>
              {sidebarExpanded && (
                <div className="overflow-hidden">
                  <h2 className="text-sm font-semibold text-sidebar-foreground truncate">
                    ArtesiaFlow
                  </h2>
                  <p className="text-[10px] text-muted-foreground truncate">
                    Admin Panel
                  </p>
                </div>
              )}
            </div>
            {sidebarExpanded && (
              <div className="shrink-0">
                <ModeToggle />
              </div>
            )}
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-3 space-y-1">
            <button className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-sidebar-primary-foreground bg-sidebar-primary rounded-lg transition-colors">
              <LayoutDashboard size={18} className="shrink-0" />
              {sidebarExpanded && <span>Dashboard</span>}
            </button>
            <button className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground rounded-lg transition-colors">
              <ImagePlus size={18} className="shrink-0" />
              {sidebarExpanded && <span>Gallery</span>}
            </button>
            <button className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground rounded-lg transition-colors">
              <Settings size={18} className="shrink-0" />
              {sidebarExpanded && <span>Settings</span>}
            </button>
          </nav>

          {/* Logout */}
          <div className="p-3 border-t border-sidebar-border">
            <button className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-destructive hover:bg-destructive/10 rounded-lg transition-colors">
              <LogOut size={18} className="shrink-0" />
              {sidebarExpanded && <span>Logout</span>}
            </button>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Compact Header */}
        <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 hover:bg-muted rounded-lg transition-colors"
            >
              <Menu size={20} />
            </button>
            <h1 className="text-lg font-semibold text-foreground">
              Quick Upload
            </h1>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 p-6 overflow-y-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-7xl mx-auto space-y-6"
          >
            {/* Compact Upload Section */}
            <motion.div variants={itemVariants}>
              <div className="bg-card rounded-lg border border-border p-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  {/* Image Upload - Compact */}
                  <div className="lg:col-span-4">
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      className={`relative border-2 border-dashed rounded-lg cursor-pointer transition-all h-48 flex items-center justify-center ${
                        isDragging
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50 bg-muted/30"
                      }`}
                    >
                      {previewUrl ? (
                        <div className="relative w-full h-full">
                          <img
                            src={previewUrl}
                            alt="Preview"
                            className="w-full h-full object-cover rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              removeSelectedFile();
                            }}
                            className="absolute top-2 right-2 bg-destructive text-destructive-foreground rounded-full p-1.5 hover:bg-destructive/90 transition-colors shadow-lg"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ) : (
                        <div className="text-center px-4">
                          <Upload
                            size={32}
                            className="mx-auto text-muted-foreground mb-2"
                          />
                          <p className="text-sm font-medium text-foreground mb-0.5">
                            Drop or click
                          </p>
                          <p className="text-xs text-muted-foreground">
                            JPG, PNG, GIF (Max 10MB)
                          </p>
                        </div>
                      )}
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileInputChange}
                        className="hidden"
                      />
                    </div>
                  </div>

                  {/* Form Fields - Compact */}
                  <div className="lg:col-span-8 space-y-4">
                    {/* Prompt */}
                    <div>
                      <label className="block text-xs font-medium text-foreground mb-1.5">
                        Prompt <span className="text-destructive">*</span>
                      </label>
                      <textarea
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="Describe the image..."
                        rows={2}
                        className="w-full px-3 py-2 text-sm bg-input border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent outline-none transition-all resize-none text-foreground placeholder:text-muted-foreground"
                      />
                    </div>

                    {/* Model, Category, and Upload Button Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-3">
                      <div className="lg:col-span-3">
                        <label className="block text-xs font-medium text-foreground mb-1.5">
                          AI Model <span className="text-destructive">*</span>
                        </label>
                        <input
                          type="text"
                          value={model}
                          onChange={(e) => setModel(e.target.value)}
                          placeholder="DALL-E 3"
                          className="w-full px-3 py-2 text-sm bg-input border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent outline-none transition-all text-foreground placeholder:text-muted-foreground"
                        />
                      </div>
                      <div className="lg:col-span-2">
                        <label className="block text-xs font-medium text-foreground mb-1.5">
                          Category <span className="text-destructive">*</span>
                        </label>
                        <input
                          type="text"
                          value={category}
                          onChange={(e) => setCategory(e.target.value)}
                          placeholder="Nature"
                          className="w-full px-3 py-2 text-sm bg-input border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent outline-none transition-all text-foreground placeholder:text-muted-foreground"
                        />
                      </div>
                      <div className="lg:col-span-2 flex items-end">
                        <button
                          onClick={handleUpload}
                          disabled={isUploadDisabled}
                          className={`w-full py-2 rounded-lg font-medium text-sm transition-all ${
                            isUploadDisabled
                              ? "bg-muted text-muted-foreground cursor-not-allowed"
                              : "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm"
                          }`}
                        >
                          {isUploading ? (
                            <span className="flex items-center justify-center gap-2">
                              <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin"></div>
                              Uploading
                            </span>
                          ) : (
                            "Upload"
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Advanced Settings Toggle */}
                    <button
                      onClick={() => setShowAdvanced(!showAdvanced)}
                      className="text-xs font-medium text-primary hover:text-primary/80 transition-colors"
                    >
                      {showAdvanced ? "Hide" : "Show"} Advanced Settings
                    </button>

                    {/* Advanced Settings - Collapsible */}
                    {showAdvanced && (
                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
                        <div>
                          <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                            Resolution
                          </label>
                          <input
                            type="text"
                            value={resolution}
                            onChange={(e) => setResolution(e.target.value)}
                            placeholder="1024x1024"
                            className="w-full px-3 py-2 text-sm bg-input border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent outline-none transition-all text-foreground placeholder:text-muted-foreground"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                            Quality
                          </label>
                          <input
                            type="text"
                            value={quality}
                            onChange={(e) => setQuality(e.target.value)}
                            placeholder="standard"
                            className="w-full px-3 py-2 text-sm bg-input border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent outline-none transition-all text-foreground placeholder:text-muted-foreground"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                            Steps
                          </label>
                          <input
                            type="text"
                            value={steps}
                            onChange={(e) => setSteps(e.target.value)}
                            placeholder="50"
                            className="w-full px-3 py-2 text-sm bg-input border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent outline-none transition-all text-foreground placeholder:text-muted-foreground"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                            Seed
                          </label>
                          <input
                            type="text"
                            value={seed}
                            onChange={(e) => setSeed(e.target.value)}
                            placeholder="12345"
                            className="w-full px-3 py-2 text-sm bg-input border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent outline-none transition-all text-foreground placeholder:text-muted-foreground"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Recent Uploads - Compact Grid */}
            <motion.div variants={itemVariants}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-semibold text-foreground">
                  Recent Uploads
                </h2>
                <span className="text-xs text-muted-foreground">
                  {recentUploads.length} images
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
                {recentUploads.map((image) => (
                  <motion.div
                    key={image.id}
                    variants={itemVariants}
                    whileHover={{ y: -2 }}
                    className="bg-card rounded-lg border border-border overflow-hidden group cursor-pointer transition-all hover:shadow-lg hover:border-primary/50"
                  >
                    <div className="aspect-square bg-muted relative overflow-hidden">
                      <img
                        src={image.url}
                        alt={image.prompt}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      {/* Hover Actions */}
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <button className="p-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
                          <Edit2 size={16} />
                        </button>
                        <button className="p-2 bg-destructive text-destructive-foreground rounded-lg hover:bg-destructive/90 transition-colors">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                    <div className="p-2.5">
                      <p className="text-[10px] text-muted-foreground mb-1 truncate">
                        {image.model}
                      </p>
                      <h3 className="text-xs font-medium text-foreground line-clamp-2 leading-tight mb-1.5">
                        {image.prompt}
                      </h3>
                      <span className="inline-block text-[10px] bg-muted text-muted-foreground px-2 py-0.5 rounded-full">
                        {image.category}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}