import { About } from "@/components/sections/About";
import { BookingCTA } from "@/components/sections/BookingCTA";
import { Campaigns } from "@/components/sections/Campaigns";
import { CurriculumVitae } from "@/components/sections/CurriculumVitae";
import { FeaturedPortfolio } from "@/components/sections/FeaturedPortfolio";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { Technology } from "@/components/sections/Technology";
import { VideoReel } from "@/components/sections/VideoReel";

export default function HomePage() {
  return (
    <main className="font-sans">
      <Hero />
      <About />
      <Technology />
      <Projects />
      <FeaturedPortfolio />
      <Campaigns />
      <VideoReel />
      <CurriculumVitae />
      <BookingCTA />
    </main>
  );
}
