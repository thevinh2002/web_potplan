import AboutAndBlogs from "@/src/components/common/AboutAndBlogs";
import HeroSection from "@/src/components/common/HeroSection";
import Newsletter from "@/src/components/common/Newsletter";
import OEMSection from "@/src/components/common/OEMSection";
import ProductCategories from "@/src/components/common/ProductCategories";
import SuitableFor from "@/src/components/common/SuitableFor";
import TopProducts from "@/src/components/common/TopProducts";
import { getProductsPublic } from "@/src/server/queries/product";

const TOP_PRODUCT_CODES = ["VAD 1019", "VAD RC1020", "VAD C90S4", "VAD S102S1021"];

export default async function Home({ params: { locale } }: { params: { locale: string } }) {
  const products = await getProductsPublic(locale);
  const randomProducts = products.sort(() => 0.5 - Math.random()).slice(0, 6);

  // Lấy 4 sản phẩm cố định theo code
  const topProducts = TOP_PRODUCT_CODES.map(code =>
    products.find(p => p.code === code)
  ).filter((p): p is NonNullable<typeof p> => p !== undefined);

  return (
    <div className="min-h-screen bg-[#faf8f5]">
      <HeroSection />
      <ProductCategories products={randomProducts} />
      {/* <NewArrivals /> */}
      <TopProducts products={topProducts} />
      <SuitableFor />
      <OEMSection />
      {/* <OrderingProcess /> */}
      {/* <Materials /> */}
      <AboutAndBlogs />
      <Newsletter />
    </div>
  );
}
