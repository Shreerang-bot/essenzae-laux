"use client";

import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  Star,
  Truck,
  ShieldCheck,
  Leaf,
  ArrowLeft,
  MessageCircle,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { trackAndRedirect } from "@/lib/track";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  amazonLink: string;
}

// Hardcoded specifications — can be made dynamic later via admin
const DEFAULT_SPECS: Record<string, string> = {
  "Fragrance Type": "Premium Essential Oil Blend",
  "Bottle Material": "Hand-blown Glass",
  "Lid Material": "Natural Wood",
  "Volume": "10 ml",
  "Lasting Duration": "45-60 days",
  "Usage": "Car, Office, Home",
  "Weight": "80 grams",
  "Dimensions": "8 × 3 × 3 cm",
};

// Curated reviews
const REVIEWS = [
  { name: "Ananya S.", rating: 5, text: "Absolutely love the fragrance! The glass bottle looks so premium in my car. Lasts for weeks and the scent is divine.", date: "2 weeks ago" },
  { name: "Rahul M.", rating: 5, text: "Perfect gift for my brother. He loved the wooden lid and the packaging was top-notch. Will definitely order more.", date: "1 month ago" },
  { name: "Priya K.", rating: 4, text: "Beautiful product. The fragrance is subtle but long-lasting. The glass bottle is gorgeous. Highly recommend for anyone who likes premium car accessories.", date: "3 weeks ago" },
  { name: "Vikram J.", rating: 5, text: "This is my third purchase from Essenzae Laux. The quality is consistent and the fragrances keep getting better. Five stars!", date: "1 week ago" },
  { name: "Sneha R.", rating: 5, text: "Bought the entire collection. Each scent is unique and the bottles look amazing hanging from the mirror. Best car perfume I've ever used.", date: "2 months ago" },
  { name: "Arjun D.", rating: 4, text: "Good quality product. The scent is nice but I wish it was slightly stronger. The bottle design is really premium though.", date: "1 month ago" },
];

