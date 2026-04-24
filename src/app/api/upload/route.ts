import { put } from "@vercel/blob";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Generate a unique filename to avoid collisions
    const safeName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, "");
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const filename = `products/${uniqueSuffix}-${safeName}`;

    // Upload to Vercel Blob (uses BLOB_READ_WRITE_TOKEN env var automatically)
    const blob = await put(filename, file, {
      access: "public",
    });

    return NextResponse.json({ url: blob.url });
  } catch (error) {
    console.error("Blob upload error:", error);
    return NextResponse.json({ error: "Upload failed." }, { status: 500 });
  }
}
