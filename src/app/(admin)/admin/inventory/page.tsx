import AdminInventory from "./AdminInventory";
import { getProductsAction } from "@/src/server/actions/product";
import { getCategoryOptions } from "@/src/server/queries/category";

export default async function InventoryPage() {
  const products = await getProductsAction();
  const categories = await getCategoryOptions("vi");

  return (
    <AdminInventory
      initialProducts={products as any}
      categoryOptions={categories as any}
    />
  );
}
