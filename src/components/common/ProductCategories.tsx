"use client";

import { Link } from "@/src/i18n/routing";
import { motion } from "framer-motion";
import { HomeProductCategories } from "@/src/types/home";
import { useTranslations } from "next-intl";

const productCategories: HomeProductCategories[] = [
  {
    id: "fiberglass-planter",
    name: "Fiberglass Planter",
    image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400",
  },
  {
    id: "fiberstone-planter",
    name: "Fiberstone Planter",
    image: "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=400",
  },
  {
    id: "fibercement-planter",
    name: "Fibercement Planter",
    image: "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=400",
  },
  {
    id: "basic-outdoor-pottery",
    name: "Basic Outdoor Pottery",
    image: "https://images.unsplash.com/photo-1562690868-60bbe7293e94?w=400",
  },
  {
    id: "premium-outdoor-pottery",
    name: "Premium Outdoor Pottery",
    image: "https://images.unsplash.com/photo-1518882605630-8eb565f5e673?w=400",
  },
  {
    id: "indoor-ceramic-planter",
    name: "Indoor Ceramic Planter",
    image: "https://images.unsplash.com/photo-1459156212016-c812468e2115?w=400",
  },
];

export default function ProductCategories() {
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
          {productCategories.map((cat, index) => (
            <motion.div
              key={cat.id}
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
                href={`/product/${cat.id}`}
                className="block group relative overflow-hidden rounded-lg aspect-[4/3] h-full"
              >
                <img
                  src={cat.image}
                  alt={t(`items.${cat.id}`)}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-white text-xl font-bold mb-2">
                    {t(`items.${cat.id}`)}
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

