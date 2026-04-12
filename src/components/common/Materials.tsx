const materials = [
  {
    name: 'Ceramic',
    image: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=300',
  },
  {
    name: 'Composite',
    image: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=300',
  },
  {
    name: 'Metal',
    image: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=300',
  },
  {
    name: 'Natural Fibers',
    image: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=300',
  },
]

export default function Materials() {
  return (
    <section id="materials" className="py-16 bg-[#5c4a3d] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">MATERIALS TALK</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {materials.map((mat, idx) => (
            <div key={idx} className="group cursor-pointer">
              <div className="aspect-square rounded-lg overflow-hidden mb-4">
                <img
                  src={mat.image}
                  alt={mat.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="text-xl font-bold text-center group-hover:text-[#c9a87c] transition-colors">
                {mat.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
