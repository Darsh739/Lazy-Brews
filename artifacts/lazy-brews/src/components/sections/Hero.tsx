import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star } from "lucide-react";

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      {/* Decorative background blob */}
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-[800px] h-[800px] bg-primary/20 rounded-full blur-3xl opacity-60 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-foreground text-sm font-semibold mb-6">
              <Star className="w-4 h-4 text-accent" fill="currentColor" />
              <span>Premium Cold Brew Concentrate</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-display font-bold text-foreground leading-[1.1] mb-6">
              The Perfect Cold Coffee, <span className="text-primary italic">in Minutes.</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed max-w-lg">
              Zero effort. Zero waiting. Mix our premium 1:1 concentrate with water or milk for cafe-quality iced coffee right at home.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" onClick={() => document.getElementById('flavors')?.scrollIntoView({ behavior: "smooth" })}>
                Shop Flavours <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button size="lg" variant="outline" onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: "smooth" })}>
                See How It Works
              </Button>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="relative"
          >
            <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl aspect-[4/5] lg:aspect-square group">
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10" />
              <img 
                src={`${import.meta.env.BASE_URL}images/hero-pour.png`}
                alt="Pouring cold brew over ice" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              
              {/* Floating badge */}
              <div className="absolute bottom-8 right-8 z-20 bg-background/90 backdrop-blur-md p-4 rounded-2xl shadow-lg transform rotate-[-3deg]">
                <p className="font-display font-bold text-xl text-foreground">1 : 1 Ratio</p>
                <p className="text-sm text-muted-foreground font-medium">Concentrate to Milk</p>
              </div>
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
