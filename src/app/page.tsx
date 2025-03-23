"use client";

import { app, auth } from "@/firebase/config";
import {
  collection,
  getFirestore,
  query,
  where,
  documentId,
} from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";

export default function Home() {
  const [authState] = useAuthState(auth);
  const router = useRouter();

  const q = query(
    collection(getFirestore(app), "userCollection"),
    where(documentId(), "==", "yGvcNTpx77icy80vVJXt"),
  );

  const [value, loading, error] = useCollection(q, {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  const [signout] = useSignOut(auth);
  return authState ? (
    <div className="font-fira-sans text-center">
      <h1>Hello! {loading ? "loading" : authState?.email}</h1>
      <h2></h2>
      <button
        onClick={() => {
          signout();
        }}
      >
        Logout
      </button>
    </div>
  ) : (
    <div className="flex h-screen flex-col justify-center">
      <button
        onClick={() => {
          router.push("/sign-in");
        }}
      >
        Sign in
      </button>
    </div>
  );
}
