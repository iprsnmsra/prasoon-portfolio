import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Experiences from "@/components/Experiences";
import ProjectCategories from "@/components/ProjectCategories";
import SkillGrid from "@/components/SkillGrid";
import Resources from "@/components/Resources";
import Achievements from "@/components/Achievements";
import ContactForm from "@/components/ContactForm";
import Image from "next/image";
import FluidBackground from "@/components/FluidBackground";
import FloatingIcons from "@/components/FloatingIcons";
import { personalInfo } from "@/data/projects";

export default function Home() {
  return (
    <main className="bg-white min-h-screen font-sans selection:bg-black selection:text-white relative">
      <FluidBackground />
      <FloatingIcons />
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <Experiences />
        <ProjectCategories />
        <SkillGrid />
        <Resources />
        <Achievements />
        <ContactForm />

        <footer className="border-t border-black/10 mt-8 bg-white">
          <div className="container-85 py-16 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex flex-col items-center md:items-start gap-2">
              <span className="font-pt-serif font-black text-2xl tracking-widest uppercase text-black">PM<span className="text-gray-300">.</span></span>
              <p className="font-jersey text-gray-400 text-xs">Designed & Engineered by Prasoon Mishra</p>
            </div>
            <div className="relative w-20 h-20 rounded-full border border-black/10 overflow-hidden bg-black/5">
              <Image src={personalInfo.avatarUrl} alt={personalInfo.name} fill className="object-cover object-top grayscale hover:grayscale-0 transition-all duration-700" sizes="80px" />
            </div>
            <div className="text-center md:text-right font-jersey text-xs text-gray-400 space-y-1">
              <p>{personalInfo.name}</p>
              <p>\u00A9 {new Date().getFullYear()} All Rights Reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}