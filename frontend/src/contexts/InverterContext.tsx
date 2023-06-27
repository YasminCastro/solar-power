import * as SecureStore from "expo-secure-store";
import { createContext, useContext, useMemo, useState, useEffect } from "react";
import api, { setAuthHeaders } from "../lib/api";
import { TOKEN_KEY } from "../config";

interface InverterProps {
  authState: { token: string | null; isAuth: boolean };
  onRegister?: (email: string, password: string, name: string) => Promise<any>;
  onLogin?: (email: string, password: string) => Promise<any>;
  onLogout?: () => Promise<any>;
}

const InverterContext = createContext<InverterProps>({
  authState: { token: null, isAuth: false },
});

export const useAuth = () => {
  return useContext(InverterContext);
};

export const InverterProvider = ({ children }: any) => {
  const [authState, setAuthState] = useState<{
    token: string | null;
    isAuth: boolean;
  }>({ token: null, isAuth: false });

  useEffect(() => {
    const loadToken = async () => {
      const token = await SecureStore.getItemAsync(TOKEN_KEY);

      if (token) {
        setAuthState({ token: token, isAuth: true });
        setAuthHeaders(token);
      }
    };

    loadToken();
  }, []);

  const onRegister = async (email: string, password: string, name: string) => {
    try {
      const { data } = await api.post("/signup", { email, password, name });

      return { error: false, message: data.message };
    } catch (error: any) {
      let message = "Erro interno entre em contato com o suporte!";
      if (
        error.response.data.message &&
        error.response.data.message.includes("already exists")
      ) {
        message = "Email já cadastrado!";
      }

      return { error: true, message };
    }
  };

  const onLogin = async (email: string, password: string) => {
    try {
      const { data } = await api.post("/login", {
        email,
        password,
      });

      setAuthState({ token: data.token, isAuth: true });

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

    setAuthState({ token: null, isAuth: false });
  };

  const value = useMemo(
    () => ({
      onRegister,
      onLogin,
      onLogout,
      authState,
    }),
    [onRegister, onLogin, onLogout, authState]
  );

  return (
    <InverterContext.Provider value={value}>
      {children}
    </InverterContext.Provider>
  );
};
