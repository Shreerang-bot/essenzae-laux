import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  try {
    const { data: products, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;

    // Ensure camelCase properties are mapped correctly, as Postgres forces lowercase 
    // unless columns were quoted.
    const mapped = (products || []).map((p) => ({
      ...p,
      amazonUrl: p.amazonUrl || p.amazonurl,
    }));

    return NextResponse.json(mapped);
  } catch (error) {
    console.error("Supabase GET Error:", error);
    return NextResponse.json({ error: "Failed to read products from Supabase" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Simulate simple ID generation if not provided
    if (!body.id) {
      body.id = `sku-${Date.now()}`;
    }

    // Prepare payload to handle postgres case-sensitivities
    const payload = {
        id: body.id,
        name: body.name,
        price: body.price,
        description: body.description,
        amazonurl: body.amazonUrl, // Mapped to postgres
        images: body.images || []
    };
    
    const { data, error } = await supabase
      .from("products")
      .insert([payload])
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error("Supabase POST Error:", error);
    return NextResponse.json({ error: "Failed to create product in Supabase" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    
    if (!body.id) {
        return NextResponse.json({ error: "Missing ID" }, { status: 400 });
    }

    const payload = {
        name: body.name,
        price: body.price,
        description: body.description,
        amazonurl: body.amazonUrl,
        images: body.images || []
    };
    
    const { data, error } = await supabase
      .from("products")
      .update(payload)
      .eq("id", body.id)
      .select()
      .single();

    if (error) throw error;
    
    return NextResponse.json(data);
  } catch (error) {
    console.error("Supabase PUT Error:", error);
    return NextResponse.json({ error: "Failed to update product in Supabase" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    
    if (!id) {
      return NextResponse.json({ error: "Missing ID parameter" }, { status: 400 });
    }
    
    const { error } = await supabase
        .from("products")
        .delete()
        .eq("id", id);
        
    if (error) throw error;
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Supabase DELETE Error:", error);
    return NextResponse.json({ error: "Failed to delete product from Supabase" }, { status: 500 });
  }
}
