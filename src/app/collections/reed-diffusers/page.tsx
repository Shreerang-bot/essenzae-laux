"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CollectionGrid from "@/components/CollectionGrid";
import QualityPromise from "@/components/QualityPromise";
import Testimonials from "@/components/Testimonials";

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

export default function ReedDiffusersPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/products?category=reed-diffusers", { cache: "no-store" })
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
            title="REED Diffusers"
            subtitle="Premium reed diffusers crafted with the finest essential oils. Transform any room into a sanctuary of fragrance."
            badge="REED Collection"
          />
        </div>
      )}
      <QualityPromise />
      <Testimonials />
      <Footer />
    </main>
  );
}
