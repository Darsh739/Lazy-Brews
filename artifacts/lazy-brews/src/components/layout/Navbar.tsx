import React, { useState, useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Coffee, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled 
          ? "bg-background/80 backdrop-blur-md shadow-sm py-4" 
          : "bg-transparent py-6"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-primary text-primary-foreground p-2 rounded-xl group-hover:rotate-12 transition-transform duration-300">
              <Coffee className="w-6 h-6" />
            </div>
            <span className="font-display font-bold text-2xl tracking-tight text-foreground">
              Lazy Brew's
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <a 
              href="#how-it-works" 
              onClick={(e) => handleNavClick(e, 'how-it-works')}
              className="text-foreground/80 hover:text-primary transition-colors font-medium"
            >
              How It Works
            </a>
            <a 
              href="#flavors" 
              onClick={(e) => handleNavClick(e, 'flavors')}
              className="text-foreground/80 hover:text-primary transition-colors font-medium"
            >
              Flavours
            </a>
            <a 
              href="#why-us" 
              onClick={(e) => handleNavClick(e, 'why-us')}
              className="text-foreground/80 hover:text-primary transition-colors font-medium"
            >
              Why Us
            </a>
            <Button 
              onClick={() => document.getElementById('flavors')?.scrollIntoView({ behavior: "smooth" })}
            >
              Shop Now
            </Button>
          </nav>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background border-b border-border overflow-hidden"
          >
            <div className="px-4 py-6 flex flex-col gap-4">
              <a 
                href="#how-it-works" 
                onClick={(e) => handleNavClick(e, 'how-it-works')}
                className="text-lg font-medium p-2 hover:bg-secondary rounded-lg"
              >
                How It Works
              </a>
              <a 
                href="#flavors" 
                onClick={(e) => handleNavClick(e, 'flavors')}
                className="text-lg font-medium p-2 hover:bg-secondary rounded-lg"
              >
                Flavours
              </a>
              <a 
                href="#why-us" 
                onClick={(e) => handleNavClick(e, 'why-us')}
                className="text-lg font-medium p-2 hover:bg-secondary rounded-lg"
              >
                Why Us
              </a>
              <Button 
                className="w-full mt-4"
                onClick={() => {
                  setMobileMenuOpen(false);
                  document.getElementById('flavors')?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Shop Now
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
