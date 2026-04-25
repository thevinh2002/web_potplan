"use client";

import { useState, useEffect, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  PlusCircle,
  Search,
  Filter,
  FileSpreadsheet,
  FileText,
  Edit2,
  Trash2,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
  RefreshCw,
} from "lucide-react";
import ProductModal from "@/src/components/admin/ProductModal";
import DeleteConfirmModal from "@/src/components/admin/DeleteConfirmModal";
import { ProductInput } from "@/src/libs/schemas/product";
import {
  createProduct,
  updateProduct,
  deleteProduct,
} from "@/src/server/actions/product";
import { exportToCSV, exportToPDF } from "@/src/libs/utils";
import { usePagination, DOTS } from "@/src/hooks/usePagination";

interface Product {
  id: string;
  code: string;
  category: string;
  image_cover: string;
  images: string[];
  colors: string;
  sizes: string;
  is_new: boolean;
  rating: number;
  review: number;
  translations: {
    vi: { name: string; description: string; new?: string; slug?: string };
    en: { name: string; description: string; new?: string; slug?: string };
  };
  createdAt: string;
  updatedAt: string;
}

export default function AdminInventory({
  initialProducts,
  categoryOptions,
}: {
  initialProducts: Product[];
  categoryOptions: any[];
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isPending, setIsPending] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteProductId, setDeleteProductId] = useState<string | null>(null);
  const [isDeletePending, setIsDeletePending] = useState(false);
  const router = useRouter();
  const [isRefreshing, startTransition] = useTransition();
  const filteredProducts = products.filter(
    (p) =>
      p.translations.vi.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const itemsPerPage = 8;
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const paginationRange = usePagination({
    currentPage,
    totalCount: filteredProducts.length,
    siblingCount: 1,
    pageSize: itemsPerPage,
  });

  useEffect(() => {
    setProducts(initialProducts || []);
  }, [initialProducts]);

  const handleOpenModal = (product?: Product) => {
    if (product) {
      setEditingProduct(product);
    } else {
      setEditingProduct(null);
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  const handleSubmit = async (data: ProductInput) => {
    setIsPending(true);
    try {
      let result;
      if (editingProduct) {
        result = await updateProduct(editingProduct.id, data);
      } else {
        result = await createProduct(data);
      }

      if (result?.error) throw new Error(result.error);

      handleCloseModal();
    } catch (error: any) {
      console.error("Failed to save product:", error);
      alert(error?.message || "Không thể lưu sản phẩm. Vui lòng thử lại.");
    } finally {
      setIsPending(false);
    }
  };

  const handleDeleteClick = (productId: string) => {
    setDeleteProductId(productId);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!deleteProductId) return;

    setIsDeletePending(true);
    try {
      const result = await deleteProduct(deleteProductId);
      if (result?.error) throw new Error(result.error);

      setIsDeleteModalOpen(false);
      setDeleteProductId(null);
    } catch (error: any) {
      console.error("Failed to delete product:", error);
      alert(error?.message || "Không thể xóa sản phẩm. Vui lòng thử lại.");
    } finally {
      setIsDeletePending(false);
    }
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setDeleteProductId(null);
  };

  if (isPending) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div>
      {/* Page Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Inventory</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage your product inventory
          </p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 bg-[#e85d04] text-white px-4 py-2.5 rounded-lg hover:bg-[#d45504] transition-colors text-sm font-medium"
        >
          <PlusCircle size={18} />
          Add Product
        </button>
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between mb-4">
        <div className="relative w-72">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#e85d04] focus:ring-1 focus:ring-[#e85d04] text-gray-900"
          />
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors">
            <Filter size={18} />
            Filter
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors">
            <ArrowUpDown size={18} />
            Sort
          </button>
          <button
            onClick={() => startTransition(() => router.refresh())}
            disabled={isRefreshing}
            className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            <RefreshCw size={18} className={isRefreshing ? "animate-spin" : ""} />
            Refresh
          </button>
          <button
            onClick={() => exportToCSV(filteredProducts, "inventory")}
            className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors"
          >
            <FileSpreadsheet size={18} />
            Excel
          </button>
          <button
            onClick={() => exportToPDF(filteredProducts, "inventory")}
            className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors"
          >
            <FileText size={18} />
            PDF
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Image Cover
                </th>
                <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Images
                </th>
                <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Code
                </th>
                <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Name Translation
                </th>
                <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Color
                </th>
                <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Size
                </th>
                <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {paginatedProducts.length === 0 ? (
                <tr>
                  <td
                    colSpan={9}
                    className="px-6 py-12 text-center text-gray-500"
                  >
                    Chưa có sản phẩm nào. Nhấn "Add Product" để tạo mới.
                  </td>
                </tr>
              ) : (
                paginatedProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-4 py-4">
                      <img
                        src={product.image_cover}
                        alt={product.translations.vi.name}
                        className="w-12 h-12 rounded-lg object-cover bg-gray-100"
                      />
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex gap-1">
                        {product.images && product.images.length > 0 ? (
                          product.images
                            .slice(0, 3)
                            .map((img, idx) => (
                              <img
                                key={idx}
                                src={img}
                                alt={`secondary-${idx}`}
                                className="w-10 h-10 rounded object-cover bg-gray-100"
                              />
                            ))
                        ) : (
                          <span className="text-sm text-gray-400">-</span>
                        )}
                        {product.images && product.images.length > 3 && (
                          <span className="text-xs text-gray-500 self-center">
                            +{product.images.length - 3}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-600">
                      {product.code}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-600">
                      {product.category}
                    </td>
                    <td className="px-4 py-4 text-sm font-medium text-gray-900">
                      {product.translations.vi.name}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-600">
                      {product.translations.en.name}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-600">
                      {product.colors || "-"}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-600">
                      {product.sizes || "-"}
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleOpenModal(product)}
                          className="p-1.5 text-gray-400 hover:text-[#e85d04] hover:bg-[#fff5f0] rounded transition-colors"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(product.id)}
                          className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
          <p className="text-sm text-gray-500">
            Showing {filteredProducts.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} to{" "}
            {Math.min(currentPage * itemsPerPage, filteredProducts.length)} of{" "}
            {filteredProducts.length} entries
          </p>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft size={18} />
            </button>
            {paginationRange?.map((pageNumber, idx) => {
              if (pageNumber === DOTS) {
                return (
                  <span
                    key={`dots-${idx}`}
                    className="px-3 py-1.5 text-sm text-gray-500"
                  >
                    &#8230;
                  </span>
                );
              }

              return (
                <button
                  key={pageNumber}
                  onClick={() => setCurrentPage(pageNumber as number)}
                  className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                    currentPage === pageNumber
                      ? "bg-[#e85d04] text-white"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {pageNumber}
                </button>
              );
            })}
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages || totalPages === 0}
              className="px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>

      <ProductModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        editingProduct={editingProduct}
        categoryOptions={categoryOptions}
        isPending={isPending}
      />

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
        title="Xác nhận xóa sản phẩm"
        message="Bạn có chắc chắn muốn xóa sản phẩm này? Thao tác này không thể hoàn tác."
        isPending={isDeletePending}
      />
    </div>
  );
}
