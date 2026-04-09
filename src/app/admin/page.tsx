"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Leaf, Lock, User, Eye, EyeOff, ArrowRight } from "lucide-react";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Mock authentication
    await new Promise((r) => setTimeout(r, 800));

    if (email === "admin@essenzaelaux.com" && password === "admin123") {
      sessionStorage.setItem("el_admin", "true");
      router.push("/admin/dashboard");
    } else {
      setError("Invalid credentials. Try admin@essenzaelaux.com / admin123");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-forest flex items-center justify-center relative overflow-hidden px-4">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-forest-light/40 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gold/3 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-md animate-scale-in">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gold/10 border border-gold/20 mb-5">
            <Leaf className="w-8 h-8 text-gold" />
          </div>
          <h1 className="font-[var(--font-playfair)] text-3xl font-bold text-cream">
            Essenzae Laux
          </h1>
          <p className="text-cream/40 text-sm mt-2 tracking-wide">
            Admin Dashboard
          </p>
        </div>

        {/* Login Card */}
        <div className="glass rounded-3xl p-8 md:p-10">
          <h2 className="font-[var(--font-playfair)] text-xl font-semibold text-cream mb-1">
            Welcome back
          </h2>
          <p className="text-cream/40 text-sm mb-8">
            Sign in to access your analytics dashboard.
          </p>

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email */}
            <div>
              <label
                htmlFor="admin-email"
                className="text-cream/60 text-xs font-semibold tracking-wider uppercase block mb-2"
              >
                Email
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-cream/30" />
                <input
                  id="admin-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@essenzaelaux.com"
                  className="w-full bg-white/5 border border-cream/10 rounded-xl pl-11 pr-4 py-3.5 text-cream placeholder:text-cream/20 text-sm focus:outline-none focus:border-gold/40 focus:ring-1 focus:ring-gold/20 transition-all"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="admin-password"
                className="text-cream/60 text-xs font-semibold tracking-wider uppercase block mb-2"
              >
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-cream/30" />
                <input
                  id="admin-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-white/5 border border-cream/10 rounded-xl pl-11 pr-12 py-3.5 text-cream placeholder:text-cream/20 text-sm focus:outline-none focus:border-gold/40 focus:ring-1 focus:ring-gold/20 transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-cream/30 hover:text-cream/60 transition-colors"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-red-400 text-sm animate-fade-in">
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              id="admin-login-btn"
              className="w-full bg-gradient-to-r from-gold to-gold-dark text-forest font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-forest/30 border-t-forest rounded-full animate-spin" />
              ) : (
                <>
                  Sign In
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <p className="text-cream/20 text-xs text-center mt-6">
            Hint: admin@essenzaelaux.com / admin123
          </p>
        </div>
      </div>
    </div>
  );
}
