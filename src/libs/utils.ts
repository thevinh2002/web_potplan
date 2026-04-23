// src/lib/utils.ts
export function slugify(text: string): string {
  return text
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-");
}

//cloudinary
export const uploadImageToCloudinary = async (
  file: File,
  subFolder?: string,
): Promise<string> => {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

  if (!cloudName || !uploadPreset) {
    throw new Error("Missing config");
  }

  const ROOT_FOLDER = "vad";
  const finalFolderPath = subFolder
    ? `${ROOT_FOLDER}/${subFolder}`
    : ROOT_FOLDER;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);

  formData.append("folder", finalFolderPath);

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: "POST",
        body: formData,
      },
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || "Error connect to cloudinary");
    }

    if (data.secure_url) {
      return data.secure_url;
    } else {
      throw new Error("Error get url image");
    }
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    throw error;
  }
};
