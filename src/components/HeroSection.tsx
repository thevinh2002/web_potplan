import { ChevronRight } from 'lucide-react'

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-[#5c4a3d] via-[#6b5749] to-[#8b7355] text-white">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=1200')`,
        }}
      ></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="max-w-3xl">
          <h2 className="text-[#c9a87c] text-sm font-bold tracking-widest mb-4">
            B2B VIETNAM POTTERY MANUFACTURER & EXPORTER
          </h2>
          <h1 className="text-5xl lg:text-7xl font-bold mb-6">AURORA POTS</h1>
          <p className="text-xl text-gray-200 mb-8 leading-relaxed">
            With over 15 years of experience in producing and exporting high quality
            pottery and planters globally. Originating from a humble handcrafted
            pottery workshop, we carry forward traditional craftsmanship while
            embracing modern design.
          </p>
          <a
            href="#about"
            className="inline-flex items-center gap-2 bg-[#c9a87c] text-[#5c4a3d] px-8 py-4 font-bold hover:bg-[#b8986c] transition-colors"
          >
            VIEW MORE
            <ChevronRight className="w-5 h-5" />
          </a>
        </div>
        <div className="mt-12 flex flex-wrap gap-8 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-[#c9a87c] rounded-full"></div>
            <span>Crafted with care and technical accuracy</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-[#c9a87c] rounded-full"></div>
            <span>Inspired by Vietnam's ceramic heritage</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-[#c9a87c] rounded-full"></div>
            <span>Evolving tradition into contemporary design</span>
          </div>
        </div>
      </div>
    </section>
  )
}
