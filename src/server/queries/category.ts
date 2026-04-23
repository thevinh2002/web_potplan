import { db } from "@/src/libs/firebase-admin";

const COLLECTION_NAME = "categories";

export async function getAllCategoriesForAdmin() {
  try {
    const snapshot = await db
      .collection(COLLECTION_NAME)
      .orderBy("createdAt", "desc")
      .get();
    return snapshot.docs.map((doc) => {
      const data = doc.data();

      return {
        id: doc.id,
        ...data,
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
    const snapshot = await db.collection(COLLECTION_NAME).get();
    return snapshot.docs.map((doc) => {
      const data = doc.data();
      const localizedName = data.translations?.[locale]?.name || data.code;
      return {
        id: data.code,
        name: localizedName,
        count: data.count ?? 0,
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
