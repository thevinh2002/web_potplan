import { Leaf } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#3d3229] text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Leaf className="w-6 h-6 text-[#c9a87c]" />
              <span className="text-xl font-bold">AURORA POTS</span>
            </div>
            <p className="text-gray-400 text-sm">
              Vietnam Pottery Manufacturer & Exporter with over 15 years of
              experience.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Products</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <a href="#" className="hover:text-[#c9a87c] transition-colors">
                  Fiberglass Planter
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#c9a87c] transition-colors">
                  Fiberstone Planter
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#c9a87c] transition-colors">
                  Ceramic Planter
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#c9a87c] transition-colors">
                  Terracotta Products
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Company</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <a href="#" className="hover:text-[#c9a87c] transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#c9a87c] transition-colors">
                  Factory Tour
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#c9a87c] transition-colors">
                  Quality Control
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#c9a87c] transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>Vietnam</li>
              <li>info@aurorapots.com</li>
              <li>+84 XXX XXX XXX</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-600 mt-8 pt-8 text-center text-gray-400 text-sm">
          © 2024 Aurora Pots. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
