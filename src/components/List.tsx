"use client";

import { app } from "@/firebase/config";
import { collection, getFirestore, query, where } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";

export default function List({ username }: { username: string }) {
  const q = query(
    collection(getFirestore(app), "userCollection"),
    where("username", "==", username),
  );
  const [value, loading, error] = useCollection(q, {
    snapshotListenOptions: { includeMetadataChanges: true },
  });
  return (
    <>
      <div className="table border-spacing-2">
        <div className="table-row">
          <div className="table-cell size-36 bg-amber-300"></div>
          <div className="table-cell size-36 bg-amber-300"></div>
          <div className="table-cell size-36 bg-amber-300"></div>
        </div>
        <div className="table-row">
          <div className="table-cell size-36 bg-amber-300"></div>
          <div className="table-cell size-36 bg-amber-300"></div>
          <div className="table-cell size-36 bg-amber-300"></div>
        </div>
        <div className="table-row">
          <div className="table-cell size-36 bg-amber-300"></div>
          <div className="table-cell size-36 bg-amber-300"></div>
          <div className="table-cell size-36 bg-amber-300"></div>
        </div>
      </div>
    </>
  );
}
