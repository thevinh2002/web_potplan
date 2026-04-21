import { getProductsPublic } from "@/src/server/queries/product";
import { getCategoriesPublic } from "@/src/server/queries/category";
import { setRequestLocale } from "next-intl/server";
import ProductionClient from "./ProductClient";

export default async function ProductionPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);

  const products = (await getProductsPublic(locale)) as any;
  const categories = (await getCategoriesPublic(locale)) as any;

  return (
    <ProductionClient
      initialProducts={products}
      initialCategories={categories}
    />
  );
}
