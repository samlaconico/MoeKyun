import { app } from "@/firebase/config";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import Link from "next/link";

export default async function Followers({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const q = query(
    collection(getFirestore(app), "userCollection"),
    where("username", "==", id),
  );

  const docRef = await getDocs(q);
  console.log(docRef.docs[0].data().followers);

  return (
    <div>
      <h1 className="font-fira-sans mt-10 mb-5 text-4xl font-bold">
        Followers
      </h1>
      {docRef.docs[0].data().followers.map((user: string, i: number) => {
        return (
          <Link key={i} href={`/${user}`} className="my-2 hover:underline">
            <h1 className="my-2">{user}</h1>
          </Link>
        );
      })}
    </div>
  );
}
