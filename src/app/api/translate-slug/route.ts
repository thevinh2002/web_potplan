// app/api/translate-slug/route.ts
import {
  getProductBySlugPublic,
  getProductByIdPublic,
} from "@/src/server/queries/product";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");
  const fromLocale = searchParams.get("fromLocale");
  const toLocale = searchParams.get("toLocale");

  if (!slug || !fromLocale || !toLocale) {
    return Response.json({ slug });
  }

  try {
    const product = await getProductBySlugPublic(slug, fromLocale);
    if (!product) return Response.json({ slug });

    const translated = await getProductByIdPublic(product.id, toLocale);
    return Response.json({ slug: translated?.slug || slug });
  } catch {
    return Response.json({ slug });
  }
}
