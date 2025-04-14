"use client";

import { Updates } from "@/components/Updates";

export default function Home() {
  // const q = query(
  //   collection(getFirestore(app), "userCollection"),
  //   where(documentId(), "==", "yGvcNTpx77icy80vVJXt"),
  // );

  return (
    <div className="my-5 w-full md:w-1/2">
      <h1 className="font-fira-sans mb-2 text-2xl font-bold">Updates</h1>
      <Updates />
    </div>
  );
}

// function WelcomePageNotSignedIn() {
//   const router = useRouter();

//   return (
//     <div className="flex h-screen flex-col items-center justify-center space-y-4">
//       <button
//         onClick={() => {
//           router.push("/sign-in");
//         }}
//         className="w-20 rounded-2xl bg-neutral-500"
//       >
//         Sign in
//       </button>
//       <button
//         onClick={() => {
//           router.push("/register");
//         }}
//         className="w-20 rounded-2xl bg-neutral-500"
//       >
//         Register
//       </button>
//     </div>
//   );
// }
