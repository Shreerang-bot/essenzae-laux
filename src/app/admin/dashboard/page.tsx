"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Eye,
  MousePointerClick,
  TrendingUp,
  Leaf,
  LayoutDashboard,
  LogOut,
  ExternalLink,
  Activity,
  Calendar,
  ShoppingBag,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Area,
  AreaChart,
} from "recharts";

interface ChartDatum {
  date: string;
  label: string;
  views: number;
  clicks: number;
}

interface DashboardData {
  totalViews: number;
  totalClicks: number;
  ctr: number;
  chartData: ChartDatum[];
  productPerformance: { skuId: string; clicks: number; ctr: string }[];
}

export default function Dashboard() {
  const router = useRouter();
  const [data, setData] = useState<DashboardData | null>(null);
  const [products, setProducts] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock auth guard
    const isAuth = sessionStorage.getItem("el_admin");
    if (!isAuth) {
      router.replace("/admin");
      return;
    }

    Promise.all([
      fetch("/api/track").then(res => res.json()),
      fetch("/api/products").then(res => res.json())
    ])
      .then(([trackData, productsData]) => {
        setData(trackData);
        
        const prodMap: Record<string, string> = {};
        if (Array.isArray(productsData)) {
            productsData.forEach((p: any) => {
              prodMap[p.id] = p.name;
            });
        }
        setProducts(prodMap);
        
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [router]);

  const handleLogout = () => {
    sessionStorage.removeItem("el_admin");
    router.replace("/admin");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-3 border-forest/20 border-t-forest rounded-full animate-spin" />
          <p className="text-forest/60 text-sm">Loading dashboard…</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <p className="text-forest/60">Failed to load analytics data.</p>
      </div>
    );
  }

  const kpis = [
    {
      label: "Total Page Views",
      value: data.totalViews.toLocaleString(),
      icon: Eye,
      color: "from-emerald-500 to-green-600",
      bgColor: "bg-emerald-50",
      iconColor: "text-emerald-600",
      change: "+12.5%",
      changePositive: true,
    },
    {
      label: "Amazon Redirects",
      value: data.totalClicks.toLocaleString(),
      icon: MousePointerClick,
      color: "from-amber-500 to-orange-600",
      bgColor: "bg-amber-50",
      iconColor: "text-amber-600",
      change: "+8.3%",
      changePositive: true,
    },
    {
      label: "Click-Through Rate",
      value: `${data.ctr}%`,
      icon: TrendingUp,
      color: "from-blue-500 to-indigo-600",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
      change: "+2.1%",
      changePositive: true,
    },
  ];

  return (
    <div className="min-h-screen bg-cream flex">
      {/* Sidebar */}
      <aside className="hidden lg:flex flex-col w-72 bg-forest min-h-screen fixed left-0 top-0 bottom-0 z-40">
        {/* Brand */}
        <div className="px-7 py-8 border-b border-cream/8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gold/15 flex items-center justify-center">
              <Leaf className="w-5 h-5 text-gold" />
            </div>
            <div>
              <h2 className="font-[var(--font-playfair)] text-cream font-semibold text-lg tracking-wide">
                Essenzae Laux
              </h2>
              <p className="text-cream/30 text-[11px] tracking-wider uppercase">
                Admin Panel
              </p>
            </div>
          </div>
        </div>

        {/* Nav items */}
        <nav className="flex-1 px-4 py-6 space-y-1">
          <a
            href="/admin/dashboard"
            className="flex items-center gap-3 px-4 py-3 rounded-xl bg-cream/8 text-cream font-medium text-sm transition-colors"
          >
            <LayoutDashboard className="w-5 h-5 text-gold" />
            Dashboard
          </a>
          <a
            href="/admin/products"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-cream/50 hover:text-cream hover:bg-cream/5 text-sm transition-colors"
          >
            <ShoppingBag className="w-5 h-5" />
            Products
          </a>
          <a
            href="/"
            target="_blank"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-cream/50 hover:text-cream hover:bg-cream/5 text-sm transition-colors"
          >
            <ExternalLink className="w-5 h-5" />
            View Landing Page
          </a>
        </nav>

        {/* Logout */}
        <div className="px-4 py-6 border-t border-cream/8">
          <button
            onClick={handleLogout}
            id="admin-logout-btn"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-cream/50 hover:text-red-400 hover:bg-red-500/5 w-full text-sm transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 lg:ml-72">
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-cream/80 backdrop-blur-md border-b border-cream-dark/50 px-6 lg:px-10 py-5">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-[var(--font-playfair)] text-2xl lg:text-3xl font-bold text-forest">
                Analytics Dashboard
              </h1>
              <div className="flex items-center gap-2 mt-1 text-charcoal/40 text-sm">
                <Calendar className="w-4 h-4" />
                <span>Last 7 days</span>
              </div>
            </div>

            {/* Mobile menu/logout */}
            <div className="lg:hidden flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Leaf className="w-5 h-5 text-gold" />
                <span className="font-[var(--font-playfair)] text-forest font-semibold text-sm">
                  EL Admin
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="w-9 h-9 rounded-xl bg-forest/5 flex items-center justify-center hover:bg-forest/10 transition-colors"
              >
                <LogOut className="w-4 h-4 text-forest/60" />
              </button>
            </div>

            <div className="hidden lg:flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-charcoal/40 text-sm">Live</span>
            </div>
          </div>
        </header>

        <div className="px-6 lg:px-10 py-8 space-y-8">
          {/* KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {kpis.map((kpi, i) => {
              const Icon = kpi.icon;
              return (
                <div
                  key={i}
                  className="dashboard-card group"
                  id={`kpi-card-${i}`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className={`w-12 h-12 rounded-xl ${kpi.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform`}
                    >
                      <Icon className={`w-6 h-6 ${kpi.iconColor}`} />
                    </div>
                    <span
                      className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                        kpi.changePositive
                          ? "bg-emerald-50 text-emerald-600"
                          : "bg-red-50 text-red-600"
                      }`}
                    >
                      {kpi.change}
                    </span>
                  </div>
                  <p className="text-charcoal/50 text-sm font-medium">
                    {kpi.label}
                  </p>
                  <p className="font-[var(--font-playfair)] text-3xl font-bold text-forest mt-1">
                    {kpi.value}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Chart */}
          <div className="dashboard-card" id="analytics-chart">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="font-[var(--font-playfair)] text-xl font-semibold text-forest">
                  Traffic Overview
                </h3>
                <p className="text-charcoal/40 text-sm mt-1">
                  Page views vs Amazon clicks over 7 days
                </p>
              </div>
              <div className="flex items-center gap-2 bg-forest/5 rounded-lg px-3 py-1.5">
                <Activity className="w-4 h-4 text-forest/40" />
                <span className="text-forest/60 text-xs font-semibold">
                  7D
                </span>
              </div>
            </div>

            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={data.chartData}
                  margin={{ top: 5, right: 10, left: -10, bottom: 5 }}
                >
                  <defs>
                    <linearGradient
                      id="colorViews"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="5%"
                        stopColor="#1a2f23"
                        stopOpacity={0.15}
                      />
                      <stop
                        offset="95%"
                        stopColor="#1a2f23"
                        stopOpacity={0}
                      />
                    </linearGradient>
                    <linearGradient
                      id="colorClicks"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="5%"
                        stopColor="#c9a96e"
                        stopOpacity={0.2}
                      />
                      <stop
                        offset="95%"
                        stopColor="#c9a96e"
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#e8e4dd"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="label"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#2c2c2c80", fontSize: 12 }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#2c2c2c80", fontSize: 12 }}
                  />
                  <Tooltip
                    contentStyle={{
                      background: "#1a2f23",
                      border: "none",
                      borderRadius: "12px",
                      color: "#faf6ef",
                      fontSize: "13px",
                      boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
                    }}
                    itemStyle={{ color: "#faf6ef" }}
                    labelStyle={{
                      color: "#c9a96e",
                      fontWeight: 600,
                      marginBottom: 4,
                    }}
                  />
                  <Legend
                    verticalAlign="top"
                    align="right"
                    iconType="circle"
                    iconSize={8}
                    wrapperStyle={{
                      fontSize: "12px",
                      paddingBottom: "16px",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="views"
                    name="Page Views"
                    stroke="#1a2f23"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#colorViews)"
                    dot={{
                      r: 4,
                      fill: "#1a2f23",
                      stroke: "#fff",
                      strokeWidth: 2,
                    }}
                    activeDot={{
                      r: 6,
                      fill: "#1a2f23",
                      stroke: "#fff",
                      strokeWidth: 3,
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="clicks"
                    name="Amazon Clicks"
                    stroke="#c9a96e"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#colorClicks)"
                    dot={{
                      r: 4,
                      fill: "#c9a96e",
                      stroke: "#fff",
                      strokeWidth: 2,
                    }}
                    activeDot={{
                      r: 6,
                      fill: "#c9a96e",
                      stroke: "#fff",
                      strokeWidth: 3,
                    }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recent Activity Table */}
          <div className="dashboard-card" id="recent-activity">
            <h3 className="font-[var(--font-playfair)] text-xl font-semibold text-forest mb-6">
              Daily Breakdown
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-cream-dark/50">
                    <th className="text-left py-3 px-4 text-charcoal/40 font-semibold text-xs uppercase tracking-wider">
                      Date
                    </th>
                    <th className="text-right py-3 px-4 text-charcoal/40 font-semibold text-xs uppercase tracking-wider">
                      Views
                    </th>
                    <th className="text-right py-3 px-4 text-charcoal/40 font-semibold text-xs uppercase tracking-wider">
                      Clicks
                    </th>
                    <th className="text-right py-3 px-4 text-charcoal/40 font-semibold text-xs uppercase tracking-wider">
                      CTR
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.chartData.map((day, i) => {
                    const dayCtr =
                      day.views > 0
                        ? ((day.clicks / day.views) * 100).toFixed(1)
                        : "0.0";
                    return (
                      <tr
                        key={i}
                        className="border-b border-cream-dark/30 hover:bg-forest/3 transition-colors"
                      >
                        <td className="py-3.5 px-4 font-medium text-forest">
                          {day.label}
                        </td>
                        <td className="py-3.5 px-4 text-right text-charcoal/70">
                          {day.views.toLocaleString()}
                        </td>
                        <td className="py-3.5 px-4 text-right text-charcoal/70">
                          {day.clicks.toLocaleString()}
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <span className="bg-forest/8 text-forest font-semibold text-xs px-2.5 py-1 rounded-full">
                            {dayCtr}%
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Top Products Table */}
          <div className="dashboard-card" id="top-products">
            <h3 className="font-[var(--font-playfair)] text-xl font-semibold text-forest mb-6">
              Product Performance (CTR)
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-cream-dark/50">
                    <th className="text-left py-3 px-4 text-charcoal/40 font-semibold text-xs uppercase tracking-wider">
                      Product Name
                    </th>
                    <th className="text-right py-3 px-4 text-charcoal/40 font-semibold text-xs uppercase tracking-wider">
                      Clicks
                    </th>
                    <th className="text-right py-3 px-4 text-charcoal/40 font-semibold text-xs uppercase tracking-wider">
                      CTR (vs Total Views)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.productPerformance && data.productPerformance.map((prod, i) => (
                    <tr
                      key={i}
                      className="border-b border-cream-dark/30 hover:bg-forest/3 transition-colors"
                    >
                      <td className="py-3.5 px-4 font-medium text-forest">
                        {products[prod.skuId] || prod.skuId}
                      </td>
                      <td className="py-3.5 px-4 text-right text-charcoal/70">
                        {prod.clicks.toLocaleString()}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <span className="bg-forest/8 text-forest font-semibold text-xs px-2.5 py-1 rounded-full">
                          {prod.ctr}%
                        </span>
                      </td>
                    </tr>
                  ))}
                  {(!data.productPerformance || data.productPerformance.length === 0) && (
                    <tr>
                      <td colSpan={3} className="py-6 text-center text-charcoal/40">
                        No product clicks yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
