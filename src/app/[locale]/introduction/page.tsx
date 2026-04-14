import { getTranslations } from "next-intl/server";
import IntroductionClient from "./introduction";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({
    locale,
    namespace: "metadata.introduction",
  });
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `${baseUrl}/${locale}/introduction`,
      languages: {
        vi: `${baseUrl}/vi/introduction`,
        en: `${baseUrl}/en/introduction`,
      },
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: `${baseUrl}/${locale}/introduction`,
      siteName: "Việt Anh Dung",
      images: [
        {
          url: "/images/og-introduction.jpg",
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

export default function IntroductionPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    mainEntity: {
      "@type": "Organization",
      name: "Xưởng Sản Xuất Việt Anh Dũng",
      alternateName: "Viet Anh Dung Pottery",
      url: "https://vietanhdung.com",
      logo: "https://vietanhdung.com/images/logo.png",
      description:
        "Việt Anh Dũng tự hào là đơn vị sản xuất đồ composite và thủ công mỹ nghệ uy tín với công nghệ hiện đại và đội ngũ tay nghề cao.",
      foundingDate: "2015",
      sameAs: [
        "https://www.facebook.com/profile.php?id=61580656365193",
        "https://www.instagram.com/vietanhdungpottery/",
      ],
      founder: {
        "@type": "Person",
        name: "Tên Người Sáng Lập",
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <IntroductionClient />
    </>
  );
}
