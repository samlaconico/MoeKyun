"use client";

import {
  collection,
  doc,
  getDocs,
  getFirestore,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import Search from "./Search";
import { app, auth, db } from "@/firebase/config";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

export default function SettingsPanel({ user }: { user: string }) {
  const router = useRouter();
  const [authState, loading] = useAuthState(auth);

  useEffect(() => {
    if (authState?.displayName != user && !loading) router.push("/");
  }, [authState?.displayName, loading, router, user]);

  if (!loading)
    return (
      <div className="my-10">
        <button
          onClick={() => {
            router.back();
          }}
          className="cursor-pointer hover:underline"
        >
          <h1>return</h1>
        </button>
        <h1 className="font-fira-sans pb-10 text-4xl font-bold">Settings</h1>
        <h2 className="font-fira-sans pb-2 text-4xl font-bold">
          Edit 3x3 Entries
        </h2>
        {[...Array(9)].map((v, i) => (
          <Search
            key={i}
            callback={(id, title, image, link) => {
              setNewListEntry(user, i, id, title, image, link);
            }}
          ></Search>
        ))}
      </div>
    );
}

async function setNewListEntry(
  user: string,
  index: number,
  id: number,
  title: string,
  image: string,
  link: string,
) {
  const q = query(
    collection(getFirestore(app), "userCollection"),
    where("username", "==", user),
  );
  let tempArray: {}[] = []; // eslint-disable-line
  let tempObject = {}; // eslint-disable-line
  const docc = await getDocs(q);
  docc.forEach((doc) => {
    tempArray = doc.data().animeList;
  });

  tempObject = { title: title, id: id, image: image, link: link };
  tempArray[index] = tempObject;

  await updateDoc(doc(db, "userCollection", user), { animeList: tempArray });
}
