"use client";

import { useState, useEffect, useRef } from "react";
import { Leaf, Menu, X, ChevronDown } from "lucide-react";
import Link from "next/link";

// Instagram SVG icon (not available in this lucide version)
const InstagramIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const COLLECTIONS = [
  { label: "REED Diffusers", href: "/collections/reed-diffusers" },
  { label: "Car Diffusers", href: "/collections/car-diffusers" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileCollectionsOpen, setMobileCollectionsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdownTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDropdownEnter = () => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    setDropdownOpen(true);
  };

  const handleDropdownLeave = () => {
    dropdownTimeout.current = setTimeout(() => setDropdownOpen(false), 200);
  };

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
        <Link
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
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {/* Collections Dropdown */}
          <div
            ref={dropdownRef}
            className="relative"
            onMouseEnter={handleDropdownEnter}
            onMouseLeave={handleDropdownLeave}
          >
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-1 text-sm font-medium tracking-wide text-forest/80 hover:text-gold transition-colors duration-300"
              id="nav-collections-dropdown"
            >
              Collections
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${
                  dropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Dropdown Menu */}
            <div
              className={`nav-dropdown ${dropdownOpen ? "nav-dropdown--open" : ""}`}
            >
              {COLLECTIONS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setDropdownOpen(false)}
                  className="block px-4 py-2.5 text-sm text-forest/80 hover:text-gold hover:bg-gold/5 transition-colors duration-200 first:rounded-t-xl last:rounded-b-xl"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Packaging */}
          <a
            href="/#packaging"
            className="text-sm font-medium tracking-wide text-forest/80 hover:text-gold transition-colors duration-300"
          >
            Packaging
          </a>

          {/* Instagram */}
          <a
            href="https://instagram.com/ESSENZAE_LAUX"
            target="_blank"
            rel="noopener noreferrer"
            className="text-forest/60 hover:text-gold transition-colors duration-300"
            aria-label="Follow us on Instagram"
            id="nav-instagram"
          >
            <InstagramIcon className="w-5 h-5" />
          </a>
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
          <div className="px-6 py-4 flex flex-col gap-1">
            {/* Collections Expandable */}
            <button
              onClick={() => setMobileCollectionsOpen(!mobileCollectionsOpen)}
              className="flex items-center justify-between w-full text-forest/80 text-sm font-medium py-2 hover:text-gold transition-colors"
            >
              Collections
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${
                  mobileCollectionsOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {mobileCollectionsOpen && (
              <div className="pl-4 flex flex-col gap-1 animate-fade-in">
                {COLLECTIONS.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => {
                      setMenuOpen(false);
                      setMobileCollectionsOpen(false);
                    }}
                    className="text-forest/60 text-sm py-2 hover:text-gold transition-colors border-l-2 border-gold/20 pl-3"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}

            {/* Packaging */}
            <a
              href="/#packaging"
              onClick={() => setMenuOpen(false)}
              className="text-forest/80 text-sm font-medium py-2 hover:text-gold transition-colors"
            >
              Packaging
            </a>

            {/* Instagram */}
            <a
              href="https://instagram.com/ESSENZAE_LAUX"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2 text-forest/80 text-sm font-medium py-2 hover:text-gold transition-colors"
            >
              <InstagramIcon className="w-4 h-4" />
              Instagram
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
