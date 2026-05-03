export async function trackAndRedirect(url: string, skuId?: string) {
  try {
    await fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event: "whatsapp_click",
        page: window.location.pathname,
        skuId: skuId || "unknown",
        timestamp: new Date().toISOString(),
      }),
    });
  } catch {
    // Silently fail — don't block the redirect
  } finally {
    if (url && url.startsWith("http")) {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  }
}
