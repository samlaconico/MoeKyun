"use client";

import { auth } from "@/firebase/config";
import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Nav() {
  const [authState] = useAuthState(auth);

  return (
    <div className="font-fira-sans my-5 flex flex-row justify-between">
      <h1 className="my-auto text-2xl">ANIME LIST SITE NAME</h1>
      <div className="inline-flex space-x-4">
        <h1 className="my-auto">{authState?.email}</h1>
        <button
          className="rounded-2xl bg-neutral-500 p-2"
          onClick={() => {
            signOut(auth);
            sessionStorage.setItem("signedin", "false");
          }}
        >
          {authState ? "Logout" : "Signin"}
        </button>
      </div>
    </div>
  );
}
