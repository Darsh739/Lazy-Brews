import React from "react";
import { motion } from "framer-motion";
import { Leaf, Clock, ShieldCheck, HeartPulse } from "lucide-react";

const features = [
  {
    title: "100% All Natural",
    description: "Only filtered water and premium Arabica beans. Nothing else.",
    icon: Leaf,
  },
  {
    title: "Ready in Seconds",
    description: "Skip the lines and the 12-hour brewing process at home.",
    icon: Clock,
  },
  {
    title: "Zero Preservatives",
    description: "Pasteurized and sealed tight to stay fresh without chemicals.",
    icon: ShieldCheck,
  },
  {
    title: "Healthier Choice",
    description: "Less acidic than hot brewed coffee, easier on your stomach.",
    icon: HeartPulse,
  },
];

export function Features() {
  return (
    <section id="why-us" className="py-24 bg-white relative overflow-hidden">
      {/* Decorative element */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-secondary rounded-full blur-[100px] opacity-50 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            {/* beautiful lifestyle cafe image */}
            <div className="relative rounded-[2rem] overflow-hidden shadow-xl aspect-square">
              <img 
                src="https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=1200&h=1200&fit=crop"
                alt="Coffee beans and setup"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-primary/20 mix-blend-overlay" />
            </div>
          </motion.div>

          <div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl font-display font-bold text-foreground mb-4"
            >
              Why Lazy Brew's?
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-muted-foreground mb-12"
            >
              We believe great coffee shouldn't require hard work. Our concentrate gives you barista-level quality with zero effort.
            </motion.p>

            <div className="grid sm:grid-cols-2 gap-8">
              {features.map((feature, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + (index * 0.1) }}
                  className="flex gap-4"
                >
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                      <feature.icon className="w-6 h-6" />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2 text-foreground">{feature.title}</h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
