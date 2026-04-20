import { motion } from "framer-motion";
import Image from "next/image";
import { CoreValueItemProps } from "@/src/types/introduction";

export default function CoreValueItem({
  title,
  description,
  imageSrc,
  imageAlt,
  reverse,
  isLast,
}: CoreValueItemProps) {
  return (
    <div
      className={`grid lg:grid-cols-2 gap-8 lg:gap-16 items-center ${
        isLast ? "" : "mb-16"
      }`}
    >
      <motion.div
        initial={{ opacity: 0, x: reverse ? 50 : -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7 }}
        className={`relative rounded-2xl overflow-hidden shadow-lg ${
          reverse ? "order-1 lg:order-2" : ""
        }`}
      >
        <Image
          src={imageSrc}
          alt={imageAlt}
          width={600}
          height={500}
          className="w-full h-[400px] object-cover"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: reverse ? -50 : 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7 }}
        className={`space-y-4 ${reverse ? "order-2 lg:order-1" : ""}`}
      >
        <h3 className="text-2xl lg:text-3xl font-bold text-[#2c3e50]">
          {title}
        </h3>
        <p className="text-[#5c4a3d] leading-relaxed">{description}</p>
      </motion.div>
    </div>
  );
}
