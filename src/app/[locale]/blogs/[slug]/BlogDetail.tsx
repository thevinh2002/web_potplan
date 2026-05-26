"use client"
import { useTranslations } from "next-intl";
import { Link } from "@/src/i18n/routing";
import { Post } from "@/src/types/post";

interface BlogPostProps {
    post: Post| undefined;
    posts: Post[];
}

export default function BlogDetail({  post, posts }: BlogPostProps) {
    const t = useTranslations("blog");
    // const products = await getProductsPublic(locale);
    
    // Get the post from translations based on slug
    // const posts = t.raw("posts") as Array<{
    //     id: number;
    //     slug: string;
    //     title: string;
    //     excerpt: string;
    //     content: string;
    //     image: string;
    //     date: string;
    //     category: string;
    // }>;

    // const post = posts.find((p) => p.slug === slug);

    if (!post) {
        return (
            <div className="text-center py-12">
                <h1 className="text-2xl font-semibold text-gray-900 mb-4">
                    Post not found
                </h1>
                <Link href="/blogs" className="text-amber-600 hover:text-amber-700">
                    {t("backToBlog")}
                </Link>
            </div>
        );
    }

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    // Get related posts (exclude current post)
    const relatedPosts = posts.filter((p) => p.id !== String(post.id)).slice(0, 3);

    return (
        <article className="max-w-4xl mx-auto">
            <Link
                href="/blogs"
                className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 mb-6"
            >
                <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                    />
                </svg>
                {t("backToBlog")}
            </Link>

            <header className="mb-8">
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                    <span className="bg-amber-600 text-white px-3 py-1 rounded-full font-medium">
                        {post.category}
                    </span>
                    <span>{formatDate(post.date)}</span>
                </div>
                <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>
                <p className="text-xl text-gray-600">{post.excerpt}</p>
            </header>

            <div className="relative h-96 mb-8 rounded-lg overflow-hidden">
                <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover"
                />
            </div>

            <div className="prose prose-lg max-w-none">
                <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {post.content}
                </div>
            </div>

            <div className="mt-12 pt-8 border-t border-gray-200">
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                    {t("relatedPosts")}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {relatedPosts.map((relatedPost) => (
                        <Link
                            key={relatedPost.id}
                            href={`/blogs/${relatedPost.slug}`}
                            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                        >
                            <div className="relative h-40 overflow-hidden">
                                <img
                                    src={relatedPost.image}
                                    alt={relatedPost.title}
                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                            <div className="p-4">
                                <h4 className="font-semibold text-gray-900 line-clamp-2 mb-2">
                                    {relatedPost.title}
                                </h4>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </article>
    );
}
