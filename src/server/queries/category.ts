import { db } from "@/src/libs/firebase-admin";

const COLLECTION_NAME = "categories";

export async function getAllCategoriesForAdmin() {
  try {
    const [categoriesSnapshot, productsSnapshot] = await Promise.all([
      db.collection(COLLECTION_NAME).orderBy("createdAt", "desc").get(),
      db.collection("products").get(),
    ]);

    // Đếm số sản phẩm cho mỗi category code
    const productCounts: Record<string, number> = {};
    productsSnapshot.docs.forEach((doc) => {
      const categoryCode = doc.data().category;
      if (categoryCode) {
        productCounts[categoryCode] = (productCounts[categoryCode] || 0) + 1;
      }
    });

    return categoriesSnapshot.docs.map((doc) => {
      const data = doc.data();

      return {
        id: doc.id,
        ...data,
        count: productCounts[data.code] || 0,
        createdAt: data.createdAt?.toDate
          ? data.createdAt.toDate().toISOString()
          : null,
        updatedAt: data.updatedAt?.toDate
          ? data.updatedAt.toDate().toISOString()
          : null,
      };
    });
  } catch (error) {
    return [];
  }
}

export async function getCategoriesPublic(locale: string = "vi") {
  try {
    const [categoriesSnapshot, productsSnapshot] = await Promise.all([
      db.collection(COLLECTION_NAME).get(),
      db.collection("products").get(),
    ]);

    // Đếm số sản phẩm cho mỗi category code
    const productCounts: Record<string, number> = {};
    productsSnapshot.docs.forEach((doc) => {
      const categoryCode = doc.data().category;
      if (categoryCode) {
        productCounts[categoryCode] = (productCounts[categoryCode] || 0) + 1;
      }
    });

    return categoriesSnapshot.docs.map((doc) => {
      const data = doc.data();
      const localizedName = data.translations?.[locale]?.name || data.code;
      return {
        id: data.code,
        name: localizedName,
        count: productCounts[data.code] || 0,
      };
    });
  } catch (error) {
    return [];
  }
}

export async function getCategoryOptions(locale: string = "vi") {
  try {
    const snapshot = await db.collection(COLLECTION_NAME).get();
    return snapshot.docs.map((doc) => {
      const data = doc.data();
      const localizedName = data.translations?.[locale]?.name || data.code;
      return {
        value: data.code,
        label: localizedName,
      };
    });
  } catch (error) {
    return [];
  }
}
