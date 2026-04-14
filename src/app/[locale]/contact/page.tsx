import { getTranslations } from "next-intl/server";
import ContactClient from "./contact";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale, namespace: "metadata.contact" });
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `${baseUrl}/${locale}/contact`,
      languages: {
        vi: `${baseUrl}/vi/contact`,
        en: `${baseUrl}/en/contact`,
      },
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: `${baseUrl}/${locale}/contact`,
      siteName: "Việt Anh Dũng",
      images: [
        {
          url: "/images/og-contact.jpg",
          width: 1200,
          height: 630,
          alt: t("title"),
        },
      ],
      locale: locale === "vi" ? "vi_VN" : "en_US",
      type: "website",
    },
  };
}

export default function ContactPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Xưởng Sản Xuất Việt Anh Dũng",
    image: "https://vietanhdung.com/images/showroom.jpg",
    "@id": "https://vietanhdung.com",
    url: "https://vietanhdung.com",
    telephone: "+84855632984",
    email: "vietanhdungpottery@gmail.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Địa chỉ showroom hoặc xưởng cụ thể của bạn",
      addressLocality: "Tên Quận/Huyện",
      addressRegion: "Tên Tỉnh/Thành phố",
      postalCode: "Mã bưu điện (VD: 700000)",
      addressCountry: "VN",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "17:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "08:00",
        closes: "12:00",
      },
    ],
    sameAs: [
      "https://www.facebook.com/profile.php?id=61580656365193",
      "https://www.instagram.com/vietanhdungpottery/",
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ContactClient />
    </>
  );
}
