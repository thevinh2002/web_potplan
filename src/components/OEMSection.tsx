import { ChevronRight } from 'lucide-react'

export default function OEMSection() {
  return (
    <section id="offer" className="py-20 bg-[#f5f2ed]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-[#5c4a3d] mb-6">
              OEM/ODM PROJECTS ARE WARMLY WELCOMED
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              With 3 factories and a maximum output of 60 containers per month, we
              offer strong production capacity to support your OEM needs. Our
              experienced team of designers and engineers works closely with partners
              to turn ideas into high-quality, market-ready products.
            </p>
            <p className="text-[#8b6914] font-medium mb-8">
              OEM, ODM, and custom ceramic manufacturing solutions, let's bring
              your ideas to life.
            </p>
            <a
              href="#"
              className="inline-flex items-center gap-2 bg-[#5c4a3d] text-white px-8 py-4 font-bold hover:bg-[#4a3d32] transition-colors"
            >
              CONTACT US
              <ChevronRight className="w-5 h-5" />
            </a>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img
              src="https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=400"
              alt="Factory"
              className="rounded-lg"
            />
            <img
              src="https://images.unsplash.com/photo-1562690868-60bbe7293e94?w=400"
              alt="Pottery"
              className="rounded-lg mt-8"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
