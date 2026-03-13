import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingBag, Plus, Minus, Trash2, ShoppingCart, MessageCircle } from "lucide-react";

const flavors = [
  {
    id: "classic",
    name: "Classic Cold Coffee",
    description: "Our signature blend. Bold, smooth, and perfectly balanced for the purist.",
    image: "bottle-classic.png",
    color: "bg-primary/10",
    badges: ["Zero Preservatives", "Zero Sugar"],
    price: "Rs.59/100ml",
    priceValue: 59,
  },
  {
    id: "hazelnut",
    name: "Hazelnut Cold Coffee",
    description: "Rich roasted hazelnut notes perfectly complement our smooth cold brew.",
    image: "bottle-hazelnut.png",
    color: "bg-[#A67C52]/10",
    badges: ["Natural Flavor"],
    price: "Rs.89/100ml",
    priceValue: 89,
  },
  {
    id: "vanilla",
    name: "Vanilla Cold Coffee",
    description: "Smooth, creamy vanilla notes that elevate your morning coffee experience.",
    image: "bottle-vanilla.png",
    color: "bg-[#E8D5C4]/30",
    badges: ["Fan Favorite"],
    price: "Rs.89/100ml",
    priceValue: 89,
  },
];

type Cart = Record<string, number>;

export function Flavors() {
  const [cart, setCart] = useState<Cart>({});

  const addToCart = (id: string) => {
    setCart((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const increment = (id: string) => {
    setCart((prev) => ({ ...prev, [id]: prev[id] + 1 }));
  };

  const decrement = (id: string) => {
    setCart((prev) => {
      const next = { ...prev };
      if (next[id] <= 1) delete next[id];
      else next[id] -= 1;
      return next;
    });
  };

  const removeItem = (id: string) => {
    setCart((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  };

  const cartItems = flavors.filter((f) => cart[f.id] > 0);
  const totalItems = cartItems.reduce((sum, f) => sum + cart[f.id], 0);
  const totalPrice = cartItems.reduce((sum, f) => sum + f.priceValue * cart[f.id], 0);
  const hasItems = cartItems.length > 0;

  const handlePreOrder = () => {
    const lines = cartItems.map(
      (f) => `• ${f.name} x${cart[f.id]} (${f.price} each)`
    );
    const message = [
      "Hi! I'd like to pre-order from Lazy Brew's 🧋",
      "",
      ...lines,
      "",
      `Total: Rs.${totalPrice} (for ${totalItems} unit${totalItems > 1 ? "s" : ""})`,
      "",
      "Please let me know the next steps!",
    ].join("\n");

    const url = `https://wa.me/919930591820?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

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
              Meet Your New <br className="hidden md:block" /> Morning Ritual.
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

          {hasItems && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-2 bg-primary text-primary-foreground px-5 py-3 rounded-2xl shadow-lg"
            >
              <ShoppingCart className="w-5 h-5" />
              <span className="font-semibold">
                {totalItems} item{totalItems > 1 ? "s" : ""} in cart
              </span>
            </motion.div>
          )}
        </div>

        {/* Flavor Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
          {flavors.map((flavor, index) => {
            const qty = cart[flavor.id] || 0;
            const inCart = qty > 0;
            return (
              <motion.div
                key={flavor.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className={`bg-card rounded-[2rem] p-6 shadow-lg shadow-black/5 border transition-all duration-500 group flex flex-col h-full ${
                  inCart
                    ? "border-primary/50 shadow-primary/10 shadow-xl"
                    : "border-border/50 hover:shadow-xl hover:border-primary/30"
                }`}
              >
                {/* Image */}
                <div
                  className={`relative rounded-3xl ${flavor.color} aspect-[4/5] mb-6 overflow-hidden flex items-center justify-center p-8`}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
                  <img
                    src={`${import.meta.env.BASE_URL}images/${flavor.image}`}
                    alt={flavor.name}
                    className="h-full object-contain filter drop-shadow-2xl transition-transform duration-700 group-hover:scale-105 z-20"
                  />
                  <div className="absolute top-4 left-4 z-30 flex flex-col gap-2">
                    {flavor.badges.map((badge) => (
                      <Badge
                        key={badge}
                        className="shadow-sm backdrop-blur-md bg-white/80 text-foreground border-none"
                      >
                        {badge}
                      </Badge>
                    ))}
                  </div>
                  {inCart && (
                    <div className="absolute top-4 right-4 z-30 w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold shadow-md">
                      {qty}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-grow flex flex-col">
                  <h3 className="text-2xl font-display font-bold mb-2">{flavor.name}</h3>
                  <p className="text-muted-foreground mb-6 flex-grow">{flavor.description}</p>

                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-border">
                    <span className="text-xl font-bold text-foreground">{flavor.price}</span>

                    {inCart ? (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => decrement(flavor.id)}
                          className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:bg-destructive/10 hover:border-destructive/40 hover:text-destructive transition-colors"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-6 text-center font-bold text-sm">{qty}</span>
                        <button
                          onClick={() => increment(flavor.id)}
                          className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:bg-primary/10 hover:border-primary/40 hover:text-primary transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ) : (
                      <Button
                        variant="outline"
                        className="rounded-xl group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all"
                        onClick={() => addToCart(flavor.id)}
                      >
                        <ShoppingBag className="w-4 h-4 mr-2" /> Add
                      </Button>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Sugar syrup tip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex items-start gap-4 bg-primary/10 border border-primary/20 rounded-2xl px-6 py-5 max-w-2xl mx-auto mb-12"
        >
          <span className="text-2xl flex-shrink-0">💡</span>
          <p className="text-sm text-foreground leading-relaxed">
            <span className="font-semibold">Prefer it sweet?</span> Mix{" "}
            <span className="font-semibold">10–15 ml of sugar syrup</span> along with your cold
            brew and milk or water for a perfectly sweetened cup.
          </p>
        </motion.div>

        {/* Cart Summary */}
        <AnimatePresence>
          {hasItems && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="bg-card border border-primary/20 rounded-[2rem] p-6 md:p-8 shadow-xl shadow-primary/5"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-primary/15 text-primary flex items-center justify-center">
                  <ShoppingCart className="w-5 h-5" />
                </div>
                <h3 className="text-2xl font-display font-bold text-foreground">Your Cart</h3>
              </div>

              <div className="space-y-3 mb-6">
                {cartItems.map((flavor) => (
                  <div
                    key={flavor.id}
                    className="bg-background rounded-2xl px-4 py-3 flex flex-col gap-2"
                  >
                    {/* Top row: name + remove */}
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-semibold text-foreground text-sm leading-snug">{flavor.name}</p>
                        <p className="text-xs text-muted-foreground">{flavor.price}</p>
                      </div>
                      <button
                        onClick={() => removeItem(flavor.id)}
                        className="text-muted-foreground hover:text-destructive transition-colors flex-shrink-0 mt-0.5"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    {/* Bottom row: qty controls + total */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => decrement(flavor.id)}
                          className="w-7 h-7 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-5 text-center font-bold text-sm">{cart[flavor.id]}</span>
                        <button
                          onClick={() => increment(flavor.id)}
                          className="w-7 h-7 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <p className="font-bold text-foreground text-sm">
                        Rs.{flavor.priceValue * cart[flavor.id]}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between py-4 border-t border-border mb-6">
                <span className="text-muted-foreground font-medium">
                  {totalItems} item{totalItems > 1 ? "s" : ""}
                </span>
                <span className="text-2xl font-bold text-foreground">Rs.{totalPrice}</span>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handlePreOrder}
                className="w-full flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-bold text-lg py-4 rounded-2xl shadow-lg shadow-green-500/20 transition-colors"
              >
                <MessageCircle className="w-6 h-6" />
                PRE ORDER NOW
              </motion.button>

              <p className="text-sm text-muted-foreground text-center mt-3 leading-relaxed">
                Pre order now to become a founding customer and redeem exclusive offers and insights to unreleased flavours.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
