"use client";

import { useEffect, useRef } from "react";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Collection from "@/components/Collection";
import Packaging from "@/components/Packaging";
import QualityPromise from "@/components/QualityPromise";
import Navbar from "@/components/Navbar";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";

export default function Home() {
  const hasTrackedView = useRef(false);

  useEffect(() => {
    if (!hasTrackedView.current) {
      hasTrackedView.current = true;
      fetch("/api/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ event: "page_view", page: "/" }),
      }).catch(() => {});
    }
  }, []);

  return (
    <main className="overflow-x-hidden">
      <Navbar />
      <Hero />
      <Collection />
      <HowItWorks />
      <Packaging />
      <QualityPromise />
      <Testimonials />
      <Footer />
    </main>
  );
}
