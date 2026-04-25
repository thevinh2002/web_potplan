import AdminCategory from "./AdminCategory";
import { getCategoriesAction } from "@/src/server/actions/category";

export default async function CategoriesPage() {
  const categories = await getCategoriesAction();

  return <AdminCategory initialCategories={categories as any} />;
}
