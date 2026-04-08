const topProducts = [
  {
    name: 'Big Round Brown Rustic Jar',
    code: 'AUP050',
    price: '$65.00',
    image: 'https://images.unsplash.com/photo-1562690868-60bbe7293e94?w=300',
  },
  {
    name: 'Brushed Stainless Steel Planter',
    code: 'AUM007',
    price: '$89.00',
    image: 'https://images.unsplash.com/photo-1518882605630-8eb565f5e673?w=300',
  },
  {
    name: 'Ceramic Decorative Stool',
    code: 'AUD079',
    price: '$75.00',
    image: 'https://images.unsplash.com/photo-1459156212016-c812468e2115?w=300',
  },
  {
    name: 'Classic Terracotta Pots',
    code: 'AUT022',
    price: '$22.00',
    image: 'https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=300',
  },
]

export default function TopProducts() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-[#5c4a3d]">TOP PRODUCT</h2>
          <a href="#" className="text-[#8b6914] hover:underline font-medium">
            View All
          </a>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {topProducts.map((product, idx) => (
            <div
              key={idx}
              className="bg-[#faf8f5] rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow group"
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <p className="text-xs text-gray-500 mb-1">{product.code}</p>
                <h3 className="font-medium text-[#5c4a3d] mb-2 line-clamp-2">
                  {product.name}
                </h3>
                <p className="text-[#8b6914] font-bold">{product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
