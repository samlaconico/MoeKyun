"use client";

import { FormEvent, useState } from "react";
import { Credentials } from "@/utils/types";
import { auth, db } from "@/firebase/config";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { addDoc, collection } from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function Register() {
  const router = useRouter();

  //store user credentials fields in state
  const [credentials, setCredentials] = useState<Credentials>({
    email: "",
    password: "",
  });

  //firebase-hook to create user with firebase auth
  const [register, , , error] = useCreateUserWithEmailAndPassword(auth);

  //handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      //register user
      const res = await register(credentials.email, credentials.password);

      //add user email to unique document on firestore
      await addDoc(collection(db, "userCollection"), {
        email: credentials.email,
      });

      //session storage -- might remove later
      if (res != undefined) {
        sessionStorage.setItem("signedin", "true");
        router.push("/");
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
