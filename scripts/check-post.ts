import * as admin from 'firebase-admin';
import { db } from '@/src/libs/firebase-admin';

async function check() {
  const snapshot = await db.collection('posts').orderBy('createdAt', 'desc').limit(2).get();
  snapshot.forEach(doc => {
    console.log(doc.id, "=>", doc.data());
  });
  process.exit(0);
}

check();
