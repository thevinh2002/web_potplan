"use client";

import {
  Home,
  Building,
  Trees,
  UtensilsCrossed,
  Stethoscope,
  School,
} from "lucide-react";
import { HomeSuitableFor } from "@/src/types/home";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

const suitableItems: HomeSuitableFor[] = [
  { Icon: Home, name: "Houses" },
  { Icon: Trees, name: "Gardens" },
  { Icon: Building, name: "Offices" },
  { Icon: Building, name: "Hotels" },
  { Icon: Trees, name: "Resorts" },
  { Icon: Building, name: "Mixed-use" },
  { Icon: UtensilsCrossed, name: "Restaurants" },
  { Icon: Stethoscope, name: "Healthcare" },
  { Icon: School, name: "Schools" },
];

export default function SuitableFor() {
  const t = useTranslations("home.suitableFor");

  return (
    <section className="py-16 bg-[#5c4a3d] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold text-center mb-12"
        >
          {t("title")}
        </motion.h2>

        <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-6 text-center">
          {suitableItems.map((item, idx) => (
            <motion.a
              key={idx}
              href="#"
              initial={{ opacity: 0, scale: 0.5, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 12,
                delay: idx * 0.1,
              }}
              className="group hover:text-[#c9a87c] transition-colors"
            >
              <div className="w-16 h-16 mx-auto mb-3 rounded-full border-2 border-[#c9a87c] flex items-center justify-center group-hover:bg-[#c9a87c] group-hover:text-[#5c4a3d] transition-all duration-300">
                <item.Icon className="w-7 h-7" />
              </div>
              <span className="text-sm">
                {t(`items.${item.name.toLowerCase()}`)}
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
