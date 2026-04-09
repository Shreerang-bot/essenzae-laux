"use client";

import { Leaf, Globe, Send, Mail } from "lucide-react";

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
              { icon: Globe, href: "#", label: "Website" },
              { icon: Send, href: "#", label: "Telegram" },
              { icon: Mail, href: "mailto:hello@essenzaelaux.com", label: "Email" },
            ].map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
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
