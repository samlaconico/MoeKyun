"use client";

import { auth } from "@/firebase/config";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Nav() {
  const [authState, loading] = useAuthState(auth);
  const router = useRouter();

  return (
    <nav className="font-fira-sans my-10 flex flex-row justify-between">
      <button
        onClick={() => {
          router.push("/");
        }}
        className="hover:cursor-pointer"
      >
        <h1 className="my-auto text-4xl font-bold">ANIME LIST SITE NAME</h1>
      </button>
      <div className="inline-flex space-x-4">
        <button onClick={() => router.push(`/${authState?.displayName}`)}>
          <h1 className="my-auto hover:underline hover:shadow-white">
            {loading ? "LOADING" : authState?.displayName}
          </h1>
        </button>
        <button
          className="p-2 hover:underline"
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
    </nav>
  );
}
