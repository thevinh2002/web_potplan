"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Trash2, Image as ImageIcon } from "lucide-react";

import { storage } from "@/src/libs/firebase";
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

  const productForm = useForm<ProductInput>({
    resolver: zodResolver(ProductSchema),
    values: editingProduct
      ? { ...editingProduct, images: editingProduct.images || [] }
      : {
          code: "",
          category: "",
          image_cover: "",
          is_new: false,
          rating: 5,
          review: 0,
          images: [],
          translations: {
            vi: { name: "", description: "" },
            en: { name: "", description: "" },
          },
        },
  });

  const handleCoverUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const localUrl = URL.createObjectURL(file);
    setCoverPreviewLocal(localUrl);
    setIsUploading(true);

    try {
      const uniqueFileName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.\-_]/g, "")}`;
      const storageRef = ref(storage, `products/${uniqueFileName}`);
      await uploadBytes(storageRef, file);
      const downloadUrl = await getDownloadURL(storageRef);

      productForm.setValue("image_cover", downloadUrl, {
        shouldValidate: true,
      });
      setCoverPreviewLocal("");
    } catch (error) {
      console.error(error);
      alert("Lỗi khi tải ảnh lên!");
      setCoverPreviewLocal("");
    } finally {
      setIsUploading(false);
    }
  };

  const handleImagesUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const newLocalUrls = files.map((file) => URL.createObjectURL(file));
    setImagesPreviewLocal((prev) => [...prev, ...newLocalUrls]);
    setIsUploading(true);

    try {
      const uploadedUrls = await Promise.all(
        files.map(async (file) => {
          const uniqueFileName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.\-_]/g, "")}`;
          const storageRef = ref(storage, `products/${uniqueFileName}`);
          await uploadBytes(storageRef, file);
          return await getDownloadURL(storageRef);
        })
      );

      const currentImages = productForm.getValues("images") || [];
      productForm.setValue("images", [...currentImages, ...uploadedUrls], {
        shouldValidate: true,
      });
      setImagesPreviewLocal([]);
    } catch (error) {
      console.error(error);
      alert("Lỗi khi tải ảnh phụ lên!");
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
      { shouldValidate: true }
    );
  };

  const handleFormSubmit = async (data: ProductInput) => {
    onSubmit(data);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b flex justify-between items-center bg-gray-50 rounded-t-lg">
          <h2 className="text-xl font-bold text-[#5c4a3d]">
            {editingProduct ? "Chỉnh sửa sản phẩm" : "Thêm sản phẩm mới"}
          </h2>
        </div>

        <form
          onSubmit={productForm.handleSubmit(handleFormSubmit)}
          className="p-6 space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="col-span-1 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ảnh bìa sản phẩm *
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:bg-gray-50 transition relative overflow-hidden h-40 flex flex-col items-center justify-center group">
                  {coverPreviewLocal ||
                  productForm.watch("image_cover") ? (
                    <img
                      src={
                        coverPreviewLocal ||
                        productForm.watch("image_cover")
                      }
                      alt="Preview Cover"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  ) : (
                    <ImageIcon
                      className="mx-auto text-gray-400 mb-2"
                      size={32}
                    />
                  )}

                  {/* Lớp phủ khi đang upload */}
                  {isUploading && coverPreviewLocal && (
                    <div className="absolute inset-0 bg-white/40 flex items-center justify-center backdrop-blur-sm z-10 transition-all">
                      <div className="w-6 h-6 border-2 border-[#8b6914] border-t-transparent rounded-full animate-spin"></div>
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
                {productForm.formState.errors.image_cover && (
                  <p className="text-red-500 text-xs mt-1">
                    {productForm.formState.errors.image_cover.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ảnh phụ (Nhiều ảnh)
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-3 text-center hover:bg-gray-50 transition relative flex flex-col items-center justify-center h-24">
                  <ImageIcon
                    className="mx-auto text-gray-400 mb-1"
                    size={24}
                  />
                  <span className="text-xs text-gray-500 font-medium">
                    Click để thêm ảnh phụ
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImagesUpload}
                    disabled={isUploading}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </div>

                <div className="mt-3 grid grid-cols-3 gap-2">
                  {/* Nút xóa được hiện lên khi hover */}
                  {(productForm.watch("images") || []).map(
                    (url, i) => (
                      <div
                        key={`img-${i}`}
                        className="relative h-20 rounded-md border border-gray-200 overflow-hidden group shadow-sm"
                      >
                        <img
                          src={url}
                          className="w-full h-full object-cover"
                          alt={`phụ-${i}`}
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(i)}
                          className="absolute top-1 right-1 bg-white hover:bg-red-50 text-red-600 rounded-md p-1 opacity-0 group-hover:opacity-100 transition-opacity shadow z-10"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    )
                  )}
                  {/* Preview cục bộ lúc đang tải */}
                  {imagesPreviewLocal.map((url, i) => (
                    <div
                      key={`local-${i}`}
                      className="relative h-20 rounded-md border border-gray-200 overflow-hidden"
                    >
                      <img
                        src={url}
                        className="w-full h-full object-cover opacity-40 grayscale"
                        alt={`local-${i}`}
                      />
                      <div className="absolute inset-0 flex justify-center items-center backdrop-blur-[1px]">
                        <div className="w-5 h-5 border-2 border-[#8b6914] border-t-transparent rounded-full animate-spin"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="col-span-2 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Mã sản phẩm *
                  </label>
                  <input
                    {...productForm.register("code")}
                    className="w-full px-3 py-2 border rounded-lg focus:border-[#8b6914] outline-none"
                  />
                  {productForm.formState.errors.code && (
                    <p className="text-red-500 text-xs mt-1">
                      {productForm.formState.errors.code.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Danh mục *
                  </label>
                  <select
                    {...productForm.register("category")}
                    className="w-full px-3 py-2 border rounded-lg focus:border-[#8b6914] outline-none"
                  >
                    <option value="" disabled>
                      -- Chọn --
                    </option>
                    {categoryOptions?.map((cat: any) => (
                      <option key={cat.value} value={cat.value}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                  {productForm.formState.errors.category && (
                    <p className="text-red-500 text-xs mt-1">
                      {productForm.formState.errors.category.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    {...productForm.register("is_new")}
                    className="w-5 h-5 text-[#8b6914] rounded focus:ring-[#8b6914]"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    Đánh dấu &quot;Sản phẩm mới&quot;
                  </span>
                </label>
              </div>
            </div>
          </div>

          <hr />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-blue-50/50 p-4 rounded-lg border border-blue-100">
              <h3 className="font-bold text-blue-800 mb-4">
                🇻🇳 Tiếng Việt
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tên sản phẩm *
                  </label>
                  <input
                    {...productForm.register("translations.vi.name")}
                    className="w-full px-3 py-2 border rounded-lg focus:border-blue-500 outline-none"
                  />
                  {productForm.formState.errors.translations?.vi
                    ?.name && (
                    <p className="text-red-500 text-xs mt-1">
                      {
                        productForm.formState.errors.translations.vi
                          .name.message
                      }
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Mô tả chi tiết
                  </label>
                  <textarea
                    {...productForm.register(
                      "translations.vi.description"
                    )}
                    rows={4}
                    className="w-full px-3 py-2 border rounded-lg focus:border-blue-500 outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="bg-red-50/50 p-4 rounded-lg border border-red-100">
              <h3 className="font-bold text-red-800 mb-4">
                🇬🇧 English
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Product Name *
                  </label>
                  <input
                    {...productForm.register("translations.en.name")}
                    className="w-full px-3 py-2 border rounded-lg focus:border-red-500 outline-none"
                  />
                  {productForm.formState.errors.translations?.en
                    ?.name && (
                    <p className="text-red-500 text-xs mt-1">
                      {
                        productForm.formState.errors.translations.en
                          .name.message
                      }
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    {...productForm.register(
                      "translations.en.description"
                    )}
                    rows={4}
                    className="w-full px-3 py-2 border rounded-lg focus:border-red-500 outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-lg hover:bg-gray-100"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={
                productForm.formState.isSubmitting || isPending
              }
              className="px-6 py-2 bg-[#8b6914] text-white rounded-lg hover:bg-[#6d5210] disabled:opacity-50"
            >
              {productForm.formState.isSubmitting || isPending
                ? "Đang xử lý..."
                : "Lưu Sản Phẩm"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
