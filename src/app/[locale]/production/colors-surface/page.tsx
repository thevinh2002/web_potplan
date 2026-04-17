"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import CoreValueItem from "@/src/components/common/CoreValueItem";
import { CoreValueItemProps } from "@/src/types/introduction";
import ContactButton from "@/src/components/ui/ContactButton";
import { useTranslations } from "next-intl";

const surfaceImages = [
  {
    src: "/pictures/color_surface/z7671208518743_a886d2f37c448faede75dabb94f68da5.jpg",
    alt: "Surface 1",
  },
  {
    src: "/pictures/color_surface/z7671208522747_80a7b0f9d67358473c2dd1e7571629fa.jpg",
    alt: "Surface 2",
  },
  {
    src: "/pictures/color_surface/z7671208526332_22075d2ad90fdd5dd0b948451c11742d.jpg",
    alt: "Surface 3",
  },
  {
    src: "/pictures/color_surface/z7671208535867_23c803469e1ae4942b6ba57e1ccf8922.jpg",
    alt: "Surface 4",
  },
  {
    src: "/pictures/color_surface/z7671208542023_5d183e8cecba3cf5ac0b137d45a0d194.jpg",
    alt: "Surface 5",
  },
  {
    src: "/pictures/color_surface/z7671208550956_c14056d1c5dc16df5511be7f122da4c5.jpg",
    alt: "Surface 6",
  },
  {
    src: "/pictures/color_surface/z7671208559889_5c2a5c82de50eee9997facb437146a5b.jpg",
    alt: "Surface 7",
  },
  {
    src: "/pictures/color_surface/z7671208567006_16c4abe95bebba49c07f4da33e9856f8.jpg",
    alt: "Surface 8",
  },
  {
    src: "/pictures/color_surface/z7671208574498_b816181bc378d73d89e733da12aa5c19.jpg",
    alt: "Surface 9",
  },
  {
    src: "/pictures/color_surface/z7671208575094_ae8151701645fa8acd379aacd9ee406c.jpg",
    alt: "Surface 10",
  },
  {
    src: "/pictures/color_surface/z7671209872835_1bc0e35ea10496f50d0967e84458020a.jpg",
    alt: "Surface 11",
  },
  {
    src: "/pictures/color_surface/z7671209878695_d997c2348add34078e374f13eec2599b.jpg",
    alt: "Surface 12",
  },
  {
    src: "/pictures/color_surface/z7671209882860_66430a92f1f7cded18ce8d912b3420bb.jpg",
    alt: "Surface 13",
  },
  {
    src: "/pictures/color_surface/z7671209887174_87d9cc1542013b60885372b3e2631135.jpg",
    alt: "Surface 14",

  },
  {
    src: "/pictures/color_surface/z7671213763205_026414e6ad84db6a52e62e6701be7b6e.jpg",
    alt: "Surface 15",
  },
  {
    src: "/pictures/color_surface/z7671213768995_cf398e9a1120020464671890a726ad33.jpg",
    alt: "Surface 16",
  },
  {
    src: "/pictures/color_surface/z7671213773769_a375baa4d71d7c2bd82deb4d18558d4f.jpg",
    alt: "Surface 17",
  },
];



export default function ColorsSurfacePage() {
  const [currentImage, setCurrentImage] = useState(0);
  const t = useTranslations("common.navigation");

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % surfaceImages.length);
  };

  const prevImage = () => {
    setCurrentImage(
      (prev) => (prev - 1 + surfaceImages.length) % surfaceImages.length,
    );
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % surfaceImages.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#faf8f5] overflow-x-hidden">
      {/* Hero Section */}
      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Image Carousel */}
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
                      src={surfaceImages[currentImage].src}
                      alt={surfaceImages[currentImage].alt}
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
                >
                  <ChevronLeft className="w-6 h-6 text-[#5c4a3d]" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110"
                >
                  <ChevronRight className="w-6 h-6 text-[#5c4a3d]" />
                </button>

                {/* Dot Indicators */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {surfaceImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImage(index)}
                      className={`w-2.5 h-2.5 rounded-full transition-all ${
                        index === currentImage
                          ? "bg-white w-8"
                          : "bg-white/50 hover:bg-white/80"
                      }`}
                    />
                  ))}
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-[#8b6914]/20 rounded-full -z-10" />
              <div className="absolute -top-4 -left-4 w-16 h-16 bg-[#5c4a3d]/10 rounded-full -z-10" />
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6"
            >
              <div>
                <h1 className="text-4xl lg:text-5xl font-bold text-[#5c4a3d] leading-tight mb-4">
                  Signature
                  <br />
                  <span className="text-[#8b6914]">Colors & Surfaces</span>
                </h1>
                <div className="w-20 h-1 bg-[#8b6914] rounded-full" />
              </div>

              <p className="text-lg text-[#5c4a3d] leading-relaxed">
               Supported by a team of experienced professionals at every stage, VAD offers a diverse range of unique surface textures and color palettes. We prioritize your vision, actively listening to your suggestions to develop custom finishes that meet your specific aesthetic criteria.
              </p>
              <ContactButton text="Request Custom Catalog" showIcon={true} />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
