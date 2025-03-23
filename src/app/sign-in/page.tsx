"use client";

import { useState, FormEvent } from "react";
import { Credentials } from "@/utils/types";
import { auth } from "@/firebase/config";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation";
export default function SignIn() {
  //router hook
  const router = useRouter();

  //store user credentials fields in state
  const [credentials, setCredentials] = useState<Credentials>({
    email: "",
    password: "",
  });

  //firebase-hook to signin user with firebase auth
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  //handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    error
      ? console.log("Error:", error)
      : console.log("Successful Registration");
    try {
      const res = await signInWithEmailAndPassword(
        credentials.email,
        credentials.password,
      );

      if (res == undefined) {
        //move to sign in page
        router.push("/");
      } else {
        setCredentials({ email: "", password: "" });

        //refresh page
        router.refresh();
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="font-fira-sans flex h-screen flex-col justify-center">
      <h1 className="text-center text-4xl">Sign in</h1>
      <h2>{error?.message}</h2>
      <h2>{user?.user.email}</h2>
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
