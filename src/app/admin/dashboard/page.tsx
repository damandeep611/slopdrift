"use client"

import { motion, Variants } from "framer-motion"
import { Upload, LogOut, X, LayoutDashboard, ImagePlus, Settings, Menu } from "lucide-react"
import { useState, useRef, ChangeEvent, DragEvent } from "react"

interface GalleryImage {
  id: string
  url: string
  prompt: string
  model: string
  settings?: {
    resolution?: string
    quality?: string
    steps?: number
    seed?: number
  }
  category: string
  likes: number
  isLiked: boolean
}

export default function AdminDashboard() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string>("")
  const [prompt, setPrompt] = useState("")
  const [model, setModel] = useState("")
  const [category, setCategory] = useState("")
  const [resolution, setResolution] = useState("")
  const [quality, setQuality] = useState("")
  const [steps, setSteps] = useState("")
  const [seed, setSeed] = useState("")
  const [isUploading, setIsUploading] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

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
  ])

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  }

  const handleFileSelect = (file: File) => {
    if (file && file.type.startsWith("image/")) {
      setSelectedFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) handleFileSelect(file)
  }

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) handleFileSelect(file)
  }

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedFile) return

    setIsUploading(true)
    // Simulate upload
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsUploading(false)

    // Reset form
    setSelectedFile(null)
    setPreviewUrl("")
    setPrompt("")
    setModel("")
    setCategory("")
    setResolution("")
    setQuality("")
    setSteps("")
    setSeed("")
  }

  const removeSelectedFile = () => {
    setSelectedFile(null)
    setPreviewUrl("")
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const isUploadDisabled = !selectedFile || isUploading

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-200 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="h-full flex flex-col">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">ArtesiaFlow</h2>
            <p className="text-xs text-gray-500 mt-1">Admin Panel</p>
          </div>

          <nav className="flex-1 p-4 space-y-2">
            <button className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-white bg-blue-600 rounded-lg">
              <LayoutDashboard size={18} strokeWidth={2} />
              Dashboard
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
              <ImagePlus size={18} strokeWidth={2} />
              Upload Image
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
              <Settings size={18} strokeWidth={2} />
              Settings
            </button>
          </nav>

          <div className="p-4 border-t border-gray-200">
            <button className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors">
              <LogOut size={18} strokeWidth={2} />
              Logout
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
        {/* Header */}
        <header className="bg-white border-b border-gray-200">
          <div className="px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
              >
                <Menu size={20} strokeWidth={2} />
              </button>
              <h1 className="text-xl font-semibold text-gray-900">
                Upload New Image
              </h1>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 p-6 overflow-y-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-6xl mx-auto"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Upload Area - Left Column */}
              <motion.div variants={itemVariants}>
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
                  <h3 className="text-sm font-semibold text-gray-900 mb-4">
                    Image File
                  </h3>
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`relative border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all ${
                      isDragging
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-300 hover:border-gray-400 bg-gray-50"
                    }`}
                  >
                    {previewUrl ? (
                      <div className="relative inline-block">
                        <img
                          src={previewUrl}
                          alt="Preview"
                          className="max-h-48 rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation()
                            removeSelectedFile()
                          }}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                        >
                          <X size={16} strokeWidth={2} />
                        </button>
                      </div>
                    ) : (
                      <>
                        <Upload
                          size={40}
                          strokeWidth={1.5}
                          className="mx-auto text-gray-400 mb-3"
                        />
                        <p className="text-sm font-medium text-gray-900 mb-1">
                          Drop image or click to browse
                        </p>
                        <p className="text-xs text-gray-500">
                          JPG, PNG, GIF (Max 10MB)
                        </p>
                      </>
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
              </motion.div>

              {/* Form Fields - Right Column */}
              <motion.div variants={itemVariants}>
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
                  <h3 className="text-sm font-semibold text-gray-900 mb-4">
                    Image Details
                  </h3>
                  <div className="space-y-4">
                    {/* Prompt */}
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1.5">
                        Prompt *
                      </label>
                      <textarea
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="Describe the image generation prompt..."
                        rows={3}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
                      />
                    </div>

                    {/* Model and Category */}
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1.5">
                          AI Model *
                        </label>
                        <input
                          type="text"
                          value={model}
                          onChange={(e) => setModel(e.target.value)}
                          placeholder="e.g., DALL-E 3"
                          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1.5">
                          Category *
                        </label>
                        <input
                          type="text"
                          value={category}
                          onChange={(e) => setCategory(e.target.value)}
                          placeholder="e.g., Nature"
                          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Optional Settings */}
            <motion.div variants={itemVariants} className="mb-8">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
                <h3 className="text-sm font-semibold text-gray-900 mb-4">
                  Generation Settings (Optional)
                </h3>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1.5">
                      Resolution
                    </label>
                    <input
                      type="text"
                      value={resolution}
                      onChange={(e) => setResolution(e.target.value)}
                      placeholder="1024x1024"
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1.5">
                      Quality
                    </label>
                    <input
                      type="text"
                      value={quality}
                      onChange={(e) => setQuality(e.target.value)}
                      placeholder="standard"
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1.5">
                      Steps
                    </label>
                    <input
                      type="text"
                      value={steps}
                      onChange={(e) => setSteps(e.target.value)}
                      placeholder="50"
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1.5">
                      Seed
                    </label>
                    <input
                      type="text"
                      value={seed}
                      onChange={(e) => setSeed(e.target.value)}
                      placeholder="12345"
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Upload Button */}
            <motion.div variants={itemVariants} className="mb-8">
              <button
                onClick={handleUpload}
                disabled={isUploadDisabled}
                className={`w-full py-3 rounded-lg font-medium text-sm transition-all ${
                  isUploadDisabled
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700 shadow-sm"
                }`}
              >
                {isUploading ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Uploading...
                  </span>
                ) : (
                  "Upload Image"
                )}
              </button>
            </motion.div>

            {/* Recent Uploads Section */}
            <motion.div variants={itemVariants}>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Recent Uploads
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {recentUploads.map((image) => (
                  <motion.div
                    key={image.id}
                    variants={itemVariants}
                    whileHover={{ y: -4 }}
                    className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden group cursor-pointer transition-shadow hover:shadow-md"
                  >
                    <div className="aspect-video bg-gray-100 relative overflow-hidden">
                      <img
                        src={image.url}
                        alt={image.prompt}
                        className="w-full h-full object-cover transition-transform group-hover:scale-105"
                      />
                    </div>
                    <div className="p-3">
                      <p className="text-xs text-gray-500 mb-1">{image.model}</p>
                      <h3 className="text-sm font-medium text-gray-900 mb-1 line-clamp-2">
                        {image.prompt}
                      </h3>
                      <span className="inline-block text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
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
  )
}