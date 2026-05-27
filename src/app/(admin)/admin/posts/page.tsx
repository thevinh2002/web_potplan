import { Post } from "@/src/types/post";
import AdminPosts from "./AdminPosts";
import { getPostsAction } from "@/src/server/actions/post";

export default async function PostsPage() {
  const posts = await getPostsAction() as Post[];
  return <AdminPosts initialPosts={posts} />;
}
