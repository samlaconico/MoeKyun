import List from "@/components/List";
import ProfileHeader from "@/components/ProfileHeader";
import { app } from "@/firebase/config";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";

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

  if (querySnapshot.size != 0) {
    return (
      <div>
        <Page username={id} />
      </div>
    );
  } else {
    // TODO: 404 page
    return <div>404</div>;
  }
}

function Page({ username }: { username: string }) {
  return (
    <div className="">
      <ProfileHeader username={username} />
      <List username={username} />
    </div>
  );
}
