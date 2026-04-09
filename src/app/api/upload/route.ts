import { put } from "@vercel/blob";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    
    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const blob = await put(file.name, file, { 
        access: 'public',
        addRandomSuffix: true // Safely ensures no naming collisions
    });
    
    return NextResponse.json({ url: blob.url });
  } catch (error) {
    console.error("Vercel Blob upload error:", error);
    return NextResponse.json({ error: "Upload failed. Make sure you have set the BLOB_READ_WRITE_TOKEN." }, { status: 500 });
  }
}
