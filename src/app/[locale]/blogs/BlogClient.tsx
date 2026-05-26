"use client";
import BlogCard from "@/src/components/common/BlogCard";
import { Post } from "@/src/types/post";

export default function BlogClient({ initialPosts }: { initialPosts: Post[] }) {

    // This will be populated from the translations
    // In a real application, you might fetch this from an API
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {initialPosts.map((post, index) => {
                // Determine grid area based on index - only apply on larger screens
                let gridArea = "";
                let gridAreatxt = "";
                let size: "small" | "medium" | "large" = "medium";
                if (post.size == "small") {
                    gridAreatxt = "lg:row-span-1 lg:col-span-1";
                } else if (post.size == "medium") {
                    gridAreatxt = "lg:row-span-3 lg:col-span-1";
                } else if (post.size == "large") {
                    gridAreatxt = "lg:row-span-3 lg:col-span-2";
                }
                if (index === 0) {
                    gridArea = gridAreatxt;
                    size = post.size as "small" | "medium" | "large";
                } else if (index === 1) {
                    gridArea = gridAreatxt;
                    size = post.size as "small" | "medium" | "large";
                } else if (index === 2) {
                    gridArea = gridAreatxt;
                    size = post.size as "small" | "medium" | "large";
                } else if (index === 3) {
                    gridArea = gridAreatxt;
                    size = post.size as "small" | "medium" | "large";
                } else if (index === 4) {
                    gridArea = gridAreatxt;
                    size = post.size as "small" | "medium" | "large";
                } else {
                    // For additional posts, use medium size
                    gridArea = gridAreatxt;
                    size = post.size as "small" | "medium" | "large";
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
