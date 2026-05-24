import { useTranslations } from "next-intl";
import BlogPost from "@/src/components/common/BlogPost";

export default function BlogDetailPage({ params }: { params: { slug: string } }) {
  return (
    <div className="min-h-screen bg-[#faf8f5] py-12">
      <div className="container mx-auto px-4">
        <BlogPost slug={params.slug} />
      </div>
    </div>
  );
}
