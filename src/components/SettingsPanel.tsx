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
import { app, auth, db, sg } from "@/firebase/config";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { AnimeType } from "@/utils/types";
import { useCollection } from "react-firebase-hooks/firestore";
import { FiArrowLeft } from "react-icons/fi";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

export default function SettingsPanel({ user }: { user: string }) {
  const router = useRouter();

  const [authState, loading] = useAuthState(auth);

  const q = query(
    collection(getFirestore(app), "userCollection"),
    where("username", "==", user),
  );

  const [value] = useCollection(q, {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

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
          <FiArrowLeft className="size-[200%]" />
        </button>
        <h1 className="font-fira-sans pb-10 text-4xl font-bold">Settings</h1>
        <h2 className="font-fira-sans pb-2 text-4xl font-bold">
          Edit 3x3 Entries
        </h2>
        <div className="flex flex-row flex-wrap md:w-1/2">
          {[...Array(9)].map((v, i) => (
            <div key={i} className="overflow-hidden md:w-1/3">
              <Search
                callback={(entry) => {
                  setNewListEntry(user, i, entry);
                }}
                placeholder={value?.docs[0].get("animeList")[i].title.english}
              ></Search>
            </div>
          ))}
        </div>
        <h1 className="font-fira-sans pt-10 text-4xl font-bold">
          Upload Profile Picture
        </h1>
        <form className="my-2">
          <input
            type="file"
            className="text-md rounded-md bg-neutral-800 px-2 hover:bg-neutral-700"
            onChange={(e) => {
              imageUpload(e, authState?.displayName);
            }}
          />
          <button
            type="submit"
            className="mx-2 rounded-lg bg-neutral-800 px-2 hover:cursor-pointer hover:bg-neutral-700"
          >
            Upload
          </button>
        </form>
      </div>
    );
}

async function imageUpload(
  e: ChangeEvent<HTMLInputElement>,
  user: string | undefined | null,
) {
  if (user != undefined && user != null) {
    if (e.target.files != null) {
      const fileRef = ref(sg, e.target.files[0].name);
      const uploadTask = uploadBytesResumable(fileRef, e.target.files[0]);

      uploadTask.on("state_changed", async () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          await updateDoc(doc(db, "userCollection", user), {
            profileImage: downloadURL,
          });
        });
      });
    }
  }
}

async function setNewListEntry(user: string, index: number, entry: AnimeType) {
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

  tempObject = entry;
  tempArray[index] = tempObject;

  await updateDoc(doc(db, "userCollection", user), {
    animeList: tempArray,
  });
}
