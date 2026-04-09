"use client";

import {
  CircleDot,
  ShieldOff,
  RotateCcw,
  Timer,
  CarFront,
} from "lucide-react";

const steps = [
  {
    icon: CircleDot,
    title: "Unscrew Wooden Lid",
    desc: "Gently twist and remove the natural wooden lid from the glass bottle.",
  },
  {
    icon: ShieldOff,
    title: "Remove Plastic Stopper",
    desc: "Pull out the inner plastic seal to allow the fragrance oil to flow freely.",
  },
  {
    icon: RotateCcw,
    title: "Screw Lid Back On",
    desc: "Securely screw the wooden lid back onto the bottle to seal it properly.",
  },
  {
    icon: Timer,
    title: "Flip for 5–8 Seconds",
    desc: "Turn the bottle upside down for 5–8 seconds until the wood absorbs the oil.",
  },
  {
    icon: CarFront,
    title: "Hang & Enjoy",
    desc: "Hang on your rearview mirror, adjust the rope length, and enjoy the premium scent.",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="py-24 md:py-32 bg-cream relative overflow-hidden"
    >
      {/* Decorative */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-gold/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        {/* Heading */}
        <div className="text-center mb-16 md:mb-20">
          <span className="text-gold text-xs font-bold tracking-[0.2em] uppercase">
            Simple Setup
          </span>
          <h2 className="font-[var(--font-playfair)] text-3xl md:text-4xl lg:text-5xl font-bold text-forest mt-3">
            How It Works
          </h2>
          <div className="section-divider mt-6" />
          <p className="text-charcoal/60 mt-6 max-w-md mx-auto text-lg">
            Five effortless steps to fill your space with luxury fragrance.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="timeline-line" />

          <div className="space-y-12 md:space-y-16">
            {steps.map((step, i) => {
              const Icon = step.icon;
              const isEven = i % 2 === 0;
              return (
                <div
                  key={i}
                  className={`relative flex flex-col md:flex-row items-start md:items-center gap-6 ${
                    isEven ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Content card */}
                  <div
                    className={`flex-1 ml-16 md:ml-0 ${
                      isEven ? "md:text-right md:pr-16" : "md:text-left md:pl-16"
                    }`}
                  >
                    <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-cream-dark/50 hover:shadow-lg hover:border-gold/20 transition-all duration-300 group">
                      <h3 className="font-[var(--font-playfair)] text-lg md:text-xl font-semibold text-forest group-hover:text-gold-dark transition-colors">
                        {step.title}
                      </h3>
                      <p className="text-charcoal/60 mt-2 text-sm leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </div>

                  {/* Center icon */}
                  <div className="absolute left-3 md:left-1/2 md:-translate-x-1/2 z-10">
                    <div className="w-[52px] h-[52px] rounded-full bg-forest flex items-center justify-center border-4 border-cream shadow-lg group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5 text-gold" />
                    </div>
                    <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-gold/50 text-xs font-bold">
                      0{i + 1}
                    </span>
                  </div>

                  {/* Spacer for opposite side */}
                  <div className="flex-1 hidden md:block" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
