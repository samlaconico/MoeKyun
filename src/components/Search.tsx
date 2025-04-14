"use client";

import { KeyboardEvent, useEffect, useRef, useState } from "react";
import axios from "axios";
import { AnimeType, TitleType } from "@/utils/types";

export default function Search({
  callback,
  placeholder,
}: {
  callback: (id: number, title: TitleType, image: string, link: string) => void;
  placeholder?: string;
}) {
  const [searchInput, setSearchInput] = useState<string>("");
  const [animeQuery, setAnimeQuery] = useState<AnimeType[]>([]);
  const [focused, setFocused] = useState<boolean>(false);
  const [timer, setTimer] = useState<null | NodeJS.Timeout>(null);
  const [currentSelection, setCurrentSelection] = useState<number>(0);
  const ref = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const handleOnClick = (e: Event) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setFocused(false);
      }
    };

    document.addEventListener("click", handleOnClick);
  }, []);

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
      callback(i.id, i.title, i.coverImage.extraLarge, i.siteUrl);
    }
    if (e.key == "Escape") {
      setFocused(false);
    }
  };

  useEffect(() => {
    if (searchInput.length != 0) {
      getAnimeByAxiosAPICall();
    }
  }, [searchInput]);

  return (
    <div
      className="overflow-hidden"
      onFocusCapture={() => {
        setFocused(true);
      }}
      ref={ref}
    >
      <search>
        <input
          type="text"
          placeholder={placeholder}
          onKeyDown={(e) => {
            handleKeyboard(e);
          }}
          onChange={(e) => {
            setSearchInput(() => e.target.value);
          }}
          value={searchInput}
          className="mb-1 w-full rounded-sm border-neutral-800 bg-neutral-800 px-2 text-white focus:outline-0"
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
                    callback(i.id, i.title, i.coverImage.extraLarge, i.siteUrl);
                  }}
                  key={i.id}
                >
                  <h1
                    className={` ${currentSelection == index ? `bg-neutral-700` : `bg-neutral-800`} p-1 px-2 text-white hover:cursor-pointer hover:border-black hover:underline`}
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
