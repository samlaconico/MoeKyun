"use client";

import { app } from "@/firebase/config";
import {
  collection,
  getFirestore,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import { useCollectionOnce } from "react-firebase-hooks/firestore";
import { motion } from "motion/react";
import { Skeleton } from "./ui/skeleton";

export function Updates() {
  const q = query(
    collection(getFirestore(app), "updateCollection"),
    orderBy("date", "desc"),
  );

  const [value] = useCollectionOnce(q);

  return (
    <div>
      {value?.docs.map((data, index) => {
        console.log(data.data());
        const object = JSON.parse(JSON.stringify(data.data()));
        const time = new Date(
          object.date.seconds * 1000 + object.date.nanoseconds / 1000000,
        );
        return (
          <motion.div
            key={index}
            className="mb-2"
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.05 }}
          >
            <Link href={`/${object.user}`}>
              <h1 className="font-fira-sans hover:underline">{object.user}</h1>
            </Link>
            <div className="flex h-38 w-full space-x-1 overflow-hidden rounded-sm bg-neutral-800">
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
                  <div className="flex flex-row justify-between">
                    <Link href={object.entry.siteUrl}>
                      <h1 className="font-fira-sans text-xl font-bold">
                        {object.entry.title.english}
                      </h1>
                    </Link>
                    <h2 className="font-fira-sans text-sm">
                      {time.toLocaleDateString()}
                    </h2>
                  </div>
                </div>
                <p>{object.body}</p>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

export function UpdatesFromUser({ username }: { username: string }) {
  const q = query(
    collection(getFirestore(app), "updateCollection"),
    where("user", "==", username),
  );

  const [value, loading] = useCollectionOnce(q, {});

  return (
    <>
      {loading
        ? [...Array(3)].map((v, i) => (
            <Skeleton key={i} className="mb-3 h-42 w-full bg-amber-300" />
          ))
        : value?.docs
            .toReversed()
            .splice(0, 5)
            .map((data, index) => {
              //console.log(data.data());
              const object = JSON.parse(JSON.stringify(data.data()));
              const time = new Date(
                object.date.seconds * 1000 + object.date.nanoseconds / 1000000,
              );
              return (
                <motion.div
                  key={index}
                  className="mb-5 flex h-38 w-full space-x-1 overflow-hidden rounded-sm bg-neutral-800"
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.05 }}
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
                  <div className="w-full justify-between py-1 pr-2 pl-1">
                    <div className="mb-2">
                      <div className="flex flex-row justify-between">
                        <Link href={object.entry.siteUrl}>
                          <h1 className="font-fira-sans text-xl font-bold">
                            {object.entry.title.english}
                          </h1>
                        </Link>
                        <div className="text-right">
                          <h2 className="font-fira-sans pt-1 text-sm">
                            {time.toLocaleDateString()}
                          </h2>
                          <h1 className="font-fira text-sm">
                            Episode {object.episode}
                          </h1>
                        </div>
                      </div>
                    </div>
                    <p className="font-fira-sans text-ellipsis">
                      {object.body}
                    </p>
                  </div>
                </motion.div>
              );
            })}
    </>
  );
}
