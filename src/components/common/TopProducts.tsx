"use client";

import { motion } from "framer-motion";
import { HomeTopProducts } from "@/src/types/home";

const topProducts: HomeTopProducts[] = [
  {
    name: "Big Round Brown Rustic Jar",
    code: "AUP050",
    price: "$65.00",
    image: "https://images.unsplash.com/photo-1562690868-60bbe7293e94?w=300",
  },
  {
    name: "Brushed Stainless Steel Planter",
    code: "AUM007",
    price: "$89.00",
    image: "https://images.unsplash.com/photo-1518882605630-8eb565f5e673?w=300",
  },
  {
    name: "Ceramic Decorative Stool",
    code: "AUD079",
    price: "$75.00",
    image: "https://images.unsplash.com/photo-1459156212016-c812468e2115?w=300",
  },
  {
    name: "Classic Terracotta Pots",
    code: "AUT022",
    price: "$22.00",
    image: "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=300",
  },
];

export default function TopProducts() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-2xl font-bold text-[#5c4a3d]"
          >
            TOP PRODUCT
          </motion.h2>
          <motion.a
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            href="#"
            className="text-[#8b6914] hover:underline font-medium"
          >
            View All
          </motion.a>
        </div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.2,
              },
            },
          }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 perspective-[1000px]"
        >
          {topProducts.map((product, idx) => (
            <motion.div
              key={idx}
              variants={{
                hidden: {
                  opacity: 0,
                  scale: 0.1,
                  rotateX: 180,
                  rotateY: 90,
                  rotateZ: -45,
                  y: -150,
                  z: -500,
                },
                visible: {
                  opacity: 1,
                  scale: 1,
                  rotateX: 0,
                  rotateY: 0,
                  rotateZ: 0,
                  y: 0,
                  z: 0,
                  transition: {
                    type: "spring",
                    stiffness: 70,
                    damping: 8,
                    mass: 0.8,
                  },
                },
              }}
              style={{
                transformStyle: "preserve-3d",
                transformOrigin: "center center",
              }}
              className="bg-[#faf8f5] rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow group h-full flex flex-col"
            >
              <div className="aspect-square overflow-hidden relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4 flex-grow flex flex-col justify-between">
                <div>
                  <p className="text-xs text-gray-500 mb-1">{product.code}</p>
                  <h3 className="font-medium text-[#5c4a3d] mb-2 line-clamp-2">
                    {product.name}
                  </h3>
                </div>
                <p className="text-[#8b6914] font-bold">{product.price}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
