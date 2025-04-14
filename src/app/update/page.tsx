"use client";

import PostUpdate from "@/components/PostUpdate";
import { auth } from "@/firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function UpdatePage() {
  const [authState, loading] = useAuthState(auth);
  const router = useRouter();

  //TODO: switch to session storage checking
  useEffect(() => {
    if (loading == false && authState?.displayName == null) {
      router.push("/");
    }
  }, [loading]);

  return (
    <>
      <PostUpdate />
    </>
  );
}
