"use client";

import Image from "next/image";
import { Droplets, Award, Leaf, Sparkles, ShieldCheck } from "lucide-react";

export default function QualityPromise() {
  const badges = [
    { icon: Droplets, label: "Alcohol Free", isImage: false },
    { icon: Award, label: "IFRA Certified", isImage: false },
    { icon: Leaf, label: "Phthalates Free", isImage: false },
    { icon: "/make-in-india-v2.png", label: "Make in India", isImage: true },
  ];

  return (
    <section className="py-24 bg-cream relative">
      {/* SVG Filters for recoloring the PNG */}
      <svg width="0" height="0" className="hidden">
        <filter id="black-to-charcoal">
          <feColorMatrix type="matrix" values="
              0 0 0 0 0.172
              0 0 0 0 0.172
              0 0 0 0 0.172
              -4 -4 -4 0 5
          " />
        </filter>
        <filter id="black-to-gold">
          <feColorMatrix type="matrix" values="
              0 0 0 0 0.788
              0 0 0 0 0.663
              0 0 0 0 0.431
              -4 -4 -4 0 5
          " />
        </filter>
      </svg>

      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 md:mb-20">
          <h2 className="font-[var(--font-playfair)] text-4xl lg:text-5xl font-bold text-charcoal">
            Our Quality Promise
          </h2>
          <div className="section-divider mt-6" />
        </div>

        {/* Badges Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-24">
          {badges.map((b, i) => {
            const Icon = b.icon as React.ElementType;
            return (
              <div key={i} className="flex flex-col items-center text-center group cursor-pointer">
                <div className="w-28 h-28 rounded-full border-2 border-charcoal flex items-center justify-center mb-5 group-hover:bg-forest group-hover:border-forest transition-all duration-300 shadow-sm group-hover:shadow-lg group-hover:-translate-y-1 overflow-hidden">
                  {b.isImage && typeof b.icon === "string" ? (
                    <div className="relative w-20 h-20 transition-all duration-300 [&>img]:[filter:url(#black-to-charcoal)] group-hover:[&>img]:[filter:url(#black-to-gold)]">
                      <Image src={b.icon} alt={b.label} fill className="object-contain transition-all duration-300" />
                    </div>
                  ) : (
                    <Icon className="w-12 h-12 text-charcoal group-hover:text-gold transition-colors duration-300" />
                  )}
                </div>
                <h3 className="text-charcoal font-bold tracking-widest uppercase text-sm md:text-base">
                  {b.label}
                </h3>
              </div>
            );
          })}
        </div>

        {/* Laboratory Splitting */}
        <div className="bg-forest rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row items-center border border-cream-dark">
          <div className="w-full md:w-1/2 relative h-80 md:h-[450px]">
            <Image
              src="/laboratory-tested.png"
              alt="Laboratory tested formulation"
              fill
              className="object-cover"
            />
            {/* Mobile gradient overlay for smoother text transition if needed */}
            <div className="absolute inset-0 bg-gradient-to-t from-forest to-transparent opacity-80 md:hidden" />
          </div>

          <div className="w-full md:w-1/2 p-10 lg:p-16 flex flex-col justify-center relative -mt-10 md:mt-0 z-10">
            <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mb-6">
              <ShieldCheck className="w-8 h-8 text-gold" />
            </div>
            <p className="text-xl lg:text-2xl text-cream/90 font-[var(--font-playfair)] leading-relaxed italic">
              "100% alcohol-free formulation. Crafted with premium, globally-certified fragrance oils. Expertly blended in-house for a long-lasting, consistent scent."
            </p>
            <div className="mt-8 flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-gold" />
              <span className="text-gold text-sm font-semibold tracking-wider uppercase">Laboratory Tested</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
