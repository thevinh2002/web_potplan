import { Package, Folder, Sparkles, Star } from "lucide-react";
import { getAllProductsForAdmin } from "@/src/server/queries/product";
import { getAllCategoriesForAdmin } from "@/src/server/queries/category";

export default async function AdminDashboardPage() {
  const [products, categories] = await Promise.all([
    getAllProductsForAdmin(),
    getAllCategoriesForAdmin(),
  ]);

  // Build a map of category code -> category name (Vietnamese)
  const categoryMap = new Map<string, { name: string; count: number }>();
  categories.forEach((cat: any) => {
    const name = cat.translations?.vi?.name || cat.code || "Không xác định";
    categoryMap.set(cat.code, { name, count: cat.count ?? 0 });
  });

  // Count products per category from actual product data
  const productsByCategory = new Map<string, number>();
  let totalNewProducts = 0;
  let totalReviews = 0;

  products.forEach((product: any) => {
    const catCode = product.category || "unknown";
    productsByCategory.set(catCode, (productsByCategory.get(catCode) || 0) + 1);
    if (product.is_new) totalNewProducts++;
    totalReviews += product.review ?? 0;
  });

  // Build statistics rows for the table
  const statisticsData = Array.from(categoryMap.entries()).map(
    ([code, cat]) => {
      const actualCount = productsByCategory.get(code) || 0;
      return {
        code,
        name: cat.name,
        productCount: actualCount,
      };
    }
  );

  const totalProducts = products.length;
  const totalCategories = categories.length;

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
          value={totalProducts.toString()}
          bgColor="bg-[#fff5f0]"
          iconColor="text-[#e85d04]"
          iconBg="bg-[#e85d04]"
        />
        <SummaryCard
          icon={Folder}
          label="Total Categories"
          value={totalCategories.toString()}
          bgColor="bg-[#f0fdf4]"
          iconColor="text-[#22c55e]"
          iconBg="bg-[#22c55e]"
        />
        <SummaryCard
          icon={Sparkles}
          label="New Products"
          value={totalNewProducts.toString()}
          bgColor="bg-[#fefce8]"
          iconColor="text-[#eab308]"
          iconBg="bg-[#eab308]"
        />
        <SummaryCard
          icon={Star}
          label="Total Reviews"
          value={totalReviews.toString()}
          bgColor="bg-[#fef2f2]"
          iconColor="text-[#ef4444]"
          iconBg="bg-[#ef4444]"
        />
      </div>

      {/* Statistics Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 lg:p-5 border-b border-gray-200">
          <h3 className="font-semibold text-gray-900 text-sm lg:text-base">Quantity Statistics by Category</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 lg:px-6 py-3 lg:py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-4 lg:px-6 py-3 lg:py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Code</th>
                <th className="px-4 lg:px-6 py-3 lg:py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Products</th>
                <th className="px-4 lg:px-6 py-3 lg:py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Distribution</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {statisticsData.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-sm text-gray-400">
                    No categories found
                  </td>
                </tr>
              ) : (
                statisticsData.map((item) => {
                  const percentage = totalProducts > 0
                    ? ((item.productCount / totalProducts) * 100).toFixed(1)
                    : "0.0";
                  return (
                    <tr key={item.code} className="hover:bg-gray-50">
                      <td className="px-4 lg:px-6 py-3 lg:py-4 text-sm font-medium text-gray-900">{item.name}</td>
                      <td className="px-4 lg:px-6 py-3 lg:py-4 text-sm text-gray-500 font-mono">{item.code}</td>
                      <td className="px-4 lg:px-6 py-3 lg:py-4 text-sm text-gray-600">{item.productCount}</td>
                      <td className="px-4 lg:px-6 py-3 lg:py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-16 lg:w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-[#e85d04] rounded-full"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                          <span className="text-sm text-gray-600">{percentage}%</span>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
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
  bgColor: string;
  iconColor: string;
  iconBg: string;
}

function SummaryCard({
  icon: Icon,
  label,
  value,
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
    </div>
  );
}
