"use client";

import { auth } from "@/firebase/config";
import { signOut } from "firebase/auth";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import { Skeleton } from "./ui/skeleton";

export default function Nav() {
  const [authState, loading] = useAuthState(auth);
  const router = useRouter();
  const pathname = usePathname();

  return (
    <nav className="bg-neutral-800 px-5 py-3 md:px-10">
      <div className="font-fira-sans container mx-auto flex flex-row justify-between">
        <Link href="/">
          <h1 className="my-auto hidden text-4xl font-bold sm:block">
            MoeKyun
          </h1>
          <h1 className="my-auto block text-4xl font-bold sm:hidden">MK</h1>
        </Link>

        {loading ? (
          <Skeleton className="my-auto h-4 w-32 rounded-md bg-amber-300" />
        ) : (
          <div className="inline-flex space-x-2 font-semibold">
            <Link
              href={`/${authState?.displayName}`}
              className={`my-auto border-amber-300 ${pathname == `/${authState?.displayName}` ? `border-b-2` : ``}`}
            >
              <h1 className="my-auto hover:underline hover:shadow-white">
                {authState?.displayName}
              </h1>
            </Link>
            {authState ? (
              <Link href={`/update`} className="my-auto">
                <h1
                  className={`my-auto border-amber-300 hover:underline hover:shadow-white ${pathname == `/update` ? `border-b-2` : ``}`}
                >
                  Add Update
                </h1>
              </Link>
            ) : (
              ""
            )}

            <button
              className="cursor-pointer hover:underline"
              onClick={() => {
                if (authState) {
                  signOut(auth);
                  router.refresh();
                } else {
                  router.push("/sign-in");
                }
              }}
            >
              {authState ? "Logout" : "Sign in"}
            </button>

            {!authState ? (
              <Link href={"/register"} className="p-2 hover:underline">
                Register
              </Link>
            ) : (
              ""
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
