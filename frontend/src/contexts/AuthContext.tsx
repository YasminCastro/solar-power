import * as SecureStore from "expo-secure-store";
import { createContext, useContext, useMemo, useState, useEffect } from "react";
import api, { setAuthHeaders } from "../lib/api";
import jwtDecode from "jwt-decode";

interface AuthProps {
  authState: { token: string | null; isAuth: boolean };
  onRegister?: (email: string, password: string) => Promise<any>;
  onLogin?: (email: string, password: string) => Promise<any>;
  onLogout?: () => Promise<any>;
  user?: User;
}

const TOKEN_KEY = "my-jwt";

const AuthContext = createContext<AuthProps>({
  authState: { token: null, isAuth: false },
  user: { email: "", name: "", id: null },
});

export const useAuth = () => {
  return useContext(AuthContext);
};

interface User {
  name: string;
  id: number | null;
  email: string;
}

export const AuthProvider = ({ children }: any) => {
  const [authState, setAuthState] = useState<{
    token: string | null;
    isAuth: boolean;
  }>({ token: null, isAuth: false });

  const [user, setUser] = useState<User>();

  useEffect(() => {
    const loadToken = async () => {
      const token = await SecureStore.getItemAsync(TOKEN_KEY);

      if (token) {
        setAuthState({ token: token, isAuth: true });
        setAuthHeaders(token);
        const userDecoded: User = jwtDecode(token);
        setUser(userDecoded);
      }
    };

    loadToken();
  }, []);

  const onRegister = async (email: string, password: string) => {
    try {
      return await api.post("/signup", { email, password });
    } catch (error: any) {
      return { error: true, message: error.response };
    }
  };

  const onLogin = async (email: string, password: string) => {
    try {
      const { data } = await api.post("/login", {
        email,
        password,
      });

      setAuthState({ token: data.tokenData.token, isAuth: true });
      const userDecoded: User = jwtDecode(data.tokenData.token);
      setUser(userDecoded);

      setAuthHeaders(data.token);

      await SecureStore.setItemAsync(TOKEN_KEY, data.token);

      return data;
    } catch (error: any) {
      return {
        error: true,
        message: error.response.data.message || error.message,
      };
    }
  };

  const onLogout = async () => {
    await SecureStore.deleteItemAsync(TOKEN_KEY);

    setAuthHeaders("");
    setUser({ email: "", name: "", id: null });

    setAuthState({ token: null, isAuth: false });
  };

  const value = useMemo(
    () => ({
      onRegister,
      onLogin,
      onLogout,
      authState,
      user,
    }),
    [onRegister, onLogin, onLogout, authState, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
