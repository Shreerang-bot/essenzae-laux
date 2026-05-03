"use client";

import { Leaf, Globe, Send, Mail } from "lucide-react";
import Link from "next/link";

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const QUICK_LINKS = [
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/contact" },
  { label: "Corporate Partnership", href: "/corporate" },
];

const COLLECTIONS = [
  { label: "REED Diffusers", href: "/collections/reed-diffusers" },
  { label: "Car Diffusers", href: "/collections/car-diffusers" },
];

const SOCIALS = [
  { icon: InstagramIcon, href: "https://instagram.com/ESSENZAE_LAUX", label: "Instagram" },
  { icon: Globe, href: "#", label: "Website" },
  { icon: Send, href: "#", label: "Telegram" },
  { icon: Mail, href: "mailto:hello@essenzaelaux.com", label: "Email" },
];

export default function Footer() {
  return (
    <footer className="bg-forest-dark py-16 pb-28 md:pb-16 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Leaf className="w-5 h-5 text-gold" />
              <span className="font-[var(--font-playfair)] text-lg font-semibold text-cream tracking-wide">
                Essenzae Laux
              </span>
            </div>
            <p className="text-cream/40 text-xs leading-relaxed mb-6">
              Premium fragrance diffusers crafted with hand-blown glass and natural essential oils.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-3">
              {SOCIALS.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target={social.href.startsWith("http") ? "_blank" : undefined}
                    rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    aria-label={social.label}
                    className="w-9 h-9 rounded-full bg-cream/5 hover:bg-cream/10 flex items-center justify-center transition-colors group"
                  >
                    <Icon className="w-3.5 h-3.5 text-cream/50 group-hover:text-gold transition-colors" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-cream/80 text-xs font-semibold uppercase tracking-widest mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-cream/40 text-sm hover:text-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Collections */}
          <div>
            <h4 className="text-cream/80 text-xs font-semibold uppercase tracking-widest mb-4">
              Collections
            </h4>
            <ul className="space-y-2.5">
              {COLLECTIONS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-cream/40 text-sm hover:text-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-cream/80 text-xs font-semibold uppercase tracking-widest mb-4">
              Contact
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a href="mailto:hello@essenzaelaux.com" className="text-cream/40 text-sm hover:text-gold transition-colors">
                  hello@essenzaelaux.com
                </a>
              </li>
              <li>
                <a href="https://wa.me/917709219444" target="_blank" rel="noopener noreferrer" className="text-cream/40 text-sm hover:text-gold transition-colors">
                  WhatsApp: +91 7709 219 444
                </a>
              </li>
              <li>
                <a href="https://instagram.com/ESSENZAE_LAUX" target="_blank" rel="noopener noreferrer" className="text-cream/40 text-sm hover:text-gold transition-colors">
                  @ESSENZAE_LAUX
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-cream/10 text-center">
          <p className="text-cream/30 text-xs tracking-wider">
            © {new Date().getFullYear()} Essenzae Laux. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
