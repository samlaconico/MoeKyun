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
      <div>
        {docRef.docs[0]
          .data()
          .following.map(async (user: string, i: number) => {
            const q = query(
              collection(getFirestore(app), "userCollection"),
              where("username", "==", user),
            );

            const docRef = await getDocs(q);
            return (
              <div
                key={i}
                className="my-4 w-1/2 bg-neutral-800 p-4 hover:bg-neutral-700"
              >
                <Link
                  href={`/${user}`}
                  className="font-fira-sans flex flex-row place-items-end space-x-2 text-lg font-bold hover:underline"
                >
                  <img
                    src={
                      docRef.docs[0].get("profileImage") != ""
                        ? docRef.docs[0].get("profileImage")
                        : "https://yt3.ggpht.com/yti/ANjgQV-0bO4_a79iFihiLxp_MPItweNXG9Fa5YvQ2BG52EcmVg=s108-c-k-c0x00ffffff-no-rj"
                    }
                    className="size-[100px]"
                  />
                  <div>
                    <h1 className="overflow-hidden overflow-ellipsis">
                      {user}
                    </h1>
                    <div className="flex flex-row space-x-3">
                      <h2 className="text-">
                        Following {docRef.docs[0].get("following").length}
                      </h2>
                      <h2 className="text-">
                        Followers {docRef.docs[0].get("followers").length}
                      </h2>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
      </div>
    </div>
  );
}
