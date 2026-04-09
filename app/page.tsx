import TopBar from '../src/components/TopBar'
import Navigation from '../src/components/Navigation'
import HeroSection from '../src/components/HeroSection'
import ProductCategories from '../src/components/ProductCategories'
import NewArrivals from '../src/components/NewArrivals'
import TopProducts from '../src/components/TopProducts'
import SuitableFor from '../src/components/SuitableFor'
import OEMSection from '../src/components/OEMSection'
import OrderingProcess from '../src/components/OrderingProcess'
import Materials from '../src/components/Materials'
import AboutAndBlogs from '../src/components/AboutAndBlogs'
import Newsletter from '../src/components/Newsletter'
import Footer from '../src/components/Footer'

export default function Home() {
  return (
    <div className="min-h-screen bg-[#faf8f5]">
      <TopBar />
      <Navigation />
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
      <Footer />
    </div>
  )
}
