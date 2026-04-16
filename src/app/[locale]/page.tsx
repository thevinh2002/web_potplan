import AboutAndBlogs from "@/src/components/common/AboutAndBlogs";
import Breadcrumb from "@/src/components/common/Breadcrumb";
import HeroSection from "@/src/components/common/HeroSection";
import Materials from "@/src/components/common/Materials";
import NewArrivals from "@/src/components/common/NewArrivals";
import Newsletter from "@/src/components/common/Newsletter";
import OEMSection from "@/src/components/common/OEMSection";
import OrderingProcess from "@/src/components/common/OrderingProcess";
import ProductCategories from "@/src/components/common/ProductCategories";
import SuitableFor from "@/src/components/common/SuitableFor";
import TopProducts from "@/src/components/common/TopProducts";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#faf8f5]">
      <HeroSection />
      <ProductCategories />
      {/* <NewArrivals /> */}
      <TopProducts />
      <SuitableFor />
      <OEMSection />
      {/* <OrderingProcess /> */}
      {/* <Materials /> */}
      <AboutAndBlogs />
      <Newsletter />
    </div>
  );
}
