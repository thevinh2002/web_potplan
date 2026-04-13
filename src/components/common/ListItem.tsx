import { motion } from "framer-motion";
import { ListItemProps } from "@/src/types/introduction";

export default function ListItem({
  label,
  markerColorClass,
  textColorClass = "",
  delay = 0,
}: ListItemProps) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay }}
      className={`flex items-center gap-3 ${textColorClass}`}
    >
      <span className={`w-2 h-2 ${markerColorClass} rounded-full`} />
      {label}
    </motion.li>
  );
}
