// src/lib/utils.ts
import jsPDF from "jspdf";
import "jspdf-autotable";

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

export const exportToCSV = (
  dataList: any[],
  filenamePrefix: string = "export",
) => {
  const headers = [
    "Code",
    "Category",
    "Name (VI)",
    "Name (EN)",
    "Colors",
    "Sizes",
    "Is New",
    "Rating",
  ];
  const csvData = dataList.map((p) => [
    p.code,
    p.category,
    `"${(p.translations?.vi?.name || "").replace(/"/g, '""')}"`,
    `"${(p.translations?.en?.name || "").replace(/"/g, '""')}"`,
    `"${(p.colors || "").replace(/"/g, '""')}"`,
    `"${(p.sizes || "").replace(/"/g, '""')}"`,
    p.is_new ? "Yes" : "No",
    p.rating,
  ]);

  const csvContent = [
    headers.join(","),
    ...csvData.map((row) => row.join(",")),
  ].join("\n");
  const blob = new Blob(["\uFEFF" + csvContent], {
    type: "text/csv;charset=utf-8;",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute(
    "download",
    `${filenamePrefix}_${new Date().toISOString().slice(0, 10)}.csv`,
  );
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const exportToPDF = async (
  dataList: any[],
  filenamePrefix: string = "export",
) => {
  const jsPDF = (await import("jspdf")).default;
  const autoTable = (await import("jspdf-autotable")).default;

  const doc = new jsPDF();

  autoTable(doc, {
    head: [
      [
        "Code",
        "Category",
        "Name (VI)",
        "Name (EN)",
        "Colors",
        "Sizes",
        "Rating",
      ],
    ],
    body: dataList.map((p) => [
      p.code,
      p.category,
      p.translations?.vi?.name || "",
      p.translations?.en?.name || "",
      p.colors || "-",
      p.sizes || "-",
      p.rating || 0,
    ]),
    styles: { font: "helvetica", fontSize: 8 },
    headStyles: { fillColor: [232, 93, 4] },
  });

  doc.save(`${filenamePrefix}_${new Date().toISOString().slice(0, 10)}.pdf`);
};
