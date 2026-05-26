import { useTranslations } from "next-intl";
import BlogPost from "@/src/components/common/BlogPost";
import { getPostBySlug, getPostsPublic } from "@/src/server/queries/post";
import { getTranslations } from "next-intl/server";
import BlogClient from "../BlogClient";
import BlogDetail from "./BlogDetail";
interface GenerateParamsProps {
  params: { locale: string };
}
export async function generateStaticParams({
  params: { locale },
}: GenerateParamsProps) {
  const t = await getTranslations({ locale, namespace: "product" });
  const posts = await getPostsPublic(locale);
  return posts.map((product) => ({ slug: String(product.slug) }));
}
interface PageProps {
  params: { slug: string; locale: string };
}
export default async function BlogDetailPage({ params }: { params: { slug: string; locale: string } }) {
    const t = await getTranslations({
    locale: params.locale,
    namespace: "blog",
  });
  const PostCategories = (await getPostsPublic(params.locale)) as any;
  const post = PostCategories.find(
    (p: any) => String(p.slug) === params.slug,
  );
  return (
    <div className="min-h-screen bg-[#faf8f5] py-12">
      <div className="container mx-auto px-4">
        <BlogDetail
        post={post}
        posts={PostCategories}/>
      </div>
    </div>
  );
}


