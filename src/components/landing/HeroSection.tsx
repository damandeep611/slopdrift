"use client"

import { motion, Variants } from "framer-motion"
import { ArrowLeft } from "lucide-react"

export default function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 0.61, 0.36, 1] },
    },
  }

  const imageVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8, x: 50 },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: { duration: 0.8, ease: [0.22, 0.61, 0.36, 1] },
    },
  }

  const masonryImages = [
    {
      src: "https://image.lexica.art/full_jpg/d2994f02-9175-4f1a-9e86-527d570a2bb1",
      alt: "Creative image 1",
      className: "col-span-1 row-span-2",
    },
    {
      src: "https://image.lexica.art/full_jpg/7b334c62-d5bc-4fa4-9eaa-db2232c57fd6",
      alt: "Creative image 2",
      className: "col-span-1 row-span-1",
    },
    {
      src: "https://image.lexica.art/full_jpg/18f074fb-5717-4652-b596-675f29c917ad",
      alt: "Creative image 3",
      className: "col-span-1 row-span-1",
    },
    
  ]

  return (
    <div className="min-h-screen  flex items-center justify-center p-6">
      {/* Main Container */}
      <motion.div
        className="w-full max-w-7xl  rounded-xl border border-border overflow-hidden"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-0">
          {/* Left Section */}
          <motion.div
            className="p-8 lg:p-8 flex flex-col "
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Header */}
            <div>
              {/* Brand */}
              <motion.div variants={itemVariants} className="mb-8">
                <h3 className="text-sm font-semibold  tracking-wide">ArtesiaFlow</h3>
                <p className="text-xs  mt-1">High-quality 4k AI generated Images </p>
              </motion.div>

              {/* User Avatars */}
              <motion.div variants={itemVariants} className="mb-8 flex items-center gap-3">
                <div className="flex -space-x-3">
                  <div className="w-8 h-8 rounded-full bg-linear-to-br from-blue-400 to-blue-600 border-2 border-white flex items-center justify-center text-white text-xs font-bold">
                    A
                  </div>
                  <div className="w-8 h-8 rounded-full bg-linear-to-br from-purple-400 to-purple-600 border-2 border-white flex items-center justify-center text-white text-xs font-bold">
                    B
                  </div>
                  <div className="w-8 h-8 rounded-full bg-linear-to-br from-pink-400 to-pink-600 border-2 border-white flex items-center justify-center text-white text-xs font-bold">
                    C
                  </div>
                </div>
                <span className="text-xs font-medium ">+ Become one of 4000+ happy users</span>
              </motion.div>

              {/* Main Headline */}
              <motion.div variants={itemVariants} className="mb-6">
                <h1 className="text-3xl lg:text-4xl font-bold  leading-tight">
                  Your Studio Is Ready.
                  <br />
                  Let Every Call Tell a Story.
                </h1>
              </motion.div>

              {/* Description */}
              <motion.p variants={itemVariants} className=" text-base leading-relaxed mb-8 max-w-md">
                Log in to start your next great recording session, capture what matters, save stories, and turn real
                talk into stunning content.
              </motion.p>
            </div>

            {/* Buttons */}
            <motion.div variants={itemVariants} className="flex gap-4">
              <button className="flex items-center gap-2 px-6 py-3 rounded-lg border border-border font-medium  transition-colors">
                <ArrowLeft size={18} />
                Back
              </button>
              <button className="flex items-center gap-2 px-6 py-3 rounded-lg border border-border font-medium  transition-colors">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                Continue with Google
              </button>
            </motion.div>

         
          </motion.div>

          {/* Right Section - Masonry Grid */}
          <motion.div
            className="relative p-2 lg:p-4 flex items-center justify-center"
            variants={imageVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="w-full h-screen grid grid-cols-2 gap-2 auto-rows-max">
              {masonryImages.map((image, index) => (
                <motion.div
                  key={index}
                  className={`${image.className} relative overflow-hidden rounded-md`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.2, duration: 0.6 }}
                >
                  <img
                    src={image.src || "/placeholder.svg"}
                    alt={image.alt}
                    width={300}
                    height={300}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                   
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}
