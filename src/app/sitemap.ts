import { MetadataRoute } from "next";
import fs from "fs";
import path from "path";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const locales = ["en", "vi"];
  const staticPages = ["", "/introduction", "/production", "/contact"];

  // Static routes for each locale
  const staticEntries = staticPages.flatMap((page) =>
    locales.map((locale) => ({
      url: `${baseUrl}/${locale}${page}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: page === "" ? 1 : 0.8,
    }))
  );

  // Dynamic product routes
  // Reading from the local JSON file to ensure sitemap reflects current data
  let products = [];
  try {
    const enMessagesPath = path.join(process.cwd(), "messages/en.json");
    const enMessages = JSON.parse(fs.readFileSync(enMessagesPath, "utf8"));
    products = enMessages.product.productsDetail || [];
  } catch (error) {
    console.error("Error reading products for sitemap:", error);
  }

  const productEntries = products.flatMap((product: any) =>
    locales.map((locale) => ({
      url: `${baseUrl}/${locale}/product/${product.id}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    }))
  );

  return [...staticEntries, ...productEntries];
}
