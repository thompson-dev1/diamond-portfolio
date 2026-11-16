import { About } from "@/components/sections/About";
import { BookingCTA } from "@/components/sections/BookingCTA";
import { Campaigns } from "@/components/sections/Campaigns";
import { FeaturedPortfolio } from "@/components/sections/FeaturedPortfolio";
import { Hero } from "@/components/sections/Hero";
import { Technology } from "@/components/sections/Technology";
import { VideoReel } from "@/components/sections/VideoReel";

export default function HomePage() {
  return (
    <main className="font-sans">
      <Hero />
      <About />
      <Technology />
      <FeaturedPortfolio />
      <Campaigns />
      <VideoReel />
      <BookingCTA />
    </main>
  );
}
