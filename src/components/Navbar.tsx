"use client";

import { useState, useEffect } from "react";
import { Leaf, Menu, X } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 shadow-sm ${
        scrolled
          ? "bg-cream/95 backdrop-blur-md py-3"
          : "bg-cream/90 backdrop-blur-md py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a
          href="/"
          className="flex items-center gap-2 group"
          id="nav-logo"
        >
          <Leaf
            className="w-6 h-6 text-gold group-hover:rotate-12 transition-transform duration-300"
          />
          <span
            className="font-[var(--font-playfair)] text-xl font-semibold tracking-wide text-forest transition-colors duration-300"
          >
            Essenzae Laux
          </span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {["Collection", "How It Works", "Packaging"].map((item) => (
            <a
              key={item}
              href={`/#${item.toLowerCase().replace(/\s+/g, "-")}`}
              className="text-sm font-medium tracking-wide text-forest/80 hover:text-gold transition-colors duration-300"
            >
              {item}
            </a>
          ))}
        </div>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden text-forest"
          onClick={() => setMenuOpen(!menuOpen)}
          id="nav-mobile-toggle"
          aria-label="Toggle navigation"
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-cream/98 backdrop-blur-md border-t border-forest/10 animate-fade-in shadow-lg">
          <div className="px-6 py-4 flex flex-col gap-4">
            {["Collection", "How It Works", "Packaging"].map((item) => (
              <a
                key={item}
                href={`/#${item.toLowerCase().replace(/\s+/g, "-")}`}
                onClick={() => setMenuOpen(false)}
                className="text-forest/80 text-sm font-medium py-2 hover:text-gold transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
