export default function Newsletter() {
  return (
    <section className="py-12 bg-[#8b6914]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl font-bold text-white mb-4">
          Subscribe to Our Newsletter
        </h2>
        <p className="text-white/80 mb-6">
          Stay updated with our latest products and offers
        </p>
        <div className="flex max-w-md mx-auto gap-2">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-[#c9a87c]"
          />
          <button className="bg-[#5c4a3d] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#4a3d32] transition-colors">
            Subscribe
          </button>
        </div>
      </div>
    </section>
  )
}
