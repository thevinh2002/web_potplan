import { Home, Building, Trees, UtensilsCrossed, Stethoscope, School } from 'lucide-react'

const suitableItems = [
  { Icon: Home, name: 'Houses' },
  { Icon: Trees, name: 'Gardens' },
  { Icon: Building, name: 'Offices' },
  { Icon: Building, name: 'Hotels' },
  { Icon: Trees, name: 'Resorts' },
  { Icon: Building, name: 'Mixed-use' },
  { Icon: UtensilsCrossed, name: 'Restaurants' },
  { Icon: Stethoscope, name: 'Healthcare' },
  { Icon: School, name: 'Schools' },
]

export default function SuitableFor() {
  return (
    <section className="py-16 bg-[#5c4a3d] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">
          OUR PRODUCTS ARE SUITABLE FOR
        </h2>
        <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-6 text-center">
          {suitableItems.map((item, idx) => (
            <a
              key={idx}
              href="#"
              className="group hover:text-[#c9a87c] transition-colors"
            >
              <div className="w-16 h-16 mx-auto mb-3 rounded-full border-2 border-[#c9a87c] flex items-center justify-center group-hover:bg-[#c9a87c] group-hover:text-[#5c4a3d] transition-all">
                <item.Icon className="w-7 h-7" />
              </div>
              <span className="text-sm">{item.name}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
