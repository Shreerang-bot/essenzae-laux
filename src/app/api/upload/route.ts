import { put } from "@vercel/blob";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const token = process.env.BLOB_READ_WRITE_TOKEN;
    if (!token) {
      console.error("BLOB_READ_WRITE_TOKEN is not set");
      return NextResponse.json(
        { error: "Blob storage is not configured." },
        { status: 500 }
      );
    }

    // Generate a unique filename to avoid collisions
    const safeName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, "");
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const filename = `products/${uniqueSuffix}-${safeName}`;

    // Upload to Vercel Blob — use private access (matches the store configuration)
    const blob = await put(filename, file, {
      access: "private",
      token,
    });

    // Return a proxy URL so the frontend can display the image
    // through our /api/blob proxy which has the read token
    const proxyUrl = `/api/blob?url=${encodeURIComponent(blob.url)}`;

    return NextResponse.json({ url: proxyUrl });
  } catch (error: any) {
    console.error("Blob upload error:", error?.message || error);
    return NextResponse.json(
      { error: `Upload failed: ${error?.message || "Unknown error"}` },
      { status: 500 }
    );
  }
}
