import "dotenv/config";
import { Elysia } from "elysia";
import { initializeApp } from "firebase/app";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  query as doc_query,
  updateDoc,
  where,
} from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: process.env.FIRESTORE_API_KEY,
  authDomain: process.env.FIRESTORE_AUTH_DOMAIN,
  projectId: process.env.FIRESTORE_PROJECT_ID,
  storageBucket: process.env.FIRESTORE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIRESTORE_MESSAGING_SENDER_ID,
  appId: process.env.FIRESTORE_APP_ID,
};

const firebase = initializeApp(firebaseConfig);
const db = getFirestore(firebase);
const dbItems = collection(db, "items");

interface IItem {
  text: string;
  done: boolean;
}

const app = new Elysia();

app.get("/", async () => {
  const items_snapshot = await getDocs(dbItems);
  return items_snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
});

app.post("/remove/:id", async ({ params: { id } }) => {
  //const items_snapshot_query = query(dbItems, where("id", "==", id));
  await deleteDoc(doc(db, "items", id));
  return true;
});

app.post("/update/:id", async ({ params: { id }, query }) => {
  const _data = query as unknown as {
    text: string | undefined;
    done: string | undefined;
  };

  const data = _data as {
    text: string | undefined;
    done: boolean | undefined;
  };
  if (typeof _data.done == "string") {
    data.done = _data.done == "true";
  }

  const items_snapshot_query = doc_query(dbItems, where("id", "==", id));
  const items_snapshot = await getDocs(items_snapshot_query);
  const items = items_snapshot.docs.map((doc) => doc.data());
  const item = { ...items[0], ...data };

  await updateDoc(doc(db, "items", id), item);
  return true;
});

app.post("/", async ({ query }) => {
  const { text, done } = query as unknown as {
    text: string | undefined;
    done: string | undefined;
  };

  let err = "";
  if (!text) err += "text, ";
  if (!done) err += "done.";
  if (err) throw Error(`Missing query: ${err}`);

  const _done = done == "true";

  const item = await addDoc(dbItems, { text, done: _done });
  return item.id;
});

app.listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
