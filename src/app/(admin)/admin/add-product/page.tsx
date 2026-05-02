"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Package, Upload, X } from "lucide-react";

export default function AddProductPage() {
  const router = useRouter();
  const params = useParams();
  const locale = (params.locale as string) || "en";

  const [formData, setFormData] = useState({
    productName: "",
    sku: "",
    price: "",
    stockQuantity: "",
    category: "",
    description: "",
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");

  const categories = [
    "Electronics",
    "Clothing",
    "Food & Beverages",
    "Home & Garden",
    "Sports",
    "Other",
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview("");
  };

  const handleClearForm = () => {
    setFormData({
      productName: "",
      sku: "",
      price: "",
      stockQuantity: "",
      category: "",
      description: "",
    });
    setImageFile(null);
    setImagePreview("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    console.log("Image File:", imageFile);
    alert("Product added successfully!");
    // Add your API call here
    // router.push(`/${locale}/admin/inventory`);
  };

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Add Product</h1>
          <p className="text-sm text-gray-500 mt-1">Add new product to inventory</p>
        </div>
        <button
          onClick={() => router.push(`/${locale}/admin/inventory`)}
          className="flex items-center justify-center gap-2 bg-[#e85d04] text-white px-4 py-2.5 rounded-lg hover:bg-[#d45504] transition-colors text-sm font-medium"
        >
          <Package size={18} />
          <span className="hidden sm:inline">Go to Inventory List</span>
          <span className="sm:hidden">Inventory</span>
        </button>
      </div>

      {/* Form */}
      <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Product Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Name
              </label>
              <input
                type="text"
                name="productName"
                value={formData.productName}
                onChange={handleInputChange}
                placeholder="Enter product name"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-[#e85d04] focus:ring-1 focus:ring-[#e85d04] text-sm bg-white text-gray-900"
                required
              />
            </div>

            {/* SKU */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                SKU
              </label>
              <input
                type="text"
                name="sku"
                value={formData.sku}
                onChange={handleInputChange}
                placeholder="Enter SKU"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-[#e85d04] focus:ring-1 focus:ring-[#e85d04] text-sm bg-white text-gray-900"
                required
              />
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price ($)
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                placeholder="0.00"
                step="0.01"
                min="0"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-[#e85d04] focus:ring-1 focus:ring-[#e85d04] text-sm bg-white text-gray-900"
                required
              />
            </div>

            {/* Stock Quantity */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Stock Quantity
              </label>
              <input
                type="number"
                name="stockQuantity"
                value={formData.stockQuantity}
                onChange={handleInputChange}
                placeholder="0"
                min="0"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-[#e85d04] focus:ring-1 focus:ring-[#e85d04] text-sm bg-white text-gray-900"
                required
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                aria-label="Select product category"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-[#e85d04] focus:ring-1 focus:ring-[#e85d04] text-sm bg-white text-gray-900"
                required
              >
                <option value="">Select category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Product Image */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Image
              </label>
              <div className="relative">
                {imagePreview ? (
                  <div className="relative w-full h-32 rounded-lg border-2 border-dashed border-gray-200 overflow-hidden">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
                    >
                      <X size={16} className="text-gray-600" />
                    </button>
                  </div>
                ) : (
                  <div className="relative w-full h-32 rounded-lg border-2 border-dashed border-gray-200 flex items-center justify-center hover:border-[#e85d04] transition-colors">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      aria-label="Upload product image"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div className="flex flex-col items-center gap-2 text-gray-400">
                      <Upload size={24} />
                      <span className="text-sm">Click to upload image</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Enter product description"
              rows={4}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-[#e85d04] focus:ring-1 focus:ring-[#e85d04] text-sm resize-none bg-white text-gray-900"
            />
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mt-6">
            <button
              type="submit"
              className="flex items-center justify-center gap-2 bg-[#e85d04] text-white px-6 py-2.5 rounded-lg hover:bg-[#d45504] transition-colors text-sm font-medium"
            >
              Add Product
            </button>
            <button
              type="button"
              onClick={handleClearForm}
              className="flex items-center justify-center gap-2 bg-white border border-gray-200 text-gray-700 px-6 py-2.5 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
            >
              Clear
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
