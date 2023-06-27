import * as SecureStore from "expo-secure-store";
import { createContext, useContext, useMemo, useState, useEffect } from "react";
import jwtDecode from "jwt-decode";
import { IUserDecoded, IUser } from "../interfaces/user";
import api from "../lib/api";
import { TOKEN_KEY } from "../config";
import IInverter from "../interfaces/inverter";

interface IValue {
  user?: IUser;
  userInverters?: IInverter[];
}

const UserContext = createContext({} as IValue);

export const useUser = (): IValue => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }: any) => {
  const [user, setUser] = useState<IUser>();
  const [userInverters, setUserInverters] = useState<IInverter[]>();

  useEffect(() => {
    const loadUser = async () => {
      const token = await SecureStore.getItemAsync(TOKEN_KEY);

      if (token) {
        const userDecoded: IUserDecoded = await jwtDecode(token);

        const response = await api.get(`/users/${userDecoded._id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(response.data);
        setUserInverters(response.data.inversors);
      }
    };

    loadUser();
  }, []);

  const value = useMemo(
    () => ({
      user,
      userInverters,
    }),
    [user, userInverters]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
