"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Mail, 
  Phone, 
  User, 
  Calendar, 
  CheckCircle, 
  Circle, 
  Reply,
  Trash2,
  Search,
  Filter,
  Eye,
  X,
  MessageSquare,
  RefreshCw
} from "lucide-react";
import { updateContactStatus, deleteContact } from "@/src/server/actions/contact";

interface Contact {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: "new" | "read" | "replied";
  createdAt: string;
  updatedAt: string;
}

interface AdminContactsProps {
  initialContacts: Contact[];
}

export default function AdminContacts({ initialContacts }: AdminContactsProps) {
  const [contacts, setContacts] = useState<Contact[]>(initialContacts);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [filterStatus, setFilterStatus] = useState<"all" | "new" | "read" | "replied">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  const filteredContacts = contacts.filter((contact) => {
    const matchesStatus = filterStatus === "all" || contact.status === filterStatus;
    const matchesSearch =
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.subject.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleStatusChange = async (id: string, status: "new" | "read" | "replied") => {
    setIsUpdating(true);
    const result = await updateContactStatus(id, status);
    if (result.success) {
      setContacts((prev) =>
        prev.map((c) => (c.id === id ? { ...c, status } : c))
      );
    }
    setIsUpdating(false);
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Bạn có chắc muốn xóa tin nhắn này?")) return;
    
    const result = await deleteContact(id);
    if (result.success) {
      setContacts((prev) => prev.filter((c) => c.id !== id));
      if (selectedContact?.id === id) {
        setSelectedContact(null);
      }
    }
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      new: "bg-blue-100 text-blue-700 border-blue-200",
      read: "bg-yellow-100 text-yellow-700 border-yellow-200",
      replied: "bg-green-100 text-green-700 border-green-200",
    };
    const labels = {
      new: "Mới",
      read: "Đã đọc",
      replied: "Đã trả lời",
    };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${styles[status as keyof typeof styles]}`}>
        {labels[status as keyof typeof labels]}
      </span>
    );
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <Mail className="w-6 h-6 text-[#8b6914]" />
            Quản Lý Liên Hệ
          </h1>
          <p className="text-gray-500 mt-1">Quản lý tin nhắn từ khách hàng</p>
        </div>
        <button
          onClick={handleRefresh}
          className="flex items-center gap-2 px-4 py-2 bg-[#8b6914] text-white rounded-lg hover:bg-[#7a5c12] transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          Làm mới
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Tổng", value: contacts.length, color: "bg-gray-100 text-gray-700" },
          { label: "Mới", value: contacts.filter((c) => c.status === "new").length, color: "bg-blue-100 text-blue-700" },
          { label: "Đã đọc", value: contacts.filter((c) => c.status === "read").length, color: "bg-yellow-100 text-yellow-700" },
          { label: "Đã trả lời", value: contacts.filter((c) => c.status === "replied").length, color: "bg-green-100 text-green-700" },
        ].map((stat) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`${stat.color} rounded-lg p-4`}
          >
            <p className="text-2xl font-bold">{stat.value}</p>
            <p className="text-sm">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm kiếm theo tên, email, tiêu đề..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8b6914] focus:border-transparent outline-none"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              aria-label="Lọc theo trạng thái"
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8b6914] focus:border-transparent outline-none"
            >
              <option value="all">Tất cả trạng thái</option>
              <option value="new">Mới</option>
              <option value="read">Đã đọc</option>
              <option value="replied">Đã trả lời</option>
            </select>
          </div>
        </div>
      </div>

      {/* Contacts Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Khách hàng</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Tiêu đề</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Ngày gửi</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Trạng thái</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredContacts.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-12 text-center text-gray-500">
                    Không có tin nhắn nào
                  </td>
                </tr>
              ) : (
                filteredContacts.map((contact) => (
                  <tr
                    key={contact.id}
                    className={`hover:bg-gray-50 cursor-pointer ${
                      selectedContact?.id === contact.id ? "bg-[#faf8f5]" : ""
                    }`}
                    onClick={() => setSelectedContact(contact)}
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#8b6914]/10 flex items-center justify-center">
                          <User className="w-4 h-4 text-[#8b6914]" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{contact.name}</p>
                          <p className="text-sm text-gray-500">{contact.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-sm text-gray-900 line-clamp-1">{contact.subject}</p>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <Calendar className="w-3 h-3" />
                        {formatDate(contact.createdAt)}
                      </div>
                    </td>
                    <td className="px-4 py-3">{getStatusBadge(contact.status)}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedContact(contact);
                          }}
                          className="p-2 text-gray-500 hover:text-[#8b6914] hover:bg-[#8b6914]/10 rounded-lg transition-colors"
                          title="Xem chi tiết"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(contact.id);
                          }}
                          className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Xóa"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Modal */}
      {selectedContact && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedContact(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-black flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-[#8b6914]" />
                Chi tiết tin nhắn
              </h2>
              <button
                onClick={() => setSelectedContact(null)}
                className="p-2 hover:bg-red-50 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-red-500" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Contact Info */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#8b6914]/10 flex items-center justify-center">
                    <User className="w-5 h-5 text-[#8b6914]" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Họ và tên</p>
                    <p className="font-medium text-black">{selectedContact.name}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#8b6914]/10 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-[#8b6914]" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium text-black">{selectedContact.email}</p>
                  </div>
                </div>
                {selectedContact.phone && (
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#8b6914]/10 flex items-center justify-center">
                      <Phone className="w-5 h-5 text-[#8b6914]" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Điện thoại</p>
                      <p className="font-medium text-black">{selectedContact.phone}</p>
                    </div>
                  </div>
                )}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#8b6914]/10 flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-[#8b6914]" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Ngày gửi</p>
                    <p className="font-medium text-black">{formatDate(selectedContact.createdAt)}</p>
                  </div>
                </div>
              </div>

              {/* Status */}
              <div className="flex items-center gap-4 py-4 border-y border-gray-100">
                <span className="text-sm text-black">Trạng thái:</span>
                <div className="flex gap-2">
                  {["new", "read", "replied"].map((status) => (
                    <button
                      key={status}
                      onClick={() => handleStatusChange(selectedContact.id, status as any)}
                      disabled={isUpdating || selectedContact.status === status}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                        selectedContact.status === status
                          ? status === "new"
                            ? "bg-blue-100 text-blue-700"
                            : status === "read"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      {status === "new" && <Circle className="w-3 h-3 inline mr-1" />}
                      {status === "read" && <CheckCircle className="w-3 h-3 inline mr-1" />}
                      {status === "replied" && <Reply className="w-3 h-3 inline mr-1" />}
                      {status === "new" ? "Mới" : status === "read" ? "Đã đọc" : "Đã trả lời"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Message */}
              <div>
                <h3 className="font-semibold text-black mb-2">{selectedContact.subject}</h3>
                <div className="bg-gray-50 rounded-lg p-4 text-black whitespace-pre-wrap">
                  {selectedContact.message}
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3 pt-4">
                <button
                  onClick={() => handleDelete(selectedContact.id)}
                  className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors flex items-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Xóa
                </button>
                <a
                  href={`mailto:${selectedContact.email}?subject=Re: ${selectedContact.subject}`}
                  className="px-4 py-2 bg-[#8b6914] text-white rounded-lg hover:bg-[#7a5c12] transition-colors flex items-center gap-2"
                >
                  <Reply className="w-4 h-4" />
                  Trả lời qua Email
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
