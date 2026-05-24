import { useTranslations } from "next-intl";
import BlogList from "@/src/components/common/BlogList";

export default function BlogPage() {
  const t = useTranslations("blog");

  return (
    <div className="min-h-screen bg-[#faf8f5] py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{t("title")}</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">{t("description")}</p>
        </div>
        <BlogList />
      </div>
    </div>
  );
}
