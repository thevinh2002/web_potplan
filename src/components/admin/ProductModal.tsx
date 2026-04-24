"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Trash2, Image as ImageIcon, Upload, X, FolderOpen, Plus, Check } from "lucide-react";

import { uploadImageToCloudinary } from "@/src/libs/utils";
import { ProductSchema, ProductInput } from "@/src/libs/schemas/product";

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ProductInput) => void;
  editingProduct: any | null;
  categoryOptions: { value: string; label: string }[];
  isPending: boolean;
}

export default function ProductModal({
  isOpen,
  onClose,
  onSubmit,
  editingProduct,
  categoryOptions,
  isPending,
}: ProductModalProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [coverPreviewLocal, setCoverPreviewLocal] = useState<string>("");
  const [imagesPreviewLocal, setImagesPreviewLocal] = useState<string[]>([]);

  const [customFolder, setCustomFolder] = useState<string>("");

  const productForm = useForm<ProductInput>({
    resolver: zodResolver(ProductSchema),
    values: editingProduct
      ? { 
          ...editingProduct, 
          images: editingProduct.images || [],
          colors: editingProduct.colors || "Freedom, available, etc.",
          sizes: editingProduct.sizes || "Freedom, avilable, etc.",
        }
      : {
          code: "",
          category: "",
          image_cover: "",
          is_new: false,
          rating: 5,
          review: 0,
          images: [],
          colors: "Freedom, avilable, etc.",
          sizes: "Freedom, avilable, etc.",
          translations: {
            vi: { name: "", description: "" },
            en: { name: "", description: "" },
          },
        },
  });

  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const localUrl = URL.createObjectURL(file);
    setCoverPreviewLocal(localUrl);
    setIsUploading(true);

    try {
      const folderName = customFolder.trim()
        ? `products/${customFolder.trim()}`
        : "products/covers";

      const downloadUrl = await uploadImageToCloudinary(file, folderName);

      productForm.setValue("image_cover", downloadUrl, {
        shouldValidate: true,
      });
      setCoverPreviewLocal("");
    } catch (error) {
      console.error(error);
      alert("Lỗi khi tải ảnh lên Cloudinary!");
      setCoverPreviewLocal("");
    } finally {
      setIsUploading(false);
    }
  };

  const handleImagesUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const newLocalUrls = files.map((file) => URL.createObjectURL(file));
    setImagesPreviewLocal((prev) => [...prev, ...newLocalUrls]);
    setIsUploading(true);

    try {
      const folderName = customFolder.trim()
        ? `products/${customFolder.trim()}`
        : "products/gallery";

      const uploadedUrls = await Promise.all(
        files.map(
          async (file) => await uploadImageToCloudinary(file, folderName),
        ),
      );

      const currentImages = productForm.getValues("images") || [];
      productForm.setValue("images", [...currentImages, ...uploadedUrls], {
        shouldValidate: true,
      });
      setImagesPreviewLocal([]);
    } catch (error) {
      console.error(error);
      alert("Lỗi khi tải ảnh phụ lên Cloudinary!");
      setImagesPreviewLocal([]);
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveImage = (indexToRemove: number) => {
    const currentImages = productForm.getValues("images") || [];
    productForm.setValue(
      "images",
      currentImages.filter((_, i) => i !== indexToRemove),
      { shouldValidate: true },
    );
  };

  const handleFormSubmit = async (data: ProductInput) => {
    onSubmit(data);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-7xl max-h-[90vh] overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gradient-to-r from-[#8b6914] to-[#a67c1e]">
          <div>
            <h2 className="text-xl font-bold text-white">
              {editingProduct ? "Chỉnh sửa sản phẩm" : "Thêm sản phẩm mới"}
            </h2>
            <p className="text-white/70 text-sm mt-1">
              {editingProduct ? "Cập nhật thông tin sản phẩm" : "Tạo sản phẩm mới vào kho"}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors text-white"
          >
            <X size={20} />
          </button>
        </div>

        <form
          onSubmit={productForm.handleSubmit(handleFormSubmit)}
          className="flex-1 overflow-y-auto p-6 space-y-6"
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Image Upload */}
            <div className="lg:col-span-1 space-y-5">
              {/* Custom Folder Input */}
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-4 rounded-xl border border-amber-200">
                <label className="flex items-center gap-2 text-sm font-semibold text-amber-800 mb-2">
                  <FolderOpen size={16} />
                  Thư mục lưu ảnh (Tùy chọn)
                </label>
                <input
                  type="text"
                  value={customFolder}
                  onChange={(e) => setCustomFolder(e.target.value)}
                  placeholder="VD: chau-dat, chau-men..."
                  className="w-full px-3 py-2.5 text-sm border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white shadow-sm"
                />
                <p className="text-xs text-amber-600 mt-2">
                  💡 Nếu để trống, ảnh sẽ tự động lưu vào <span className="font-semibold">products/covers</span>
                </p>
              </div>

              {/* Cover Image & Gallery Images in same row */}
              <div className="grid grid-cols-2 gap-4">
                {/* Cover Image Upload */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                    <ImageIcon size={16} />
                    Ảnh bìa *
                  </label>
                  <div className="relative group">
                    <div className={`border-2 border-dashed rounded-xl overflow-hidden transition-all duration-300 ${
                      coverPreviewLocal || productForm.watch("image_cover")
                        ? "border-amber-300 bg-amber-50"
                        : "border-gray-300 hover:border-amber-400 hover:bg-amber-50"
                    }`}>
                      <div className="relative h-40 flex flex-col items-center justify-center">
                        {coverPreviewLocal || productForm.watch("image_cover") ? (
                          <img
                            src={
                              coverPreviewLocal || productForm.watch("image_cover")
                            }
                            alt="Preview Cover"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="text-center p-2">
                            <Upload className="mx-auto text-gray-400 mb-1" size={24} />
                            <p className="text-xs text-gray-500 font-medium">Tải ảnh</p>
                          </div>
                        )}

                        {isUploading && coverPreviewLocal && (
                          <div className="absolute inset-0 bg-white/70 flex items-center justify-center backdrop-blur-sm z-10">
                            <div className="w-6 h-6 border-3 border-amber-600 border-t-transparent rounded-full animate-spin"></div>
                          </div>
                        )}

                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleCoverUpload}
                          disabled={isUploading}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                        />
                      </div>
                    </div>
                    {productForm.formState.errors.image_cover && (
                      <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                        <span className="font-semibold">⚠</span>
                        {productForm.formState.errors.image_cover.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Gallery Images Upload */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                    <ImageIcon size={16} />
                    Ảnh phụ
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-3 text-center hover:border-amber-400 hover:bg-amber-50 transition-all duration-300 relative">
                    <div className="flex flex-col items-center justify-center h-40">
                      <Upload className="text-gray-400 mb-1" size={24} />
                      <span className="text-xs text-gray-500 font-medium">Thêm ảnh</span>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImagesUpload}
                      disabled={isUploading}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                  </div>

                  <div className="mt-2 grid grid-cols-2 gap-1.5">
                    {(productForm.watch("images") || []).map((url, i) => (
                      <div
                        key={`img-${i}`}
                        className="relative aspect-square rounded-lg border-2 border-gray-200 overflow-hidden group shadow-sm hover:shadow-md transition-all duration-300"
                      >
                        <img
                          src={url}
                          className="w-full h-full object-cover"
                          alt={`phụ-${i}`}
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(i)}
                          className="absolute top-1 right-1 bg-white/90 hover:bg-red-500 text-red-600 hover:text-white rounded-md p-1 opacity-0 group-hover:opacity-100 transition-all duration-200 shadow z-10"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    ))}

                    {imagesPreviewLocal.map((url, i) => (
                      <div
                        key={`local-${i}`}
                        className="relative aspect-square rounded-lg border-2 border-amber-300 overflow-hidden"
                      >
                        <img
                          src={url}
                          className="w-full h-full object-cover opacity-50"
                          alt={`local-${i}`}
                        />
                        <div className="absolute inset-0 flex justify-center items-center backdrop-blur-sm">
                          <div className="w-4 h-4 border-3 border-amber-600 border-t-transparent rounded-full animate-spin"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Product Info */}
            <div className="lg:col-span-2 space-y-5">
              {/* Basic Info Card */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
                <h3 className="text-sm font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                  Thông tin cơ bản
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Mã sản phẩm *
                    </label>
                    <input
                      {...productForm.register("code")}
                      placeholder="VD: PRD001"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200"
                    />
                    {productForm.formState.errors.code && (
                      <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                        <span className="font-semibold">⚠</span>
                        {productForm.formState.errors.code.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Danh mục *
                    </label>
                    <select
                      {...productForm.register("category")}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200 bg-white"
                    >
                      <option value="" disabled>
                        -- Chọn danh mục --
                      </option>
                      {categoryOptions?.map((cat: any) => (
                        <option key={cat.value} value={cat.value}>
                          {cat.label}
                        </option>
                      ))}
                    </select>
                    {productForm.formState.errors.category && (
                      <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                        <span className="font-semibold">⚠</span>
                        {productForm.formState.errors.category.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Colors Section */}
                <div className="mb-6">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-1.5">
                    <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                    Màu sắc
                  </label>
                  <input
                    {...productForm.register("colors")}
                    placeholder="VD: Freedom, available, etc."
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  />
                </div>

                {/* Sizes Section */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-1.5">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    Kích thước
                  </label>
                  <input
                    {...productForm.register("sizes")}
                    placeholder="VD: Freedom, available, etc."
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Translations Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            {/* Vietnamese */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-5 rounded-xl border border-blue-200 shadow-sm">
              <h3 className="font-bold text-blue-800 mb-4 flex items-center gap-2">
                <span className="text-lg">🇻🇳</span>
                Tiếng Việt
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Tên sản phẩm *
                  </label>
                  <input
                    {...productForm.register("translations.vi.name")}
                    placeholder="Nhập tên sản phẩm..."
                    className="w-full px-4 py-2.5 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
                  />
                  {productForm.formState.errors.translations?.vi?.name && (
                    <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                      <span className="font-semibold">⚠</span>
                      {
                        productForm.formState.errors.translations.vi.name
                          .message
                      }
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Mô tả chi tiết
                  </label>
                  <textarea
                    {...productForm.register("translations.vi.description")}
                    rows={5}
                    placeholder="Nhập mô tả sản phẩm..."
                    className="w-full px-4 py-2.5 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white resize-none"
                  />
                </div>
              </div>
            </div>

            {/* English */}
            <div className="bg-gradient-to-br from-red-50 to-rose-50 p-5 rounded-xl border border-red-200 shadow-sm">
              <h3 className="font-bold text-red-800 mb-4 flex items-center gap-2">
                <span className="text-lg">🇬🇧</span>
                English
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Product Name *
                  </label>
                  <input
                    {...productForm.register("translations.en.name")}
                    placeholder="Enter product name..."
                    className="w-full px-4 py-2.5 border border-red-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 bg-white"
                  />
                  {productForm.formState.errors.translations?.en?.name && (
                    <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                      <span className="font-semibold">⚠</span>
                      {
                        productForm.formState.errors.translations.en.name
                          .message
                      }
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Description
                  </label>
                  <textarea
                    {...productForm.register("translations.en.description")}
                    rows={5}
                    placeholder="Enter product description..."
                    className="w-full px-4 py-2.5 border border-red-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 bg-white resize-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 font-medium"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={
                productForm.formState.isSubmitting || isPending || isUploading
              }
              className="px-8 py-2.5 bg-gradient-to-r from-[#8b6914] to-[#a67c1e] text-white rounded-xl hover:from-[#6d5210] hover:to-[#8b6914] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium shadow-lg hover:shadow-xl flex items-center gap-2"
            >
              {productForm.formState.isSubmitting || isPending || isUploading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Đang xử lý...
                </>
              ) : (
                <>
                  <span>💾</span>
                  {editingProduct ? "Cập Nhật" : "Lưu Sản Phẩm"}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
