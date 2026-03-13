import React from "react";
import { Coffee, Instagram, Facebook, Twitter } from "lucide-react";
import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="bg-foreground text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-6 w-fit">
              <div className="bg-primary text-foreground p-2 rounded-xl">
                <Coffee className="w-6 h-6" />
              </div>
              <span className="font-display font-bold text-2xl tracking-tight">
                Lazy Brew's
              </span>
            </Link>
            <p className="text-white/70 max-w-sm text-lg leading-relaxed mb-8">
              Cold brew concentrate that mixes 1:1 with water or milk. Perfect iced coffee, ready in minutes.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary hover:text-foreground transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary hover:text-foreground transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary hover:text-foreground transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-6 font-display">Shop</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-white/70 hover:text-primary transition-colors">Classic Cold Coffee</a></li>
              <li><a href="#" className="text-white/70 hover:text-primary transition-colors">Hazelnut Flavor</a></li>
              <li><a href="#" className="text-white/70 hover:text-primary transition-colors">Vanilla Cold Coffee</a></li>
              <li><a href="#" className="text-white/70 hover:text-primary transition-colors">Variety Pack</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-6 font-display">Company</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-white/70 hover:text-primary transition-colors">Our Story</a></li>
              <li><a href="#" className="text-white/70 hover:text-primary transition-colors">FAQ</a></li>
              <li><a href="#" className="text-white/70 hover:text-primary transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-white/70 hover:text-primary transition-colors">Wholesale</a></li>
            </ul>
          </div>
          
        </div>
        
        <div className="border-t border-white/10 pt-8 pb-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/50 mb-8">
            <p>© {new Date().getFullYear()} Lazy Brew's. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
          
          <div className="text-center border-t border-white/10 pt-8 space-y-4">
            <p className="text-lg font-semibold text-primary">NEW RELEASES COMING SOON</p>
            <p className="text-white/70">Contact Us On Whatsapp: <a href="https://wa.me/919930591820" className="text-primary hover:text-white transition-colors">9930591820</a></p>
          </div>
        </div>
      </div>
    </footer>
  );
}
