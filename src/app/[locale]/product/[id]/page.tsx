import { ProductDetail } from "@/src/types/product";
import ProductDetailClient from "./ProductDetailClient";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";

interface GenerateParamsProps {
  params: { locale: string };
}

export async function generateStaticParams({
  params: { locale },
}: GenerateParamsProps) {
  const t = await getTranslations({ locale, namespace: "product" });

  const products: ProductDetail[] = t.raw("productsDetail");

  return products.map((product) => ({
    id: String(product.id),
  }));
}

interface PageProps {
  params: { id: string; locale: string };
}

export default function ProductDetailPage({ params }: PageProps) {
  const t = useTranslations("product");

  const productCategories: ProductDetail[] = t.raw("productsDetail");
  const product = productCategories.find((p) => String(p.id) === params.id);

  return (
    <>
      <ProductDetailClient
        codeText={t("code")}
        reviewText={t("review")}
        categoryText={t("category")}
        contactText={t("contact")}
        product={product}
      />
    </>
  );
}
