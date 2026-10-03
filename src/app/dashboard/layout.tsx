import type { Metadata } from "next";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Sidebar from "@/components/Dashboard/Sidebar";
import { SessionProvider } from "next-auth/react";

export const metadata: Metadata = {
  title: {
    default: "Dashboard - Void UI",
    template: "%s | Void UI - AI-Powered Animated Components",
  },
  description:
    "Manage your projects and create beautiful, animated UI components with Void UI.",
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    redirect("/auth/login");
  }

  return (
    <div className="flex min-h-screen bg-black text-white">
      <SessionProvider>
        <Sidebar />
        <main className="flex-1">
          {children}
        </main>
      </SessionProvider>
    </div>
  );
}