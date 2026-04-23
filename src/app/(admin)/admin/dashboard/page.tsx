import { getAllProductsForAdmin } from "@/src/server/queries/product";
import { getCategoryOptions } from "@/src/server/queries/category";
import AdminDashboard from "./AdminDashboard";

export default async function AdminDashboardPage() {
  const products = (await getAllProductsForAdmin()) as any;
  const categoryOptions = (await getCategoryOptions("vi")) as any;

  return (
    <AdminDashboard
      initialProducts={products}
      categoryOptions={categoryOptions}
    />
  );
}
