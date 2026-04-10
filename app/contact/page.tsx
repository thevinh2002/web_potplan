import TopBar from '../../src/components/TopBar'
import Navigation from '../../src/components/Navigation'
import Footer from '../../src/components/Footer'
import Breadcrumb from '../../src/components/Breadcrumb'
import { MapPin, Phone, Mail, Building2, Sparkles } from 'lucide-react'

export default function Contact() {
  return (
    <div className="min-h-screen bg-[#faf8f5]">
      <TopBar />
      <Navigation />
      <Breadcrumb />

      {/* Hero Section with Slogan */}
      <div className="relative bg-gradient-to-r from-[#5c4a3d] via-[#6b5a4d] to-[#5c4a3d] py-12 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.4%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-6 h-6 text-[#8b6914]" />
            <span className="text-[#8b6914] font-semibold tracking-wider uppercase text-sm">Our Values</span>
            <Sparkles className="w-6 h-6 text-[#8b6914]" />
          </div>
          <h2 className="text-2xl md:text-4xl font-bold text-white">
            Understanding <span className="text-[#8b6914]">•</span> Responsibility <span className="text-[#8b6914]">•</span> Innovation
          </h2>
        </div>
      </div>

      {/* Contact Section */}
      <div className="py-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Title */}
          <div className="text-center mb-6">
            <h3 className="text-3xl md:text-4xl font-bold text-[#5c4a3d] mb-4">Get In Touch</h3>
            <div className="w-24 h-1 bg-[#8b6914] mx-auto rounded-full" />
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              We&apos;d love to hear from you. Visit our showroom or reach out to us for any inquiries about our products.
            </p>
          </div>

          <div className="grid lg:grid-cols-5 gap-8">
            {/* Google Map - takes 3 columns */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden h-full">
                <div className="bg-[#8b6914] px-6 py-4">
                  <div className="flex items-center gap-2 text-white">
                    <MapPin className="w-5 h-5" />
                    <span className="font-semibold">Find Us on Map</span>
                  </div>
                </div>
                <div className="p-4 h-[600px]">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3917.657040354058!2d106.7007855756456!3d10.91364775664639!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3174d700652a1563%3A0x4f5d3e23efb9dcf3!2sViet%20Anh%20Dung%20Composite%20Pot%20(Showroom%20%26%20Manufacture)!5e0!3m2!1svi!2s!4v1767775155290!5m2!1svi!2s"
                    width="100%"
                    height="100%"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Viet Anh Dung Composite Pot Location"
                    className="rounded-lg border-0"
                  />
                </div>
              </div>
            </div>

            {/* Contact Info - takes 2 columns */}
            <div className="lg:col-span-2 space-y-6">
              {/* Contact Card */}
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="bg-gradient-to-r from-[#8b6914] to-[#a07c2a] px-6 py-4">
                  <h4 className="text-xl font-bold text-white flex items-center gap-2">
                    <Building2 className="w-5 h-5" />
                    Contact Information
                  </h4>
                </div>
                <div className="p-6 space-y-5">
                  {/* Showroom */}
                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-[#faf8f5] rounded-full flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5 text-[#8b6914]" />
                    </div>
                    <div>
                      <h5 className="font-semibold text-[#5c4a3d] mb-1">Showroom & Manufacture</h5>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        My Phuoc Tan Van Street, Tan Dinh, Ben Cat Ward, Ho Chi Minh City, Viet Nam
                      </p>
                    </div>
                  </div>

                  {/* Office */}
                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-[#faf8f5] rounded-full flex items-center justify-center shrink-0">
                      <Building2 className="w-5 h-5 text-[#8b6914]" />
                    </div>
                    <div>
                      <h5 className="font-semibold text-[#5c4a3d] mb-1">Vietnam Office</h5>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        2/25 Binh Thuan Hamlet, Binh Nham 03 Street, Lai Thieu Ward, Ho Chi Minh City, Viet Nam
                      </p>
                    </div>
                  </div>

                  <div className="h-px bg-gray-200" />

                  {/* Phone */}
                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-[#faf8f5] rounded-full flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5 text-[#8b6914]" />
                    </div>
                    <div>
                      <h5 className="font-semibold text-[#5c4a3d] mb-1">Phone</h5>
                      <a href="tel:+84855632984" className="text-[#8b6914] font-medium hover:underline">
                        (+84) 855632984
                      </a>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-[#faf8f5] rounded-full flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5 text-[#8b6914]" />
                    </div>
                    <div>
                      <h5 className="font-semibold text-[#5c4a3d] mb-1">Email</h5>
                      <a href="mailto:vietanhdungpottery@gmail.com" className="text-[#8b6914] font-medium hover:underline">
                        vietanhdungpottery@gmail.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Action Card */}
              <div className="bg-gradient-to-br from-[#5c4a3d] to-[#6b5a4d] rounded-2xl p-6 text-white">
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
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
