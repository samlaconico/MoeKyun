"use client";

import { useState, FormEvent, useEffect } from "react";
import { Credentials } from "@/utils/types";
import useSignIn from "@/firebase/useSignIn";
import { auth } from "@/firebase/config";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

export default function SignIn() {
  const [credentials, setCredentials] = useState<Credentials>({
    email: "asdkljajklsd@lakjsd.com",
    password: "jashfkljhasdLHJLASHJD",
  });

  const [signIn, user, loading, error] = useSignIn(auth);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    error
      ? console.log("Error:", error)
      : console.log("Successful Registration");
    try {
      const res = await signIn(credentials);

      if (res == undefined) {
      } else {
        setCredentials({ email: "", password: "" });
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="font-fira-sans flex h-screen flex-col justify-center">
      <button
        onClick={() => {
          signOut(auth);
        }}
      >
        LOGOUT
      </button>
      <h1 className="text-center text-4xl">Sign in</h1>
      <h2>{error?.message}</h2>
      <h2>{auth.currentUser?.email}</h2>
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
