import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function POST(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const path = searchParams.get("path");
    const secret = searchParams.get("secret");

    // Verify secret token matching to prevent cache poisoning spam attacks
    if (secret !== process.env.REVALIDATION_TOKEN) {
      return NextResponse.json({ success: false, message: "Invalid token validation credential" }, { status: 401 });
    }

    if (!path) {
      return NextResponse.json({ success: false, message: "Missing target 'path' query string parameter" }, { status: 400 });
    }

    // Wipe edge caches and refresh Next.js statically compiled page layouts on-demand
    revalidatePath(path);
    return NextResponse.json({ success: true, revalidated: true, at: new Date().toISOString() });

  } catch (error) {
    console.error("[ON_DEMAND_REVALIDATION_ERROR]:", error);
    return NextResponse.json({ success: false, error: "Cache revalidation process failed." }, { status: 500 });
  }
}