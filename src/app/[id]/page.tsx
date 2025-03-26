import List from "@/components/List";
import Nav from "@/components/Nav";
import UsernameHeader from "@/components/UsernameHeader";
import { app } from "@/firebase/config";
import {
  collection,
  documentId,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";

export default async function Profile({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  //check if id is a valid profile
  const q = query(
    collection(getFirestore(app), "userCollection"),
    where("username", "==", id),
  );
  const querySnapshot = await getDocs(q);
  console.log(querySnapshot.docs.length);
  if (querySnapshot.size != 0) {
    return (
      <div>
        <Page username={id} />
      </div>
    );
  } else {
    return <div>404</div>;
  }
}

function Page({ username }: { username: string }) {
  return (
    <div>
      <UsernameHeader username={username} />
      <List username={username} />
    </div>
  );
}
