"use client";

import { useState, useEffect, useRef } from "react";
import { Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  amazonLink: string;
}

export default function Collection() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [imageIndexes, setImageIndexes] = useState<Record<string, number>>({});

  useEffect(() => {
    fetch("/api/products", { cache: "no-store" })
      .then((res) => {
        if (!res.ok) throw new Error("API failed");
        return res.json();
      })
      .then((data) => {
        if (!Array.isArray(data)) {
          data = [];
        }
        setProducts(data);
        const initials: Record<string, number> = {};
        data.forEach((p: Product) => {
          initials[p.id] = 0;
        });
        setImageIndexes(initials);
        setLoading(false);
      })
      .catch(() => {
        setProducts([]);
        setLoading(false);
      });
  }, []);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  };

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    if (el) {
      el.addEventListener("scroll", checkScroll, { passive: true });
      window.addEventListener("resize", checkScroll);
      return () => {
        el.removeEventListener("scroll", checkScroll);
        window.removeEventListener("resize", checkScroll);
      };
    }
  }, [products]);

  const scroll = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.querySelector(".product-card")?.clientWidth || 320;
    const amount = direction === "left" ? -cardWidth - 24 : cardWidth + 24;
    el.scrollBy({ left: amount, behavior: "smooth" });
  };

  const handleImageNav = (
    e: React.MouseEvent,
    productId: string,
    totalImages: number,
    direction: "prev" | "next"
  ) => {
    e.preventDefault();
    e.stopPropagation();
    setImageIndexes((prev) => {
      const current = prev[productId] || 0;
      if (direction === "next") {
        return { ...prev, [productId]: (current + 1) % totalImages };
      } else {
        return { ...prev, [productId]: current === 0 ? totalImages - 1 : current - 1 };
      }
    });
  };

  if (loading) {
    return (
      <section id="collection" className="py-24 md:py-32 bg-forest relative min-h-[500px] flex justify-center items-center">
        <div className="w-10 h-10 border-3 border-cream/20 border-t-cream rounded-full animate-spin"></div>
      </section>
    );
  }

  return (
    <section id="collection" className="py-24 md:py-32 bg-forest relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-forest-light/40 rounded-full blur-3xl -translate-x-1/3 translate-y-1/3" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Heading */}
        <div className="text-center mb-12 md:mb-16">
          <span className="inline-flex items-center gap-2 bg-gold/10 border border-gold/20 rounded-full px-4 py-2 animate-fade-in mb-6">
            <Sparkles className="w-4 h-4 text-gold" />
            <span className="text-gold text-xs font-semibold tracking-widest uppercase">
              The Collection
            </span>
          </span>
          <h2 className="font-[var(--font-playfair)] text-4xl md:text-5xl lg:text-6xl font-bold text-cream">
            Discover Your Signature Scent
          </h2>
          <div className="section-divider mt-8" />
          <p className="text-cream/70 mt-6 max-w-2xl mx-auto text-lg font-light leading-relaxed">
            Premium fragrances bound in luxurious aesthetic glass bottles. Hand-blown to compliment any car interior.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative group/carousel">
          {/* Left Arrow */}
          {canScrollLeft && (
            <button
              onClick={() => scroll("left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 z-20 w-12 h-12 rounded-full bg-forest-dark/90 backdrop-blur border border-cream/10 text-cream flex items-center justify-center hover:bg-gold hover:text-forest transition-all duration-300 shadow-2xl opacity-0 group-hover/carousel:opacity-100 md:flex hidden"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}

          {/* Right Arrow */}
          {canScrollRight && (
            <button
              onClick={() => scroll("right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 z-20 w-12 h-12 rounded-full bg-forest-dark/90 backdrop-blur border border-cream/10 text-cream flex items-center justify-center hover:bg-gold hover:text-forest transition-all duration-300 shadow-2xl opacity-0 group-hover/carousel:opacity-100 md:flex hidden"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          )}

          {/* Scrollable Row */}
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 scrollbar-hide"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {products.map((product) => {
              const currentImgIndex = imageIndexes[product.id] || 0;
              const hasMultipleImages = product.images.length > 1;

              return (
                <Link
                  href={`/product/${product.id}`}
                  key={product.id}
                  className="product-card flex-shrink-0 w-[280px] sm:w-[300px] md:w-[340px] snap-start group glass rounded-3xl overflow-hidden hover:bg-white/5 transition-all duration-500 hover:-translate-y-2 border border-cream/5 hover:border-gold/20 flex flex-col cursor-pointer"
                >
                  {/* Image Section with horizontal scroll within card */}
                  <div className="relative aspect-[4/5] bg-forest-dark/30 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-forest-dark/80 z-10 pointer-events-none" />

                    {/* Current Image */}
                    {product.images[currentImgIndex] ? (
                      <img
                        src={product.images[currentImgIndex]}
                        alt={product.name}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-cream/30 text-xs">No Image</span>
                      </div>
                    )}

                    {/* Image Navigation Arrows (inside the card image) */}
                    {hasMultipleImages && (
                      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-2 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button
                          onClick={(e) => handleImageNav(e, product.id, product.images.length, "prev")}
                          className="w-8 h-8 rounded-full bg-forest/80 backdrop-blur text-cream flex items-center justify-center hover:bg-gold hover:text-forest transition-colors shadow-lg"
                          aria-label="Previous image"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button
                          onClick={(e) => handleImageNav(e, product.id, product.images.length, "next")}
                          className="w-8 h-8 rounded-full bg-forest/80 backdrop-blur text-cream flex items-center justify-center hover:bg-gold hover:text-forest transition-colors shadow-lg"
                          aria-label="Next image"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    )}

                    {/* Image Dots Indicator */}
                    {hasMultipleImages && (
                      <div className="absolute bottom-10 left-0 right-0 flex justify-center gap-1.5 z-20">
                        {product.images.map((_, i) => (
                          <div
                            key={i}
                            className={`h-1.5 rounded-full transition-all duration-300 ${
                              i === currentImgIndex ? "w-4 bg-gold" : "w-1.5 bg-cream/40"
                            }`}
                          />
                        ))}
                      </div>
                    )}

                    {/* Price Badge */}
                    <div className="absolute bottom-3 left-3 z-20">
                      <span className="font-[var(--font-playfair)] text-2xl font-bold text-cream drop-shadow-lg">
                        ₹{product.price}
                      </span>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-5 md:p-6 flex flex-col flex-1 relative z-20">
                    <h3 className="font-[var(--font-playfair)] text-xl font-bold text-cream mb-2 group-hover:text-gold transition-colors line-clamp-1">
                      {product.name}
                    </h3>
                    <p className="text-cream/50 text-sm leading-relaxed font-light line-clamp-2 flex-1">
                      {product.description}
                    </p>
                    <div className="mt-4 flex items-center gap-2 text-gold text-sm font-medium">
                      <span>View Details</span>
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Mobile Scroll Controls */}
          {products.length > 0 && (
            <div className="flex justify-center gap-2 mt-6 md:hidden">
              <button
                onClick={() => scroll("left")}
                disabled={!canScrollLeft}
                className="w-10 h-10 rounded-full border border-cream/20 text-cream/60 flex items-center justify-center disabled:opacity-20 hover:border-gold hover:text-gold transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => scroll("right")}
                disabled={!canScrollRight}
                className="w-10 h-10 rounded-full border border-cream/20 text-cream/60 flex items-center justify-center disabled:opacity-20 hover:border-gold hover:text-gold transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
