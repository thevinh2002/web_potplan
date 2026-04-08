import { ChevronRight } from 'lucide-react'

export default function AboutAndBlogs() {
  return (
    <section id="about" className="py-16 bg-[#f5f2ed]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold text-[#5c4a3d] mb-6">About Us</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Aurora Pots is one of the leading Vietnam pottery manufacturers, with
              over 15 years of experience in producing and exporting high-quality
              planters worldwide. Originating as a family-owned workshop
              specializing in handmade pottery, we have steadily expanded our product
              lines.
            </p>
            <a
              href="#"
              className="text-[#8b6914] font-bold hover:underline inline-flex items-center gap-2"
            >
              Learn More
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>
          <div id="blogs">
            <h2 className="text-3xl font-bold text-[#5c4a3d] mb-6">BLOGS</h2>
            <div className="space-y-4">
              <a
                href="#"
                className="block bg-white p-4 rounded-lg hover:shadow-md transition-shadow"
              >
                <h3 className="font-bold text-[#5c4a3d] mb-2">
                  Pottery Manufacturing: Exquisite Handcrafted Techniques
                </h3>
                <p className="text-sm text-gray-500">
                  Discover the traditional methods behind our handcrafted pottery...
                </p>
              </a>
              <a
                href="#"
                className="block bg-white p-4 rounded-lg hover:shadow-md transition-shadow"
              >
                <h3 className="font-bold text-[#5c4a3d] mb-2">
                  Choosing the Right Planter for Your Space
                </h3>
                <p className="text-sm text-gray-500">
                  A comprehensive guide to selecting the perfect planter...
                </p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
