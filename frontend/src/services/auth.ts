import { ILoginData, ISignUpData } from "../interfaces/auth";
import api from "./api";

export async function signUp({ email, password, name }: ISignUpData) {
  const { data } = await api.post("/signup", {
    email,
    password,
    name,
  });

  return data;
}

export async function login({ email, password }: ILoginData) {
  const { data } = await api.post("/login", {
    email,
    password,
  });

  return data;
}
