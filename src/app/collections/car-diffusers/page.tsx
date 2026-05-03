"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CollectionGrid from "@/components/CollectionGrid";

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

export default function CarDiffusersPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/products?category=car-diffusers", { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        if (!Array.isArray(data)) data = [];
        setProducts(data);
        setLoading(false);
      })
      .catch(() => {
        setProducts([]);
        setLoading(false);
      });
  }, []);

  return (
    <main className="overflow-x-hidden">
      <Navbar />
      {loading ? (
        <section className="py-24 md:py-32 bg-forest min-h-screen flex justify-center items-center">
          <div className="w-10 h-10 border-3 border-cream/20 border-t-cream rounded-full animate-spin" />
        </section>
      ) : (
        <div className="pt-16">
          <CollectionGrid
            products={products}
            title="Car Diffusers"
            subtitle="Premium hanging fragrance diffusers crafted with hand-blown glass bottles and natural wooden lids — designed exclusively for your car."
            badge="Car Collection"
          />
        </div>
      )}
      <Footer />
    </main>
  );
}
