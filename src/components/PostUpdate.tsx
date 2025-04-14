"use client";

import { useEffect, useState } from "react";
import Search from "./Search";
import { AnimeType, TitleType } from "@/utils/types";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { auth, db } from "@/firebase/config";
import { useRouter } from "next/navigation";

export default function PostUpdate() {
  const [entry, setEntry] = useState<AnimeType>();
  const [charCount, setCharCount] = useState<number>(0);
  const [progress, setProgress] = useState<string>("watching");
  const [body, setBody] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleSubmit = async () => {
    console.log(entry);
    if (entry != undefined && !loading) {
      setLoading(true);
      await addDoc(collection(db, "updateCollection"), {
        entry: entry,
        progress: progress,
        score: 4,
        user: auth.currentUser?.displayName,
        userID: auth.currentUser?.uid,
        body: body,
        date: Timestamp.now(),
      })
        .then(() => {
          console.log("aljkshdlj");
          router.push(`/${auth.currentUser?.displayName}`);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  // useEffect(() => {
  //   console.log(entry);
  // }, [entry]);

  return (
    <div className="font-fira-sans w-full py-10">
      <h1 className="mb-2 text-3xl font-bold">Post Update</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        onKeyDown={(e) => {
          if (e.key == "Enter") e.preventDefault();
        }}
        className="flex flex-col space-y-2"
      >
        <div className="flex flex-row justify-between">
          <Search
            callback={(
              id: number,
              title: TitleType,
              image: string,
              link: string,
            ) => {
              setEntry({
                id: id,
                title: title,
                coverImage: { extraLarge: image },
                siteUrl: link,
              });
            }}
            placeholder="Anime Title"
          />
          <select
            onChange={(e) => {
              console.log(e.target.value);
              setProgress(e.target.value);
            }}
          >
            <option value="watching">Watching</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <textarea
          maxLength={100}
          onChange={(e) => {
            setCharCount(e.target.value.length);
            setBody(e.target.value);
          }}
          className="h-32 resize-none rounded-2xl border border-neutral-700 bg-neutral-800 px-2 py-1 text-white"
        ></textarea>
        <div className="flex flex-row justify-between">
          <span className="px-1 py-1 text-right">{charCount}/100</span>
          <button
            type="submit"
            className="w-min rounded-md bg-neutral-800 px-2 py-1 text-left hover:cursor-pointer hover:bg-neutral-600"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
