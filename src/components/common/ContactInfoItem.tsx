import { motion } from "framer-motion";
import { ContactInfoItemProps } from "@/src/types/contact";

export default function ContactInfoItem({
  icon: Icon,
  title,
  content,
  href,
  delay = 0,
}: ContactInfoItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay }}
      className="flex gap-4"
    >
      <div className="w-10 h-10 bg-[#faf8f5] rounded-full flex items-center justify-center shrink-0">
        <Icon className="w-5 h-5 text-[#8b6914]" />
      </div>
      <div>
        <h5 className="font-semibold text-[#5c4a3d] mb-1">{title}</h5>
        {href ? (
          <a href={href} className="text-[#8b6914] font-medium hover:underline">
            {content}
          </a>
        ) : (
          <p className="text-gray-600 text-sm leading-relaxed">{content}</p>
        )}
      </div>
    </motion.div>
  );
}
