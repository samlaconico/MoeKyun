"use client";

import { auth } from "@/firebase/config";
import { signOut } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import { Skeleton } from "./ui/skeleton";

export default function Nav() {
  const [authState, loading] = useAuthState(auth);
  const router = useRouter();

  return (
    <nav className="font-fira-sans flex flex-row justify-between bg-neutral-800 px-5 py-10 md:px-10">
      <Link href="/">
        <h1 className="my-auto text-4xl font-bold">ANIME LIST SITE NAME</h1>
      </Link>

      {loading ? (
        <Skeleton className="my-auto h-4 w-32" />
      ) : (
        <div className="inline-flex space-x-2">
          <Link href={`/${authState?.displayName}`} className="my-auto">
            <h1 className="my-auto hover:underline hover:shadow-white">
              {authState?.displayName}
            </h1>
          </Link>
          <button
            className="cursor-pointer p-2 hover:underline"
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
      )}
    </nav>
  );
}
