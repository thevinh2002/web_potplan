"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Breadcrumb from "@/src/components/common/Breadcrumb";
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

const factoryImages: FactoryImageProps[] = [
  {
    src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=1000&fit=crop",
    alt: "Viet Anh Dung Factory - Production",
  },
  {
    src: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=800&h=1000&fit=crop",
    alt: "Viet Anh Dung Factory - Crafting",
  },
  {
    src: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=800&h=1000&fit=crop",
    alt: "Viet Anh Dung Factory - Products",
  },
  {
    src: "https://images.unsplash.com/photo-1518882605630-8eb565f5e673?w=800&h=1000&fit=crop",
    alt: "Viet Anh Dung Factory - Modern Designs",
  },
];

const statsData: StatItemProps[] = [
  { value: "20+", label: "Years Experience", delay: 0.1 },
  { value: "500+", label: "Products", delay: 0.2 },
  { value: "50+", label: "Export Markets", delay: 0.3 },
  { value: "100%", label: "Quality Assurance", delay: 0.4 },
];

const coreValuesData: CoreValueItemProps[] = [
  {
    title: "Understanding",
    description:
      "We always listen to and prioritize your requirements regarding the shape, proportions, and surface finish of our plant pots. Our technical team collaborates closely with you to develop prototypes that perfectly align with your vision. Samples are ready to be dispatched as soon as we reach an agreement.",
    imageSrc:
      "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=600&h=400&fit=crop",
    imageAlt: "Understanding - Crafting pots",
    reverse: false,
  },
  {
    title: "Responsibility",
    description:
      "Our responsibility is to provide customers with a sense of security regarding quality and delivery time, and to build long-term relationships with them.",
    imageSrc:
      "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=600&h=400&fit=crop",
    imageAlt: "Responsibility - Quality pots",
    reverse: true,
  },
  {
    title: "Innovation",
    description:
      "We are constantly researching new trends to develop new designs, optimize processes, and update according to customer requirements. Our goal is to provide you with the best possible experience.",
    imageSrc:
      "https://images.unsplash.com/photo-1518882605630-8eb565f5e673?w=600&h=400&fit=crop",
    imageAlt: "Innovation - Modern designs",
    reverse: false,
  },
];

const chooseUsList: ListItemProps[] = [
  { label: "Direct Manufacturer" },
  { label: "Superior Craftsmanship" },
];

const requestList: ListItemProps[] = [
  { label: "Freedom in size, color, etc." },
  { label: "Custom design" },
  {
    label: "Flexible minimum order quantity",
  },
  { label: "Other requests" },
];

export default function Introduction() {
  const [currentImage, setCurrentImage] = useState(0);

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
      <Breadcrumb />

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
                  Vietnam Composite
                  <br />
                  <span className="text-[#8b6914]">Pots Manufacturer</span>
                </h1>
                <div className="w-20 h-1 bg-[#8b6914] rounded-full" />
              </div>

              <p className="text-lg text-[#5c4a3d] leading-relaxed">
                Established in the early 2000s, Viet Anh Dung Enterprise (VAD
                Pottery) began its journey as a dedicated cement pot
                manufacturer. Through years of continuous growth and a steadfast
                commitment to quality, we have successfully expanded our
                expertise into the premium Composite pot market.
              </p>

              <p className="text-lg text-[#5c4a3d] leading-relaxed">
                With products crafted to meet rigorous international export
                standards, we aim to provide both domestic and global customers
                with a truly unique experience.
              </p>

              <p className="text-[#c53030] font-semibold italic">
                High Quality - True Value - Constant Innovation - Punctual
                Delivery - Customer Respect
              </p>

              <ContactButton text="Contact Us" showIcon={true} />
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
                Why Choose Our Products?
              </h2>

              <p className="text-[#5c4a3d] leading-relaxed">
                We specialize in manufacturing composite pots that balance
                strength with lightweight functionality. Built to withstand the
                elements and styled for contemporary spaces, our planters offer
                a reliable solution for both indoor and outdoor settings.
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
                  You are free to request the following when you come to us:
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
              Our Core Values
            </h2>
            <div className="w-24 h-1 bg-[#8b6914] mx-auto rounded-full" />
          </motion.div>

          {coreValuesData.map((item, index) => (
            <CoreValueItem
              key={index}
              title={item.title}
              description={item.description}
              imageSrc={item.imageSrc}
              imageAlt={item.imageAlt}
              reverse={item.reverse}
              isLast={index === coreValuesData.length - 1}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
