import List from "@/components/List";
import ProfileHeader from "@/components/ProfileHeader";
import { UpdatesFromUser } from "@/components/Updates";
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
    <div className="self-center">
      <ProfileHeader username={username} />
      <div className="grid place-items-start gap-x-6 gap-y-10 md:grid-cols-2">
        <List username={username} />
        <div className="mx-auto flex w-full flex-col">
          <h1 className="font-fira-sans text-3xl font-semibold">
            Recent Updates
          </h1>
          <UpdatesFromUser username={username} />
        </div>
      </div>
    </div>
  );
}
