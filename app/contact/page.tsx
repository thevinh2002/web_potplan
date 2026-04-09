import TopBar from '../../src/components/TopBar'
import Navigation from '../../src/components/Navigation'
import Footer from '../../src/components/Footer'

export default function Contact() {
  return (
    <div className="min-h-screen bg-[#faf8f5]">
      <TopBar />
      <Navigation />
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-[#5c4a3d] mb-8">Contact</h1>
          <p className="text-lg text-[#5c4a3d]">
            Welcome to our contact page. Get in touch with us for any inquiries.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  )
}
