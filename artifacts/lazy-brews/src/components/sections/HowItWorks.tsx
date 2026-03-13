import React from "react";
import { motion } from "framer-motion";
import { Droplet, GlassWater, Sparkles } from "lucide-react";

const steps = [
  {
    title: "Take Lazy Brew's",
    description: "Start with one part of our premium, highly concentrated cold brew.",
    icon: Droplet,
  },
  {
    title: "Mix 1:1 Ratio",
    description: "Add one equal part of cold water, or your favorite milk/oat milk.",
    icon: GlassWater,
  },
  {
    title: "Ready in Minutes",
    description: "Add ice, stir, and enjoy perfect cafe-quality cold coffee instantly.",
    icon: Sparkles,
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-display font-bold text-foreground mb-4"
          >
            Ridiculously Simple.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground"
          >
            No brewing, no waiting overnight, no messy filters. Just pure flavor in three easy steps.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connector line behind steps - hidden on mobile */}
          <div className="hidden md:block absolute top-1/2 left-[10%] right-[10%] h-0.5 bg-secondary -translate-y-1/2 z-0" />

          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="relative z-10 flex flex-col items-center text-center group"
            >
              <div className="w-20 h-20 rounded-2xl bg-background border-4 border-white shadow-xl flex items-center justify-center mb-6 text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                <step.icon className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-display font-bold mb-3">{step.title}</h3>
              <p className="text-muted-foreground leading-relaxed max-w-xs">
                {step.description}
              </p>
              
              <div className="mt-6 text-sm font-bold text-primary/60 tracking-widest uppercase">
                STEP 0{index + 1}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
