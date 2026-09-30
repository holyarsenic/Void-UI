"use client";

import Logo from "@/assets/Logo/Logo";

import { LayoutDashboard, Orbit, Circle, RotateCcwClock, FolderKanban, Settings, LogOut, PanelLeftClose, PanelLeftOpen, ArrowUpRight } from "lucide-react"; 

import { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { usePathname } from "next/navigation";
import Image from "next/image";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const pathname = usePathname();
  const isSettingsActive = pathname === "/dashboard/settings";

  const { data } = useSession();
  const user = data?.user;

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
      name: "History",
      icon: RotateCcwClock,
      href: "/dashboard/history"
    },
    {
      name: "Projects",
      icon: FolderKanban,
      href: "/dashboard/projects",
    }
  ];

  return (
    <>
      <motion.button
        onClick={() => setMobileOpen(true)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        className={`fixed left-3 top-4 z-50 flex items-center justify-center rounded-lg p-2 text-yellow-600 bg-foreground/10 transition-all hover:text-yellow-500 md:hidden ${mobileOpen ? "pointer-events-none opacity-0" : "opacity-100"}`}>
        <PanelLeftOpen className="h-5 w-5" />
      </motion.button>
      <motion.aside
        initial={{ width: 280 }}
        animate={{ width: mobileOpen ? 280 : collapsed ? 80 : 280 }}
        transition={{
          duration: 0.34,
          ease: "easeInOut",
        }}
        className={`fixed md:relative flex h-screen flex-col overflow-hidden border-r border-white/10 bg-background z-20 
        ${mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}>
        <div className="relative flex h-20 items-center justify-between border-b border-white/10 px-5">
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
            onHoverStart={() => setCollapsed(false)}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            onClick={() => setCollapsed(!collapsed)}
            className="hidden md:block p-2 text-yellow-600 transition-colors hover:text-white ">
            <motion.div
              animate={{ rotate: collapsed ? 180 : 0 }}
              transition={{ duration: 0.3 }}>
              {collapsed ? (
                <PanelLeftOpen className="h-5 w-5" />
              ) : (
                <PanelLeftClose className="h-5 w-5" />
              )}
            </motion.div>
          </motion.button>
          <motion.button
            onClick={() => setMobileOpen(false)}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            className="p-2 text-yellow-600 hover:text-white md:hidden">
            <PanelLeftClose className="h-5 w-5" />
          </motion.button>
        </div>

        <nav className="flex flex-1 flex-col gap-2 p-4">
          <div>
              <span
                className="mb-2 px-2 text-sm font-theme text-white/30"
              >
                {collapsed ? "W" : "Workspace" }
              </span>
          </div>

          {menuItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <motion.div
                key={item.name}
                whileTap={{scale:0.95}}
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity:0, x: -15 }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 30,
                  delay: index * 0.05,
                  duration: 0.35,
                }}
              >
                <Link
                  href={item.href}
                  className={`group relative flex items-center gap-3 rounded-lg px-3 py-3 text-sm transition-colors hover:text-white ${ isActive ? "text-white" : "text-white/50 hover:text-white"}`}>
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
                        className="font-theme flex justify-between w-full"
                      >
                        {item.name}
                        {isActive && (
                          <motion.div
                            initial={{ opacity: 0, x: -5, y: 5 }}
                            animate={{ opacity: 1, x: 0, y: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }} >
                            <ArrowUpRight className="h-4 w-4" />
                          </motion.div>
                        )}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </Link>
              </motion.div>
            );
          })}

          <div>
            <span
                className="mb-2 px-2 text-sm font-theme text-white/30"
              >
                {collapsed ? "S" : "System" }
              </span>
          </div>

          <Link
            href="/dashboard/settings"
            className={`group mb-2 relative flex items-center gap-3 rounded-lg px-3 py-3 text-sm transition-colors ${
              isSettingsActive
                ? "text-white"
                : "text-white/50 hover:text-white"
            }`}>
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
                  transition={{ duration: 0.2 }}
                  className="font-theme flex justify-between w-full"
                >
                  Settings
                  {isSettingsActive && (
                    <motion.div
                      initial={{ opacity: 0, x: -5, y: 5 }}
                      animate={{ opacity: 1, x: 0, y: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }} >
                        <ArrowUpRight className="h-4 w-4" />
                    </motion.div>
                  )}
                </motion.span>
              )}
            </AnimatePresence>
          </Link>

          <Link href="/dashboard/upgrade">
            <motion.div 
            whileTap={{scale:0.98}}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 10
            }}
            className="group relative flex items-center justify-center bg-foreground/80 text-background gap-3 rounded-lg px-3 py-2 text-sm transition-colors cursor-pointer">
              <AnimatePresence>
                {collapsed ?
                  <motion.span
                    initial={{ opacity: 0, scale:0.7 }}
                    animate={{ opacity: 1, scale:1 }}
                    exit={{ opacity: 0, scale:0.7 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="font-theme">
                    <Orbit className="h-5 w-5"/>
                  </motion.span> :
                  <motion.span
                    initial={{ opacity: 0, y: -3 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -3 }}
                    transition={{ duration: 0.2, ease:"easeInOut" }}
                    className="font-theme">
                      Upgrade
                  </motion.span>
                }
              </AnimatePresence>
            </motion.div>
          </Link>
        </nav>

        <div className="border-t border-white/10 p-4">
          <motion.button
            onClick={() => signOut({ callbackUrl: "/auth/login" })}
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="group flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm text-white/40 transition-colors hover:text-red-400 cursor-pointer">
            <AnimatePresence>
              {!collapsed && (
                <motion.span
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 8 }}
                  className="flex items-center gap-2 font-theme whitespace-nowrap"
                >
                  <Image
                    src={user?.image || "/default-profile.jpg"}
                    alt={user?.name || "User"}
                    width={28}
                    height={28}
                    className="h-7 w-7 rounded-full"
                  />

                  {user?.name}
                </motion.span>
              )}
            </AnimatePresence>

            <LogOut className="ml-auto h-5 w-5 transition-transform duration-200 group-hover:-translate-x-1" />
          </motion.button>
        </div>
      </motion.aside>
    </>
  );
};

export default Sidebar;