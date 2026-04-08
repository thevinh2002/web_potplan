const newArrivals = [
  {
    name: 'Antique Ceramic Amphora Planter',
    code: 'AUV114',
    price: '$45.00',
    image: 'https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=300',
  },
  {
    name: 'Bubble Cylinder Atlantic Planter',
    code: 'AUV026',
    price: '$38.00',
    image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=300',
  },
  {
    name: 'Big Round Brown Rustic Bowl',
    code: 'AUP051',
    price: '$52.00',
    image: 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=300',
  },
  {
    name: 'Bamboo Pendant Lampshade',
    code: 'AUW038',
    price: '$28.00',
    image: 'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=300',
  },
]

export default function NewArrivals() {
  return (
    <section className="py-16 bg-[#f5f2ed]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-[#5c4a3d]">NEW ARRIVALS</h2>
          <a href="#" className="text-[#8b6914] hover:underline font-medium">
            View All
          </a>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newArrivals.map((product, idx) => (
            <div
              key={idx}
              className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow group"
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
