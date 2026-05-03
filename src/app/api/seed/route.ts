import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// Placeholder image — will be replaced via admin later
const PLACEHOLDER_IMG = "https://placehold.co/600x800/1a2f23/c9a96e?text=Essenzae+Laux&font=playfair-display";

const SEED_PRODUCTS = [
  // ─── REED DIFFUSERS ───────────────────────────────────────
  {
    id: "reed-musk-petal",
    name: "Musk Petal",
    description: "Soft florals that whisper elegance. Notes of Jasmine and Marigold create a fresh, gentle, and uplifting experience.",
    price: 999,
    original_price: 1499,
    category: "reed-diffusers",
    amazonUrl: "",
    images: [PLACEHOLDER_IMG],
  },
  {
    id: "reed-atelier-edition",
    name: "Atelier Edition (Italian Luxury)",
    description: "Crafted depth. Defined presence. A bold blend of Pink Pepper, Jasmine, Coffee, Orris, Patchouli, and Cedar — artistic and sophisticated.",
    price: 999,
    original_price: 1499,
    category: "reed-diffusers",
    amazonUrl: "",
    images: [PLACEHOLDER_IMG],
  },
  {
    id: "reed-pearl-oud",
    name: "Pearl Oud",
    description: "Where softness meets intensity. A luxurious harmony of florals and oud — rich, warm, and opulent.",
    price: 999,
    original_price: 1499,
    category: "reed-diffusers",
    amazonUrl: "",
    images: [PLACEHOLDER_IMG],
  },
  {
    id: "reed-aqua-breeze",
    name: "Aqua Breeze",
    description: "A breath of open skies. A refreshing aquatic blend with citrus brightness — airy, clean, and free.",
    price: 999,
    original_price: 1499,
    category: "reed-diffusers",
    amazonUrl: "",
    images: [PLACEHOLDER_IMG],
  },
  {
    id: "reed-rich-lavender",
    name: "Rich Lavender",
    description: "Calm, bottled. A soothing floral essence that brings relaxation, peace, and softness to any space.",
    price: 999,
    original_price: 1499,
    category: "reed-diffusers",
    amazonUrl: "",
    images: [PLACEHOLDER_IMG],
  },
  {
    id: "reed-lamour-rose",
    name: "L'Amour Rose",
    description: "Timeless romance. A classic floral fragrance — romantic, classic, and elegant.",
    price: 999,
    original_price: 1499,
    category: "reed-diffusers",
    amazonUrl: "",
    images: [PLACEHOLDER_IMG],
  },
  {
    id: "reed-jasmine-aura",
    name: "Jasmine Aura",
    description: "An exotic bloom in its purest form. Lush, sensual, and irresistibly floral.",
    price: 999,
    original_price: 1499,
    category: "reed-diffusers",
    amazonUrl: "",
    images: [PLACEHOLDER_IMG],
  },
  {
    id: "reed-vanilla-ember",
    name: "Vanilla Ember",
    description: "Comfort in every note. A warm, creamy sweetness that feels cozy and inviting.",
    price: 999,
    original_price: 1499,
    category: "reed-diffusers",
    amazonUrl: "",
    images: [PLACEHOLDER_IMG],
  },

  // ─── CAR DIFFUSERS ────────────────────────────────────────
  {
    id: "car-musk-petal",
    name: "Musk Petal",
    description: "A premium car fragrance with soft musk and floral petal notes. Designed to fill your car with a fresh, elegant aroma.",
    price: 999,
    original_price: 1499,
    category: "car-diffusers",
    amazonUrl: "",
    images: [PLACEHOLDER_IMG],
  },
  {
    id: "car-atelier-edition",
    name: "Atelier Edition",
    description: "A bold, sophisticated car fragrance with layered notes of spice, coffee, and wood. Crafted for those who define their own presence.",
    price: 999,
    original_price: 1499,
    category: "car-diffusers",
    amazonUrl: "",
    images: [PLACEHOLDER_IMG],
  },
  {
    id: "car-pearl-oud",
    name: "Pearl Oud",
    description: "An opulent car fragrance blending luxurious oud with soft florals. Brings warmth and richness to every drive.",
    price: 999,
    original_price: 1499,
    category: "car-diffusers",
    amazonUrl: "",
    images: [PLACEHOLDER_IMG],
  },
  {
    id: "car-aqua-breeze",
    name: "Aqua Breeze",
    description: "A refreshing aquatic car fragrance with citrus brightness. Perfect for a clean, airy driving experience.",
    price: 999,
    original_price: 1499,
    category: "car-diffusers",
    amazonUrl: "",
    images: [PLACEHOLDER_IMG],
  },
  {
    id: "car-lavender",
    name: "Lavender",
    description: "A calming lavender car fragrance that soothes the senses. Ideal for a relaxed and peaceful commute.",
    price: 999,
    original_price: 1499,
    category: "car-diffusers",
    amazonUrl: "",
    images: [PLACEHOLDER_IMG],
  },
  {
    id: "car-rose",
    name: "Rose",
    description: "A timeless rose car fragrance with classic floral elegance. Brings a romantic, refined atmosphere to your vehicle.",
    price: 999,
    original_price: 1499,
    category: "car-diffusers",
    amazonUrl: "",
    images: [PLACEHOLDER_IMG],
  },
  {
    id: "car-jasmine",
    name: "Jasmine",
    description: "An exotic jasmine car fragrance in its purest form. Fills your car with a lush, sensual floral aroma.",
    price: 999,
    original_price: 1499,
    category: "car-diffusers",
    amazonUrl: "",
    images: [PLACEHOLDER_IMG],
  },
  {
    id: "car-vanilla",
    name: "Vanilla",
    description: "A warm vanilla car fragrance with creamy, comforting notes. Creates a cozy, inviting atmosphere for every journey.",
    price: 999,
    original_price: 1499,
    category: "car-diffusers",
    amazonUrl: "",
    images: [PLACEHOLDER_IMG],
  },
];

export async function POST() {
  try {
    // Step 1: Delete all existing products
    const { error: deleteError } = await supabase
      .from("products")
      .delete()
      .neq("id", "___never_match___"); // Delete all rows

    if (deleteError) {
      console.error("Delete error:", deleteError);
      throw new Error(`Failed to clear products: ${deleteError.message}`);
    }

    // Step 2: Insert all seed products
    const { data, error: insertError } = await supabase
      .from("products")
      .insert(SEED_PRODUCTS)
      .select();

    if (insertError) {
      console.error("Insert error:", insertError);
      throw new Error(`Failed to seed products: ${insertError.message}`);
    }

    return NextResponse.json({
      success: true,
      message: `Seeded ${data?.length || 0} products successfully`,
      products: data,
    });
  } catch (error) {
    console.error("Seed Error:", error);
    return NextResponse.json(
      {
        error: "Seed failed",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
