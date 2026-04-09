"use client";

import { ShoppingBag } from "lucide-react";
import { trackAndRedirect } from "@/lib/track";

export default function StickyFooter() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
      <div className="bg-forest/95 backdrop-blur-lg border-t border-gold/15 px-4 py-3 flex items-center justify-between gap-4 shadow-[0_-4px_20px_rgba(0,0,0,0.3)]">
        <div>
          <p className="text-cream text-xs opacity-60">Essenzae Laux</p>
          <div className="flex items-baseline gap-2">
            <span className="text-cream/40 line-through text-xs">₹699</span>
            <span className="font-[var(--font-playfair)] text-xl font-bold text-cream">
              ₹399
            </span>
          </div>
        </div>
        <button
          onClick={() => trackAndRedirect("https://www.amazon.com/dp/placeholder", "sticky-footer-buy")}
          id="sticky-buy-btn"
          className="bg-gradient-to-r from-amazon-yellow to-amazon-yellow-dark text-charcoal font-bold text-sm px-6 py-3 rounded-full flex items-center gap-2 shadow-lg hover:shadow-xl transition-all active:scale-95"
        >
          <ShoppingBag className="w-4 h-4" />
          Buy on Amazon
        </button>
      </div>
    </div>
  );
}
