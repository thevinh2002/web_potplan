import AboutAndBlogs from "@/src/components/AboutAndBlogs";
import Breadcrumb from "@/src/components/Breadcrumb";
import HeroSection from "@/src/components/HeroSection";
import Materials from "@/src/components/Materials";
import NewArrivals from "@/src/components/NewArrivals";
import Newsletter from "@/src/components/Newsletter";
import OEMSection from "@/src/components/OEMSection";
import OrderingProcess from "@/src/components/OrderingProcess";
import ProductCategories from "@/src/components/ProductCategories";
import SuitableFor from "@/src/components/SuitableFor";
import TopProducts from "@/src/components/TopProducts";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#faf8f5]">
      <HeroSection />
      <ProductCategories />
      <NewArrivals />
      <TopProducts />
      <SuitableFor />
      <OEMSection />
      <OrderingProcess />
      <Materials />
      <AboutAndBlogs />
      <Newsletter />
    </div>
  );
}
