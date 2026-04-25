"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { CategorySchema, CategoryInput } from "@/src/libs/schemas/categories";

interface CategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CategoryInput) => void;
  isPending: boolean;
  category?: any;
  isEdit?: boolean;
}

export default function CategoryModal({
  isOpen,
  onClose,
  onSubmit,
  isPending,
  category,
  isEdit,
}: CategoryModalProps) {
  const categoryForm = useForm<CategoryInput>({
    resolver: zodResolver(CategorySchema),
    defaultValues: {
      count: 0,
      translations: { vi: { name: "" }, en: { name: "" } },
    },
  });

  useEffect(() => {
    if (category && isEdit) {
      categoryForm.reset({
        code: category.code,
        count: category.count,
        translations: category.translations,
      });
    } else {
      categoryForm.reset({
        count: 0,
        translations: { vi: { name: "" }, en: { name: "" } },
      });
    }
  }, [category, isEdit, categoryForm]);

  const handleFormSubmit = async (data: CategoryInput) => {
    onSubmit(data);
    categoryForm.reset();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      style={{ margin: 0 }}
    >
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden">
        <div className="p-6 border-b flex justify-between items-center bg-gray-50 rounded-t-lg">
          <h2 className="text-xl font-bold text-[#5c4a3d]">
            {isEdit ? "Cập Nhật Danh Mục" : "Thêm Danh Mục Mới"}
          </h2>
        </div>
        <form
          onSubmit={categoryForm.handleSubmit(handleFormSubmit)}
          className="p-6 space-y-5"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mã danh mục (VD: CHAU_DAT) *
            </label>
            <input
              {...categoryForm.register("code")}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg uppercase focus:border-[#8b6914] focus:ring-1 focus:ring-[#8b6914] outline-none transition-colors"
            />
            {categoryForm.formState.errors.code && (
              <p className="text-red-500 text-xs mt-1">
                {categoryForm.formState.errors.code.message}
              </p>
            )}
          </div>

          <div className="bg-blue-50/50 p-4 rounded-lg border border-blue-100">
            <h3 className="font-bold text-blue-800 mb-3 text-sm flex items-center gap-2">
              🇻🇳 Tiếng Việt
            </h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tên danh mục *
              </label>
              <input
                {...categoryForm.register("translations.vi.name")}
                className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors"
              />
              {categoryForm.formState.errors.translations?.vi?.name && (
                <p className="text-red-500 text-xs mt-1">
                  {categoryForm.formState.errors.translations.vi.name.message}
                </p>
              )}
            </div>
          </div>

          <div className="bg-red-50/50 p-4 rounded-lg border border-red-100">
            <h3 className="font-bold text-red-800 mb-3 text-sm flex items-center gap-2">
              🇬🇧 Tiếng Anh
            </h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category Name *
              </label>
              <input
                {...categoryForm.register("translations.en.name")}
                className="w-full px-3 py-2 border border-red-200 rounded-lg focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition-colors"
              />
              {categoryForm.formState.errors.translations?.en?.name && (
                <p className="text-red-500 text-xs mt-1">
                  {categoryForm.formState.errors.translations.en.name.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors text-gray-700 font-medium"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={categoryForm.formState.isSubmitting || isPending}
              className="px-6 py-2 bg-[#8b6914] text-white rounded-lg hover:bg-[#6d5210] transition-colors disabled:opacity-50 font-medium"
            >
              {categoryForm.formState.isSubmitting || isPending
                ? "Đang xử lý..."
                : isEdit
                  ? "Cập Nhật"
                  : "Lưu Danh Mục"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
