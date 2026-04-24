import ProductDetailClient from "./ProductDetailClient";
import { getTranslations } from "next-intl/server";
import { getProductsPublic } from "@/src/server/queries/product";
interface GenerateParamsProps {
  params: { locale: string };
}
export async function generateStaticParams({
  params: { locale },
}: GenerateParamsProps) {
  const t = await getTranslations({ locale, namespace: "product" });
  const products = await getProductsPublic(locale);
  return products.map((product) => ({ slug: String(product.slug) }));
}
interface PageProps {
  params: { slug: string; locale: string };
}
export default async function ProductDetailPage({ params }: PageProps) {
  const t = await getTranslations({
    locale: params.locale,
    namespace: "product",
  });
  const productCategories = (await getProductsPublic(params.locale)) as any;
  const product = productCategories.find(
    (p: any) => String(p.slug) === params.slug,
  );
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
