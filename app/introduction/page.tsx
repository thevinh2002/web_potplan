import TopBar from '../../src/components/TopBar'
import Navigation from '../../src/components/Navigation'
import Footer from '../../src/components/Footer'
import Breadcrumb from '../../src/components/Breadcrumb'

export default function Introduction() {
  return (
    <div className="min-h-screen bg-[#faf8f5]">
      <TopBar />
      <Navigation />
      <Breadcrumb />
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-[#5c4a3d] mb-8">Introduction</h1>
          <p className="text-lg text-[#5c4a3d]">
            Welcome to our introduction page. This is where you can learn more about our company and what we do.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  )
}
