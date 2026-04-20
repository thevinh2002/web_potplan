import { db } from "@/src/libs/firebase-admin";

const COLLECTION_NAME = "categories";

export async function getAllCategoriesForAdmin() {
  try {
    const snapshot = await db
      .collection(COLLECTION_NAME)
      .orderBy("createdAt", "desc")
      .get();
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
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
