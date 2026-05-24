import { useTranslations } from "next-intl";
import { Link } from "@/src/i18n/routing";

interface BlogCardProps {
  post: {
    id: number;
    slug: string;
    title: string;
    excerpt: string;
    image: string;
    date: string;
    category: string;
    readTime: string;
  };
  size?: "small" | "medium" | "large";
}

export default function BlogCard({ post, size = "medium" }: BlogCardProps) {
  const t = useTranslations("blog");

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Size-based styling
  const imageHeight = size === "small" ? "h-32" : size === "large" ? "h-full" : "h-48";
  const padding = size === "small" ? "p-4" : "p-6";
  const titleSize = size === "small" ? "text-base" : size === "large" ? "text-2xl" : "text-xl";
  const excerptLines = size === "small" ? "line-clamp-1" : "line-clamp-2";
  const showExcerpt = size !== "small";
  const showReadMore = size !== "small";

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
      <Link href={`/blog/${post.slug}`} className="flex flex-col h-full">
        <div className={`relative ${imageHeight} overflow-hidden flex-shrink-0`}>
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-4 left-4">
            <span className="bg-amber-600 text-white px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
              {post.category}
            </span>
          </div>
          {size === "large" && (
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent text-white">
              <h3 className="text-2xl font-semibold mb-2 line-clamp-2">
                {post.title}
              </h3>
              <p className="text-gray-300 line-clamp-2 text-sm">{post.excerpt}</p>
            </div>
          )}
        </div>
        <div className={`${padding} flex flex-col flex-grow`}>
          <div className="flex items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-500 mb-2 sm:mb-3">
            <span>{formatDate(post.date)}</span>
            <span>•</span>
            <span>{post.readTime}</span>
          </div>
          {size !== "large" && (
            <h3 className={`${titleSize} font-semibold text-gray-900 mb-2 ${excerptLines} hover:text-amber-600 transition-colors`}>
              {post.title}
            </h3>
          )}
          {showExcerpt && size !== "large" && (
            <p className={`text-gray-600 ${excerptLines} mb-4 text-sm sm:text-base`}>{post.excerpt}</p>
          )}
          {showReadMore && size !== "large" && (
            <span className="text-amber-600 font-medium inline-flex items-center gap-1 hover:gap-2 transition-all mt-auto">
              {t("readMore")}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          )}
        </div>
      </Link>
    </div>
  );
}
