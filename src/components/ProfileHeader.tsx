"use client";

import { app, auth } from "@/firebase/config";
import { collection, getFirestore, query, where } from "firebase/firestore";
import {
  useCollection,
  useCollectionData,
  useCollectionOnce,
} from "react-firebase-hooks/firestore";
import { motion } from "motion/react";
import { Skeleton } from "./ui/skeleton";
import Image from "next/image";
import Link from "next/link";
import { checkFollow, Follow, Unfollow } from "@/utils/Follow";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";

export default function ProfileHeader({ username }: { username: string }) {
  const q = query(
    collection(getFirestore(app), "userCollection"),
    where("username", "==", username),
  );

  const [authState, authLoading] = useAuthState(auth);
  const [value, loading] = useCollectionOnce(q, {});
  const [follower, setFollow] = useState<boolean>(false);

  useEffect(() => {
    setFollow(value?.docs[0].data().followers.includes(authState?.displayName));
  }, [loading]);

  console.log(follower);

  return (
    <motion.div className="relative my-10 flex w-auto flex-row items-end space-x-3">
      <Image
        alt="Profile Image"
        width={100}
        height={100}
        src={
          auth.currentUser?.photoURL
            ? auth.currentUser?.photoURL
            : "https://yt3.ggpht.com/yti/ANjgQV-0bO4_a79iFihiLxp_MPItweNXG9Fa5YvQ2BG52EcmVg=s108-c-k-c0x00ffffff-no-rj"
        }
      />
      <div>
        {!loading ? (
          username != auth.currentUser?.displayName && auth.currentUser ? (
            <button
              className={loading ? `` : `cursor-pointer hover:underline`}
              onClick={() => {
                if (follower) {
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
                  {follower ? "Unfollow" : "Follow"}
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

            <h1 className="font-fira-sans text-md font-bold">
              Following {value?.docs[0].get("following").length}
            </h1>
            <h1 className="font-fira-sans text-md font-bold">
              Followers {value?.docs[0].get("followers").length}
            </h1>
          </div>
        )}
      </div>
    </motion.div>
  );
}
