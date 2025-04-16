import { app } from "@/firebase/config";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import Link from "next/link";

export default async function Following({
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
  console.log(docRef.docs[0].data().following);

  return (
    <div>
      <h1 className="font-fira-sans mt-10 mb-5 text-4xl font-bold">
        Following
      </h1>
      {docRef.docs[0].data().following.map((user: string, i: number) => {
        return (
          <Link key={i} href={`/${user}`} className="hover:underline">
            <h1 className="my-2">{user}</h1>
          </Link>
        );
      })}
    </div>
  );
}
