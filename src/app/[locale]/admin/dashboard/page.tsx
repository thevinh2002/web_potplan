"use client";

import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  Wallet,
  Receipt,
  FileMinus,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const salesData = [
  { name: "28 Jan", sales: 40000, purchase: 30000 },
  { name: "29 Jan", sales: 45000, purchase: 35000 },
  { name: "30 Jan", sales: 55000, purchase: 40000 },
  { name: "31 Jan", sales: 60000, purchase: 45000 },
  { name: "1 Feb", sales: 65000, purchase: 50000 },
  { name: "2 Feb", sales: 70000, purchase: 55000 },
  { name: "3 Feb", sales: 55000, purchase: 40000 },
  { name: "4 Feb", sales: 75000, purchase: 60000 },
  { name: "5 Feb", sales: 70000, purchase: 55000 },
];

const customerData = [
  { name: "First Time", value: 55, color: "#22c55e" },
  { name: "Return", value: 35, color: "#eab308" },
  { name: "Inactive", value: 10, color: "#ef4444" },
];

export default function AdminDashboardPage() {
  return (
    <div>
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">
            Your main content goes here...
          </p>
        </div>

        {/* Stats Row 1 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatCard
            icon={ShoppingCart}
            label="Total Sales"
            value="$25,000"
            change="+5%"
            changeType="positive"
            bgColor="bg-[#fff5f0]"
            iconColor="text-[#e85d04]"
            iconBg="bg-[#e85d04]"
          />
          <StatCard
            icon={Package}
            label="Total Purchase"
            value="$18,000"
            change="+22%"
            changeType="positive"
            bgColor="bg-[#f0fdf4]"
            iconColor="text-[#22c55e]"
            iconBg="bg-[#22c55e]"
          />
          <StatCard
            icon={Wallet}
            label="Total Expenses"
            value="$9,000"
            change="+10%"
            changeType="positive"
            bgColor="bg-[#eff6ff]"
            iconColor="text-[#3b82f6]"
            iconBg="bg-[#3b82f6]"
          />
          <StatCard
            icon={Receipt}
            label="Invoice Due"
            value="$25,000"
            change="+5%"
            changeType="positive"
            bgColor="bg-[#fefce8]"
            iconColor="text-[#eab308]"
            iconBg="bg-[#eab308]"
          />
        </div>

        {/* Stats Row 2 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-xl p-5 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-2xl font-bold text-gray-900">$25,458</p>
                <p className="text-sm text-gray-600 mt-1">Total Profit</p>
                <p className="text-xs text-[#22c55e] mt-2">+35% vs last month</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-[#fff5f0] flex items-center justify-center">
                <LayoutDashboard className="w-5 h-5 text-[#e85d04]" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-2xl font-bold text-gray-900">$45,458</p>
                <p className="text-sm text-gray-600 mt-1">Total Payment Returns</p>
                <p className="text-xs text-[#ef4444] mt-2">-20% vs last Month</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-[#fef2f2] flex items-center justify-center">
                <FileMinus className="w-5 h-5 text-[#ef4444]" />
              </div>
            </div>
            <button className="text-xs text-[#e85d04] mt-3 font-medium">
              View
            </button>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-2xl font-bold text-gray-900">$34,458</p>
                <p className="text-sm text-gray-600 mt-1">Total Expenses</p>
                <p className="text-xs text-[#ef4444] mt-2">-30% vs last Month</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-[#fefce8] flex items-center justify-center">
                <Wallet className="w-5 h-5 text-[#eab308]" />
              </div>
            </div>
            <button className="text-xs text-[#e85d04] mt-3 font-medium">
              View
            </button>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Sales vs Purchase Chart */}
          <div className="bg-white rounded-xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-gray-900">Sales vs Purchase</h3>
              <select aria-label="Select year range" className="text-xs text-gray-500 bg-gray-50 border-0 rounded-lg px-3 py-1.5 outline-none cursor-pointer">
                <option>This year</option>
                <option>Last year</option>
              </select>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={salesData} barGap={8}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 11, fill: "#9ca3af" }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 11, fill: "#9ca3af" }}
                  tickFormatter={(value) => `$${value / 1000}k`}
                />
                <Tooltip
                  cursor={{ fill: "#f5f5f5" }}
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "none",
                    borderRadius: "8px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  }}
                />
                <Bar dataKey="sales" fill="#e85d04" radius={[4, 4, 0, 0]} barSize={20} />
                <Bar dataKey="purchase" fill="#fdba74" radius={[4, 4, 0, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Overall Information */}
          <div className="bg-white rounded-xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Overall Information</h3>
              <select aria-label="Select time period" className="text-xs text-gray-500 bg-gray-50 border-0 rounded-lg px-3 py-1.5 outline-none cursor-pointer">
                <option>Last 6 Months</option>
                <option>Last year</option>
              </select>
            </div>

            <p className="text-xs text-gray-500 mb-4">Customers Overview</p>

            <div className="flex items-center gap-8">
              {/* Donut Chart */}
              <div className="relative w-32 h-32">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={customerData}
                      cx="50%"
                      cy="50%"
                      innerRadius={35}
                      outerRadius={55}
                      paddingAngle={2}
                      dataKey="value"
                      startAngle={90}
                      endAngle={-270}
                    >
                      {customerData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={0} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Stats */}
              <div className="flex gap-8">
                <div>
                  <p className="text-2xl font-bold text-gray-900">5.5K</p>
                  <p className="text-xs text-[#22c55e] font-medium">First Time</p>
                  <span className="inline-flex items-center text-xs text-[#22c55e] bg-[#dcfce7] px-1.5 py-0.5 rounded mt-1">
                    ↓ 35%
                  </span>
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">3.5K</p>
                  <p className="text-xs text-[#eab308] font-medium">Return</p>
                  <span className="inline-flex items-center text-xs text-[#22c55e] bg-[#dcfce7] px-1.5 py-0.5 rounded mt-1">
                    ↓ 21%
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Stats */}
            <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-100">
              <div className="text-center">
                <p className="text-xl font-bold text-gray-900">6987</p>
                <p className="text-xs text-gray-500 mt-1">Suppliers</p>
              </div>
              <div className="text-center border-l border-gray-100">
                <p className="text-xl font-bold text-gray-900">4896</p>
                <p className="text-xs text-gray-500 mt-1">Customers</p>
              </div>
              <div className="text-center border-l border-gray-100">
                <p className="text-xl font-bold text-gray-900">487</p>
                <p className="text-xs text-gray-500 mt-1">Orders</p>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}

interface StatCardProps {
  icon: React.ElementType;
  label: string;
  value: string;
  change: string;
  changeType: "positive" | "negative";
  bgColor: string;
  iconColor: string;
  iconBg: string;
}

function StatCard({
  icon: Icon,
  label,
  value,
  change,
  changeType,
  bgColor,
  iconColor,
  iconBg,
}: StatCardProps) {
  return (
    <div className={`${bgColor} rounded-xl p-5`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs text-gray-600 font-medium">{label}</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">{value}</p>
        </div>
        <div className={`w-10 h-10 rounded-lg ${iconBg} bg-opacity-20 flex items-center justify-center`}>
          <Icon className={`w-5 h-5 ${iconColor}`} />
        </div>
      </div>
      <p
        className={`text-xs mt-3 font-medium ${
          changeType === "positive" ? "text-[#22c55e]" : "text-[#ef4444]"
        }`}
      >
        {change} since last month
      </p>
    </div>
  );
}
