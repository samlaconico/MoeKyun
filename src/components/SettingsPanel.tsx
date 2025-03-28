"use client";

import {
  collection,
  doc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import Search from "./Search";
import { app, db } from "@/firebase/config";

export default function SettingsPanel({ user }: { user: string }) {
  return (
    <div>
      <h1 className="font-fira-sans py-10 text-4xl font-bold">Settings</h1>
      <h2 className="font-fira-sans pb-2 text-4xl font-bold">
        Edit 3x3 Entries
      </h2>
      <Search
        callback={(id) => {
          setListEntry(user, 0, id);
        }}
      />
      <Search
        callback={(id) => {
          console.log(id);
        }}
      />
      <Search
        callback={(id) => {
          console.log(id);
        }}
      />
      <Search
        callback={(id) => {
          console.log(id);
        }}
      />
    </div>
  );
}

async function setListEntry(user: string, index: number, id: number) {
  const q = query(
    collection(getFirestore(app), "userCollection"),
    where("username", "==", user),
  );
  let temp = [];
  const docc = await getDocs(q);
  docc.forEach((doc) => {
    temp = doc.data().anime3x3;
  });
  temp[index] = id;
  await updateDoc(doc(db, "userCollection", user), { anime3x3: temp });
}
