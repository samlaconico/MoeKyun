"use client";

import { FormEvent, useEffect, useState } from "react";
import { Credentials } from "@/utils/types";
import { auth, db } from "@/firebase/config";
import {
  useAuthState,
  useCreateUserWithEmailAndPassword,
  useUpdateProfile,
} from "react-firebase-hooks/auth";
import { doc, setDoc } from "firebase/firestore";
import { redirect } from "next/navigation";

export default function Register() {
  const [updateProfile] = useUpdateProfile(auth);
  const [authState, loadingAuth] = useAuthState(auth);

  //store user credentials fields in state
  const [credentials, setCredentials] = useState<Credentials>({
    email: "",
    password: "",
  });

  const [username, setUsername] = useState<string>("");

  //firebase-hook to create user with firebase auth
  const [register, , , error] = useCreateUserWithEmailAndPassword(auth);

  //handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      //register user
      const res = await register(credentials.email, credentials.password);

      //add user email to unique document on firestore
      await setDoc(doc(db, "userCollection", username), {
        email: credentials.email,
        username: username,
        animeList: [
          {
            id: 0,
            title: { english: "", romaji: "" },
            coverImage: { extraLarge: "" },
            siteUrl: "",
            episodeCount: 0,
          },
          {
            id: 0,
            title: { english: "", romaji: "" },
            coverImage: { extraLarge: "" },
            siteUrl: "",
            episodeCount: 0,
          },
          {
            id: 0,
            title: { english: "", romaji: "" },
            coverImage: { extraLarge: "" },
            siteUrl: "",
            episodeCount: 0,
          },
          {
            id: 0,
            title: { english: "", romaji: "" },
            coverImage: { extraLarge: "" },
            siteUrl: "",
            episodeCount: 0,
          },
          {
            id: 0,
            title: { english: "", romaji: "" },
            coverImage: { extraLarge: "" },
            siteUrl: "",
            episodeCount: 0,
          },
          {
            id: 0,
            title: { english: "", romaji: "" },
            coverImage: { extraLarge: "" },
            siteUrl: "",
            episodeCount: 0,
          },
          {
            id: 0,
            title: { english: "", romaji: "" },
            coverImage: { extraLarge: "" },
            siteUrl: "",
            episodeCount: 0,
          },
          {
            id: 0,
            title: { english: "", romaji: "" },
            coverImage: { extraLarge: "" },
            siteUrl: "",
            episodeCount: 0,
          },
          {
            id: 0,
            title: { english: "", romaji: "" },
            coverImage: { extraLarge: "" },
            siteUrl: "",
            episodeCount: 0,
          },
        ],
        followers: [],
        following: [],
      });

      //set username
      await updateProfile({ displayName: username });

      //session storage -- might remove later
      if (res != undefined) {
        sessionStorage.setItem("signedin", "true");
        redirect("/");
      }

      console.log("User Registered: ", res);
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
            type="text"
            className="mx-auto rounded-md border-2 border-white bg-neutral-800 px-2"
            placeholder="Username"
            onChange={(e) => {
              setUsername(() => e.target.value);
            }}
          />
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
