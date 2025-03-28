"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { AnimeType } from "@/firebase/types";

export default function Search({
  callback,
}: {
  callback: (id: number) => void;
}) {
  const [searchInput, setSearchInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [animeQuery, setAnimeQuery] = useState<AnimeType[]>([]);
  const [focused, setFocused] = useState<boolean>(false);
  const [timer, setTimer] = useState<null | NodeJS.Timeout>(null);

  var query = `query Page($search: String, $type: MediaType) {
  Page {
    media(search: $search, type: $type) {
      id
      title {
        english
        romaji
      }
    }
  }
}
  `;

  const getAnimeByAxiosAPICall = async () => {
    if (timer) {
      clearTimeout(timer);
    }

    setTimer(
      setTimeout(async () => {
        try {
          setLoading(true);
          const headers = {
            "content-type": "application/json",
          };
          const requestBody = {
            query: query,
            variables: {
              search: searchInput,
              type: "ANIME",
            },
          };
          const options = {
            method: "POST",
            url: "https://graphql.anilist.co",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            data: requestBody,
          };

          const response = await axios(options);
          //TODO fix animeQuery being 1 search behind
          setAnimeQuery(response.data.data.Page.media.slice(0, 5));
          console.log(animeQuery);
          //   console.log("RESPONSE FROM AXIOS REQUEST", response.data.data.Page.media);
        } catch (err) {
          console.log("ERROR DURING AXIOS REQUEST", err);
        } finally {
          setLoading(false);
        }
      }, 500),
    );
  };

  useEffect(() => {
    if (searchInput.length != 0) {
      getAnimeByAxiosAPICall();
    }
  }, [searchInput]);

  return (
    <div
      className="w-64 overflow-hidden"
      onFocusCapture={() => {
        setFocused(true);
      }}
    >
      <input
        type="text"
        onChange={(e) => {
          setSearchInput((prev) => e.target.value);
        }}
        value={searchInput}
        className="mb-1 w-full bg-white px-2 text-black"
      ></input>
      {focused ? (
        <div>
          {animeQuery.map((i: AnimeType) => {
            return (
              <button
                className="w-full text-left"
                onClick={() => {
                  setSearchInput(i.title.romaji);
                  setFocused(false);
                  callback(i.id);
                }}
                key={i.id}
              >
                <h1 className="border-y-2 border-white bg-white p-1 px-2 text-black hover:cursor-pointer hover:border-black hover:underline">
                  {i.title.romaji}{" "}
                  {i.title.english ? `(${i.title.english})` : ""}
                </h1>
              </button>
            );
          })}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
