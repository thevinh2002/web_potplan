import { db } from "@/src/libs/firebase-admin";

const COLLECTION_NAME = "posts";

export async function getAllPostsForAdmin() {
  try {
    const snapshot = await db.collection(COLLECTION_NAME).orderBy("date", "desc").get();

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

export async function getPostsPublic(locale: string = "en") {
  try {
    const snapshot = await db.collection(COLLECTION_NAME).orderBy("date", "desc").get();

    return snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
      };
    });
  } catch (error) {
    return [];
  }
}

export async function getPostBySlug(slug: string) {
  try {
    const snapshot = await db.collection(COLLECTION_NAME).where("slug", "==", slug).limit(1).get();

    if (snapshot.empty) {
      return null;
    }

    const doc = snapshot.docs[0];
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
  } catch (error) {
    return null;
  }
}
