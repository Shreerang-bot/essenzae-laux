"use client";

import { Leaf, Globe, Send, Mail } from "lucide-react";

// Instagram SVG icon (not available in this lucide version)
const InstagramIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

export default function Footer() {
  return (
    <footer className="bg-forest-dark py-16 pb-28 md:pb-16 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Brand */}
          <div className="flex items-center gap-2">
            <Leaf className="w-5 h-5 text-gold" />
            <span className="font-[var(--font-playfair)] text-lg font-semibold text-cream tracking-wide">
              Essenzae Laux
            </span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6">
            {[
              { icon: InstagramIcon, href: "https://instagram.com/ESSENZAE_LAUX", label: "Instagram" },
              { icon: Globe, href: "#", label: "Website" },
              { icon: Send, href: "#", label: "Telegram" },
              { icon: Mail, href: "mailto:hello@essenzaelaux.com", label: "Email" },
            ].map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-cream/5 hover:bg-cream/10 flex items-center justify-center transition-colors group"
                >
                  <Icon className="w-4 h-4 text-cream/50 group-hover:text-gold transition-colors" />
                </a>
              );
            })}
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-cream/10 text-center">
          <p className="text-cream/30 text-xs tracking-wider">
            © {new Date().getFullYear()} Essenzae Laux. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
