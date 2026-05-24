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
    category: string
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
  const imageHeight = size === "small" ? "h-32 sm:h-40" : size === "large" ? "h-48 sm:h-64 lg:h-full" : "h-40 sm:h-48";
  const padding = size === "small" ? "p-3 sm:p-4" : "p-4 sm:p-6";
  const titleSize = size === "small" ? "text-sm sm:text-base" : size === "large" ? "text-xl sm:text-2xl" : "text-lg sm:text-xl";
  const excerptLines = size === "small" ? "line-clamp-1" : "line-clamp-2";
  const showExcerpt = size !== "small";
  const showReadMore = size !== "small";

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
      <Link href={`/blogs/${post.slug}`} className="flex flex-col h-full">
        <div className={`relative ${imageHeight} overflow-hidden flex-shrink-0`}>
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-2 sm:top-4 left-2 sm:left-4">
            <span className="bg-amber-600 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
              {post.category}
            </span>
          </div>
          {size === "large" && (
            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 bg-gradient-to-t from-black/80 to-transparent text-white">
              <h3 className="text-xl sm:text-2xl font-semibold mb-2 line-clamp-2">
                {post.title}
              </h3>
              <p className="text-gray-300 line-clamp-2 text-xs sm:text-sm">{post.excerpt}</p>
            </div>
          )}
        </div>
        <div className={`${padding} flex flex-col flex-grow`}>
          <div className="flex items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-500 mb-2 sm:mb-3">
            <span>{formatDate(post.date)}</span>
          </div>
          {size !== "large" && (
            <h3 className={`${titleSize} font-semibold text-gray-900 mb-2 ${excerptLines} hover:text-amber-600 transition-colors`}>
              {post.title}
            </h3>
          )}
          {showExcerpt && size !== "large" && (
            <p className={`text-gray-600 ${excerptLines} mb-3 sm:mb-4 text-xs sm:text-sm`}>{post.excerpt}</p>
          )}
          {showReadMore && size !== "large" && (
            <span className="text-amber-600 font-medium inline-flex items-center gap-1 hover:gap-2 transition-all mt-auto text-sm">
              {t("readMore")}
              <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          )}
        </div>
      </Link>
    </div>
  );
}
