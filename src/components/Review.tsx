// "use client";

// import { ReactNode } from "react";
// import Search from "./Search";

// export default function Review({ title }: { title: string }) {
//   return (
//     <div>
//       <h1>{title}</h1>

//       <p></p>
//     </div>
//   );
// }

// export function ReviewEdit() {
//   const callbackFunction = (
//     id: number,
//     title: string,
//     image: string,
//     link: string,
//   ) => {
//     console.log(id, title, title, link);
//   };
//   return (
//     <div>
//       <h1 className="font-fira-sans mb-2 text-4xl font-bold">
//         Edit Latest Review
//       </h1>
//       <form>
//         <div className="flex flex-row space-y-3 space-x-3">
//           <h1>Anime:</h1>
//           <Search
//             callback={(id, title, image, link) =>
//               callbackFunction(id, title, image, link)
//             }
//           />
//         </div>
//         <textarea className="h-96 w-full resize-none rounded-2xl border border-neutral-700 bg-neutral-800 px-2 py-1 text-white"></textarea>
//       </form>
//     </div>
//   );
// }
