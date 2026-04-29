"use client";

import { Link } from "@/src/i18n/routing";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

interface Product {
  id: string;
  name: string;
  image_cover: string;
  slug: string;
}

export default function ProductCategories({ products }: { products: Product[] }) {
  const t = useTranslations("home.categories");

  return (
    <section id="products" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold text-center text-[#5c4a3d] mb-12"
        >
          {t("title")}
        </motion.h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.slice(0, 6).map((product, index) => (
            <motion.div
              key={product.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2, margin: "-50px" }}
              variants={{
                hidden: { opacity: 0, scale: 0.9, y: 30 },
                visible: {
                  opacity: 1,
                  scale: 1,
                  y: 0,
                  transition: {
                    type: "spring",
                    stiffness: 100,
                    damping: 15,
                    delay: (index % 3) * 0.15,
                  },
                },
              }}
            >
              <Link
                href={`/product/${product.slug}`}
                className="block group relative overflow-hidden rounded-lg aspect-[4/3] h-full"
              >
                <img
                  src={product.image_cover}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-white text-xl font-bold mb-2">
                    {product.name}
                  </h3>
                  <span className="text-[#c9a87c] text-sm font-medium group-hover:underline">
                    {t("viewDetails")}
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

