import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { event, skuId } = body;

    if (!event || !["page_view", "amazon_click"].includes(event)) {
      return NextResponse.json(
        { error: "Invalid event type." },
        { status: 400 }
      );
    }

    const { error } = await supabase
      .from("product_clicks")
      .insert([
        {
          event_type: event,
          sku_id: skuId || null,
        }
      ]);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Supabase Track Error:", error);
    return NextResponse.json(
      { error: "Failed to track event" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // Fetch last 7 days of events from Supabase
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    // In dev mode without keys, this may fail so catch it gracefully
    const { data: events, error } = await supabase
      .from('product_clicks')
      .select('event_type, sku_id, created_at')
      .gte('created_at', sevenDaysAgo.toISOString());

    if (error) throw error;

    const safeEvents = events || [];

    // Aggregate by day for the last 7 days
    const now = new Date();
    const dailyData: Record<string, { views: number; clicks: number }> = {};

    for (let d = 6; d >= 0; d--) {
      const date = new Date(now);
      date.setDate(date.getDate() - d);
      const key = date.toISOString().split("T")[0];
      dailyData[key] = { views: 0, clicks: 0 };
    }

    for (const ev of safeEvents) {
      const day = ev.created_at.split("T")[0];
      if (dailyData[day]) {
        if (ev.event_type === "page_view") dailyData[day].views++;
        if (ev.event_type === "amazon_click") dailyData[day].clicks++;
      }
    }

    const totalViews = safeEvents.filter((e) => e.event_type === "page_view").length;
    const totalClicks = safeEvents.filter((e) => e.event_type === "amazon_click").length;
    const ctr = totalViews > 0 ? ((totalClicks / totalViews) * 100).toFixed(1) : "0.0";

    const skuStats: Record<string, number> = {};
    for (const ev of safeEvents) {
      if (ev.event_type === "amazon_click" && ev.sku_id) {
        skuStats[ev.sku_id] = (skuStats[ev.sku_id] || 0) + 1;
      }
    }
    const productPerformance = Object.entries(skuStats).map(([skuId, clicks]) => ({
      skuId,
      clicks,
      ctr: totalViews > 0 ? ((clicks / totalViews) * 100).toFixed(1) : "0.0"
    })).sort((a,b) => b.clicks - a.clicks);

    const chartData = Object.entries(dailyData).map(([date, data]) => ({
      date,
      label: new Date(date + "T00:00:00").toLocaleDateString("en-US", {
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
  } catch (error) {
    console.error("Supabase Track GET Error:", error);
    return NextResponse.json({ error: "Failed to read analytics from Supabase" }, { status: 500 });
  }
}
