import * as SecureStore from "expo-secure-store";
import { createContext, useContext, useMemo, useState, useEffect } from "react";
import jwtDecode from "jwt-decode";
import { IUserDecoded, IUser } from "../interfaces/user";
import api from "../lib/api";
import { TOKEN_KEY } from "../config";

interface UserProps {
  user?: IUser | null;
}

const UserContext = createContext<UserProps>({});

export const useUser = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }: any) => {
  const [user, setUser] = useState<any>();

  useEffect(() => {
    const loadUser = async () => {
      const token = await SecureStore.getItemAsync(TOKEN_KEY);

      if (token) {
        const userDecoded: IUserDecoded = await jwtDecode(token);

        const response = await api.get(`/users/${userDecoded.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(response.data);
      }
    };

    loadUser();
  }, []);

  const value = useMemo(
    () => ({
      user,
    }),
    [user]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
