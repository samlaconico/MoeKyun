"use client";

import { app, auth } from "@/firebase/config";
import { collection, getFirestore, query, where } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";

export default function UsernameHeader({ username }: { username: string }) {
  const q = query(
    collection(getFirestore(app), "userCollection"),
    where("username", "==", username),
  );

  const [value, loading, error] = useCollection(q, {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  console.log(value?.docs[0].get("username"));
  return (
    <div className="flex flex-row items-end space-x-3 py-10">
      <img src="https://yt3.ggpht.com/yti/ANjgQV-0bO4_a79iFihiLxp_MPItweNXG9Fa5YvQ2BG52EcmVg=s108-c-k-c0x00ffffff-no-rj" />
      <div>
        <h1 className="font-fira-sans">
          {loading
            ? "LOADING"
            : auth.currentUser?.displayName == username
              ? "Edit Profile"
              : ""}
        </h1>
        <h1 className="font-fira-sans text-4xl font-bold">
          {loading ? "LOADING" : value?.docs[0].get("username")}
        </h1>
      </div>
    </div>
  );
}
