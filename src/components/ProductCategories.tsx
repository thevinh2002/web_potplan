const productCategories = [
  {
    name: 'Fiberglass Planter',
    image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400',
    link: '#',
  },
  {
    name: 'Fiberstone Planter',
    image: 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=400',
    link: '#',
  },
  {
    name: 'Fibercement Planter',
    image: 'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=400',
    link: '#',
  },
  {
    name: 'Basic Outdoor Pottery',
    image: 'https://images.unsplash.com/photo-1562690868-60bbe7293e94?w=400',
    link: '#',
  },
  {
    name: 'Premium Outdoor Pottery',
    image: 'https://images.unsplash.com/photo-1518882605630-8eb565f5e673?w=400',
    link: '#',
  },
  {
    name: 'Indoor Ceramic Planter',
    image: 'https://images.unsplash.com/photo-1459156212016-c812468e2115?w=400',
    link: '#',
  },
]

export default function ProductCategories() {
  return (
    <section id="products" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-[#5c4a3d] mb-12">
          PRODUCTS
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {productCategories.map((cat, idx) => (
            <a
              key={idx}
              href={cat.link}
              className="group relative overflow-hidden rounded-lg aspect-[4/3]"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-white text-xl font-bold mb-2">{cat.name}</h3>
                <span className="text-[#c9a87c] text-sm font-medium group-hover:underline">
                  See now
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
