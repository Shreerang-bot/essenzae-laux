"use client";

import Image from "next/image";
import { Gift, Check, ShoppingBag } from "lucide-react";
import { trackAndRedirect } from "@/lib/track";

const highlights = [
  "Premium gold-dotted packaging box",
  "Elegant cream & gold color scheme",
  "Perfect for gifting on any occasion",
  "Unboxing experience that wows",
];

export default function Packaging() {
  return (
    <section
      id="packaging"
      className="py-24 md:py-32 bg-forest relative overflow-hidden"
    >
      {/* Decorative */}
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Heading */}
        <div className="text-center mb-16">
          <span className="text-gold-dark text-xs font-bold tracking-[0.2em] uppercase">
            Gift-Worthy Presentation
          </span>
          <h2 className="font-[var(--font-playfair)] text-3xl md:text-4xl lg:text-5xl font-bold text-cream mt-3">
            Premium Packaging
          </h2>
          <div className="section-divider mt-6" />
        </div>

        <div className="flex flex-col lg:flex-row-reverse items-center gap-16">
          {/* Image */}
          <div className="flex-1 flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gold/10 rounded-3xl blur-2xl scale-95" />
              <Image
                src="/packaging-gift.png"
                alt="Essenzae Laux perfume bottle with gold and cream packaging box"
                width={480}
                height={480}
                className="relative rounded-3xl object-cover shadow-2xl border border-cream-dark"
              />
              {/* Floating badge */}
              <div className="absolute -top-4 -right-4 bg-charcoal border border-gold/20 rounded-2xl px-4 py-3 shadow-xl">
                <Gift className="w-6 h-6 text-gold" />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 space-y-8">
            <p className="text-cream/80 text-lg leading-relaxed max-w-md">
              Every Essenzae Laux diffuser comes in a beautifully designed
              packaging box with gold-dotted accents — making it a stunning
              gift for loved ones or a luxurious treat for yourself.
            </p>

            <ul className="space-y-4">
              {highlights.map((item, i) => (
                <li key={i} className="flex items-start gap-3 group">
                  <div className="w-6 h-6 rounded-full bg-cream/10 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-cream/20 transition-colors">
                    <Check className="w-3.5 h-3.5 text-gold" />
                  </div>
                  <span className="text-cream/70 group-hover:text-cream transition-colors">
                    {item}
                  </span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => trackAndRedirect("https://www.amazon.com/dp/placeholder", "premium-packaging-buy")}
              id="packaging-buy-btn"
              className="btn-amazon inline-flex items-center gap-3"
            >
              <ShoppingBag className="w-5 h-5" />
              Buy on Amazon
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
