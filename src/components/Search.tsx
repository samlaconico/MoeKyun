"use client";

import { KeyboardEvent, useEffect, useState } from "react";
import axios from "axios";
import { AnimeType } from "@/utils/types";

export default function Search({
  callback,
}: {
  callback: (id: number, title: string, image: string, link: string) => void;
}) {
  const [searchInput, setSearchInput] = useState<string>("");
  const [animeQuery, setAnimeQuery] = useState<AnimeType[]>([]);
  const [focused, setFocused] = useState<boolean>(false);
  const [timer, setTimer] = useState<null | NodeJS.Timeout>(null);
  const [currentSelection, setCurrentSelection] = useState<number>(0);

  const query = `query Page($search: String, $type: MediaType) {
  Page {
    media(search: $search, type: $type) {
      id
      title {
        english
        romaji
      }
      coverImage {
        extraLarge
      }
      siteUrl
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
          setAnimeQuery(response.data.data.Page.media.slice(0, 6));
          // console.log(animeQuery);
          // console.log(
          //   "RESPONSE FROM AXIOS REQUEST",
          //   response.data.data.Page.media,
          // );
        } catch (err) {
          console.log("ERROR DURING AXIOS REQUEST", err);
        } finally {
        }
      }, 500),
    );
  };

  const handleKeyboard = (e: KeyboardEvent) => {
    if (e.key == "ArrowDown" && currentSelection != 5) {
      setCurrentSelection((currentSelection) => currentSelection + 1);
    } else if (e.key == "ArrowDown") {
      setCurrentSelection(0);
    }
    if (e.key == "ArrowUp" && currentSelection != 0) {
      setCurrentSelection((currentSelection) => currentSelection - 1);
    } else if (e.key == "ArrowUp") {
      setCurrentSelection(5);
    }
    if (e.key == "Enter") {
      const i = animeQuery[currentSelection];
      setSearchInput(i.title.romaji);
      setFocused(false);
      callback(i.id, i.title.romaji, i.coverImage.extraLarge, i.siteUrl);
    }
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
      <search>
        <input
          type="text"
          onKeyDown={(e) => {
            handleKeyboard(e);
          }}
          onChange={(e) => {
            setSearchInput(() => e.target.value);
          }}
          value={searchInput}
          className="mb-1 w-full bg-white px-2 text-black"
        ></input>
        {focused ? (
          <div className="absolute w-1/2">
            {animeQuery.map((i: AnimeType, index) => {
              return (
                <button
                  className="w-full text-left"
                  onClick={() => {
                    setSearchInput(i.title.romaji);
                    setFocused(false);
                    callback(
                      i.id,
                      i.title.romaji,
                      i.coverImage.extraLarge,
                      i.siteUrl,
                    );
                  }}
                  key={i.id}
                >
                  <h1
                    className={`border-y-2 border-white ${currentSelection == index ? `bg-neutral-300` : `bg-white`} p-1 px-2 text-black hover:cursor-pointer hover:border-black hover:underline`}
                  >
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
      </search>
    </div>
  );
}
