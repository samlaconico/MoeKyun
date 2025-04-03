"use client";

import Search from "./Search";

export default function Review() {
  return (
    <div>
      <h1></h1>

      <p></p>
    </div>
  );
}

export function ReviewEdit() {
  const callbackFunction = (
    id: number,
    title: string,
    image: string,
    link: string,
  ) => {
    console.log(id, title, title, link);
  };
  return (
    <div>
      <h1 className="font-fira-sans mb-2 text-4xl font-bold">
        Edit Latest Review
      </h1>
      <form>
        <div className="flex flex-row space-x-3">
          <h1>Anime:</h1>
          <Search
            callback={(id, title, image, link) =>
              callbackFunction(id, title, image, link)
            }
          />
        </div>
        <textarea className="h-96 w-full resize-none rounded bg-white p-1 text-black"></textarea>
      </form>
    </div>
  );
}
