import { Credentials, RegisterType } from "@/utils/types";
import {
  Auth,
  AuthError,
  signInWithEmailAndPassword,
  UserCredential,
} from "firebase/auth";
import { useCallback, useState } from "react";

export default (auth: Auth): RegisterType => {
  const [loading, setLoading] = useState<boolean>(false);
  const [signedInUser, setSignedInUser] = useState<UserCredential>();
  const [error, setError] = useState<AuthError>();

  const signInUserWithEmailAndPassword = useCallback(
    async (credentials: Credentials) => {
      setLoading(true);
      setError(undefined);
      try {
        const user = await signInWithEmailAndPassword(
          auth,
          credentials.email,
          credentials.password,
        );

        setSignedInUser(user);

        return user;
      } catch (error) {
        setError(error as AuthError);
      } finally {
        setLoading(false);
      }
    },
    [auth],
  );

  return [signInUserWithEmailAndPassword, signedInUser, loading, error];
};
