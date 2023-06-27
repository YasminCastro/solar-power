import { createContext, useContext, useMemo } from "react";
import api from "../lib/api";

interface InverterProps {
  onRegisterInverter?: ({}: IRegisterInteverter) => Promise<any>;
}

interface IRegisterInteverter {
  name: string;
  model: string;
  username?: string;
  password?: string;
  url?: string;
  cep: string;
  maxRealTimePower: number;
}

const InverterContext = createContext<InverterProps>({});

export const useInverter = () => {
  return useContext(InverterContext);
};

export const InverterProvider = ({ children }: any) => {
  const onRegisterInverter = async (registerData: IRegisterInteverter) => {
    try {
      const { data } = await api.post("/inverters", registerData);

      return { error: false, message: data.message };
    } catch (error: any) {
      let message = "Erro interno entre em contato com o suporte!";
      console.log(error);

      return { error: true, message };
    }
  };

  const value = useMemo(
    () => ({
      onRegisterInverter,
    }),
    [onRegisterInverter]
  );

  return (
    <InverterContext.Provider value={value}>
      {children}
    </InverterContext.Provider>
  );
};
