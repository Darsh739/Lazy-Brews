import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Star, Users, Gift, Zap } from "lucide-react";

export function FoundingMember() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("registered") === "true") {
      setStatus("success");
    }
  }, []);

  const handleGoogleSignIn = () => {
    window.location.href = "/api/auth/google";
  };

  const perks = [
    { icon: Gift, text: "Exclusive early-access flavors" },
    { icon: Star, text: "Member-only discounts" },
    { icon: Zap, text: "First to try new drinks" },
    { icon: Users, text: "Join a community of coffee lovers" },
  ];

  return (
    <section id="founding-member" className="py-24 bg-secondary/30 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/15 text-primary text-sm font-semibold mb-6">
            <Star className="w-4 h-4" fill="currentColor" />
            <span>Limited Spots Available</span>
          </div>

          <h2 className="text-4xl lg:text-5xl font-display font-bold text-foreground mb-6 leading-tight">
            Become a Founding Member
          </h2>

          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
            Early members get exclusive flavors, discounts, and first access to new drinks by signing up.
          </p>

          <div className="grid sm:grid-cols-2 gap-4 max-w-xl mx-auto mb-12">
            {perks.map((perk, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-3 bg-background/70 backdrop-blur-sm rounded-2xl px-5 py-4 border border-border/40 text-left"
              >
                <div className="w-9 h-9 rounded-full bg-primary/15 text-primary flex items-center justify-center flex-shrink-0">
                  <perk.icon className="w-4 h-4" />
                </div>
                <span className="text-sm font-medium text-foreground">{perk.text}</span>
              </motion.div>
            ))}
          </div>

          {status === "success" ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex flex-col items-center gap-3 bg-green-50 border border-green-200 text-green-800 rounded-2xl px-10 py-6"
            >
              <Star className="w-8 h-8 text-green-600" fill="currentColor" />
              <p className="text-lg font-bold">You're in! Welcome, Founding Member!</p>
              <p className="text-sm text-green-700">Check your inbox — we'll be in touch soon.</p>
            </motion.div>
          ) : (
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleGoogleSignIn}
              className="inline-flex items-center gap-3 bg-white text-gray-800 font-semibold text-base px-8 py-4 rounded-2xl shadow-lg shadow-black/10 border border-gray-200 hover:shadow-xl hover:shadow-black/15 transition-all duration-300 cursor-pointer"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Sign up with Google
            </motion.button>
          )}

          <p className="text-xs text-muted-foreground mt-5">
            We respect your privacy. No spam, ever.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
