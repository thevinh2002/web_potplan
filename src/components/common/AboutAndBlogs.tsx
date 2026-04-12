"use client";

import { ChevronRight } from 'lucide-react'
import { motion } from 'framer-motion'

export default function AboutAndBlogs() {
  return (
    <section id="about" className="py-16 bg-[#f5f2ed] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={{
              visible: { transition: { staggerChildren: 0.15 } }
            }}
          >
            <motion.h2 
              variants={{
                hidden: { opacity: 0, x: -20 },
                visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
              }}
              className="text-3xl font-bold text-[#5c4a3d] mb-6">About Us</motion.h2>
            <motion.p 
              variants={{
                hidden: { opacity: 0, x: -20 },
                visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
              }}
              className="text-gray-600 mb-6 leading-relaxed">
              Aurora Pots is one of the leading Vietnam pottery manufacturers, with
              over 15 years of experience in producing and exporting high-quality
              planters worldwide. Originating as a family-owned workshop
              specializing in handmade pottery, we have steadily expanded our product
              lines.
            </motion.p>
            <motion.a
              variants={{
                hidden: { opacity: 0, x: -20 },
                visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
              }}
              whileHover={{ scale: 1.05, x: 5 }}
              whileTap={{ scale: 0.95 }}
              href="#"
              className="text-[#8b6914] font-bold hover:underline inline-flex items-center gap-2"
            >
              Learn More
              <ChevronRight className="w-4 h-4" />
            </motion.a>
          </motion.div>
          <motion.div 
            id="blogs"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={{
              visible: { transition: { staggerChildren: 0.2, delayChildren: 0.3 } }
            }}
          >
            <motion.h2 
              variants={{
                hidden: { opacity: 0, y: -20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
              }}
              className="text-3xl font-bold text-[#5c4a3d] mb-6">BLOGS</motion.h2>
            <div className="space-y-4">
              <motion.a
                variants={{
                  hidden: { opacity: 0, x: 30, scale: 0.95 },
                  visible: { opacity: 1, x: 0, scale: 1, transition: { type: "spring", bounce: 0.3, duration: 0.6 } }
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href="#"
                className="block bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <h3 className="font-bold text-[#5c4a3d] mb-2">
                  Pottery Manufacturing: Exquisite Handcrafted Techniques
                </h3>
                <p className="text-sm text-gray-500">
                  Discover the traditional methods behind our handcrafted pottery...
                </p>
              </motion.a>
              <motion.a
                variants={{
                  hidden: { opacity: 0, x: 30, scale: 0.95 },
                  visible: { opacity: 1, x: 0, scale: 1, transition: { type: "spring", bounce: 0.3, duration: 0.6 } }
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href="#"
                className="block bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <h3 className="font-bold text-[#5c4a3d] mb-2">
                  Choosing the Right Planter for Your Space
                </h3>
                <p className="text-sm text-gray-500">
                  A comprehensive guide to selecting the perfect planter...
                </p>
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
