"use client";

import { useState, FormEvent, useEffect } from "react";
import { Credentials } from "@/utils/types";
import { auth } from "@/firebase/config";
import {
  useAuthState,
  useSignInWithEmailAndPassword,
} from "react-firebase-hooks/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export default function SignIn() {
  const [authState, loadingAuth] = useAuthState(auth);

  //push to homepage if logged in

  //store user credentials fields in state
  const [credentials, setCredentials] = useState<Credentials>({
    email: "",
    password: "",
  });

  //firebase-hook to signin user with firebase auth
  const [signInWithEmailAndPassword, , , error] =
    useSignInWithEmailAndPassword(auth);

  //handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await signInWithEmailAndPassword(
        credentials.email,
        credentials.password,
      );

      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (loadingAuth != true && authState != null) {
      redirect("/");
    }
  }, [loadingAuth, authState]);

  if (!loadingAuth && authState == null)
    return (
      <div className="font-fira-sans mx-auto my-32 w-full flex-col justify-center text-center md:w-1/2">
        <div className="rounded-xl bg-neutral-800 py-32">
          <h1 className="text-center text-4xl font-semibold">Sign in</h1>
          <h2>{error?.message}</h2>
          <form
            className="mx-auto flex w-full flex-col space-y-3 py-2"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(e);
              console.log("submitted");
            }}
          >
            <input
              type="email"
              className="mx-auto h-12 rounded-sm border-2 border-white bg-neutral-800 px-2 md:w-1/2"
              placeholder="Email"
              onChange={(e) => {
                setCredentials((prev) => ({ ...prev, email: e.target.value }));
              }}
            />
            <input
              type="password"
              className="mx-auto h-12 rounded-sm border-2 border-white bg-neutral-800 px-2 md:w-1/2"
              placeholder="Password"
              onChange={(e) => {
                setCredentials((prev) => ({
                  ...prev,
                  password: e.target.value,
                }));
              }}
            />
            <button
              type="submit"
              className="mx-auto h-8 w-32 rounded border-white bg-neutral-700 hover:cursor-pointer"
            >
              Submit
            </button>
          </form>

          <h2>
            No Account? Register{" "}
            <Link href="/register" className="font-semibold hover:underline">
              here!
            </Link>
          </h2>
        </div>
      </div>
    );
}
