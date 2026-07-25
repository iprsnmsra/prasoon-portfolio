import type { Metadata } from "next";
import "./globals.css";
import { Inter, JetBrains_Mono, PT_Serif, Caveat, Jersey_20 } from "next/font/google";

import CustomCursor from "@/components/CustomCursor";
import BootSequence from "@/components/BootSequence";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

const ptSerif = PT_Serif({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-pt-serif",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-caveat",
  display: "swap",
});

const jersey20 = Jersey_20({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-jersey",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Prasoon Mishra — Full-Stack Developer & Competitive Programmer",
  description:
    "Portfolio of Prasoon Mishra. Full-Stack Developer, C++ Competitive Programmer, and Google Gemini Student Ambassador building scalable systems and solving algorithmic challenges.",
  keywords: [
    "Prasoon Mishra",
    "prsnmsra",
    "Full-Stack Developer",
    "Competitive Programming",
    "C++ Grandmaster",
    "DSA",
    "MERN Stack",
    "Google Gemini Ambassador",
    "HackerRank Ambassador",
    "VIT Bhopal",
    "Software Engineer",
    "Codeforces",
    "CodeChef",
    "LeetCode",
  ],
  authors: [{ name: "Prasoon Mishra" }],
  creator: "Prasoon Mishra",
  openGraph: {
    title: "Prasoon Mishra — Developer & Competitive Programmer",
    description:
      "Full-Stack Developer, C++ Competitive Programmer, and Community Leader.",
    url: "https://prsnmsra.vercel.app",
    siteName: "Prasoon Mishra",
    images: [
      {
        url: "/iamp.jpg",
        width: 800,
        height: 600,
        alt: "Prasoon Mishra",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`scroll-smooth ${inter.variable} ${jetbrainsMono.variable} ${ptSerif.variable} ${caveat.variable} ${jersey20.variable}`}
      suppressHydrationWarning
    >
      <body
        className="antialiased bg-white text-black font-[var(--font-inter)]"
        suppressHydrationWarning
      >
        <BootSequence />
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}