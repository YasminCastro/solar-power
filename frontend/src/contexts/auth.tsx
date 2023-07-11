import { createContext, useState, useEffect, useContext } from "react";
import * as auth from "../services/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../services/api";
import { ILoginData } from "../interfaces/auth";
import { IUser } from "../interfaces/user";

interface AuthContextData {
  isAuth: boolean;
  user: IUser | null;
  login(data: ILoginData): Promise<void>;
  signOut(): void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<any> = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadStoragedData() {
      const storagedUser = await AsyncStorage.getItem("@RNAuth:user");
      const storagedToken = await AsyncStorage.getItem("@RNAuth:token");

      if (storagedUser && storagedToken) {
        api.defaults.headers["Authorization"] = `Bearer ${storagedToken}`;

        setUser(JSON.parse(storagedUser));
        setLoading(false);
      }
    }

    loadStoragedData();
  }, []);

  async function login(data: ILoginData) {
    const response = await auth.login(data);
    setUser(response.user);
    api.defaults.headers["Authorization"] = `Bearer ${response.token}`;

    await AsyncStorage.setItem("@RNAuth:user", JSON.stringify(response.user));
    await AsyncStorage.setItem("@RNAuth:token", response.token);
  }

  function signOut() {
    setUser(null);
    AsyncStorage.clear().then(() => setUser(null));
  }

  return (
    <AuthContext.Provider
      value={{ isAuth: !!user, user, login, signOut, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
