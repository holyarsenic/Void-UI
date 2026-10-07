import type { Metadata } from "next";
import { Saira, Geist_Mono, Montenegrin_Gothic_One } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next"
import { Toaster } from "sonner";
import Providers from "./providers";

const montenegrin = Montenegrin_Gothic_One({
  variable: "--font-montenegrin",
  weight: "400",
  subsets: ["latin"],
});

const Sans = Saira({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXTAUTH_URL || "http://localhost:3000"),
  title: {
    default: "Void UI - Generate Animated UI from Prompts",
    template: "%s | Void UI - AI-Powered Animated Components",
  },
  description:
    "Generate beautiful, production-ready UI components from simple prompts. Build, customize, preview, and save components with AI.",
  keywords: [ "Void UI", "AI UI generator", "AI component generator", "animated UI", "UI generator", "React components", "Next.js components", "AI frontend", "prompt to UI", "animated components", ],
  applicationName: "Void UI",
  openGraph: {
    title: "Void UI — Generate Animated UI from Prompts",
    description:
      "Generate beautiful, production-ready UI components from simple prompts.",
    type: "website",
    images: ["/Logo.svg"],
  },

  twitter: {
    card: "summary_large_image",
    title: "Void UI — Generate Animated UI from Prompts",
    description:
      "Generate beautiful, production-ready UI components from simple prompts.",
    images: ["/Logo.svg"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode}>) {
  return (
    <html
      data-scroll-behavior="smooth"
      lang="en"
      className={`${Sans.variable} ${geistMono.variable} ${montenegrin.variable} h-full antialiased dark`}
    >
      <Providers >
        <body className="font-sans min-h-full flex flex-col">
          {children} 
          <Toaster position="bottom-right"/>
        </body>
        <Analytics />
      </Providers>
    </html>
  );
}
