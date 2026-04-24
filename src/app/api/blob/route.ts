import { get } from "@vercel/blob";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get("url");

  if (!url) {
    return NextResponse.json(
      { error: "Missing url parameter" },
      { status: 400 }
    );
  }

  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) {
    return NextResponse.json(
      { error: "Blob storage is not configured." },
      { status: 500 }
    );
  }

  try {
    // Validate that the URL points to a Vercel Blob store
    const parsedUrl = new URL(url);
    if (!parsedUrl.hostname.endsWith(".blob.vercel-storage.com")) {
      return NextResponse.json(
        { error: "Invalid blob URL" },
        { status: 400 }
      );
    }

    // Fetch the blob from the private store using the SDK
    const result = await get(url, {
      access: "private",
      token,
    });

    if (!result || result.statusCode !== 200) {
      return NextResponse.json(
        { error: "Blob not found" },
        { status: 404 }
      );
    }

    const contentType =
      result.blob.contentType || "application/octet-stream";

    // Stream the blob content back to the client
    return new NextResponse(result.stream, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error: any) {
    console.error("Blob proxy error:", error?.message || error);
    return NextResponse.json(
      { error: "Failed to serve blob" },
      { status: 500 }
    );
  }
}
