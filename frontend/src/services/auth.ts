import { ILoginData } from "../interfaces/auth";
import api from "./api";

interface Response {
  token: string;
  user: {
    name: string;
    email: string;
  };
}

// export async function signUp({ email, password, name }: loginData) {
//   const { data } = await api.post("/signup", {
//     email,
//     password,
//     name,
//   });

//   return data;
// }

export async function login({ email, password }: ILoginData) {
  const { data } = await api.post("/login", {
    email,
    password,
  });

  return data;
}
