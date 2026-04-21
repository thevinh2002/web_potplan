import { ProductDetail } from "@/src/types/product";
import ProductDetailClient from "./ProductDetailClient";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import {
  getProductByIdPublic,
  getProductBySlugPublic,
  getProductsPublic,
} from "@/src/server/queries/product";
import { notFound, redirect } from "next/navigation";

interface GenerateParamsProps {
  params: { locale: string };
}

export async function generateStaticParams({
  params: { locale },
}: GenerateParamsProps) {
  const t = await getTranslations({ locale, namespace: "product" });

  const products = await getProductsPublic(locale);

  return products.map((product) => ({
    slug: String(product.slug),
  }));
}

interface PageProps {
  params: { slug: string; locale: string };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const t = await getTranslations({
    locale: params.locale,
    namespace: "product",
  });

  let product = (await getProductBySlugPublic(
    params.slug,
    params.locale,
  )) as any;

  if (!product) {
    const otherLocale = params.locale === "vi" ? "en" : "vi";
    const productOther = (await getProductBySlugPublic(
      params.slug,
      otherLocale,
    )) as any;

    if (productOther) {
      const correctProduct = (await getProductByIdPublic(
        productOther.id,
        params.locale,
      )) as any;
      if (correctProduct) {
        redirect(`/${params.locale}/products/${correctProduct.slug}`);
      }
    }
    notFound();
  }

  return (
    <ProductDetailClient
      codeText={t("code")}
      reviewText={t("review")}
      categoryText={t("category")}
      contactText={t("contact")}
      product={product}
    />
  );
}
