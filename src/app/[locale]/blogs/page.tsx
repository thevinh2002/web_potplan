import BlogClient from "./BlogClient";
import { getPostsPublic } from "@/src/server/queries/post";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";

export default async function BlogPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  const t = await getTranslations("blog");

  const posts = (await getPostsPublic(locale)) as any;
  console.log("locale:",locale)
  return (
    <div className="min-h-screen bg-[#faf8f5] py-8 sm:py-12">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">{t("title")}</h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-2">{t("description")}</p>
        </div>
        <BlogClient 
        initialPosts={posts} />
      </div>
    </div>
  );
}
