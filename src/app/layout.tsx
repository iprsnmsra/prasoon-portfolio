import type { Metadata } from "next";
import "./globals.css";

// 1. Double check these paths! If they have red lines, make sure the files exist in src/components/
import CustomCursor from "@/components/CustomCursor";   
import BootSequence from "@/components/BootSequence"; 

export const metadata: Metadata = {
  title: "Prasoon Mishra | prsnmsra | Full-Stack & Game Developer",
  description: "The digital portfolio of Prasoon Mishra (prsnmsra). Exploring scalable MERN architectures, 3D game environments, and AI-driven cybersecurity systems.",
  keywords: [
    "Prasoon Mishra", 
    "prsnmsra", 
    "Full-Stack Developer", 
    "MERN Stack", 
    "Game Developer", 
    "VIT Bhopal", 
    "Unity", 
    "Blender",
    "Cybersecurity", 
    "Lucknow",
    "MERN Matrix Club",
    "Software Engineer"
  ],
  authors: [{ name: "Prasoon Mishra" }],
  creator: "Prasoon Mishra",
  // verification: {
  //   google: "PASTE_YOUR_COPIED_CODE_HERE", // Keep your Google code here if you have it!
  // },
  openGraph: {
    title: "Prasoon Mishra | prsnmsra",
    description: "Full-Stack Developer, Game Enthusiast, and Cybersecurity innovator.",
    url: "https://prsnmsra.vercel.app",
    siteName: "Prasoon Mishra Portfolio",
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
    // 2. We add suppressHydrationWarning HERE to stop the LINER extension from breaking the page
    <html lang="en" className="scroll-smooth" suppressHydrationWarning> 
      <body className="antialiased bg-[#0a0a0a] text-white" suppressHydrationWarning>
        
        <BootSequence /> 
        <CustomCursor /> 
        
        {children}
      </body>
    </html>
  );
}