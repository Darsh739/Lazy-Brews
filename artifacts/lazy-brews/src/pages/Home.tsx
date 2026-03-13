import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Flavors } from "@/components/sections/Flavors";
import { Features } from "@/components/sections/Features";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <Hero />
        <HowItWorks />
        <Flavors />
        <Features />
      </main>

      <Footer />
    </div>
  );
}
