import { Phone, CreditCard, Factory, ClipboardCheck, Package } from 'lucide-react'

const orderingSteps = [
  {
    Icon: Phone,
    title: 'Initial Inquiry',
    desc: 'Clients find us via ads, social media, request catalog and prices, then visit factory',
  },
  {
    Icon: CreditCard,
    title: 'Order & Deposit',
    desc: 'Clients send order with items and quantity, make 30% deposit minimum',
  },
  {
    Icon: Factory,
    title: 'Mass Production',
    desc: 'Lead time 60-90 days depending on quantity and factory capacity',
  },
  {
    Icon: ClipboardCheck,
    title: 'Quality Control',
    desc: 'QC team inspects all products, third-party inspection available',
  },
  {
    Icon: Package,
    title: 'Packing & Shipping',
    desc: 'Products packed, loaded into containers, logistics handles transportation',
  },
  {
    Icon: CreditCard,
    title: 'Final Payment',
    desc: 'Balance paid after shipping documents, sample and mold costs deducted if MOQ met',
  },
]

export default function OrderingProcess() {
  return (
    <section id="process" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-[#5c4a3d] mb-12">
          REGULAR ORDERING PROCESS
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {orderingSteps.map((step, idx) => (
            <div
              key={idx}
              className="bg-[#faf8f5] p-6 rounded-lg border-l-4 border-[#c9a87c]"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-[#5c4a3d] rounded-full flex items-center justify-center">
                  <step.Icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <span className="text-xs text-[#8b6914] font-bold">
                    STEP {idx + 1}
                  </span>
                  <h3 className="font-bold text-[#5c4a3d]">{step.title}</h3>
                </div>
              </div>
              <p className="text-gray-600 text-sm">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
