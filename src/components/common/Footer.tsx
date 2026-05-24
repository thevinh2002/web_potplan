import { useTranslations } from "next-intl";
import Image from "next/image";

export default function Footer() {
  const t = useTranslations("common.footer");
  return (
    <footer className="bg-[#3d3229] text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Image
                src="/pictures/logo/logo.png"
                alt="AURORA POTS Logo"
                width={24}
                height={24}
                className="w-8 h-8 object-contain"
              />
              <span className="text-xl font-bold">{t("brandName")}</span>
            </div>
            <p className="text-gray-400 text-sm">{t("description")}</p>
          </div>
          <div>
            <h4 className="font-bold mb-4">{t("products.title")}</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <a href="/production" className="hover:text-[#c9a87c] transition-colors">
                  {t("products.items.fiberglass")}
                </a>
              </li>
              <li>
                <a href="/production" className="hover:text-[#c9a87c] transition-colors">
                  {t("products.items.fiberstone")}
                </a>
              </li>
              <li>
                <a href="/production" className="hover:text-[#c9a87c] transition-colors">
                  {t("products.items.ceramic")}
                </a>
              </li>
              <li>
                <a href="/production" className="hover:text-[#c9a87c] transition-colors">
                  {t("products.items.terracotta")}
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">{t("company.title")}</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <a href="/introduction" className="hover:text-[#c9a87c] transition-colors">
                  {t("company.items.aboutUs")}
                </a>
              </li>
              <li>
                <a href="/production/colors-surface" className="hover:text-[#c9a87c] transition-colors">
                  {t("company.items.qualityControl")}
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-[#c9a87c] transition-colors">
                  {t("company.items.contact")}
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">{t("contactInfo.title")}</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>{t("contactInfo.location")}</li>
              <li>
                <a href={`mailto:${t("contactInfo.email")}`} className="hover:text-[#c9a87c] transition-colors">
                  {t("contactInfo.email")}
                </a>
              </li>
              <li>
                <a href={`tel:${t("contactInfo.phone")}`} className="hover:text-[#c9a87c] transition-colors">
                  {t("contactInfo.phone")}
                </a>
              </li>
            </ul>
          </div>
        </div>

      </div>
    </footer>
  );
}
