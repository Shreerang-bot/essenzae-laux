import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Essenzae Laux — Premium Hanging Fragrance Diffuser",
  description:
    "Elevate your space with Essenzae Laux premium hanging fragrance diffuser. Perfect for cars. Luxury glass bottle with wooden lid.",
  keywords: [
    "car diffuser",
    "hanging fragrance",
    "premium diffuser",
    "Essenzae Laux",
    "glass diffuser",
  ],
  openGraph: {
    title: "Essenzae Laux — Premium Hanging Fragrance Diffuser",
    description:
      "Elevate your space with the luxury fragrance experience. Order via WhatsApp.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
