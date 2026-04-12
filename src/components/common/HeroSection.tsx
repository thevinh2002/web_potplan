"use client";
import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-[#5c4a3d] via-[#6b5749] to-[#8b7355] text-white">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=1200')`,
        }}
      ></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="max-w-3xl">
          <motion.h2 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-[#c9a87c] text-sm font-bold tracking-widest mb-4">
            B2B VIETNAM POTTERY MANUFACTURER & EXPORTER
          </motion.h2>

          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl lg:text-7xl font-bold mb-6">
            AURORA POTS
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="text-xl text-gray-200 mb-8 leading-relaxed"
          >
            With over 15 years of experience in producing and exporting high
            quality pottery and planters globally. Originating from a humble
            handcrafted pottery workshop, we carry forward traditional
            craftsmanship while embracing modern design.
          </motion.p>
          
          <motion.a
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            href="#about"
            className="inline-flex items-center gap-2 bg-[#c9a87c] text-[#5c4a3d] px-8 py-4 font-bold hover:bg-[#b8986c] transition-colors"
          >
            VIEW MORE
            <ChevronRight className="w-5 h-5" />
          </motion.a>
        </div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.2,
                delayChildren: 0.8
              }
            }
          }}
          className="mt-12 flex flex-wrap gap-8 text-sm"
        >
          {[
            "Crafted with care and technical accuracy",
            "Inspired by Vietnam's ceramic heritage",
            "Evolving tradition into contemporary design"
          ].map((text, i) => (
            <motion.div 
              key={i}
              variants={{
                hidden: { opacity: 0, x: -20 },
                visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
              }}
              className="flex items-center gap-2"
            >
              <div className="w-2 h-2 bg-[#c9a87c] rounded-full"></div>
              <span>{text}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
