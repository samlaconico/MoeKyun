"use client";

import { app, auth } from "@/firebase/config";
import { collection, getFirestore, query, where } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useCollection } from "react-firebase-hooks/firestore";
import { motion } from "motion/react";
import { Skeleton } from "./ui/skeleton";
import Image from "next/image";

export default function ProfileHeader({ username }: { username: string }) {
  const router = useRouter();

  const q = query(
    collection(getFirestore(app), "userCollection"),
    where("username", "==", username),
  );

  const [value, loading] = useCollection(q, {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  // console.log(value?.docs[0].get("username"));
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
        <button
          className={loading ? `` : `cursor-pointer hover:underline`}
          onClick={() => {
            if (!loading) {
              router.push(`/${username}/settings`);
            }
          }}
        >
          {loading ? (
            <Skeleton className="h-4 w-24 rounded bg-amber-300"></Skeleton>
          ) : (
            <h1 className="font-fira-sans">
              {auth.currentUser?.displayName == username ? "Edit Profile" : ""}
            </h1>
          )}
        </button>

        {loading ? (
          <Skeleton className="h-8 w-32 rounded bg-amber-300"></Skeleton>
        ) : (
          <h1 className="font-fira-sans text-4xl font-bold">
            {value?.docs[0].get("username")}
          </h1>
        )}
      </div>
    </motion.div>
  );
}
