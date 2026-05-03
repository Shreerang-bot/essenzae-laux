"use client";

import Image from "next/image";
import { ShoppingBag, Star, Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen bg-forest overflow-hidden"
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gold/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gold/3 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-forest-light/30 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-28 pb-20 md:pt-36 md:pb-28 flex flex-col lg:flex-row items-center gap-12 lg:gap-16 min-h-screen">
        {/* Left content */}
        <div className="flex-1 text-center lg:text-left space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/20 rounded-full px-4 py-2 animate-fade-in">
            <Sparkles className="w-4 h-4 text-gold" />
            <span className="text-gold text-xs font-semibold tracking-widest uppercase">
              Premium Collection
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-[var(--font-playfair)] text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-cream leading-[1.1] animate-fade-in-up">
            Elevate Your Space
            <span className="block mt-2 bg-gradient-to-r from-gold-light via-gold to-gold-dark bg-clip-text text-transparent">
              with Essenzae Laux
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-cream/70 text-lg md:text-xl max-w-lg mx-auto lg:mx-0 leading-relaxed animate-fade-in-up delay-200 font-light">
            A premium hanging fragrance diffuser crafted with a hand-blown glass
            bottle and natural wooden lid — designed exclusively for your{" "}
            <span className="text-gold font-medium">car</span>.
          </p>

          {/* Rating */}
          <div className="flex items-center gap-3 justify-center lg:justify-start animate-fade-in-up delay-300">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-5 h-5 text-gold fill-gold"
                />
              ))}
            </div>
            <span className="text-cream/60 text-sm">
              4.8 / 5 · 1,200+ happy customers
            </span>
          </div>

          {/* Price + CTA */}
          <div className="flex flex-col sm:flex-row items-center gap-6 justify-center lg:justify-start animate-fade-in-up delay-400">
            <div className="flex items-baseline gap-2">
              <span className="text-cream/40 line-through text-lg">₹699</span>
              <span className="font-[var(--font-playfair)] text-4xl md:text-5xl font-bold text-cream">
                ₹399
              </span>
              <span className="bg-green-500/20 text-green-400 text-xs font-bold px-2 py-1 rounded-full">
                43% OFF
              </span>
            </div>
          </div>

          <div className="animate-fade-in-up delay-500">
            <a
              href="#collection"
              id="hero-explore-btn"
              className="btn-amazon animate-pulse-glow inline-flex items-center gap-3 text-lg"
            >
              <ShoppingBag className="w-5 h-5" />
              Explore Collection
            </a>
            <p className="text-cream/40 text-xs mt-3 tracking-wide">
              Fast delivery · Premium quality assured
            </p>
          </div>
        </div>

        {/* Right image */}
        <div className="flex-1 flex justify-center items-center animate-slide-right">
          <div className="relative">
            {/* Glow behind image */}
            <div className="absolute inset-0 bg-gold/10 rounded-full blur-3xl scale-90" />
            <div className="relative animate-float">
              <Image
                src="/hero-diffuser.png"
                alt="Essenzae Laux Blue Glass Car Diffuser in Sunlight"
                width={520}
                height={520}
                className="rounded-3xl object-contain drop-shadow-2xl"
                priority
              />
            </div>
            {/* Floating accent badge */}
            <div className="absolute -bottom-4 -left-4 glass rounded-2xl px-5 py-3 animate-fade-in delay-700">
              <p className="text-gold text-xs font-semibold tracking-wide">
                🌿 100% Natural Oils
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom curve */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path
            d="M0 80L60 68C120 56 240 32 360 24C480 16 600 24 720 32C840 40 960 48 1080 44C1200 40 1320 24 1380 16L1440 8V80H0Z"
            fill="var(--color-cream)"
          />
        </svg>
      </div>
    </section>
  );
}
