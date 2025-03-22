"use client";

import { FormEvent, useState } from "react";
import { Credentials } from "@/utils/types";
import useRegister from "@/firebase/useRegister";
import { auth } from "@/firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";
import Router from "next/router";

export default function Register() {
  const [credentials, setCredentials] = useState<Credentials>({
    email: "asdkljajklsd@lakjsd.com",
    password: "jashfkljhasdLHJLASHJD",
  });

  const [register, user, loading, error] = useRegister(auth);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    error
      ? console.log("Error:", error)
      : console.log("Successful Registration");
    try {
      const res = await register(credentials);

      if (res == undefined) {
      } else {
        setCredentials({ email: "", password: "" });
      }

      console.log("User Registered: ", res);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="font-fira-sans flex h-screen flex-col justify-center text-center">
      <h1 className="text-center text-4xl">Register</h1>
      <h2>{error?.message}</h2>
      <form
        className="mx-auto flex flex-col space-y-3 py-2"
        onSubmit={(e) => {
          handleSubmit(e);
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
