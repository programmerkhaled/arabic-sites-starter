import { SITE_URL } from "@/lib/seo";

// #region robots
export default function robots() {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/ar/lab", "/en/lab"] },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
// #endregion robots
