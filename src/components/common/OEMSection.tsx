"use client";

import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/src/i18n/routing";

export default function OEMSection() {
  const t = useTranslations("home.oem");

  return (
    <section id="offer" className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={{
              visible: { transition: { staggerChildren: 0.2 } },
            }}
          >
            <motion.h2
              variants={{
                hidden: { opacity: 0, x: -30 },
                visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
              }}
              className="text-3xl font-bold text-[#5c4a3d] mb-6"
            >
              {t("title")}
            </motion.h2>
            <motion.p
              variants={{
                hidden: { opacity: 0, x: -30 },
                visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
              }}
              className="text-gray-600 mb-6 leading-relaxed"
            >
              {t("description1")}
            </motion.p>
            <motion.p
              variants={{
                hidden: { opacity: 0, x: -30 },
                visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
              }}
              className="text-[#8b6914] font-medium mb-8"
            >
              {t("description2")}
            </motion.p>
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
              }}
            >
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-[#5c4a3d] text-white px-8 py-4 font-bold hover:bg-[#4a3d32] transition-colors"
              >
                {t("contactUs")}
                <ChevronRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={{
              visible: {
                transition: { staggerChildren: 0.3, delayChildren: 0.4 },
              },
            }}
            className="grid grid-cols-2 gap-4"
          >
            <motion.img
              variants={{
                hidden: { opacity: 0, y: -50, filter: "blur(5px)" },
                visible: {
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                  transition: { duration: 0.8, ease: "easeOut" },
                },
              }}
              src="https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=400"
              alt="Factory"
              className="rounded-lg"
            />
            <motion.img
              variants={{
                hidden: { opacity: 0, y: 50, filter: "blur(5px)" },
                visible: {
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                  transition: { duration: 0.8, ease: "easeOut" },
                },
              }}
              src="https://images.unsplash.com/photo-1562690868-60bbe7293e94?w=400"
              alt="Pottery"
              className="rounded-lg mt-8"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
