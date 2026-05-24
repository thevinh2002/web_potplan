"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Trash2,
  Image as ImageIcon,
  Upload,
  X,
} from "lucide-react";

import { uploadImageToCloudinary } from "@/src/libs/utils";
import { PostSchema, PostInput } from "@/src/libs/schemas/post";

interface PostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: PostInput) => void;
  editingPost: any | null;
  isPending: boolean;
}

export default function PostModal({
  isOpen,
  onClose,
  onSubmit,
  editingPost,
  isPending,
}: PostModalProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [imagePreviewLocal, setImagePreviewLocal] = useState<string>("");

  const postForm = useForm<PostInput>({
    resolver: zodResolver(PostSchema),
    values: editingPost
      ? {
          ...editingPost,
        }
      : {
          slug: "",
          title: "",
          excerpt: "",
          content: "",
          image: "",
          date: new Date().toISOString().split('T')[0],
          category: "",
        },
  });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const localUrl = URL.createObjectURL(file);
    setImagePreviewLocal(localUrl);
    setIsUploading(true);

    try {
      const downloadUrl = await uploadImageToCloudinary(file, "posts");

      postForm.setValue("image", downloadUrl, {
        shouldValidate: true,
      });
      setImagePreviewLocal("");
    } catch (error) {
      console.error(error);
      alert("Lỗi khi tải ảnh lên Cloudinary!");
      setImagePreviewLocal("");
    } finally {
      setIsUploading(false);
    }
  };

  const handleFormSubmit = async (data: PostInput) => {
    onSubmit(data);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gradient-to-r from-[#8b6914] to-[#a67c1e]">
          <div>
            <h2 className="text-xl font-bold text-white">
              {editingPost ? "Chỉnh sửa bài viết" : "Thêm bài viết mới"}
            </h2>
            <p className="text-white/70 text-sm mt-1">
              {editingPost
                ? "Cập nhật thông tin bài viết"
                : "Tạo bài viết mới"}
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
          onSubmit={postForm.handleSubmit(handleFormSubmit)}
          className="flex-1 overflow-y-auto p-6 space-y-6"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column - Image Upload */}
            <div className="space-y-5">
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <ImageIcon size={16} />
                  Ảnh bài viết *
                </label>
                <div className="relative group">
                  <div
                    className={`border-2 border-dashed rounded-xl overflow-hidden transition-all duration-300 ${
                      imagePreviewLocal || postForm.watch("image")
                        ? "border-amber-300 bg-amber-50"
                        : "border-gray-300 hover:border-amber-400 hover:bg-amber-50"
                    }`}
                  >
                    <div className="relative h-64 flex flex-col items-center justify-center">
                      {imagePreviewLocal || postForm.watch("image") ? (
                        <img
                          src={
                            imagePreviewLocal ||
                            postForm.watch("image")
                          }
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="text-center p-2">
                          <Upload
                            className="mx-auto text-gray-400 mb-1"
                            size={24}
                          />
                          <p className="text-xs text-gray-500 font-medium">
                            Tải ảnh
                          </p>
                        </div>
                      )}

                      {isUploading && imagePreviewLocal && (
                        <div className="absolute inset-0 bg-white/70 flex items-center justify-center backdrop-blur-sm z-10">
                          <div className="w-6 h-6 border-3 border-amber-600 border-t-transparent rounded-full animate-spin"></div>
                        </div>
                      )}

                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        disabled={isUploading}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                      />
                    </div>
                  </div>
                  {postForm.formState.errors.image && (
                    <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                      <span className="font-semibold">⚠</span>
                      {postForm.formState.errors.image.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column - Post Info */}
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Slug *
                </label>
                <input
                  {...postForm.register("slug")}
                  placeholder="VD: pottery-manufacturing-techniques"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200"
                />
                {postForm.formState.errors.slug && (
                  <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                    <span className="font-semibold">⚠</span>
                    {postForm.formState.errors.slug.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Tiêu đề *
                </label>
                <input
                  {...postForm.register("title")}
                  placeholder="Nhập tiêu đề bài viết..."
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200"
                />
                {postForm.formState.errors.title && (
                  <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                    <span className="font-semibold">⚠</span>
                    {postForm.formState.errors.title.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Danh mục *
                </label>
                <input
                  {...postForm.register("category")}
                  placeholder="VD: Manufacturing"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200"
                />
                {postForm.formState.errors.category && (
                  <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                    <span className="font-semibold">⚠</span>
                    {postForm.formState.errors.category.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Ngày đăng *
                </label>
                <input
                  {...postForm.register("date")}
                  type="date"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200"
                />
                {postForm.formState.errors.date && (
                  <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                    <span className="font-semibold">⚠</span>
                    {postForm.formState.errors.date.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Tóm tắt *
            </label>
            <textarea
              {...postForm.register("excerpt")}
              rows={3}
              placeholder="Nhập tóm tắt ngắn về bài viết..."
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200 resize-none"
            />
            {postForm.formState.errors.excerpt && (
              <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                <span className="font-semibold">⚠</span>
                {postForm.formState.errors.excerpt.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Nội dung *
            </label>
            <textarea
              {...postForm.register("content")}
              rows={10}
              placeholder="Nhập nội dung chi tiết của bài viết..."
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200 resize-none"
            />
            {postForm.formState.errors.content && (
              <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                <span className="font-semibold">⚠</span>
                {postForm.formState.errors.content.message}
              </p>
            )}
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
                postForm.formState.isSubmitting || isPending || isUploading
              }
              className="px-8 py-2.5 bg-gradient-to-r from-[#8b6914] to-[#a67c1e] text-white rounded-xl hover:from-[#6d5210] hover:to-[#8b6914] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium shadow-lg hover:shadow-xl flex items-center gap-2"
            >
              {postForm.formState.isSubmitting ||
              isPending ||
              isUploading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Đang xử lý...
                </>
              ) : (
                <>
                  <span>💾</span>
                  {editingPost ? "Cập Nhật" : "Lưu Bài Viết"}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
