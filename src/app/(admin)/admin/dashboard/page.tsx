"use client";

import { Package, ShoppingCart, Users, TrendingUp } from "lucide-react";

const statisticsData = [
  { id: 1, category: "Electronics", totalProducts: 150, inStock: 120, outOfStock: 30, lowStock: 15 },
  { id: 2, category: "Clothing", totalProducts: 200, inStock: 180, outOfStock: 20, lowStock: 25 },
  { id: 3, category: "Food & Beverages", totalProducts: 80, inStock: 60, outOfStock: 20, lowStock: 10 },
  { id: 4, category: "Home & Garden", totalProducts: 95, inStock: 85, outOfStock: 10, lowStock: 8 },
  { id: 5, category: "Sports", totalProducts: 60, inStock: 50, outOfStock: 10, lowStock: 5 },
];

export default function AdminDashboardPage() {
  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">Quantity Statistics Overview</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <SummaryCard
          icon={Package}
          label="Total Products"
          value="585"
          change="+12%"
          bgColor="bg-[#fff5f0]"
          iconColor="text-[#e85d04]"
          iconBg="bg-[#e85d04]"
        />
        <SummaryCard
          icon={ShoppingCart}
          label="In Stock"
          value="495"
          change="+8%"
          bgColor="bg-[#f0fdf4]"
          iconColor="text-[#22c55e]"
          iconBg="bg-[#22c55e]"
        />
        <SummaryCard
          icon={Users}
          label="Out of Stock"
          value="90"
          change="-5%"
          bgColor="bg-[#fef2f2]"
          iconColor="text-[#ef4444]"
          iconBg="bg-[#ef4444]"
        />
        <SummaryCard
          icon={TrendingUp}
          label="Low Stock"
          value="63"
          change="+3%"
          bgColor="bg-[#fefce8]"
          iconColor="text-[#eab308]"
          iconBg="bg-[#eab308]"
        />
      </div>

      {/* Statistics Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-5 border-b border-gray-200">
          <h3 className="font-semibold text-gray-900">Quantity Statistics by Category</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Total Products</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">In Stock</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Out of Stock</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Low Stock</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Stock Rate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {statisticsData.map((item) => {
                const stockRate = ((item.inStock / item.totalProducts) * 100).toFixed(1);
                return (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{item.category}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{item.totalProducts}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{item.inStock}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{item.outOfStock}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{item.lowStock}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#e85d04] rounded-full"
                            style={{ width: `${stockRate}%` }}
                          />
                        </div>
                        <span className="text-sm text-gray-600">{stockRate}%</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

interface SummaryCardProps {
  icon: React.ElementType;
  label: string;
  value: string;
  change: string;
  bgColor: string;
  iconColor: string;
  iconBg: string;
}

function SummaryCard({
  icon: Icon,
  label,
  value,
  change,
  bgColor,
  iconColor,
  iconBg,
}: SummaryCardProps) {
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
      <p className="text-xs mt-3 font-medium text-[#22c55e]">
        {change} since last month
      </p>
    </div>
  );
}
