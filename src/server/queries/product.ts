import { db } from "@/src/libs/firebase-admin";
const COLLECTION_NAME = "products";

export async function getAllProductsForAdmin() {
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
    console.error("Failt to fetch products:", error);
    return [];
  }
}

export async function getProductById(id: string) {
  try {
    const doc = await db.collection(COLLECTION_NAME).doc(id).get();
    if (!doc.exists) return null;

    return { id: doc.id, ...doc.data() };
  } catch (error) {
    console.error("Failt to fetch product:", error);
    return null;
  }
}

export async function getProductsPublic(locale: string) {
  try {
    const snapshot = await db
      .collection(COLLECTION_NAME)
      .orderBy("createdAt", "desc")
      .get();

    return snapshot.docs.map((doc) => {
      const rawData = doc.data();

      const localizedData =
        rawData.translations?.[locale] || rawData.translations?.["vi"] || {};

      return {
        id: doc.id,
        category: rawData.category,
        code: rawData.code,
        image_cover: rawData.image_cover,
        is_new: rawData.is_new,
        rating: rawData.rating,
        review: rawData.review,
        images: rawData.images,

        name: localizedData.name || "",
        slug: localizedData.slug || "",
        description: localizedData.description || "",
        newLabel: localizedData.new || "",
      };
    });
  } catch (error) {
    console.error("Failt to fetch products public:", error);
    return [];
  }
}

export async function getProductBySlugPublic(slug: string, locale: string) {
  try {
    const snapshot = await db
      .collection(COLLECTION_NAME)
      .where(`translations.${locale}.slug`, "==", slug)
      .limit(1)
      .get();

    if (snapshot.empty) return null;

    const rawData = snapshot.docs[0].data();
    const localizedData = rawData.translations[locale];

    return {
      id: snapshot.docs[0].id,
      category: rawData.category,
      code: rawData.code,
      image_cover: rawData.image_cover,
      images: rawData.images,
      is_new: rawData.is_new,
      rating: rawData.rating,
      review: rawData.review,
      name: localizedData.name,
      description: localizedData.description,
      newLabel: localizedData.new,
    };
  } catch (error) {
    console.error("Failt to fetch public product:", error);
    return null;
  }
}

export async function getTranslatedSlug(
  currentSlug: string,
  currentLocale: string,
  targetLocale: string,
) {
  try {
    const snapshot = await db
      .collection("products")
      .where(`translations.${currentLocale}.slug`, "==", currentSlug)
      .limit(1)
      .get();

    if (snapshot.empty) return null;

    const rawData = snapshot.docs[0].data();
    // Lấy slug của ngôn ngữ đích (Ví dụ: lấy slug của tiếng Việt)
    const targetSlug = rawData.translations?.[targetLocale]?.slug;

    return targetSlug || null;
  } catch (error) {
    console.error("Lỗi tra cứu slug:", error);
    return null;
  }
}
