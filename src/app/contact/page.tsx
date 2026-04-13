"use client";

import Breadcrumb from "@/src/components/common/Breadcrumb";
import { MapPin, Phone, Mail, Building2, Sparkles } from "lucide-react";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { motion } from "framer-motion";
import Map from "@/src/components/common/Map";
import ContactInfoItem from "@/src/components/common/ContactInfoItem";
import SocialIconLink from "@/src/components/ui/SocialIconLink";
import { ContactInfoItemProps, SocialIconLinkProps } from "@/src/types/contact";

const contactInfoData: ContactInfoItemProps[] = [
  {
    icon: MapPin,
    title: "Showroom & Manufacture",
    content:
      "My Phuoc Tan Van Street, Tan Dinh, Ben Cat Ward, Ho Chi Minh City, Viet Nam",
  },
  {
    icon: Building2,
    title: "Vietnam Office",
    content:
      "2/25 Binh Thuan Hamlet, Binh Nham 03 Street, Lai Thieu Ward, Ho Chi Minh City, Viet Nam",
  },
  {
    icon: Phone,
    title: "Phone",
    content: "(+84) 855632984",
    href: "tel:+84855632984",
  },
  {
    icon: Mail,
    title: "Email",
    content: "vietanhdungpottery@gmail.com",
    href: "mailto:vietanhdungpottery@gmail.com",
  },
];

const socialLinksData: SocialIconLinkProps[] = [
  {
    href: "https://www.facebook.com/profile.php?id=61580656365193",
    title: "Facebook",
    icon: FaFacebookF,
  },
  {
    href: "https://www.instagram.com/vietanhdungpottery/",
    title: "Instagram",
    icon: FaInstagram,
  },
];

export default function Contact() {
  return (
    <div className="min-h-screen bg-[#faf8f5] overflow-x-hidden">
      <Breadcrumb />

      {/* Hero Section with Slogan */}
      <div className="relative bg-gradient-to-r from-[#5c4a3d] via-[#6b5a4d] to-[#5c4a3d] py-12 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.4%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-2 mb-4"
          >
            <Sparkles className="w-6 h-6 text-[#8b6914]" />
            <span className="text-[#8b6914] font-semibold tracking-wider uppercase text-sm">
              Our Values
            </span>
            <Sparkles className="w-6 h-6 text-[#8b6914]" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-2xl md:text-4xl font-bold text-white"
          >
            Understanding <span className="text-[#8b6914]">•</span>{" "}
            Responsibility <span className="text-[#8b6914]">•</span> Innovation
          </motion.h2>
        </div>
      </div>

      {/* Contact Section */}
      <div className="py-6 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-6"
          >
            <h3 className="text-3xl md:text-4xl font-bold text-[#5c4a3d] mb-4">
              Get In Touch
            </h3>
            <div className="w-24 h-1 bg-[#8b6914] mx-auto rounded-full" />
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              We&apos;d love to hear from you. Visit our showroom or reach out
              to us for any inquiries about our products.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-5 gap-8">
            {/* Google Map - takes 3 columns */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-3"
            >
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden h-full">
                <div className="bg-[#8b6914] px-6 py-4">
                  <div className="flex items-center gap-2 text-white">
                    <MapPin className="w-5 h-5" />
                    <span className="font-semibold">Find Us on Map</span>
                  </div>
                </div>
                <div className="p-4 h-[600px]">
                  <Map className="rounded-lg" />
                </div>
              </div>
            </motion.div>

            <div className="lg:col-span-2 space-y-6">
              {/* Contact Card */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2, margin: "-50px" }}
                transition={{ type: "spring", bounce: 0.3, duration: 0.8 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden"
              >
                <div className="bg-gradient-to-r from-[#8b6914] to-[#a07c2a] px-6 py-4">
                  <h4 className="text-xl font-bold text-white flex items-center gap-2">
                    <Building2 className="w-5 h-5" />
                    Contact Information
                  </h4>
                </div>
                <div className="p-6 space-y-5">
                  {contactInfoData.map((item, index) => (
                    <div key={index}>
                      <ContactInfoItem
                        icon={item.icon}
                        title={item.title}
                        content={item.content}
                        href={item.href}
                        delay={index * 0.15}
                      />
                      {index === 1 && <div className="h-px bg-gray-200 mt-5" />}
                    </div>
                  ))}

                  {/* Social Media */}
                  <div className="flex gap-3">
                    {socialLinksData.map((link, index) => (
                      <SocialIconLink
                        key={index}
                        href={link.href}
                        title={link.title}
                        icon={link.icon}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Quick Action Card */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2, margin: "-50px" }}
                transition={{ type: "spring", bounce: 0.3, duration: 0.8 }}
                className="bg-gradient-to-br from-[#5c4a3d] to-[#6b5a4d] rounded-2xl p-6 text-white"
              >
                <h4 className="text-lg font-bold mb-3">Business Hours</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Monday - Friday</span>
                    <span>8:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Saturday</span>
                    <span>8:00 AM - 12:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Sunday</span>
                    <span>Closed</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
