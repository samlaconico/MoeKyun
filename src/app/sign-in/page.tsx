"use client";

import { useState, FormEvent, useEffect } from "react";
import { Credentials } from "@/utils/types";
import { auth } from "@/firebase/config";
import {
  useAuthState,
  useSignInWithEmailAndPassword,
} from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation";
export default function SignIn() {
  //router hook
  const router = useRouter();
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

      //session storage -- might remove later
      if (res != undefined) {
        sessionStorage.setItem("signedin", "true");
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (loadingAuth != true && authState != undefined) {
      router.push("/");
    }
  }, [loadingAuth, authState, router]);

  return loadingAuth ? (
    <h1>LOADING</h1>
  ) : (
    <div className="font-fira-sans flex h-screen flex-col justify-center">
      <h1 className="text-center text-4xl">Sign in</h1>
      <h2>{error?.message}</h2>
      <form
        className="mx-auto flex flex-col space-y-3 py-2"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(e);
          console.log("submitted");
        }}
      >
        <input
          type="email"
          className="mx-auto rounded-md border-2 border-white bg-neutral-800 px-2"
          placeholder="Email"
          onChange={(e) => {
            setCredentials((prev) => ({ ...prev, email: e.target.value }));
          }}
        />
        <input
          type="password"
          className="mx-auto rounded-md border-2 border-white bg-neutral-800 px-2"
          placeholder="Password"
          onChange={(e) => {
            setCredentials((prev) => ({ ...prev, password: e.target.value }));
          }}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
