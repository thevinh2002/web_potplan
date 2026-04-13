"use client";

import { motion } from "framer-motion";
import Map from "@/src/components/common/Map";

export default function Newsletter() {
  return (
    <section className="py-12 bg-[#8b6914] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={{
            visible: { transition: { staggerChildren: 0.2 } },
          }}
          className="grid lg:grid-cols-2 gap-10 items-center"
        >
          {/* Newsletter Signup */}
          <motion.div
            variants={{
              hidden: { opacity: 0, x: -30 },
              visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
            }}
            className="text-left text-white"
          >
            <h2 className="text-3xl font-bold mb-4">
              Subscribe to Our Newsletter
            </h2>
            <p className="text-white/80 mb-6 text-lg">
              Stay updated with our latest products, offers, and visit us at our
              showroom.
            </p>

            <div className="flex flex-col sm:flex-row max-w-md gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 w-full px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-[#c9a87c] text-black outline-none"
              />
              <button className="w-full sm:w-auto bg-[#5c4a3d] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#4a3d32] transition-colors whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </motion.div>

          {/* Map Embed */}
          <motion.div
            variants={{
              hidden: { opacity: 0, x: 30, scale: 0.95 },
              visible: {
                opacity: 1,
                x: 0,
                scale: 1,
                transition: { type: "spring", bounce: 0.3, duration: 0.8 },
              },
            }}
            className="h-[300px] w-full rounded-xl overflow-hidden shadow-2xl border-4 border-white/20"
          >
            <Map />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
