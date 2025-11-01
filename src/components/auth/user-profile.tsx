"use client";
import { User } from "@supabase/supabase-js";
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  DownloadIcon,
  Folder,

  ImageIcon,
  LogOutIcon,

  User2Icon,
  UserCircle,
  Zap,
} from "lucide-react";
import { userLogoutAction } from "@/actions/users";

interface userProfileProps {
  user: User | null;
}

const menuItems = [
  {
    section: "usage",
    items: [
      { icon: DownloadIcon, label: "Downloads", count: "5 left" },
      { icon: Zap, label: "Fast generations", count: "3 left", info: true },
    ],
  },
  {
    section: "profile",
    items: [
      { icon: User2Icon, label: "View profile" },
      { icon: ImageIcon, label: "My images" },
      { icon: Folder, label: "My collections" },
    ],
  },
];

export default function UserProfile({ user }: userProfileProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  return (
    <div className="relative">
      <button
        className="p-2 hover:bg-muted"
        onClick={() => setDropdownOpen(!dropdownOpen)}
      >
        {dropdownOpen ? (
          <div>
            <UserCircle />
          </div>
        ) : (
          <div>
            <User2Icon />
          </div>
        )}
      </button>
      <AnimatePresence>
        {dropdownOpen && (
          <>
            {/* backdrop */}
            <div
              className="fixed inset-0 z-40"
              onClick={() => setDropdownOpen(false)}
            />
            {/* profile dropdown  */}
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.1 }}
              className="absolute right-0 mt-2 w-80 max-w-xs bg-background rounded-lg shadow-2xl border border-border overflow-hidden z-50 max-h-[450px] flex flex-col"
              style={{ width: "320px" }}
            >
              {/* Profile Section */}
              <div className="bg-card border-b border-border shrink-0 p-3">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-linear-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center shrink-0">
                    <User2Icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-white text-sm">
                      {user?.email}
                    </h3>
                    <p className="text-xs text-slate-400">Free plan</p>
                  </div>
                  <button className="px-2 py-1 bg-yellow-400 text-slate-900 rounded-full text-xs font-semibold hover:bg-yellow-300 transition-colors shrink-0">
                    Upgrade
                  </button>
                </div>
              </div>

              {/* Menu Sections */}
              <div className="overflow-y-auto flex-1">
                {menuItems.map((section, sectionIndex) => (
                  <div key={section.section}>
                    {sectionIndex > 0 && (
                      <div className="border-t border-slate-700" />
                    )}
                    <div className="py-1">
                      {section.items.map((item, itemIndex) => {
                        const Icon = item.icon;
                        return (
                          <motion.button
                            key={itemIndex}
                            initial={{ opacity: 0, y: -10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -10, scale: 0.95 }}
                            transition={{ duration: 0.1 }}
                            whileHover={{
                              backgroundColor: "rgba(51, 65, 85, 0.5)",
                            }}
                            className="w-full px-3 py-2 flex items-center gap-2  transition-colors duration-200 text-left text-sm"
                          >
                            <Icon className="w-4 h-4 shrink-0" />
                            <span className="flex-1 font-medium truncate">
                              {item.label}
                            </span>
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>
                ))}
                <motion.button onClick={async ()=> {await userLogoutAction()}} className="w-full cursor-pointer px-3 py-2 hover:bg-muted flex items-center gap-2  transition-colors duration-200 text-left text-sm">
                  <LogOutIcon size={18} />
                  <span className="flex-1 font-medium truncate">Log out</span>
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
