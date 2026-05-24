import { useTranslations } from "next-intl";
import BlogCard from "./BlogCard";

export default function BlogList() {
  const t = useTranslations("blog");

  // This will be populated from the translations
  // In a real application, you might fetch this from an API
  const posts = t.raw("posts") as Array<{
    id: number;
    slug: string;
    title: string;
    excerpt: string;
    image: string;
    date: string;
    category: string;
    readTime: string;
  }>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {posts.map((post, index) => {
        // Determine grid area based on index
        let gridArea = "";
        let size: "small" | "medium" | "large" = "medium";

        if (index === 0) {
          gridArea = "row-span-3 col-span-2";
          size = "large";
        } else if (index === 1) {
          gridArea = "row-span-1 col-span-1";
          size = "small";
        } else if (index === 2) {
          gridArea = "row-span-1 col-span-1";
          size = "small";
        } else if (index === 3) {
          gridArea = "row-span-1 col-span-1";
          size = "small";
        } else if (index === 4) {
          gridArea = "row-span-3 col-span-1";
          size = "large";
        } else {
          // For additional posts, use medium size
          gridArea = "row-span-1 col-span-1";
          size = "medium";
        }

        return (
          <div key={post.id} className={gridArea}>
            <BlogCard post={post} size={size} />
          </div>
        );
      })}
    </div>
  );
}
