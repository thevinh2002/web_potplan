"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
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

interface Product {
  id: number;
  name: string;
  code: string;
  category: string;
  brand: string;
  price: number;
  unit: string;
  quantity: number;
  image: string;
}

const sampleProducts: Product[] = [
  { id: 1, name: "Gaming Joy Stick", code: "PRD001", category: "Electronics", brand: "Brand Name", price: 99.99, unit: "pcs", quantity: 150, image: "https://via.placeholder.com/40" },
  { id: 2, name: "Wireless Earphones", code: "PRD002", category: "Electronics", brand: "Tech Pro", price: 89.99, unit: "pcs", quantity: 320, image: "https://via.placeholder.com/40" },
  { id: 3, name: "Smart Watch Pro", code: "PRD003", category: "Electronics", brand: "Tech Pro", price: 98.00, unit: "pcs", quantity: 200, image: "https://via.placeholder.com/40" },
  { id: 4, name: "USB-C Fast Charger", code: "PRD004", category: "Electronics", brand: "Tech Pro", price: 86.00, unit: "pcs", quantity: 80, image: "https://via.placeholder.com/40" },
  { id: 5, name: "Portable Bluetooth Speaker", code: "PRD005", category: "Electronics", brand: "Tech Pro", price: 32.00, unit: "pcs", quantity: 110, image: "https://via.placeholder.com/40" },
  { id: 6, name: "Magic Keyboard", code: "PRD006", category: "Electronics", brand: "Tech Pro", price: 49.00, unit: "pcs", quantity: 10, image: "https://via.placeholder.com/40" },
  { id: 7, name: 'MacBook Pro 16"', code: "PRD007", category: "Electronics", brand: "Tech Pro", price: 99.00, unit: "pcs", quantity: 10, image: "https://via.placeholder.com/40" },
  { id: 8, name: "Wireless Earphones", code: "PRD008", category: "Electronics", brand: "Tech Pro", price: 109.00, unit: "pcs", quantity: 200, image: "https://via.placeholder.com/40" },
];

export default function InventoryPage() {
  const router = useRouter();
  const params = useParams();
  const locale = (params.locale as string) || "en";
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState<Product[]>(sampleProducts);

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const itemsPerPage = 8;
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleEditProduct = (productId: number) => {
    router.push(`/${locale}/admin/edit-product/${productId}`);
  };

  const handleDeleteProduct = (productId: number) => {
    if (confirm("Are you sure you want to delete this product?")) {
      setProducts(products.filter((product) => product.id !== productId));
    }
  };

  return (
    <div>
      {/* Page Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Inventory</h1>
          <p className="text-sm text-gray-500 mt-1">Manage your product inventory</p>
        </div>
        <button
          onClick={() => router.push(`/${locale}/admin/add-product`)}
          className="flex items-center gap-2 bg-[#e85d04] text-white px-4 py-2.5 rounded-lg hover:bg-[#d45504] transition-colors text-sm font-medium"
        >
          <PlusCircle size={18} />
          Add Product
        </button>
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between mb-4">
        <div className="relative w-72">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
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
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors">
            <RefreshCw size={18} />
            Refresh
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors">
            <FileSpreadsheet size={18} />
            Excel
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors">
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
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Image</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Code</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Brand</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Price</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Unit</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Quantity</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {paginatedProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img src={product.image} alt={product.name} className="w-10 h-10 rounded-lg object-cover bg-gray-100" />
                      <span className="text-sm font-medium text-gray-900">{product.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{product.code}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{product.category}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{product.brand}</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">${product.price.toFixed(2)}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{product.unit}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{product.quantity}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEditProduct(product.id)}
                        className="p-1.5 text-gray-400 hover:text-[#e85d04] hover:bg-[#fff5f0] rounded transition-colors"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product.id)}
                        className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
          <p className="text-sm text-gray-500">Showing product per page</p>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft size={18} />
            </button>
            {[1, 2, 3].map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                  currentPage === page ? "bg-[#e85d04] text-white" : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
