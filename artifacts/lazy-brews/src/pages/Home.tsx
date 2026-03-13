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

        <section className="py-20 bg-secondary/30">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-foreground mb-4">
              Become a Founding Member
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Early members get exclusive flavors, discounts, and first access to new drinks by contacting us on WhatsApp:{" "}
              <a
                href="https://wa.me/919930591820"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary font-semibold hover:underline"
              >
                9930591820
              </a>
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
