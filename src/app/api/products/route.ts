import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;

    // Map DB column names to frontend-friendly format
    const products = (data || []).map((p) => ({
      id: p.id,
      name: p.name,
      price: p.price,
      description: p.description,
      amazonLink: p.amazonUrl,
      images: p.images || [],
      created_at: p.created_at,
    }));

    return NextResponse.json(products);
  } catch (error) {
    console.error("Supabase GET Error:", error);
    return NextResponse.json(
      { error: "Failed to read products" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const id = body.id || `sku-${Date.now()}`;

    const payload = {
      id,
      name: body.name,
      price: body.price,
      description: body.description,
      amazonUrl: body.amazonLink || body.amazonUrl || "",
      images: body.images || [],
    };

    const { data, error } = await supabase
      .from("products")
      .insert(payload)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(
      {
        ...data,
        amazonLink: data.amazonUrl,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Supabase POST Error:", error);
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();

    if (!body.id) {
      return NextResponse.json({ error: "Missing ID" }, { status: 400 });
    }

    const updates = {
      name: body.name,
      price: body.price,
      description: body.description,
      amazonUrl: body.amazonLink || body.amazonUrl || "",
      images: body.images || [],
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from("products")
      .update(updates)
      .eq("id", body.id)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({
      ...data,
      amazonLink: data.amazonUrl,
    });
  } catch (error) {
    console.error("Supabase PUT Error:", error);
    return NextResponse.json(
      { error: "Failed to update product" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Missing ID parameter" },
        { status: 400 }
      );
    }

    const { error } = await supabase.from("products").delete().eq("id", id);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Supabase DELETE Error:", error);
    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 }
    );
  }
}
