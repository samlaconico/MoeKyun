import { Credentials, RegisterType } from "@/utils/types";
import {
  Auth,
  AuthError,
  createUserWithEmailAndPassword,
  UserCredential,
} from "firebase/auth";
import { useCallback, useState } from "react";

export default (auth: Auth): RegisterType => {
  const [loading, setLoading] = useState<boolean>(false);
  const [registeredUser, setRegisteredUser] = useState<UserCredential>();
  const [error, setError] = useState<AuthError>();

  const registerUserWithEmailAndPassword = useCallback(
    async (credentials: Credentials) => {
      setLoading(true);
      setError(undefined);
      try {
        const user = await createUserWithEmailAndPassword(
          auth,
          credentials.email,
          credentials.password,
        );

        setRegisteredUser(user);

        return user;
      } catch (error) {
        setError(error as AuthError);
      } finally {
        setLoading(false);
      }
    },
    [auth],
  );

  return [registerUserWithEmailAndPassword, registeredUser, loading, error];
};
