"use client";

import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import PostModal from "@/src/components/admin/PostModal";
import DeleteConfirmModal from "@/src/components/admin/DeleteConfirmModal";
import {
  getPostsAction,
  createPost,
  updatePost,
  deletePost,
} from "@/src/server/actions/post";
import { Post } from "@/src/types/post";

// interface Post {
//   id: string;
//   slug: string;
//   title: string;
//   excerpt: string;
//   content: string;
//   image: string;
//   date: string;
//   category: string;
//   createdAt: string;
//   updatedAt: string;
//   size: string;
// }

export default function AdminPosts({
  initialPosts,
}: {
  initialPosts: Post[];
}) {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isPending, setIsPending] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletePostId, setDeletePostId] = useState<string | null>(null);
  const [isDeletePending, setIsDeletePending] = useState(false);

  // useEffect(() => {
  //   setPosts(initialPosts || []);
  // }, [initialPosts]);

  const fetchPosts = async () => {
    try {
      const data = await getPostsAction();
      setPosts(data as any);
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (post?: Post) => {
    if (post) {
      setSelectedPost(post);
      setIsEdit(true);
    } else {
      setSelectedPost(null);
      setIsEdit(false);
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPost(null);
    setIsEdit(false);
  };

  const handleSubmit = async (data: any) => {
    setIsPending(true);
    try {
      let result;
      if (isEdit && selectedPost?.id) {
        result = await updatePost(selectedPost.id, data);
      } else {
        result = await createPost(data);
      }

      if (result?.error) throw new Error(result.error);

      await fetchPosts();
      handleCloseModal();
    } catch (error: any) {
      console.error("Failed to save post:", error);
      alert(error?.message || "Không thể lưu bài viết. Vui lòng thử lại.");
    } finally {
      setIsPending(false);
    }
  };

  const handleDelete = (id: string) => {
    setDeletePostId(id);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!deletePostId) return;

    setIsDeletePending(true);
    try {
      const result = await deletePost(deletePostId);

      if (result?.error) throw new Error(result.error);

      await fetchPosts();
      setIsDeleteModalOpen(false);
      setDeletePostId(null);
    } catch (error: any) {
      console.error("Failed to delete post:", error);
      alert(error?.message || "Không thể xóa bài viết. Vui lòng thử lại.");
    } finally {
      setIsDeletePending(false);
    }
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setDeletePostId(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Đang tải...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#5c4a3d]">
            Quản Lý Bài Viết
          </h1>
          <p className="text-gray-600 mt-1">
            Quản lý bài viết blog của bạn
          </p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-[#8b6914] text-white rounded-lg hover:bg-[#6d5210] transition-colors font-medium"
        >
          <Plus size={20} />
          <span className="hidden sm:inline">Thêm Bài Viết</span>
          <span className="sm:hidden">Thêm</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Ảnh
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Tiêu đề
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Danh mục
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Ngày đăng
              </th>
              <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Hành động
              </th>
              
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {posts.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="px-6 py-12 text-center text-gray-500"
                >
                  Chưa có bài viết nào. Nhấn "Thêm Bài Viết" để tạo mới.
                </td>
              </tr>
            ) : (
              posts.map((post) => (
                <tr key={post.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">
                      {post.title}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {post.slug}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 bg-amber-100 text-amber-800 rounded text-sm">
                      {post.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                    {post.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => handleOpenModal(post)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Sửa"
                      >
                        <Pencil size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(post.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Xóa"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <PostModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        isPending={isPending}
        editingPost={selectedPost}
      />

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
        title="Xác nhận xóa bài viết"
        message="Bạn có chắc chắn muốn xóa bài viết này? Thao tác này không thể hoàn tác."
        isPending={isDeletePending}
      />
    </div>
  );
}
