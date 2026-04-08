import TopBar from './components/TopBar'
import Navigation from './components/Navigation'
import HeroSection from './components/HeroSection'
import ProductCategories from './components/ProductCategories'
import NewArrivals from './components/NewArrivals'
import TopProducts from './components/TopProducts'
import SuitableFor from './components/SuitableFor'
import OEMSection from './components/OEMSection'
import OrderingProcess from './components/OrderingProcess'
import Materials from './components/Materials'
import AboutAndBlogs from './components/AboutAndBlogs'
import Newsletter from './components/Newsletter'
import Footer from './components/Footer'

function App() {
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

export default App
