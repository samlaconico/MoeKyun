"use client";

import { app } from "@/firebase/config";
import { collection, getFirestore, query, where } from "firebase/firestore";
import { useCollectionOnce } from "react-firebase-hooks/firestore";
import { motion } from "motion/react";
import { Skeleton } from "./ui/skeleton";
import Link from "next/link";
import Image from "next/image";

export default function List({ username }: { username: string }) {
  const q = query(
    collection(getFirestore(app), "userCollection"),
    where("username", "==", username),
  );

  const [value, loading] = useCollectionOnce(q);

  return (
    <motion.div className="w-full">
      <h1 className="font-fira-sans text-3xl font-semibold">3x3</h1>
      <div className="mb-2 flex flex-row space-x-2 overflow-hidden">
        {[...Array(3)].map((v, i) =>
          loading ? (
            <Skeleton
              key={i}
              className="aspect-square w-1/3 rounded-none bg-amber-300"
            />
          ) : (
            <div key={i} className="relative aspect-square w-1/3 bg-amber-300">
              <Link
                href={
                  value?.docs[0].get("animeList")[i].siteUrl != undefined
                    ? value?.docs[0].get("animeList")[i].siteUrl
                    : ""
                }
              >
                {" "}
                {value?.docs[0].get("animeList")[i].coverImage.extraLarge !=
                "" ? (
                  <Image
                    alt={
                      value?.docs[0].get("animeList")[i].title.english
                        ? value?.docs[0].get("animeList")[i].title.english
                        : value?.docs[0].get("animeList")[i].title.romaji
                    }
                    fill
                    src={
                      value?.docs[0].get("animeList")[i].coverImage.extraLarge
                    }
                    sizes="33vw"
                    className="w-full object-cover"
                  />
                ) : (
                  ""
                )}
              </Link>
            </div>
          ),
        )}
      </div>
      <div className="mb-2 flex flex-row space-x-2 overflow-hidden">
        {[...Array(3)].map((v, i) =>
          loading ? (
            <Skeleton
              key={i}
              className="aspect-square w-1/3 rounded-none bg-amber-300"
            />
          ) : (
            <div key={i} className="relative aspect-square w-1/3 bg-amber-300">
              {" "}
              <Link
                href={
                  value?.docs[0].get("animeList")[i + 3].siteUrl != undefined
                    ? value?.docs[0].get("animeList")[i + 3].siteUrl
                    : ""
                }
              >
                {value?.docs[0].get("animeList")[i + 3].coverImage.extraLarge !=
                "" ? (
                  <Image
                    alt={
                      value?.docs[0].get("animeList")[i + 3].title.english
                        ? value?.docs[0].get("animeList")[i + 3].title.english
                        : value?.docs[0].get("animeList")[i + 3].title.romaji
                    }
                    fill
                    src={
                      value?.docs[0].get("animeList")[i + 3].coverImage
                        .extraLarge
                    }
                    className="w-full object-cover"
                    sizes="33vw"
                  />
                ) : (
                  ""
                )}
              </Link>
            </div>
          ),
        )}
      </div>
      <div className="mb-2 flex flex-row space-x-2 overflow-hidden">
        {[...Array(3)].map((v, i) =>
          loading ? (
            <Skeleton
              key={i}
              className="aspect-square w-1/3 rounded-none bg-amber-300"
            />
          ) : (
            <div key={i} className="relative aspect-square w-1/3 bg-amber-300">
              {" "}
              <Link
                href={
                  value?.docs[0].get("animeList")[i + 6].siteUrl != undefined
                    ? value?.docs[0].get("animeList")[i + 6].siteUrl
                    : ""
                }
              >
                {value?.docs[0].get("animeList")[i + 6].coverImage.extraLarge !=
                "" ? (
                  <Image
                    alt={
                      value?.docs[0].get("animeList")[i + 6].title.english
                        ? value?.docs[0].get("animeList")[i + 6].title.english
                        : value?.docs[0].get("animeList")[i + 6].title.romaji
                    }
                    fill
                    src={
                      value?.docs[0].get("animeList")[i + 6].coverImage
                        .extraLarge
                    }
                    className="w-full object-cover"
                    sizes="33vw"
                  />
                ) : (
                  ""
                )}
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
