"use client";

import { ChevronRight } from 'lucide-react'
import { motion } from 'framer-motion'

export default function OEMSection() {
  return (
    <section id="offer" className="py-20 bg-[#f5f2ed] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={{
              visible: { transition: { staggerChildren: 0.2 } }
            }}
          >
            <motion.h2 
              variants={{
                hidden: { opacity: 0, x: -30 },
                visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
              }}
              className="text-3xl font-bold text-[#5c4a3d] mb-6">
              OEM/ODM PROJECTS ARE WARMLY WELCOMED
            </motion.h2>
            <motion.p 
              variants={{
                hidden: { opacity: 0, x: -30 },
                visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
              }}
              className="text-gray-600 mb-6 leading-relaxed">
              With 3 factories and a maximum output of 60 containers per month, we
              offer strong production capacity to support your OEM needs. Our
              experienced team of designers and engineers works closely with partners
              to turn ideas into high-quality, market-ready products.
            </motion.p>
            <motion.p 
              variants={{
                hidden: { opacity: 0, x: -30 },
                visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
              }}
              className="text-[#8b6914] font-medium mb-8">
              OEM, ODM, and custom ceramic manufacturing solutions, let's bring
              your ideas to life.
            </motion.p>
            <motion.a
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#"
              className="inline-flex items-center gap-2 bg-[#5c4a3d] text-white px-8 py-4 font-bold hover:bg-[#4a3d32] transition-colors"
            >
              CONTACT US
              <ChevronRight className="w-5 h-5" />
            </motion.a>
          </motion.div>
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={{
              visible: { transition: { staggerChildren: 0.3, delayChildren: 0.4 } }
            }}
            className="grid grid-cols-2 gap-4"
          >
            <motion.img
              variants={{
                hidden: { opacity: 0, y: -50, filter: "blur(5px)" },
                visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: "easeOut" } }
              }}
              src="https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=400"
              alt="Factory"
              className="rounded-lg"
            />
            <motion.img
              variants={{
                hidden: { opacity: 0, y: 50, filter: "blur(5px)" },
                visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: "easeOut" } }
              }}
              src="https://images.unsplash.com/photo-1562690868-60bbe7293e94?w=400"
              alt="Pottery"
              className="rounded-lg mt-8"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
