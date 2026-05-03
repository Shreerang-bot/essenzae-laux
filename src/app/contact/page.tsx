"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Mail, Phone, MapPin, Send, Sparkles, MessageCircle } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", subject: "", message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = encodeURIComponent(
      `Hi Essenzae Laux!\n\nName: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nSubject: ${formData.subject}\n\nMessage:\n${formData.message}`
    );
    window.open(`https://wa.me/917709219444?text=${msg}`, "_blank");
    setSubmitted(true);
  };

  return (
    <main className="overflow-x-hidden">
      <Navbar />
      <section className="relative bg-forest pt-28 pb-16 md:pt-36 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 right-10 w-72 h-72 bg-gold/5 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <span className="inline-flex items-center gap-2 bg-gold/10 border border-gold/20 rounded-full px-4 py-2 animate-fade-in mb-6">
            <Sparkles className="w-4 h-4 text-gold" />
            <span className="text-gold text-xs font-semibold tracking-widest uppercase">Get In Touch</span>
          </span>
          <h1 className="font-[var(--font-playfair)] text-4xl md:text-5xl lg:text-6xl font-bold text-cream leading-tight">Contact Us</h1>
          <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mt-8" />
          <p className="text-cream/70 mt-6 text-lg font-light leading-relaxed max-w-xl mx-auto">
            Have a question or want to place an order? Reach out — we&apos;d love to hear from you.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-cream">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-5 gap-10 lg:gap-16">
            <div className="lg:col-span-2 space-y-6">
              <h2 className="font-[var(--font-playfair)] text-2xl font-bold text-forest mb-2">Reach Us Directly</h2>
              <p className="text-charcoal/60 text-sm leading-relaxed font-light">We respond fastest on WhatsApp. You can also email us or fill out the form.</p>
              <div className="space-y-4">
                <a href="https://wa.me/917709219444" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 rounded-2xl bg-[#25D366]/5 border border-[#25D366]/15 hover:border-[#25D366]/30 transition-colors">
                  <div className="w-11 h-11 rounded-xl bg-[#25D366]/10 flex items-center justify-center"><MessageCircle className="w-5 h-5 text-[#25D366]" /></div>
                  <div><p className="text-forest font-semibold text-sm">WhatsApp</p><p className="text-charcoal/50 text-xs">Quick orders & support</p></div>
                </a>
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-forest/3 border border-forest/8">
                  <div className="w-11 h-11 rounded-xl bg-forest/5 flex items-center justify-center"><Mail className="w-5 h-5 text-forest" /></div>
                  <div><p className="text-forest font-semibold text-sm">Email</p><a href="mailto:hello@essenzaelaux.com" className="text-charcoal/50 text-xs hover:text-gold transition-colors">hello@essenzaelaux.com</a></div>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-forest/3 border border-forest/8">
                  <div className="w-11 h-11 rounded-xl bg-forest/5 flex items-center justify-center"><Phone className="w-5 h-5 text-forest" /></div>
                  <div><p className="text-forest font-semibold text-sm">Phone</p><p className="text-charcoal/50 text-xs">+91 7709 219 444</p></div>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-forest/3 border border-forest/8">
                  <div className="w-11 h-11 rounded-xl bg-forest/5 flex items-center justify-center"><MapPin className="w-5 h-5 text-forest" /></div>
                  <div><p className="text-forest font-semibold text-sm">Location</p><p className="text-charcoal/50 text-xs">India</p></div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-3">
              <div className="bg-white rounded-3xl border border-cream-dark/30 p-6 md:p-8 shadow-sm">
                <h3 className="font-[var(--font-playfair)] text-xl font-bold text-forest mb-6">Send Us a Message</h3>
                {submitted ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4"><Send className="w-7 h-7 text-green-600" /></div>
                    <h4 className="font-[var(--font-playfair)] text-xl font-bold text-forest mb-2">Message Sent!</h4>
                    <p className="text-charcoal/60 text-sm">Your message has been redirected to WhatsApp.</p>
                    <button onClick={() => { setSubmitted(false); setFormData({ name: "", email: "", phone: "", subject: "", message: "" }); }} className="mt-6 text-gold text-sm font-medium hover:text-gold-dark transition-colors">Send another →</button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div><label className="block text-xs font-semibold text-charcoal/60 uppercase tracking-wider mb-2">Full Name *</label><input type="text" name="name" required value={formData.name} onChange={handleChange} className="w-full bg-cream/50 border border-cream-dark/50 rounded-xl px-4 py-3 text-forest text-sm focus:outline-none focus:border-gold transition-colors" placeholder="Your name" /></div>
                      <div><label className="block text-xs font-semibold text-charcoal/60 uppercase tracking-wider mb-2">Email *</label><input type="email" name="email" required value={formData.email} onChange={handleChange} className="w-full bg-cream/50 border border-cream-dark/50 rounded-xl px-4 py-3 text-forest text-sm focus:outline-none focus:border-gold transition-colors" placeholder="you@example.com" /></div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div><label className="block text-xs font-semibold text-charcoal/60 uppercase tracking-wider mb-2">Phone</label><input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full bg-cream/50 border border-cream-dark/50 rounded-xl px-4 py-3 text-forest text-sm focus:outline-none focus:border-gold transition-colors" placeholder="+91 99999 99999" /></div>
                      <div><label className="block text-xs font-semibold text-charcoal/60 uppercase tracking-wider mb-2">Subject *</label><select name="subject" required value={formData.subject} onChange={handleChange} className="w-full bg-cream/50 border border-cream-dark/50 rounded-xl px-4 py-3 text-forest text-sm focus:outline-none focus:border-gold transition-colors"><option value="">Select a topic</option><option value="Order Enquiry">Order Enquiry</option><option value="Product Question">Product Question</option><option value="Bulk / Corporate Order">Bulk / Corporate Order</option><option value="Feedback">Feedback</option><option value="Other">Other</option></select></div>
                    </div>
                    <div><label className="block text-xs font-semibold text-charcoal/60 uppercase tracking-wider mb-2">Message *</label><textarea name="message" required value={formData.message} onChange={handleChange} rows={5} className="w-full bg-cream/50 border border-cream-dark/50 rounded-xl px-4 py-3 text-forest text-sm focus:outline-none focus:border-gold transition-colors resize-none" placeholder="Tell us how we can help..." /></div>
                    <button type="submit" className="w-full bg-forest text-cream hover:bg-forest-light font-bold text-sm py-3.5 rounded-2xl flex items-center justify-center gap-2 transition-all duration-300 shadow-lg hover:shadow-xl active:scale-[0.98]"><Send className="w-4 h-4" />Send via WhatsApp</button>
                    <p className="text-charcoal/40 text-xs text-center">Your message will open in WhatsApp for direct communication.</p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
