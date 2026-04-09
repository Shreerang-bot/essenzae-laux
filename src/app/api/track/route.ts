import { NextRequest, NextResponse } from "next/server";

// --- In-memory mock store ---
interface TrackEvent {
  event: string;
  page?: string;
  skuId?: string;
  timestamp: string;
}

// Global store (persists across requests in dev; resets on redeploy)
const globalStore = globalThis as unknown as {
  __trackEvents?: TrackEvent[];
};

if (!globalStore.__trackEvents) {
  // Seed with 7 days of mock data
  const now = new Date();
  const seed: TrackEvent[] = [];
  for (let d = 6; d >= 0; d--) {
    const date = new Date(now);
    date.setDate(date.getDate() - d);
    const dayStr = date.toISOString().split("T")[0];

    // Simulate realistic traffic
    const views = 80 + Math.floor(Math.random() * 120);
    const clicks = 15 + Math.floor(Math.random() * 40);

    for (let v = 0; v < views; v++) {
      seed.push({
        event: "page_view",
        page: "/",
        timestamp: `${dayStr}T${String(Math.floor(Math.random() * 24)).padStart(2, "0")}:${String(Math.floor(Math.random() * 60)).padStart(2, "0")}:00.000Z`,
      });
    }
    const dummySkus = ["sku-midnight-oud", "sku-vanilla-woods", "sku-citrus-breeze", "sku-ocean-mist", "sku-lavender-bloom", "sku-rose-petal"];
    for (let c = 0; c < clicks; c++) {
      seed.push({
        event: "amazon_click",
        page: "/",
        skuId: dummySkus[Math.floor(Math.random() * dummySkus.length)],
        timestamp: `${dayStr}T${String(Math.floor(Math.random() * 24)).padStart(2, "0")}:${String(Math.floor(Math.random() * 60)).padStart(2, "0")}:00.000Z`,
      });
    }
  }
  globalStore.__trackEvents = seed;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { event, page, skuId } = body;

    if (!event || !["page_view", "amazon_click"].includes(event)) {
      return NextResponse.json(
        { error: "Invalid event type. Must be 'page_view' or 'amazon_click'." },
        { status: 400 }
      );
    }

    const trackEvent: TrackEvent = {
      event,
      page: page || "/",
      skuId,
      timestamp: new Date().toISOString(),
    };

    globalStore.__trackEvents!.push(trackEvent);

    return NextResponse.json({ success: true, event: trackEvent });
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
}

export async function GET() {
  const events = globalStore.__trackEvents || [];

  // Aggregate by day for the last 7 days
  const now = new Date();
  const dailyData: Record<string, { views: number; clicks: number }> = {};

  for (let d = 6; d >= 0; d--) {
    const date = new Date(now);
    date.setDate(date.getDate() - d);
    const key = date.toISOString().split("T")[0];
    dailyData[key] = { views: 0, clicks: 0 };
  }

  for (const ev of events) {
    const day = ev.timestamp.split("T")[0];
    if (dailyData[day]) {
      if (ev.event === "page_view") dailyData[day].views++;
      if (ev.event === "amazon_click") dailyData[day].clicks++;
    }
  }

  const totalViews = events.filter((e) => e.event === "page_view").length;
  const totalClicks = events.filter((e) => e.event === "amazon_click").length;
  const ctr = totalViews > 0 ? ((totalClicks / totalViews) * 100).toFixed(1) : "0.0";

  const skuStats: Record<string, number> = {};
  for (const ev of events) {
    if (ev.event === "amazon_click" && ev.skuId) {
      skuStats[ev.skuId] = (skuStats[ev.skuId] || 0) + 1;
    }
  }
  const productPerformance = Object.entries(skuStats).map(([skuId, clicks]) => ({
    skuId,
    clicks,
    ctr: totalViews > 0 ? ((clicks / totalViews) * 100).toFixed(1) : "0.0"
  })).sort((a,b) => b.clicks - a.clicks);

  const chartData = Object.entries(dailyData).map(([date, data]) => ({
    date,
    label: new Date(date + "T00:00:00").toLocaleDateString("en-IN", {
      weekday: "short",
      day: "numeric",
    }),
    views: data.views,
    clicks: data.clicks,
  }));

  return NextResponse.json({
    productPerformance,
    totalViews,
    totalClicks,
    ctr: parseFloat(ctr),
    chartData,
  });
}
