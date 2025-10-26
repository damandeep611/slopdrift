"use client";
import {
  Menu,
  Search,
  Sparkles,
  User,
  Settings,
  LogOut,
  X,
  ImageIcon,
} from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ModeToggle } from "../theme/mode-toggle";

interface NavItem {
  id: string;
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  {
    id: "photos-id",
    label: "Photos",
    href: "/",
  },
  {
    id: "illustrations-id",
    label: "Illustrations",
    href: "#illustrations",
  },
  {
    id: "doodle-id",
    label: "Doodles",
    href: "#doodles",
  },
];

export default function HomeHeader() {
  const [activeNav, setActiveNav] = useState("photos-id");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  return (
    <div className="px-4 py-2 w-full">
      <div className="flex items-center justify-between gap-4">
        {/* nav items */}
        <div className="flex items-center gap-4">
          <span className="text-2xl italic font-light tracking-wide">
            Artesia
          </span>
          <nav className="flex items-center">
            {navItems.map((item) => (
              <Link
                href={item.href}
                key={item.id}
                onClick={() => setActiveNav(item.id)}
              >
                <motion.div
                  className={`px-4 py-2 rounded-lg font-medium transition-colors relative ${
                    activeNav === item.id
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {item.label}
                  {activeNav === item.id && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute inset-0 bg-muted rounded-lg -z-10"
                      transition={{
                        type: "spring",
                        bounce: 0.2,
                        duration: 0.6,
                      }}
                    />
                  )}
                </motion.div>
              </Link>
            ))}
          </nav>
        </div>

        {/* Premium search bar */}
        <motion.div
          className="flex-1 w-full relative "
          animate={{ scale: searchFocused ? 1.02 : 1 }}
          transition={{ duration: 0.2 }}
        >
          <div
            className={`relative flex items-center transition-all duration-300 rounded-full ${
              searchFocused ? "shadow-lg" : "shadow-sm"
            }`}
          >
            <Search
              className={`absolute left-4 transition-colors duration-300 ${
                searchFocused ? "text-foreground" : "text-muted-foreground"
              }`}
              size={20}
            />
            <input
              type="text"
              placeholder="Search for photos, illustrations, and doodles"
              className="w-full pl-12 pr-24 py-3 rounded-full border-2 border-border bg-background focus:border-foreground/20 focus:outline-none transition-all duration-300 placeholder:text-muted-foreground"
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
            />
            <div className="absolute right-3 flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-full hover:bg-muted transition-colors"
                title="Search images"
              >
                <ImageIcon size={18} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-full hover:bg-muted transition-colors"
                title="AI search"
              >
                <Sparkles size={18} className="text-muted-foreground" />
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* action buttons */}
        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.05, y: -1 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-2.5 whitespace-nowrap font-semibold bg-muted rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            Try <span className="font-bold text-warning">Pro</span>
          </motion.button>

          <Link href="/userauth">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-5 py-2.5 font-medium hover:bg-muted rounded-lg transition-colors"
            >
              Login
            </motion.button>
          </Link>

          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2.5 hover:bg-muted rounded-lg transition-colors"
            >
              <AnimatePresence mode="wait">
                {isMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={24} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={24} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>

            {/* Dropdown Menu */}
            <AnimatePresence>
              {isMenuOpen && (
                <>
                  {/* Backdrop */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-40"
                    onClick={() => setIsMenuOpen(false)}
                  />

                  {/* Menu Card */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="absolute right-0 mt-2 w-64 bg-background border border-border rounded-xl shadow-2xl z-50 overflow-hidden"
                  >
                    <div className="p-2">
                      {/* Theme Switcher */}
                      <div className="px-3 py-2 mb-1">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-muted-foreground">
                            Theme
                          </span>
                          <ModeToggle />
                        </div>
                      </div>

                      <div className="h-px bg-border my-2" />

                      {/* Menu Items */}
                      <motion.button
                        whileHover={{ backgroundColor: "hsl(var(--muted))" }}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors"
                      >
                        <User size={18} />
                        <span className="font-medium">Profile</span>
                      </motion.button>

                      <motion.button
                        whileHover={{ backgroundColor: "hsl(var(--muted))" }}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors"
                      >
                        <Settings size={18} />
                        <span className="font-medium">Settings</span>
                      </motion.button>

                      <div className="h-px bg-border my-2" />

                      <motion.button
                        whileHover={{ backgroundColor: "hsl(var(--muted))" }}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors text-red-500"
                      >
                        <LogOut size={18} />
                        <span className="font-medium">Logout</span>
                      </motion.button>
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
