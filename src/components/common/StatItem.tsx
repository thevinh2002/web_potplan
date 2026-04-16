import { motion } from "framer-motion";
import { StatItemProps } from "@/src/types/introduction";

export default function StatItem({ value, label, delay }: StatItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay }}
      className="space-y-2"
    >
      <div className="text-4xl font-bold text-[#8b6914]">{value}</div>
      <div className="text-white/80 text-sm">{label}</div>
    </motion.div>
  );
}
