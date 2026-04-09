import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const dataFilePath = path.join(process.cwd(), "data", "products.json");

async function readProducts() {
  try {
    const file = await fs.readFile(dataFilePath, "utf8");
    return JSON.parse(file);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return [];
    }
    throw error;
  }
}

async function writeProducts(data: any) {
  await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2), "utf8");
}

export async function GET() {
  try {
    const products = await readProducts();
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: "Failed to read products" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const products = await readProducts();
    
    // Simulate simple ID generation if not provided
    if (!body.id) {
      body.id = `sku-${Date.now()}`;
    }
    
    products.push(body);
    await writeProducts(products);
    
    return NextResponse.json(body, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const products = await readProducts();
    
    const index = products.findIndex((p: any) => p.id === body.id);
    if (index === -1) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    
    products[index] = { ...products[index], ...body };
    await writeProducts(products);
    
    return NextResponse.json(products[index]);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    
    if (!id) {
      return NextResponse.json({ error: "Missing ID parameter" }, { status: 400 });
    }
    
    let products = await readProducts();
    const initialLength = products.length;
    products = products.filter((p: any) => p.id !== id);
    
    if (products.length === initialLength) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    
    await writeProducts(products);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
  }
}
