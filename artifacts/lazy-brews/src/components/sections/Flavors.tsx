import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingBag } from "lucide-react";

const flavors = [
  {
    id: "classic",
    name: "Classic Cold Coffee",
    description: "Our signature blend. Bold, smooth, and perfectly balanced for the purist.",
    image: "bottle-classic.png",
    color: "bg-primary/10",
    badges: ["Zero Preservatives", "Zero Sugar"],
    price: "Rs.59/100ml",
  },
  {
    id: "hazelnut",
    name: "Hazelnut Cold Coffee",
    description: "Rich roasted hazelnut notes perfectly complement our smooth cold brew.",
    image: "bottle-hazelnut.png",
    color: "bg-[#A67C52]/10", // Accent color tint
    badges: ["Natural Flavor"],
    price: "Rs.89/100ml",
  },
  {
    id: "vanilla",
    name: "Vanilla Cold Coffee",
    description: "Smooth, creamy vanilla notes that elevate your morning coffee experience.",
    image: "bottle-vanilla.png",
    color: "bg-[#E8D5C4]/30", // Lighter tint
    badges: ["Fan Favorite"],
    price: "Rs.89/100ml",
  },
];

export function Flavors() {
  return (
    <section id="flavors" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-4xl lg:text-5xl font-display font-bold text-foreground mb-4"
            >
              Meet Your New <br className="hidden md:block"/> Morning Ritual.
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-muted-foreground"
            >
              Crafted in small batches for maximum flavor.
            </motion.p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
          {flavors.map((flavor, index) => (
            <motion.div
              key={flavor.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="bg-card rounded-[2rem] p-6 shadow-lg shadow-black/5 border border-border/50 hover:shadow-xl hover:border-primary/30 transition-all duration-500 group flex flex-col h-full"
            >
              {/* Image Container */}
              <div className={`relative rounded-3xl ${flavor.color} aspect-[4/5] mb-6 overflow-hidden flex items-center justify-center p-8`}>
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
                
                <img 
                  src={`${import.meta.env.BASE_URL}images/${flavor.image}`}
                  alt={flavor.name}
                  className="h-full object-contain filter drop-shadow-2xl transition-transform duration-700 group-hover:scale-105 z-20"
                />
                
                <div className="absolute top-4 left-4 z-30 flex flex-col gap-2">
                  {flavor.badges.map(badge => (
                    <Badge key={badge} className="shadow-sm backdrop-blur-md bg-white/80 text-foreground border-none">
                      {badge}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Content */}
              <div className="flex-grow flex flex-col">
                <h3 className="text-2xl font-display font-bold mb-2">{flavor.name}</h3>
                <p className="text-muted-foreground mb-6 flex-grow">{flavor.description}</p>
                
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-border">
                  <span className="text-xl font-bold text-foreground">{flavor.price}</span>
                  <Button 
                    variant="outline" 
                    className="rounded-xl group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all"
                    onClick={() => alert(`Added ${flavor.name} to cart!`)}
                  >
                    <ShoppingBag className="w-4 h-4 mr-2" /> Add
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex items-start gap-4 bg-primary/10 border border-primary/20 rounded-2xl px-6 py-5 max-w-2xl mx-auto"
        >
          <span className="text-2xl flex-shrink-0">💡</span>
          <p className="text-sm text-foreground leading-relaxed">
            <span className="font-semibold">Prefer it sweet?</span> Mix <span className="font-semibold">10–15 ml of sugar syrup</span> along with your cold brew and milk or water for a perfectly sweetened cup.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
