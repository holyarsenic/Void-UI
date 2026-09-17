"use client";

import Logo from "@/assets/Logo/Logo";

import { LayoutDashboard, Circle, FolderKanban, Settings, LogOut, PanelLeftClose, PanelLeftOpen } from "lucide-react"; 

import { useState } from "react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      href: "/dashboard",
    },
    {
      name: "Generate",
      icon: Circle,
      href: "/dashboard/generate",
    },
    {
      name: "Projects",
      icon: FolderKanban,
      href: "/dashboard/projects",
    },
  ];

  return (
    <motion.aside
      initial={{ width: 256 }}
      animate={{ width: collapsed ? 80 : 256 }}
      transition={{
        duration: 0.35,
        ease: "easeInOut",
      }}
      className="relative flex h-screen flex-col overflow-hidden border-r border-white/15 bg-background"
    >
      <div className="relative flex h-20 items-center justify-between border-b border-white/15 px-5">
        <Link href="/dashboard" className="flex items-center gap-3">
          <motion.div
            whileHover={{ rotate: 8, scale: 1.08 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <Logo className="h-6 w-6" />
          </motion.div>

          <AnimatePresence mode="wait">
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="whitespace-nowrap font-theme text-lg text-white"
              >
                Void <span className="font-bold">UI</span>
              </motion.span>
            )}
          </AnimatePresence>
        </Link>

        <motion.button
          whileHover={{
            scale: 1.08
          }}
          whileTap={{ scale: 0.92 }}
          onClick={() => setCollapsed(!collapsed)}
          className=" p-2 text-yellow-600 transition-colors hover:text-white"
        >
          <motion.div
            animate={{ rotate: collapsed ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {collapsed ? (
              <PanelLeftOpen className="h-5 w-5" />
            ) : (
              <PanelLeftClose className="h-5 w-5" />
            )}
          </motion.div>
        </motion.button>
      </div>

      <nav className="flex flex-1 flex-col gap-2 p-4">
        <AnimatePresence>
          {!collapsed && (
            <motion.span
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="mb-2 px-2 text-sm font-theme text-white/30"
            >
              Workspace
            </motion.span>
          )}
        </AnimatePresence>

        {menuItems.map((item, index) => {
          const Icon = item.icon;

          return (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                delay: index * 0.05,
                duration: 0.35,
              }}
            >
              <Link
                href={item.href}
                className={`group relative flex items-center gap-3 rounded-lg px-3 py-3 text-sm text-white/50 transition-colors hover:bg-white/5 hover:text-white ${
                  collapsed ? "justify-center" : ""
                }`}
              >
                <motion.span
                  className="absolute left-0 h-5 w-0.5 rounded-full bg-white"
                  initial={{ opacity: 0, scaleY: 0 }}
                  whileHover={{
                    opacity: 1,
                    scaleY: 1,
                  }}
                />

                <motion.div
                  whileHover={{
                    scale: 1.12,
                    x: collapsed ? 0 : 2,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 15,
                  }}
                >
                  <Icon className="h-5 w-5" />
                </motion.div>

                <AnimatePresence>
                  {!collapsed && (
                    <motion.span
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -8 }}
                      transition={{ duration: 0.2 }}
                      className="whitespace-nowrap font-theme"
                    >
                      {item.name}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>
            </motion.div>
          );
        })}

        <AnimatePresence>
          {!collapsed && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mb-2 mt-8 px-2 text-sm font-theme text-white/30"
            >
              System
            </motion.span>
          )}
        </AnimatePresence>

        <Link
          href="/dashboard/settings"
          className={`group relative flex items-center gap-3 rounded-lg px-3 py-3 text-sm text-white/50 transition-colors hover:bg-white/5 hover:text-white ${
            collapsed ? "justify-center" : ""
          }`}
        >
          <motion.div
            whileHover={{ rotate: 45, scale: 1.1 }}
            transition={{
              type: "spring",
              stiffness: 300,
            }}
          >
            <Settings className="h-5 w-5" />
          </motion.div>

          <AnimatePresence>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                className="whitespace-nowrap font-theme"
              >
                Settings
              </motion.span>
            )}
          </AnimatePresence>
        </Link>
      </nav>

      <div className="border-t border-white/10 p-4">
        <motion.button
          whileHover={{
            x: collapsed ? 0 : 3
          }}
          whileTap={{ scale: 0.97 }}
          onClick={() => signOut({ callbackUrl: "/login" })}
          className={`group flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm text-white/40 transition-colors hover:text-red-400 ${
            collapsed ? "justify-center" : ""
          }`}
        >
          <motion.div
            whileHover={{ x: 3 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <LogOut className="h-5 w-5 shrink-0" />
          </motion.div>

          <AnimatePresence>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                className="font-theme"
              >
                Sign out
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </motion.aside>
  );
};

export default Sidebar;