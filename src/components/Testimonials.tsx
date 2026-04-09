"use client";

import { Star, Quote } from "lucide-react";

const reviews = [
  {
    name: "Priya S.",
    rating: 5,
    text: "Absolutely love the scent! My car smells amazing all day long. The packaging was so beautiful I almost didn't want to open it.",
  },
  {
    name: "Arjun M.",
    rating: 5,
    text: "Bought this as a gift for my wife and she was thrilled. The quality of the glass bottle is premium and the fragrance lasts for weeks.",
  },
  {
    name: "Sneha R.",
    rating: 4,
    text: "Perfect for my car — every drive smells wonderful now. The wooden lid adds such an elegant touch. Will definitely reorder!",
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 md:py-32 bg-forest relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 right-20 w-64 h-64 bg-gold/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Heading */}
        <div className="text-center mb-16">
          <span className="text-gold text-xs font-bold tracking-[0.2em] uppercase">
            Customer Love
          </span>
          <h2 className="font-[var(--font-playfair)] text-3xl md:text-4xl lg:text-5xl font-bold text-cream mt-3">
            What Our Customers Say
          </h2>
          <div className="section-divider mt-6" />
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {reviews.map((review, i) => (
            <div
              key={i}
              className="glass rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 group"
            >
              <Quote className="w-8 h-8 text-gold/30 mb-4" />
              <p className="text-cream/70 text-sm leading-relaxed mb-6 italic">
                &ldquo;{review.text}&rdquo;
              </p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-cream font-semibold text-sm">
                    {review.name}
                  </p>
                  <p className="text-cream/40 text-xs">Verified Buyer</p>
                </div>
                <div className="flex gap-0.5">
                  {[...Array(review.rating)].map((_, j) => (
                    <Star
                      key={j}
                      className="w-4 h-4 text-amazon-yellow fill-amazon-yellow"
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
