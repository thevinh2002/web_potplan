"use client";

import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import CategoryModal from "@/src/components/admin/CategoryModal";
import DeleteConfirmModal from "@/src/components/admin/DeleteConfirmModal";

interface Category {
  id: string;
  code: string;
  count: number;
  translations: {
    vi: { name: string; slug?: string };
    en: { name: string; slug?: string };
  };
  createdAt: string;
  updatedAt: string;
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [isPending, setIsPending] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteCategoryId, setDeleteCategoryId] = useState<string | null>(null);
  const [isDeletePending, setIsDeletePending] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/categories");
      const data = await response.json();
      setCategories(data.categories || []);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (category?: Category) => {
    if (category) {
      setSelectedCategory(category);
      setIsEdit(true);
    } else {
      setSelectedCategory(null);
      setIsEdit(false);
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCategory(null);
    setIsEdit(false);
  };

  const handleSubmit = async (data: any) => {
    setIsPending(true);
    try {
      const url = isEdit
        ? `/api/categories/${selectedCategory?.id}`
        : "/api/categories";
      const method = isEdit ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Failed to save category");

      await fetchCategories();
      handleCloseModal();
    } catch (error) {
      console.error("Failed to save category:", error);
      alert("Không thể lưu danh mục. Vui lòng thử lại.");
    } finally {
      setIsPending(false);
    }
  };

  const handleDelete = (id: string) => {
    setDeleteCategoryId(id);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!deleteCategoryId) return;

    setIsDeletePending(true);
    try {
      const response = await fetch(`/api/categories/${deleteCategoryId}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete category");

      await fetchCategories();
      setIsDeleteModalOpen(false);
      setDeleteCategoryId(null);
    } catch (error) {
      console.error("Failed to delete category:", error);
    } finally {
      setIsDeletePending(false);
    }
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setDeleteCategoryId(null);
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
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-[#5c4a3d]">Quản Lý Danh Mục</h1>
          <p className="text-gray-600 mt-1">
            Quản lý danh mục sản phẩm của bạn
          </p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 px-4 py-2 bg-[#8b6914] text-white rounded-lg hover:bg-[#6d5210] transition-colors font-medium"
        >
          <Plus size={20} />
          Thêm Danh Mục
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Mã
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Tên (VI)
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Name (EN)
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Số Lượng
              </th>
              <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {categories.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="px-6 py-12 text-center text-gray-500"
                >
                  Chưa có danh mục nào. Nhấn "Thêm Danh Mục" để tạo mới.
                </td>
              </tr>
            ) : (
              categories.map((category) => (
                <tr key={category.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm font-mono">
                      {category.code}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                    {category.translations.vi.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                    {category.translations.en.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                    {category.count}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => handleOpenModal(category)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Sửa"
                      >
                        <Pencil size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(category.id)}
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

      <CategoryModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        isPending={isPending}
        category={selectedCategory}
        isEdit={isEdit}
      />

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
        title="Xác nhận xóa danh mục"
        message="Bạn có chắc chắn muốn xóa danh mục này? Thao tác này không thể hoàn tác."
        isPending={isDeletePending}
      />
    </div>
  );
}
