import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onNext: () => void;
  onPrev: () => void;
  previousText: string;
  nextText: string;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  onNext,
  onPrev,
  previousText,
  nextText,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const renderPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = startPage + maxPagesToShow - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    if (startPage > 1) {
      pages.push(
        <button
          key="first"
          onClick={() => onPageChange(1)}
          className="w-10 h-10 rounded-lg border hover:bg-gray-50 text-gray-600 transition-colors"
        >
          1
        </button>,
      );
      if (startPage > 2) {
        pages.push(
          <span key="ellipsis1" className="text-gray-400 px-1">
            ...
          </span>,
        );
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={`w-10 h-10 rounded-lg font-medium transition-colors ${
            currentPage === i
              ? "bg-[#8b6914] text-white"
              : "border hover:bg-gray-50 text-gray-600"
          }`}
        >
          {i}
        </button>,
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(
          <span key="ellipsis2" className="text-gray-400 px-1">
            ...
          </span>,
        );
      }
      pages.push(
        <button
          key="last"
          onClick={() => onPageChange(totalPages)}
          className="w-10 h-10 rounded-lg border hover:bg-gray-50 text-gray-600 transition-colors"
        >
          {totalPages}
        </button>,
      );
    }

    return pages;
  };

  return (
    <div className="mt-12 flex justify-center">
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onPrev}
          disabled={currentPage === 1}
          className="px-4 py-2 border rounded-lg hover:bg-gray-50 text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {previousText}
        </button>

        {renderPageNumbers()}

        <button
          type="button"
          onClick={onNext}
          disabled={currentPage === totalPages}
          className="px-4 py-2 border rounded-lg hover:bg-gray-50 text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {nextText}
        </button>
      </div>
    </div>
  );
}
