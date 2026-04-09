export async function trackAndRedirect(amazonUrl: string, skuId?: string) {
  try {
    await fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event: "amazon_click",
        page: window.location.pathname,
        skuId: skuId || "unknown",
        timestamp: new Date().toISOString(),
      }),
    });
  } catch {
    // Silently fail — don't block the redirect
  } finally {
    if (amazonUrl && amazonUrl.startsWith("http")) {
      window.open(amazonUrl, "_blank", "noopener,noreferrer");
    }
  }
}
