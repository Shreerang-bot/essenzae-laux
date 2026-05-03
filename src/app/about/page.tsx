"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Leaf, Heart, Award, Users, Sparkles, Phone } from "lucide-react";

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

export default function AboutPage() {
  return (
    <main className="overflow-x-hidden">
      <Navbar />

      {/* Hero */}
      <section className="relative bg-forest pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-gold/5 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-gold/3 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <span className="inline-flex items-center gap-2 bg-gold/10 border border-gold/20 rounded-full px-4 py-2 animate-fade-in mb-6">
            <Sparkles className="w-4 h-4 text-gold" />
            <span className="text-gold text-xs font-semibold tracking-widest uppercase">Our Story</span>
          </span>
          <h1 className="font-[var(--font-playfair)] text-5xl md:text-6xl lg:text-7xl font-bold text-cream leading-tight">
            Essenzae Laux<br />
            <span className="text-gold">Collection</span>
          </h1>
          <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mt-8" />
        </div>
      </section>

      {/* Main About Content */}
      <section className="py-20 md:py-28 bg-cream">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center space-y-8">
            <p className="text-charcoal/80 text-lg md:text-xl leading-relaxed font-light italic">
              At Essenzae Laux, every fragrance is designed to become a part of your everyday living – subtle, refined, and quietly memorable. Whether at home or on the move, our scents are crafted to stay with you, long after the moment has passed.
            </p>

            <p className="font-[var(--font-playfair)] text-3xl md:text-4xl font-bold text-forest italic">
              Experience the essence.
            </p>

            <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto" />

            <div className="pt-4 space-y-3">
              <p className="font-[var(--font-playfair)] text-xl md:text-2xl text-forest font-semibold">
                Handcrafted by Ankita Laddha!
              </p>
              <div className="flex items-center justify-center gap-2 text-charcoal/70">
                <Phone className="w-4 h-4 text-gold" />
                <a href="tel:+917709219444" className="text-base font-medium hover:text-gold transition-colors">
                  Contact now: +91 7709 219 444
                </a>
              </div>
              <a
                href="https://instagram.com/ESSENZAE_LAUX"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-charcoal/60 hover:text-gold transition-colors text-sm font-medium"
              >
                <InstagramIcon className="w-4 h-4" />
                @ESSENZAE_LAUX
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 md:py-28 bg-white border-t border-cream-dark/30">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="font-[var(--font-playfair)] text-3xl md:text-4xl font-bold text-forest">
              What We Stand For
            </h2>
            <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mt-6" />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Award, title: "Premium Quality", desc: "Hand-blown glass bottles and natural wooden lids crafted with precision." },
              { icon: Leaf, title: "100% Natural", desc: "Pure essential oil blends — no synthetic chemicals or harmful additives." },
              { icon: Heart, title: "Made with Love", desc: "Every bottle is a labour of passion — designed to delight your senses." },
              { icon: Users, title: "Customer First", desc: "Direct WhatsApp support, fast delivery, and a quality-assured experience." },
            ].map((value) => {
              const Icon = value.icon;
              return (
                <div key={value.title} className="p-6 rounded-2xl bg-cream/50 border border-cream-dark/30 hover:border-gold/20 hover:shadow-lg transition-all duration-300 group text-center">
                  <div className="w-14 h-14 rounded-2xl bg-forest/5 flex items-center justify-center mx-auto mb-4 group-hover:bg-gold/10 transition-colors">
                    <Icon className="w-6 h-6 text-forest group-hover:text-gold transition-colors" />
                  </div>
                  <h3 className="font-[var(--font-playfair)] text-lg font-semibold text-forest mb-2">{value.title}</h3>
                  <p className="text-charcoal/60 text-sm leading-relaxed font-light">{value.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
