"use client";

import { FormEvent, useEffect, useState } from "react";
import { Credentials } from "@/utils/types";
import { app, auth, db } from "@/firebase/config";
import {
  useAuthState,
  useCreateUserWithEmailAndPassword,
  useUpdateProfile,
} from "react-firebase-hooks/auth";
import {
  collection,
  doc,
  getFirestore,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { redirect } from "next/navigation";
import { useCollectionOnce } from "react-firebase-hooks/firestore";

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
  const [errorMessage, setErrorMessage] = useState<string | undefined>();

  //query for username to check availability
  const q = query(
    collection(getFirestore(app), "userCollection"),
    where("username", "==", username.toLowerCase()),
  );

  const [value] = useCollectionOnce(q);

  const checkUsername = (): boolean => {
    if (value?.size != 0) {
      setErrorMessage("Username is unavailable");
      return false;
    } else {
      return true;
    }
  };

  useEffect(() => {
    setErrorMessage(error?.message);

    if (error?.message == "Firebase: Error (auth/email-already-in-use).") {
      setErrorMessage("Email is already in use");
    }
  }, [error]);

  //handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (checkUsername()) {
      try {
        //register user
        const res = await register(credentials.email, credentials.password);

        if (res != undefined) {
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
            profileImage: "",
          });

          //set username
          await updateProfile({ displayName: username });

          console.log("User Registered: ", res);
        }
      } catch (e) {
        console.log(e);
      }
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
          <h1 className="text-center text-4xl font-semibold">Register</h1>
          <h2>{errorMessage}</h2>
          <form
            className="mx-auto flex flex-col space-y-3 py-2"
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <input
              type="text"
              className="mx-auto h-12 rounded-sm border-2 border-white bg-neutral-800 px-2 md:w-1/2"
              placeholder="Username"
              onChange={(e) => {
                setUsername(() => e.target.value);
              }}
            />
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
          {/* <button
          onClick={() => {
            checkUsername();
            console.log(value?.size);
          }}
        >
          test
        </button> */}
        </div>
      </div>
    );
}
