import { Search } from "lucide-react";

interface SearchInputProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  placeholder?: string;
}

export default function SearchInput({
  searchQuery,
  setSearchQuery,
  placeholder,
}: SearchInputProps) {
  return (
    <div className="relative flex-1">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
      <input
        type="text"
        placeholder={placeholder}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full pl-12 pr-4 py-3 bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8b6914] text-[#5c4a3d]"
      />
    </div>
  );
}
