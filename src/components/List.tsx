"use client";

import { app } from "@/firebase/config";
import { collection, getFirestore, query, where } from "firebase/firestore";
import { useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";

export default function List({ username }: { username: string }) {
  // const [open, setOpen] = useState<boolean>(false);
  const [idList, setIdList] = useState<number[]>([]);

  const q = query(
    collection(getFirestore(app), "userCollection"),
    where("username", "==", username),
  );

  const [value, loading, error] = useCollection(q, {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  if (!loading && idList.length != 0) {
    setIdList(value?.docs[0].get("anime3x3"));
  }

  console.log(value?.docs[0].get("anime3x3"));

  return (
    <>
      <h1 className="font-fira-sans text-3xl font-semibold">3x3</h1>
      <div className="mb-2 flex flex-row space-x-2">
        <div className="size-36 bg-amber-300"></div>
        <div className="size-36 bg-amber-300"></div>
        <div className="size-36 bg-amber-300"></div>
      </div>
      <div className="mb-2 flex flex-row space-x-2">
        <div className="size-36 bg-amber-300"></div>
        <div className="size-36 bg-amber-300"></div>
        <div className="size-36 bg-amber-300"></div>
      </div>
      <div className="mb-2 flex flex-row space-x-2">
        <div className="size-36 bg-amber-300"></div>
        <div className="size-36 bg-amber-300"></div>
        <div className="size-36 bg-amber-300"></div>
      </div>
    </>
  );
}

function loadImagesFromURL({ list }: { list: number[] }) {
  var query = `query Page($search: String, $type: MediaType) {
    Page {
      media(search: $search, type: $type) {
        id
        title {
          english
          romaji
        }
      }
    }
  }
    `;
}
