import type { Metadata } from "next";
import { Geist, Geist_Mono, Montenegrin_Gothic_One } from "next/font/google";
import "./globals.css";

const montenegrin = Montenegrin_Gothic_One({
  variable: "--font-montenegrin",
  weight: "400",
  subsets: ["latin"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Void UI",
  description:
    "Generate beautiful, production-ready UI components from simple prompts. Build, customize, preview, and save components with AI.",

  openGraph: {
    title: "Void UI",
    description:
      "Generate beautiful, production-ready UI components from simple prompts.",
    images: ["/Logo.svg"],
  },

  twitter: {
    card: "summary_large_image",
    title: "Void UI",
    description:
      "Generate beautiful, production-ready UI components from simple prompts.",
    images: ["/Logo.svg"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${montenegrin.variable} h-full antialiased dark`}
    >
      <body className="font-mono min-h-full flex flex-col">{children}</body>
    </html>
  );
}
