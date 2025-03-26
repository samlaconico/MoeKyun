"use client";

import Nav from "@/components/Nav";
import { auth } from "@/firebase/config";
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Home() {
  const [authState, loadingAuth] = useAuthState(auth);

  // const q = query(
  //   collection(getFirestore(app), "userCollection"),
  //   where(documentId(), "==", "yGvcNTpx77icy80vVJXt"),
  // );

  return loadingAuth ? (
    <h1>LOADING</h1>
  ) : authState ? (
    <>
      <div>welcome {authState.displayName}</div>
    </>
  ) : (
    <WelcomePageNotSignedIn />
  );
}

function WelcomePageNotSignedIn() {
  const router = useRouter();

  return (
    <div className="flex h-screen flex-col items-center justify-center space-y-4">
      <button
        onClick={() => {
          router.push("/sign-in");
        }}
        className="w-20 rounded-2xl bg-neutral-500"
      >
        Sign in
      </button>
      <button
        onClick={() => {
          router.push("/register");
        }}
        className="w-20 rounded-2xl bg-neutral-500"
      >
        Register
      </button>
    </div>
  );
}
