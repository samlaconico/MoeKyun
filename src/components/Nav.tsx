"use client";

import { auth } from "@/firebase/config";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Nav() {
  const [authState, loading] = useAuthState(auth);
  const router = useRouter();

  return (
    <div className="font-fira-sans my-5 flex flex-row justify-between">
      <h1 className="my-auto text-4xl font-bold">ANIME LIST SITE NAME</h1>
      <div className="inline-flex space-x-4">
        <button onClick={() => router.push(`/${authState?.displayName}`)}>
          <h1 className="my-auto hover:shadow-white">
            {loading ? "LOADING" : authState?.displayName}
          </h1>
        </button>
        <button
          className="rounded-2xl bg-neutral-500 p-2"
          onClick={() => {
            if (authState) {
              signOut(auth);
              sessionStorage.setItem("signedin", "false");
            } else {
              router.push("/sign-in");
            }
          }}
        >
          {authState ? "Logout" : "Sign in"}
        </button>
      </div>
    </div>
  );
}
