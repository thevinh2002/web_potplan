"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import StatItem from "@/src/components/common/StatItem";
import CoreValueItem from "@/src/components/common/CoreValueItem";
import ListItem from "@/src/components/common/ListItem";
import {
  CoreValueItemProps,
  FactoryImageProps,
  ListItemProps,
  StatItemProps,
} from "@/src/types/introduction";
import ContactButton from "@/src/components/ui/ContactButton";
import { useTranslations } from "next-intl";

const factoryImages: FactoryImageProps[] = [
  {
    src: "/pictures/VAD/z7286051248710_14377cce669b50e71453fdb4447c2e62.jpg",
    alt: "Viet Anh Dung Factory - Production",
  },
  {
    src: "/pictures/VAD/z7286111967628_37ade99bd315f00770eb896fbaaaef76.jpg",
    alt: "Viet Anh Dung Factory - Crafting",
  },
  {
    src: "/pictures/VAD/z7286112036928_3f8bb8f02b536c49bc2ac0609692580d.jpg",
    alt: "Viet Anh Dung Factory - Products",
  },
  {
    src: "/pictures/VAD/z7291759381132_74e50b616429b1f6a20bc2b6ba20b8c4.jpg",
    alt: "Viet Anh Dung Factory - Modern Designs",
  },
];

export default function Introduction() {
  const [currentImage, setCurrentImage] = useState(0);
  const t = useTranslations("introduction");
  const chooseUsList: ListItemProps[] = t.raw("whyChoose.list");
  const requestList: ListItemProps[] = t.raw("whyChoose.requestList");
  const coreValuesList: CoreValueItemProps[] = t.raw("coreValues.items");
  const statsData: StatItemProps[] = t.raw("stats");

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % factoryImages.length);
  };

  const prevImage = () => {
    setCurrentImage(
      (prev) => (prev - 1 + factoryImages.length) % factoryImages.length,
    );
  };

  // Auto-advance carousel every 3 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % factoryImages.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#faf8f5] overflow-x-hidden">
      {/* Hero Section - About Us */}
      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Image Carousel - Left Side */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl w-full h-[500px] lg:h-[600px]">
                <AnimatePresence>
                  <motion.div
                    key={currentImage}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={factoryImages[currentImage].src}
                      alt={factoryImages[currentImage].alt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover"
                      priority
                    />
                  </motion.div>
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-t from-[#5c4a3d]/30 to-transparent pointer-events-none" />

                {/* Navigation Arrows */}
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-6 h-6 text-[#5c4a3d]" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-6 h-6 text-[#5c4a3d]" />
                </button>

                {/* Dot Indicators */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {factoryImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImage(index)}
                      className={`w-2.5 h-2.5 rounded-full transition-all ${
                        index === currentImage
                          ? "bg-white w-8"
                          : "bg-white/50 hover:bg-white/80"
                      }`}
                      aria-label={`Go to image ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-[#8b6914]/20 rounded-full -z-10" />
              <div className="absolute -top-4 -left-4 w-16 h-16 bg-[#5c4a3d]/10 rounded-full -z-10" />
            </motion.div>

            {/* Content - Right Side */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6"
            >
              <div>
                <h1 className="text-4xl lg:text-5xl font-bold text-[#5c4a3d] leading-tight mb-4">
                  {t("hero.title1")}
                  <br />
                  <span className="text-[#8b6914]">{t("hero.title2")}</span>
                </h1>
                <div className="w-20 h-1 bg-[#8b6914] rounded-full" />
              </div>

              <p className="text-lg text-[#5c4a3d] leading-relaxed">
                {t("hero.desc1")}
              </p>

              <p className="text-lg text-[#5c4a3d] leading-relaxed">
                {t("hero.desc2")}
              </p>

              <p className="text-[#c53030] font-semibold italic">
                {t("hero.highlight")}
              </p>

              <ContactButton text={t("hero.contact")} showIcon={true} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-1 gap-12 items-start">
            {/* Product Image */}
            {/* <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=800&h=600&fit=crop"
                alt="Composite Pots"
                width={800}
                height={600}
                className="w-full h-[400px] object-cover"
              />
            </div> */}

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-bold text-[#5c4a3d]">
                {t("whyChoose.title")}
              </h2>

              <p className="text-[#5c4a3d] leading-relaxed">
                {t("whyChoose.desc")}
              </p>

              <ul className="space-y-3 text-sm italic text-[#5c4a3d]">
                {chooseUsList.map((item, index) => (
                  <ListItem
                    key={index}
                    label={item.label}
                    markerColorClass="bg-[#8b6914]"
                    delay={index * 0.1}
                  />
                ))}
              </ul>

              <div className="pt-4 border-t border-gray-100">
                <h3 className="font-semibold text-[#5c4a3d] mb-4">
                  {t("whyChoose.requestTitle")}
                </h3>
                <ul className="space-y-3">
                  {requestList.map((item, index) => (
                    <ListItem
                      key={index}
                      label={item.label}
                      markerColorClass="bg-[#e07a5f]"
                      textColorClass="text-[#e07a5f]"
                      delay={index * 0.15}
                    />
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-[#5c4a3d]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {statsData.map((stat, index) => (
              <StatItem
                key={index}
                value={stat.value}
                label={stat.label}
                delay={stat.delay}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-16 lg:py-24 bg-[#faf8f5]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-[#5c4a3d] mb-4">
              {t("coreValues.title")}
            </h2>
            <div className="w-24 h-1 bg-[#8b6914] mx-auto rounded-full" />
          </motion.div>

          {coreValuesList.map((item, index) => (
            <CoreValueItem
              key={index}
              title={item.title}
              description={item.description}
              imageSrc={item.imageSrc}
              imageAlt={item.imageAlt}
              reverse={item.reverse}
              isLast={index === coreValuesList.length - 1}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
