import { app, auth, db } from "@/firebase/config";
import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getFirestore,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { useCollectionDataOnce } from "react-firebase-hooks/firestore";

export async function Follow({ username }: { username: string }) {
  // const q = query(
  //   collection(getFirestore(app), "userCollection"),
  //   where("username", "==", auth.currentUser?.displayName),
  // );

  // const q2 = query(
  //   collection(getFirestore(app), "userCollection"),
  //   where("username", "==", username),
  // );

  //current logged in user, add to following doc
  const currentUserRef = doc(
    db,
    "userCollection",
    auth.currentUser?.displayName as string,
  );
  await updateDoc(currentUserRef, {
    following: arrayUnion(username),
  });

  //current user on page, add to followers doc
  const followedUserRef = doc(db, "userCollection", username);
  await updateDoc(followedUserRef, {
    followers: arrayUnion(auth.currentUser?.displayName),
  });

  console.log(username);
}

export async function Unfollow({ username }: { username: string }) {
  // const q = query(
  //   collection(getFirestore(app), "userCollection"),
  //   where("username", "==", auth.currentUser?.displayName),
  // );

  // const q2 = query(
  //   collection(getFirestore(app), "userCollection"),
  //   where("username", "==", username),
  // );

  //current logged in user, add to following doc
  const currentUserRef = doc(
    db,
    "userCollection",
    auth.currentUser?.displayName as string,
  );
  await updateDoc(currentUserRef, {
    following: arrayRemove(username),
  });

  //current user on page, add to followers doc
  const followedUserRef = doc(db, "userCollection", username);
  await updateDoc(followedUserRef, {
    followers: arrayRemove(auth.currentUser?.displayName),
  });

  console.log(username);
}

export function checkFollow(username: string, currentUser: string): boolean {
  const q = query(
    collection(getFirestore(app), "userCollection"),
    where("username", "==", username),
  );

  const [value, loading] = useCollectionDataOnce(q);

  if (value != undefined) {
    if (value[0]?.followers.includes(currentUser)) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}
