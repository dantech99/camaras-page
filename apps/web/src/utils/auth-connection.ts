import { authClient } from "@camaras/auth/client/index";

export const signUpWithEmailAndPassword = async (
  email: string,
  password: string,
  name: string
) => {
  const response = await authClient.signUp.email({
    email,
    password,
    name,
  });

  if (response.error) {
    throw new Error(response.error.message);
  }

  return response.data;
};

export const signInWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  const response = await authClient.signIn.email({
    email,
    password,
  });

  if (response.error) {
    throw new Error(response.error.message);
  }

  return response.data;
};

export const signInWithGoogle = async () => {
  const response = await authClient.signIn.social({
    provider: "google",
    callbackURL: `${process.env.NEXT_PUBLIC_FRONTEND_URL}`,
  });

  if (response.error) {
    throw new Error(response);
  }

  return response.data;
};

export const getSession = async () => {
  const response = await authClient.getSession();
  return response.data?.user;
};
