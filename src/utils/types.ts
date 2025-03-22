import { AuthError, UserCredential } from "firebase/auth";

export type Credentials = {
  email: string;
  password: string;
};

export type AuthHook<M> = [
  M,
  UserCredential | undefined,
  boolean,
  AuthError | undefined,
];

export type RegisterType = AuthHook<
  (credentials: Credentials) => Promise<UserCredential | undefined>
>;
