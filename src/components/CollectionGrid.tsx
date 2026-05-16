"use client";

import { useState, useRef, useCallback } from "react";
import { Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  images: string[];
  category: string;
  amazonLink: string;
}

interface CollectionGridProps {
  products: Product[];
  title: string;
  subtitle: string;
  badge?: string;
}

export default function CollectionGrid({
  products,
  title,
  subtitle,
  badge = "Collection",
}: CollectionGridProps) {
  const [imageIndexes, setImageIndexes] = useState<Record<string, number>>({});
  const touchStartRef = useRef<Record<string, number>>({});

  const handleImageNav = (
    e: React.MouseEvent | React.TouchEvent,
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
        return {
          ...prev,
          [productId]: current === 0 ? totalImages - 1 : current - 1,
        };
      }
    });
  };

  const handleTouchStart = useCallback(
    (productId: string, e: React.TouchEvent) => {
      touchStartRef.current[productId] = e.touches[0].clientX;
    },
    []
  );

  const handleTouchEnd = useCallback(
    (productId: string, totalImages: number, e: React.TouchEvent) => {
      const startX = touchStartRef.current[productId];
      if (startX === undefined) return;
      const endX = e.changedTouches[0].clientX;
      const diff = startX - endX;
      const SWIPE_THRESHOLD = 40;
      if (Math.abs(diff) > SWIPE_THRESHOLD) {
        e.preventDefault();
        setImageIndexes((prev) => {
          const current = prev[productId] || 0;
          if (diff > 0) {
            // swiped left → next image
            return { ...prev, [productId]: (current + 1) % totalImages };
          } else {
            // swiped right → prev image
            return {
              ...prev,
              [productId]: current === 0 ? totalImages - 1 : current - 1,
            };
          }
        });
      }
      delete touchStartRef.current[productId];
    },
    []
  );

  return (
    <section className="py-24 md:py-32 bg-forest relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-forest-light/40 rounded-full blur-3xl -translate-x-1/3 translate-y-1/3" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Heading */}
        <div className="text-center mb-12 md:mb-16">
          <span className="inline-flex items-center gap-2 bg-gold/10 border border-gold/20 rounded-full px-4 py-2 animate-fade-in mb-6">
            <Sparkles className="w-4 h-4 text-gold" />
            <span className="text-gold text-xs font-semibold tracking-widest uppercase">
              {badge}
            </span>
          </span>
          <h2 className="font-[var(--font-playfair)] text-4xl md:text-5xl lg:text-6xl font-bold text-cream">
            {title}
          </h2>
          <div className="section-divider mt-8" />
          <p className="text-cream/70 mt-6 max-w-2xl mx-auto text-lg font-light leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {products.map((product) => {
            const currentImgIndex = imageIndexes[product.id] || 0;
            const hasMultipleImages = product.images.length > 1;
            const discount = product.originalPrice > product.price
              ? Math.round((1 - product.price / product.originalPrice) * 100)
              : 0;

            return (
              <Link
                href={`/product/${product.id}`}
                key={product.id}
                className="product-card group glass rounded-3xl overflow-hidden hover:bg-white/5 transition-all duration-500 hover:-translate-y-2 border border-cream/5 hover:border-gold/20 flex flex-col cursor-pointer"
              >
                {/* Image Section */}
                <div
                  className="relative aspect-[4/5] bg-forest-dark/30 overflow-hidden"
                  onTouchStart={
                    hasMultipleImages
                      ? (e) => handleTouchStart(product.id, e)
                      : undefined
                  }
                  onTouchEnd={
                    hasMultipleImages
                      ? (e) =>
                          handleTouchEnd(
                            product.id,
                            product.images.length,
                            e
                          )
                      : undefined
                  }
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-forest-dark/80 z-10 pointer-events-none" />

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

                  {/* Image Navigation — always visible on mobile, hover on desktop */}
                  {hasMultipleImages && (
                    <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-1 sm:px-2 z-20 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
                      <button
                        onClick={(e) =>
                          handleImageNav(e, product.id, product.images.length, "prev")
                        }
                        className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-forest/80 backdrop-blur text-cream flex items-center justify-center hover:bg-gold hover:text-forest transition-colors shadow-lg"
                        aria-label="Previous image"
                      >
                        <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4" />
                      </button>
                      <button
                        onClick={(e) =>
                          handleImageNav(e, product.id, product.images.length, "next")
                        }
                        className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-forest/80 backdrop-blur text-cream flex items-center justify-center hover:bg-gold hover:text-forest transition-colors shadow-lg"
                        aria-label="Next image"
                      >
                        <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
                      </button>
                    </div>
                  )}

                  {/* Image Dots */}
                  {hasMultipleImages && (
                    <div className="absolute bottom-10 left-0 right-0 flex justify-center gap-1.5 z-20">
                      {product.images.map((_, i) => (
                        <div
                          key={i}
                          className={`h-1.5 rounded-full transition-all duration-300 ${
                            i === currentImgIndex
                              ? "w-4 bg-gold"
                              : "w-1.5 bg-cream/40"
                          }`}
                        />
                      ))}
                    </div>
                  )}

                  {/* Price Badge + Discount */}
                  <div className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3 z-20 flex items-baseline gap-1.5 sm:gap-2">
                    <span className="font-[var(--font-playfair)] text-lg sm:text-2xl font-bold text-cream drop-shadow-lg">
                      ₹{product.price}
                    </span>
                    {discount > 0 && (
                      <>
                        <span className="text-cream/40 line-through text-sm drop-shadow">
                          ₹{product.originalPrice}
                        </span>
                        <span className="bg-green-500/20 text-green-400 text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                          {discount}% OFF
                        </span>
                      </>
                    )}
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-3 sm:p-5 md:p-6 flex flex-col flex-1 relative z-20">
                  <h3 className="font-[var(--font-playfair)] text-sm sm:text-xl font-bold text-cream mb-1 sm:mb-2 group-hover:text-gold transition-colors line-clamp-1">
                    {product.name}
                  </h3>
                  <p className="text-cream/50 text-xs sm:text-sm leading-relaxed font-light line-clamp-2 flex-1 hidden sm:block">
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

        {/* Empty state */}
        {products.length === 0 && (
          <div className="text-center py-20">
            <p className="text-cream/40 text-lg">No products found in this collection.</p>
          </div>
        )}
      </div>
    </section>
  );
}
