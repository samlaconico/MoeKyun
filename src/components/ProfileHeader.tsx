"use client";

import { app, auth } from "@/firebase/config";
import { collection, getFirestore, query, where } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { motion } from "motion/react";
import { Skeleton } from "./ui/skeleton";
import Link from "next/link";
import { Follow, Unfollow } from "@/utils/Follow";
import { useAuthState } from "react-firebase-hooks/auth";
import Image from "next/image";

export default function ProfileHeader({ username }: { username: string }) {
  const q = query(
    collection(getFirestore(app), "userCollection"),
    where("username", "==", username),
  );

  const [authState] = useAuthState(auth);
  const [value, loading] = useCollection(q, {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  return (
    <motion.div className="relative my-10 flex w-auto flex-col space-y-3 space-x-3 md:flex-row md:items-end md:space-y-0">
      {loading ? (
        <Skeleton className="size-[150px] bg-amber-300" />
      ) : (
        <Link
          href={
            value?.docs[0].get("profileImage")
              ? value?.docs[0].get("profileImage")
              : ""
          }
        >
          <Image
          width={500}
          height={500}
            alt="Profile Image"
            className="size-[150px] rounded-sm border-2 border-neutral-200 object-cover"
            src={
value?.docs[0].get("profileImage")
                ? value?.docs[0].get("profileImage")
                : "/images/defaultavi.jpg"
            }
          />
        </Link>
      )}

      <div>
        {!loading ? (
          username != auth.currentUser?.displayName && auth.currentUser ? (
            <button
              className={loading ? `` : `cursor-pointer hover:underline`}
              onClick={() => {
                if (
                  value?.docs[0]
                    .data()
                    .followers.includes(authState?.displayName)
                ) {
                  Unfollow({ username });
                } else {
                  Follow({ username });
                }
              }}
            >
              {loading ? (
                ""
              ) : (
                <h1 className="font-fira-sans">
                  {value?.docs[0]
                    .data()
                    .followers.includes(authState?.displayName)
                    ? "Unfollow"
                    : "Follow"}
                </h1>
              )}
            </button>
          ) : (
            <Link
              className={loading ? `` : `cursor-pointer hover:underline`}
              href={`/${username}/settings`}
            >
              {loading ? (
                ""
              ) : (
                <h1 className="font-fira-sans">
                  {auth.currentUser?.displayName == username
                    ? "Edit Profile"
                    : ""}
                </h1>
              )}
            </Link>
          )
        ) : (
          ""
        )}

        {loading ? (
          <Skeleton className="h-8 w-32 rounded bg-amber-300"></Skeleton>
        ) : (
          <div className="flex flex-row place-items-end space-x-2">
            <h1 className="font-fira-sans text-4xl font-bold">
              {value?.docs[0].get("username")}
            </h1>

            <Link href={`${username}/following`}>
              <h1 className="font-fira-sans text-md font-bold hover:underline">
                Following {value?.docs[0].get("following").length}
              </h1>
            </Link>
            <Link href={`${username}/followers`}>
              <h1 className="font-fira-sans text-md font-bold hover:underline">
                Followers {value?.docs[0].get("followers").length}
              </h1>
            </Link>
          </div>
        )}
      </div>
    </motion.div>
  );
}
