"use client";

import { useState, useTransition, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Plus, Edit2, Trash2, LogOut, Search } from "lucide-react";

import DeleteConfirmModal from "@/src/components/admin/DeleteConfirmModal";

import { logout } from "@/src/server/actions/auth";
import {
  createProduct,
  updateProduct,
  deleteProduct,
} from "@/src/server/actions/product";
import { createCategory } from "@/src/server/actions/category";
import { ProductInput } from "@/src/libs/schemas/product";
import { CategoryInput } from "@/src/libs/schemas/categories";

// Modal components
import ProductModal from "@/src/components/admin/ProductModal";
import CategoryModal from "@/src/components/admin/CategoryModal";

export default function AdminDashboardClient({
  initialProducts,
  categoryOptions,
}: any) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  // States
  const [products, setProducts] = useState(initialProducts || []);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<{
    id: string;
    name: string;
  } | null>(null);

  useEffect(() => {
    setProducts(initialProducts || []);
  }, [initialProducts]);

  const handleAddProduct = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const handleEditProduct = (product: any) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleDeleteProduct = (product: any) => {
    setDeleteTarget({
      id: product.id,
      name: product.translations?.vi?.name || product.code || "Sản phẩm",
    });
  };

  const confirmDeleteProduct = async () => {
    if (!deleteTarget) return;
    startTransition(async () => {
      const result = await deleteProduct(deleteTarget.id);
      if (result.success) {
        setProducts(products.filter((p: any) => p.id !== deleteTarget.id));
        setDeleteTarget(null);
        router.refresh();
      } else {
        alert(result.error);
      }
    });
  };

  const onSubmitProduct = async (data: ProductInput) => {
    startTransition(async () => {
      let result;
      if (editingProduct) result = await updateProduct(editingProduct.id, data);
      else result = await createProduct(data);

      if (result.success) {
        setIsModalOpen(false);
        router.refresh();
      } else alert(result?.error || "Có lỗi xảy ra");
    });
  };

  const onSubmitCategory = async (data: CategoryInput) => {
    startTransition(async () => {
      const result = await createCategory(data);
      if (result.success) {
        setIsCategoryModalOpen(false);
        alert("Thêm danh mục thành công!");
        router.refresh();
      } else alert(result?.error || "Mã danh mục có thể đã tồn tại");
    });
  };

  const filteredProducts = products.filter((p: any) => {
    const viName = p.translations?.vi?.name?.toLowerCase() || "";
    const code = p.code?.toLowerCase() || "";
    const search = searchTerm.toLowerCase();
    return viName.includes(search) || code.includes(search);
  });

  return (
    <div className="min-h-screen bg-gray-100">
      {/* HEADER */}
      <header className="bg-[#8b6914] text-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">VAD Admin Center</h1>
          <button
            onClick={() => logout().then(() => router.push("/admin/login"))}
            className="flex items-center gap-2 bg-white text-[#8b6914] px-4 py-2 rounded-lg hover:bg-gray-100 transition"
          >
            <LogOut size={18} /> Đăng xuất
          </button>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="container mx-auto px-4 py-8">
        {/* THANH CÔNG CỤ */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="relative w-full sm:w-96">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Tìm theo tên hoặc mã SP..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#8b6914]"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setIsCategoryModalOpen(true)}
              className="flex items-center gap-2 bg-white border border-[#8b6914] text-[#8b6914] px-4 py-2 rounded-lg hover:bg-[#8b6914] hover:text-white transition"
            >
              <Plus size={20} /> Thêm Danh mục
            </button>
            <button
              onClick={handleAddProduct}
              className="flex items-center gap-2 bg-[#8b6914] text-white px-4 py-2 rounded-lg hover:bg-[#6d5210] transition"
            >
              <Plus size={20} /> Thêm Sản phẩm
            </button>
          </div>
        </div>

        {/* BẢNG SẢN PHẨM */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Ảnh
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Tên SP (VI)
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Mã SP
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Danh mục
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Trạng thái
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                    Hành động
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredProducts.map((product: any) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <img
                        src={product.image_cover || "/placeholder.jpg"}
                        alt="cover"
                        className="w-12 h-12 object-cover rounded border"
                      />
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {product.translations?.vi?.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {product.code}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {product.category}
                    </td>
                    <td className="px-6 py-4">
                      {product.is_new ? (
                        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                          Mới
                        </span>
                      ) : (
                        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-600">
                          -
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleEditProduct(product)}
                        className="text-blue-600 hover:text-blue-900 mr-3"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredProducts.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                Không tìm thấy sản phẩm nào.
              </div>
            )}
          </div>
        </div>
      </main>

      {/* MODALS */}
      <ProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={onSubmitProduct}
        editingProduct={editingProduct}
        categoryOptions={categoryOptions}
        isPending={isPending}
      />

      <CategoryModal
        isOpen={isCategoryModalOpen}
        onClose={() => setIsCategoryModalOpen(false)}
        onSubmit={onSubmitCategory}
        isPending={isPending}
      />

      <DeleteConfirmModal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={confirmDeleteProduct}
        title="Xóa sản phẩm"
        message={`Bạn có chắc chắn muốn xóa sản phẩm "${deleteTarget?.name}"? Thao tác này không thể hoàn tác.`}
        isPending={isPending}
      />
    </div>
  );
}
