"use client";

import { app } from "@/firebase/config";
import { collection, getFirestore, query, where } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import { useCollection } from "react-firebase-hooks/firestore";

export function UpdatesFromUser({ username }: { username: string }) {
  const q = query(
    collection(getFirestore(app), "updateCollection"),
    where("user", "==", username),
  );

  const [value] = useCollection(q, {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  return (
    <>
      {value?.docs.map((data, index) => {
        console.log(data.data());
        const object = JSON.parse(JSON.stringify(data.data()));
        const time = new Date(
          object.date.seconds * 1000 + object.date.nanoseconds / 1000000,
        );
        return (
          <div
            key={index}
            className="mb-5 flex h-32 w-full space-x-1 overflow-hidden rounded-sm bg-neutral-800"
          >
            <div className="relative h-full w-32">
              <Link href={object.entry.siteUrl}>
                <Image
                  src={object.entry.coverImage.extraLarge}
                  fill
                  alt={object.entry.title.romaji}
                  className="object-cover"
                />
              </Link>
            </div>
            <div className="w-full py-1 pr-2 pl-1">
              <div className="mb-2">
                <div className="flex flex-row place-items-center justify-between">
                  <Link href={object.entry.siteUrl}>
                    <h1 className="font-fira-sans text-xl font-bold">
                      {object.entry.title.english}
                    </h1>
                  </Link>
                  <h2 className="font-fira-sans text-sm">
                    {time.toDateString()}
                  </h2>
                </div>
              </div>
              <p>{object.body}</p>
            </div>
          </div>
        );
      })}
    </>
  );
}