export default function ProductDetail() {
  const params = useParams();
  const productId = params.id as string;
  const [product, setProduct] = useState<Product | null>(null);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [activeTab, setActiveTab] = useState<"description" | "reviews">("description");
  const relatedScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/products", { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        if (!Array.isArray(data)) data = [];
        setAllProducts(data);
        const found = data.find((p: Product) => p.id === productId);
        setProduct(found || null);
        setActiveImage(0);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [productId]);

  const scrollRelated = (direction: "left" | "right") => {
    const el = relatedScrollRef.current;
    if (!el) return;
    const amount = direction === "left" ? -260 : 260;
    el.scrollBy({ left: amount, behavior: "smooth" });
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-cream flex items-center justify-center pt-20">
          <div className="w-10 h-10 border-3 border-forest/20 border-t-forest rounded-full animate-spin" />
        </div>
      </>
    );
  }

  if (!product) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-cream flex flex-col items-center justify-center pt-20 gap-4">
          <h2 className="font-[var(--font-playfair)] text-2xl font-bold text-forest">
            Product not found
          </h2>
          <Link href="/#collection" className="text-gold hover:underline text-sm">
            ← Back to Collection
          </Link>
        </div>
      </>
    );
  }

  const relatedProducts = allProducts.filter((p) => p.id !== product.id);
  const avgRating = (REVIEWS.reduce((sum, r) => sum + r.rating, 0) / REVIEWS.length).toFixed(1);

  // Build WhatsApp message
  const whatsappMsg = encodeURIComponent(
    `Hi! I'm interested in "${product.name}" (₹${product.price}). Can you share more details?`
  );
  const whatsappUrl = product.amazonLink && product.amazonLink.startsWith("http")
    ? product.amazonLink
    : `https://wa.me/919999999999?text=${whatsappMsg}`;

  return (
    <>
      <Navbar />
      <main className="bg-cream min-h-screen pt-20">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-6 py-4">
          <nav className="flex items-center gap-2 text-sm text-charcoal/50">
            <Link href="/" className="hover:text-gold transition-colors">Home</Link>
            <span>/</span>
            <Link href="/#collection" className="hover:text-gold transition-colors">Collection</Link>
            <span>/</span>
            <span className="text-forest font-medium truncate max-w-[200px]">{product.name}</span>
          </nav>
        </div>

        {/* Product Hero */}
        <div className="max-w-7xl mx-auto px-6 pb-16">
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
            {/* Image Gallery */}
            <div className="flex-1 lg:max-w-[55%]">
              {/* Main Image */}
              <div className="relative aspect-square rounded-3xl overflow-hidden bg-forest/5 border border-cream-dark/30 mb-4">
                {product.images[activeImage] ? (
                  <img
                    src={product.images[activeImage]}
                    alt={product.name}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-charcoal/30 text-sm">
                    No Image Available
                  </div>
                )}

                {/* Image Navigation */}
                {product.images.length > 1 && (
                  <>
                    <button
                      onClick={() => setActiveImage((prev) => (prev === 0 ? product.images.length - 1 : prev - 1))}
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 backdrop-blur text-forest flex items-center justify-center hover:bg-gold hover:text-white transition-colors shadow-lg"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setActiveImage((prev) => (prev + 1) % product.images.length)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 backdrop-blur text-forest flex items-center justify-center hover:bg-gold hover:text-white transition-colors shadow-lg"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnail Row */}
              {product.images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {product.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImage(i)}
                      className={`flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-xl overflow-hidden border-2 transition-all ${
                        i === activeImage
                          ? "border-gold shadow-lg scale-105"
                          : "border-cream-dark/30 opacity-60 hover:opacity-100"
                      }`}
                    >
                      <img src={img} alt={`${product.name} ${i + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="flex-1 lg:max-w-[45%]">
              <Link
                href="/#collection"
                className="inline-flex items-center gap-1.5 text-sm text-charcoal/50 hover:text-gold transition-colors mb-4"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Collection
              </Link>

              <h1 className="font-[var(--font-playfair)] text-3xl md:text-4xl lg:text-5xl font-bold text-forest leading-tight mb-4">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-3 mb-6">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.round(Number(avgRating))
                          ? "text-gold fill-gold"
                          : "text-cream-dark"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-charcoal/50 text-sm">
                  {avgRating} ({REVIEWS.length} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-8">
                <span className="font-[var(--font-playfair)] text-4xl font-bold text-forest">
                  ₹{product.price}
                </span>
                <span className="text-charcoal/40 line-through text-lg">
                  ₹{Math.round(product.price * 1.75)}
                </span>
                <span className="bg-green-500/15 text-green-700 text-xs font-bold px-2.5 py-1 rounded-full">
                  {Math.round((1 - product.price / (product.price * 1.75)) * 100)}% OFF
                </span>
              </div>

              {/* Short Description */}
              <p className="text-charcoal/70 text-base leading-relaxed mb-8 font-light">
                {product.description}
              </p>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-3 mb-8">
                <div className="flex flex-col items-center text-center p-3 rounded-xl bg-forest/5 border border-forest/10">
                  <Truck className="w-5 h-5 text-forest mb-1.5" />
                  <span className="text-xs text-charcoal/70 font-medium">Fast Delivery</span>
                </div>
                <div className="flex flex-col items-center text-center p-3 rounded-xl bg-forest/5 border border-forest/10">
                  <ShieldCheck className="w-5 h-5 text-forest mb-1.5" />
                  <span className="text-xs text-charcoal/70 font-medium">Quality Assured</span>
                </div>
                <div className="flex flex-col items-center text-center p-3 rounded-xl bg-forest/5 border border-forest/10">
                  <Leaf className="w-5 h-5 text-forest mb-1.5" />
                  <span className="text-xs text-charcoal/70 font-medium">100% Natural</span>
                </div>
              </div>

              {/* WhatsApp CTA */}
              <button
                onClick={() => trackAndRedirect(whatsappUrl, product.id)}
                className="w-full bg-[#25D366] hover:bg-[#20BD5A] text-white font-bold text-base py-4 rounded-2xl flex items-center justify-center gap-3 transition-all duration-300 shadow-lg hover:shadow-xl active:scale-[0.98] mb-3"
              >
                <MessageCircle className="w-5 h-5" />
                Order on WhatsApp
              </button>
              <p className="text-charcoal/40 text-xs text-center">
                Chat with us for quick ordering & support
              </p>
            </div>
          </div>
        </div>

        {/* Tabs: Description & Reviews */}
        <div className="bg-white border-t border-cream-dark/30">
          <div className="max-w-7xl mx-auto px-6 py-12">
            {/* Tab Headers */}
            <div className="flex gap-1 mb-8 border-b border-cream-dark/30">
              <button
                onClick={() => setActiveTab("description")}
                className={`px-6 py-3 text-sm font-semibold tracking-wide transition-all relative ${
                  activeTab === "description"
                    ? "text-forest"
                    : "text-charcoal/40 hover:text-charcoal/70"
                }`}
              >
                Specifications
                {activeTab === "description" && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold rounded-full" />
                )}
              </button>
              <button
                onClick={() => setActiveTab("reviews")}
                className={`px-6 py-3 text-sm font-semibold tracking-wide transition-all relative ${
                  activeTab === "reviews"
                    ? "text-forest"
                    : "text-charcoal/40 hover:text-charcoal/70"
                }`}
              >
                Reviews ({REVIEWS.length})
                {activeTab === "reviews" && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold rounded-full" />
                )}
              </button>
            </div>

            {/* Tab Content: Description */}
            {activeTab === "description" && (
              <div className="animate-fade-in">
                {/* Specifications Table */}
                <h3 className="font-[var(--font-playfair)] text-xl font-bold text-forest mb-6">
                  Product Specifications
                </h3>
                <div className="overflow-hidden rounded-2xl border border-cream-dark/30 mb-10">
                  <table className="w-full text-sm">
                    <tbody>
                      {Object.entries(DEFAULT_SPECS).map(([key, value], i) => (
                        <tr
                          key={key}
                          className={`${i % 2 === 0 ? "bg-cream/50" : "bg-white"} border-b border-cream-dark/20 last:border-b-0`}
                        >
                          <td className="py-3.5 px-5 font-semibold text-forest/80 w-[40%]">
                            {key}
                          </td>
                          <td className="py-3.5 px-5 text-charcoal/70">{value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Detailed Description */}
                <h3 className="font-[var(--font-playfair)] text-xl font-bold text-forest mb-4">
                  About This Product
                </h3>
                <div className="prose prose-charcoal max-w-none text-charcoal/70 leading-relaxed space-y-4 font-light">
                  <p>{product.description}</p>
                  <p>
                    Essenzae Laux brings you a premium hanging fragrance diffuser crafted with meticulous
                    attention to detail. Each bottle is hand-blown from high-quality glass and features a
                    natural wooden lid that adds an organic touch of elegance.
                  </p>
                  <p>
                    The concentrated essential oil blend provides a long-lasting aroma that subtly fills
                    your car interior without being overpowering. Simply hang from your rearview mirror and
                    enjoy weeks of premium fragrance.
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Premium hand-blown glass bottle for an elegant look</li>
                    <li>Natural wooden lid with hanging thread</li>
                    <li>Long-lasting fragrance up to 60 days</li>
                    <li>100% natural essential oil blend</li>
                    <li>Perfect for cars, offices, and small spaces</li>
                    <li>Makes an excellent gift</li>
                  </ul>
                </div>
              </div>
            )}

            {/* Tab Content: Reviews */}
            {activeTab === "reviews" && (
              <div className="animate-fade-in">
                {/* Rating Summary */}
                <div className="flex items-center gap-6 mb-8 p-6 rounded-2xl bg-forest/5 border border-forest/10">
                  <div className="text-center">
                    <div className="font-[var(--font-playfair)] text-5xl font-bold text-forest">
                      {avgRating}
                    </div>
                    <div className="flex mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.round(Number(avgRating))
                              ? "text-gold fill-gold"
                              : "text-cream-dark"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-charcoal/50 text-xs mt-1">{REVIEWS.length} reviews</p>
                  </div>
                  <div className="flex-1 space-y-1.5">
                    {[5, 4, 3, 2, 1].map((star) => {
                      const count = REVIEWS.filter((r) => r.rating === star).length;
                      const pct = (count / REVIEWS.length) * 100;
                      return (
                        <div key={star} className="flex items-center gap-2">
                          <span className="text-xs text-charcoal/50 w-3">{star}</span>
                          <Star className="w-3 h-3 text-gold fill-gold" />
                          <div className="flex-1 h-2 bg-cream-dark/50 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gold rounded-full transition-all"
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                          <span className="text-xs text-charcoal/40 w-6">{count}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Review Cards */}
                <div className="space-y-4">
                  {REVIEWS.map((review, i) => (
                    <div
                      key={i}
                      className="p-5 rounded-2xl bg-white border border-cream-dark/20 hover:border-gold/20 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-forest/10 flex items-center justify-center text-forest font-bold text-sm">
                            {review.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-semibold text-forest text-sm">{review.name}</p>
                            <p className="text-charcoal/40 text-xs">{review.date}</p>
                          </div>
                        </div>
                        <div className="flex">
                          {[...Array(5)].map((_, j) => (
                            <Star
                              key={j}
                              className={`w-3.5 h-3.5 ${
                                j < review.rating ? "text-gold fill-gold" : "text-cream-dark"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-charcoal/70 text-sm leading-relaxed font-light">
                        {review.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="bg-cream border-t border-cream-dark/30">
            <div className="max-w-7xl mx-auto px-6 py-12">
              <h3 className="font-[var(--font-playfair)] text-2xl font-bold text-forest mb-8">
                You May Also Like
              </h3>
              <div className="relative group/related">
                <button
                  onClick={() => scrollRelated("left")}
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 z-20 w-10 h-10 rounded-full bg-white/90 border border-cream-dark/30 text-forest flex items-center justify-center hover:bg-gold hover:text-white hover:border-gold transition-all shadow-lg opacity-0 group-hover/related:opacity-100 hidden md:flex"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => scrollRelated("right")}
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 z-20 w-10 h-10 rounded-full bg-white/90 border border-cream-dark/30 text-forest flex items-center justify-center hover:bg-gold hover:text-white hover:border-gold transition-all shadow-lg opacity-0 group-hover/related:opacity-100 hidden md:flex"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>

                <div
                  ref={relatedScrollRef}
                  className="flex gap-5 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4"
                  style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                >
                  {relatedProducts.map((p) => (
                    <Link
                      key={p.id}
                      href={`/product/${p.id}`}
                      className="flex-shrink-0 w-[220px] snap-start group rounded-2xl overflow-hidden border border-cream-dark/30 bg-white hover:border-gold/30 hover:shadow-lg transition-all duration-300"
                    >
                      <div className="relative aspect-square bg-forest/5 overflow-hidden">
                        {p.images[0] ? (
                          <img
                            src={p.images[0]}
                            alt={p.name}
                            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center text-charcoal/20 text-xs">
                            No Image
                          </div>
                        )}
                      </div>
                      <div className="p-4">
                        <h4 className="font-semibold text-forest text-sm line-clamp-1 group-hover:text-gold transition-colors">
                          {p.name}
                        </h4>
                        <p className="font-[var(--font-playfair)] text-forest font-bold mt-1">
                          ₹{p.price}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        <Footer />
      </main>
    </>
  );
}
