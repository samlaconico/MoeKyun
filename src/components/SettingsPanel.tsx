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
import { ChangeEvent, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { AnimeType } from "@/utils/types";
import { useCollection } from "react-firebase-hooks/firestore";
import { FiArrowLeft } from "react-icons/fi";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

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

  const [progress, setProgress] = useState<number>(0);
  const [imageUploadState, setImageUploadState] = useState<string>("");

  const imageUpload = async (
    e: ChangeEvent<HTMLInputElement>,
    user: string | undefined | null,
  ) => {
    if (user != undefined && user != null && e.target.files != undefined) {
      if (e.target.files != null && e.target.files[0].type.includes("image")) {
        const fileRef = ref(sg, e.target.files[0].name);
        const uploadTask = uploadBytesResumable(fileRef, e.target.files[0]);
        
        const q = query(
          collection(getFirestore(app), "userCollection"),
          where("username", "==", user),
        );
        const docc = await getDocs(q);
        const deleteRef = ref(sg, docc.docs[0].get("profileImage"));

        deleteObject(deleteRef).then(() => {
          setImageUploadState("uploading");
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              setProgress(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
              );
              console.log(snapshot);
            },
            (error) => {
              console.log(error);
            },
            () => {
              setImageUploadState("completed");
              getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                updateDoc(doc(db, "userCollection", user), {
                  profileImage: downloadURL,
                });
              });
            },
          );
        });
      } else {
        setImageUploadState("Error, please make sure to upload an image file ")
      }
    } else {
      setImageUploadState("Error, try uploading again");
    }
  };

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
        <h1 className="font-fira-sans text-4xl font-bold">Settings</h1>

        <div className="my-2 rounded-sm bg-neutral-800 p-4 md:w-1/2">
          <h2 className="font-fira-sans px-2 pb-2 text-4xl font-bold">
            Edit 3x3 Entries
          </h2>
          <div className="flex flex-row flex-wrap">
            {[...Array(9)].map((v, i) => (
              <div key={i} className="overflow-hidden p-2 md:w-1/3">
                <img
                  className="mb-2 aspect-square size-fit object-cover"
                  src={value?.docs[0].get("animeList")[i].coverImage.extraLarge}
                />
                <Search
                  callback={(entry) => {
                    setNewListEntry(user, i, entry);
                  }}
                  placeholder={
                    value?.docs[0].get("animeList")[i].title.english != null
                      ? value?.docs[0].get("animeList")[i].title.english
                      : value?.docs[0].get("animeList")[i].title.romaji
                  }
                ></Search>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full rounded bg-neutral-800 p-4 md:w-1/2">
          <h1 className="font-fira-sans text-4xl font-bold">
            Upload Profile Picture
          </h1>
          <div className="my-2 flex flex-col space-y-2 space-x-2 rounded-sm md:flex-row md:place-items-end md:space-y-0">
            <img
              className="size-[150px] object-cover"
              src={value?.docs[0].get("profileImage")}
            ></img>
            <form className="">
              <input
                type="file"
                accept="image/png, image/jpg"
                className="text-md w-1/2 rounded-md bg-neutral-900 px-2 hover:bg-neutral-700"
                onChange={(e) => {
                  imageUpload(e, authState?.displayName);
                }}
              />
            </form>
          </div>
          <div className="mt-2 font-semibold">
            {imageUploadState == "uploading"
              ? `Uploading ${progress.toPrecision(3)}%`
              : imageUploadState == "completed"
                ? "Profile Picture Updated!"
                : ""}
          </div>
        </div>
      </div>
    );
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
