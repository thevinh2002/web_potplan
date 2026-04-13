import Link from "next/link";

interface ContactButtonProps {
  className?: string;
  showIcon?: boolean;
  text?: string;
}

export default function ContactButton({
  className = "",
  showIcon = false,
  text = "Contact Us",
}: ContactButtonProps) {
  return (
    <Link
      href="/contact"
      className={`inline-flex items-center justify-center gap-2 bg-[#8b6914] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#7a5c12] transition-colors ${className}`}
    >
      {text}
      {showIcon && (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 8l4 4m0 0l-4 4m4-4H3"
          />
        </svg>
      )}
    </Link>
  );
}

