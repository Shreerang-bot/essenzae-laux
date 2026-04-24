"use client";

import { useState, useEffect } from "react";
import { ShoppingBag, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import { trackAndRedirect } from "@/lib/track";

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
        
        // Initialize image indexes for products that might have multiple images
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

  const handleNextImage = (productId: string, totalImages: number) => {
    setImageIndexes(prev => ({
      ...prev,
      [productId]: (prev[productId] + 1) % totalImages
    }));
  };

  const handlePrevImage = (productId: string, totalImages: number) => {
    setImageIndexes(prev => ({
      ...prev,
      [productId]: prev[productId] === 0 ? totalImages - 1 : prev[productId] - 1
    }));
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
        <div className="text-center mb-16 md:mb-24">
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
            Six distinct, premium fragrances bound in luxurious aesthetic glass bottles. Hand-blown to compliment any car interior.
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {products.map((product) => {
            const currentImgIndex = imageIndexes[product.id] || 0;
            const hasMultipleImages = product.images.length > 1;

            return (
              <div 
                key={product.id}
                className="group glass rounded-3xl overflow-hidden hover:bg-white/5 transition-all duration-500 hover:-translate-y-2 border border-cream/5 hover:border-gold/20 flex flex-col"
              >
                {/* Image Section */}
                <div className="relative aspect-square bg-forest-dark/30 p-8 flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-forest-dark/80 z-10" />
                  
                  {product.images[currentImgIndex] ? (
                    <img
                      src={product.images[currentImgIndex]}
                      alt={product.name}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-32 h-32 bg-forest-light/50 rounded-xl flex items-center justify-center">
                      <span className="text-cream/30 text-xs">No Image</span>
                    </div>
                  )}

                  {/* Carousel Controls */}
                  {hasMultipleImages && (
                    <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-3 md:opacity-0 group-hover:opacity-100 transition-opacity z-20">
                      <button 
                        onClick={(e) => { e.preventDefault(); handlePrevImage(product.id, product.images.length); }}
                        className="w-8 h-8 rounded-full bg-forest/80 backdrop-blur text-cream flex items-center justify-center hover:bg-gold hover:text-forest transition-colors shadow-lg"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={(e) => { e.preventDefault(); handleNextImage(product.id, product.images.length); }}
                        className="w-8 h-8 rounded-full bg-forest/80 backdrop-blur text-cream flex items-center justify-center hover:bg-gold hover:text-forest transition-colors shadow-lg"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                  
                  {/* Image Indicators */}
                  {hasMultipleImages && (
                    <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1.5 z-20">
                      {product.images.map((_, i) => (
                        <div 
                          key={i} 
                          className={`h-1.5 rounded-full transition-all duration-300 ${i === currentImgIndex ? 'w-4 bg-gold' : 'w-1.5 bg-cream/40'}`} 
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* Content Section */}
                <div className="p-6 md:p-8 flex flex-col flex-1 relative z-20">
                  <h3 className="font-[var(--font-playfair)] text-2xl font-bold text-cream mb-3 group-hover:text-gold transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-cream/60 text-sm leading-relaxed mb-8 flex-1 font-light">
                    {product.description}
                  </p>
                  
                  <div className="flex items-center justify-between mt-auto">
                    <span className="font-[var(--font-playfair)] text-2xl font-bold text-cream">
                      ₹{product.price}
                    </span>
                    <button
                      onClick={() => trackAndRedirect(product.amazonLink, product.id)}
                      className="bg-gold/10 hover:bg-gradient-to-r hover:from-gold hover:to-gold-dark border border-gold/30 hover:border-transparent text-gold hover:text-forest font-semibold text-sm px-5 py-2.5 rounded-full flex items-center gap-2 transition-all duration-300"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
