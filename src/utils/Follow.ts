import { auth, db } from "@/firebase/config";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";

export async function Follow({ username }: { username: string }) {
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
