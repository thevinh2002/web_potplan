import AdminPosts from "./AdminPosts";
import { getPostsAction } from "@/src/server/actions/post";

export default async function PostsPage() {
  const posts = await getPostsAction();

  return <AdminPosts initialPosts={posts as any} />;
}
