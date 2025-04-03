"use client";

import { app } from "@/firebase/config";
import { collection, getFirestore, query, where } from "firebase/firestore";
import { useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { motion } from "motion/react";
import { Skeleton } from "./ui/skeleton";
import Link from "next/link";
import Image from "next/image";

export default function List({ username }: { username: string }) {
  // const [open, setOpen] = useState<boolean>(false);
  const [idList, setIdList] = useState<number[]>([]);

  const q = query(
    collection(getFirestore(app), "userCollection"),
    where("username", "==", username),
  );

  const [value, loading] = useCollection(q, {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  if (!loading && idList.length != 0) {
    setIdList(value?.docs[0].get("anime3x3"));
  }

  // console.log(value?.docs[0].get("animeList")[0]);

  return (
    <motion.div className="py-6">
      <h1 className="font-fira-sans text-3xl font-semibold">3x3</h1>
      <div className="mb-2 flex flex-row space-x-2 overflow-hidden">
        {[...Array(3)].map((v, i) =>
          loading ? (
            <Skeleton key={i} className="size-24 bg-amber-300 md:size-58" />
          ) : (
            <div key={i} className="relative size-24 bg-amber-300 md:size-58">
              <Link href={value?.docs[0].get("animeList")[i].link}>
                {" "}
                <Image
                  alt="Image"
                  fill
                  src={value?.docs[0].get("animeList")[i].image}
                  className="w-full object-cover"
                />
              </Link>
            </div>
          ),
        )}
      </div>
      <div className="mb-2 flex flex-row space-x-2 overflow-hidden">
        {[...Array(3)].map((v, i) =>
          loading ? (
            <Skeleton key={i} className="size-24 bg-amber-300 md:size-58" />
          ) : (
            <div key={i} className="relative size-24 bg-amber-300 md:size-58">
              {" "}
              <Link href={value?.docs[0].get("animeList")[i + 3].link}>
                <Image
                  alt="Image"
                  fill
                  src={value?.docs[0].get("animeList")[i + 3].image}
                  className="w-full object-cover"
                />
              </Link>
            </div>
          ),
        )}
      </div>
      <div className="mb-2 flex flex-row space-x-2 overflow-hidden">
        {[...Array(3)].map((v, i) =>
          loading ? (
            <Skeleton key={i} className="size-24 bg-amber-300 md:size-58" />
          ) : (
            <div key={i} className="relative size-24 bg-amber-300 md:size-58">
              {" "}
              <Link href={value?.docs[0].get("animeList")[i + 6].link}>
                <Image
                  alt="Image"
                  fill
                  src={value?.docs[0].get("animeList")[i + 6].image}
                  className="w-full object-cover"
                />
              </Link>
            </div>
          ),
        )}
      </div>
    </motion.div>
  );
}

export function Info() {
  return (
    <div>
      <h1> info </h1>
    </div>
  );
}
