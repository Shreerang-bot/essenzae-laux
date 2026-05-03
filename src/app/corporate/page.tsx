"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Sparkles, Send, Building2, Gift, Users, TrendingUp } from "lucide-react";

export default function CorporatePartnershipPage() {
  const [formData, setFormData] = useState({
    companyName: "", contactPerson: "", email: "", phone: "",
    orderSize: "", message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = encodeURIComponent(
      `Corporate Partnership Enquiry\n\nCompany: ${formData.companyName}\nContact: ${formData.contactPerson}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nOrder Size: ${formData.orderSize}\n\nDetails:\n${formData.message}`
    );
    window.open(`https://wa.me/917709219444?text=${msg}`, "_blank");
    setSubmitted(true);
  };

  return (
    <main className="overflow-x-hidden">
      <Navbar />

      {/* Hero */}
      <section className="relative bg-forest pt-28 pb-16 md:pt-36 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-gold/5 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-gold/3 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <span className="inline-flex items-center gap-2 bg-gold/10 border border-gold/20 rounded-full px-4 py-2 animate-fade-in mb-6">
            <Sparkles className="w-4 h-4 text-gold" />
            <span className="text-gold text-xs font-semibold tracking-widest uppercase">Partnership</span>
          </span>
          <h1 className="font-[var(--font-playfair)] text-4xl md:text-5xl lg:text-6xl font-bold text-cream leading-tight">
            Let&apos;s Partner Up
          </h1>
          <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mt-8" />
          <p className="text-cream/70 mt-6 text-lg font-light leading-relaxed max-w-2xl mx-auto">
            Elevate your corporate gifting with premium Essenzae Laux fragrances. Custom branding, bulk orders, and exclusive partnership opportunities.
          </p>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 md:py-20 bg-cream border-b border-cream-dark/30">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="font-[var(--font-playfair)] text-2xl md:text-3xl font-bold text-forest text-center mb-10">
            Why Partner With Us?
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: Gift, title: "Corporate Gifting", desc: "Premium diffusers for employee appreciation, client gifts & events." },
              { icon: Building2, title: "Custom Branding", desc: "Personalized packaging and labels with your company branding." },
              { icon: TrendingUp, title: "Bulk Pricing", desc: "Special rates for bulk orders. More you order, more you save." },
              { icon: Users, title: "Dedicated Support", desc: "A dedicated account manager for seamless order management." },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="p-5 rounded-2xl bg-white border border-cream-dark/30 hover:border-gold/20 hover:shadow-md transition-all duration-300 text-center group">
                  <div className="w-12 h-12 rounded-xl bg-forest/5 flex items-center justify-center mx-auto mb-3 group-hover:bg-gold/10 transition-colors">
                    <Icon className="w-5 h-5 text-forest group-hover:text-gold transition-colors" />
                  </div>
                  <h3 className="font-semibold text-forest text-sm mb-1">{item.title}</h3>
                  <p className="text-charcoal/50 text-xs leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Enquiry Form */}
      <section className="py-16 md:py-24 bg-cream">
        <div className="max-w-3xl mx-auto px-6">
          <div className="bg-white rounded-3xl border border-cream-dark/30 p-6 md:p-10 shadow-sm">
            <h3 className="font-[var(--font-playfair)] text-2xl font-bold text-forest mb-2">Corporate Partnership Enquiry</h3>
            <p className="text-charcoal/50 text-sm mb-8">Fill in your details and we&apos;ll get back to you within 24 hours.</p>

            {submitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4"><Send className="w-7 h-7 text-green-600" /></div>
                <h4 className="font-[var(--font-playfair)] text-xl font-bold text-forest mb-2">Enquiry Sent!</h4>
                <p className="text-charcoal/60 text-sm">Your enquiry has been redirected to WhatsApp. Our team will connect with you shortly.</p>
                <button onClick={() => { setSubmitted(false); setFormData({ companyName: "", contactPerson: "", email: "", phone: "", orderSize: "", message: "" }); }} className="mt-6 text-gold text-sm font-medium hover:text-gold-dark transition-colors">Submit another enquiry →</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div><label className="block text-xs font-semibold text-charcoal/60 uppercase tracking-wider mb-2">Company Name *</label><input type="text" name="companyName" required value={formData.companyName} onChange={handleChange} className="w-full bg-cream/50 border border-cream-dark/50 rounded-xl px-4 py-3 text-forest text-sm focus:outline-none focus:border-gold transition-colors" placeholder="Your company" /></div>
                  <div><label className="block text-xs font-semibold text-charcoal/60 uppercase tracking-wider mb-2">Contact Person *</label><input type="text" name="contactPerson" required value={formData.contactPerson} onChange={handleChange} className="w-full bg-cream/50 border border-cream-dark/50 rounded-xl px-4 py-3 text-forest text-sm focus:outline-none focus:border-gold transition-colors" placeholder="Full name" /></div>
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div><label className="block text-xs font-semibold text-charcoal/60 uppercase tracking-wider mb-2">Email *</label><input type="email" name="email" required value={formData.email} onChange={handleChange} className="w-full bg-cream/50 border border-cream-dark/50 rounded-xl px-4 py-3 text-forest text-sm focus:outline-none focus:border-gold transition-colors" placeholder="you@company.com" /></div>
                  <div><label className="block text-xs font-semibold text-charcoal/60 uppercase tracking-wider mb-2">Phone *</label><input type="tel" name="phone" required value={formData.phone} onChange={handleChange} className="w-full bg-cream/50 border border-cream-dark/50 rounded-xl px-4 py-3 text-forest text-sm focus:outline-none focus:border-gold transition-colors" placeholder="+91 99999 99999" /></div>
                </div>
                <div><label className="block text-xs font-semibold text-charcoal/60 uppercase tracking-wider mb-2">Expected Order Size</label><select name="orderSize" value={formData.orderSize} onChange={handleChange} className="w-full bg-cream/50 border border-cream-dark/50 rounded-xl px-4 py-3 text-forest text-sm focus:outline-none focus:border-gold transition-colors"><option value="">Select quantity range</option><option value="10-50 units">10–50 units</option><option value="50-100 units">50–100 units</option><option value="100-500 units">100–500 units</option><option value="500+ units">500+ units</option></select></div>
                <div><label className="block text-xs font-semibold text-charcoal/60 uppercase tracking-wider mb-2">Additional Details</label><textarea name="message" value={formData.message} onChange={handleChange} rows={4} className="w-full bg-cream/50 border border-cream-dark/50 rounded-xl px-4 py-3 text-forest text-sm focus:outline-none focus:border-gold transition-colors resize-none" placeholder="Tell us about your requirements, event details, or any specific needs..." /></div>
                <button type="submit" className="w-full bg-forest text-cream hover:bg-forest-light font-bold text-sm py-3.5 rounded-2xl flex items-center justify-center gap-2 transition-all duration-300 shadow-lg hover:shadow-xl active:scale-[0.98]"><Send className="w-4 h-4" />Submit Enquiry via WhatsApp</button>
              </form>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
