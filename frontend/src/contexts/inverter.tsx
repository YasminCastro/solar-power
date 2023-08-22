import { createContext, useState, useContext, useEffect } from "react";
import * as invertersApi from "../services/inverters";
import { useAuth } from "./auth";
import { IInverter } from "../interfaces/inverter";

interface InverterContextData {
  inverters: IInverter[];
  activeInverters: IInverter[];
  getUserInvertes(): Promise<{ error: boolean }>;
}

const InverterContext = createContext<InverterContextData>(
  {} as InverterContextData
);

export const InverterProvider: React.FC<any> = ({ children }) => {
  const [inverters, setInverters] = useState<IInverter[]>([]);
  const [activeInverters, setActiveInverters] = useState<IInverter[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    getUserInvertes();
  }, [user]);

  async function getUserInvertes() {
    try {
      if (user?._id) {
        const response = await invertersApi.getUserInverters(user._id);
        setInverters(response);
        const active = response.filter((o: IInverter) => o.active === true);
        setActiveInverters(active);
      }

      return { error: false };
    } catch (error) {
      return { error: true };
    }
  }

  return (
    <InverterContext.Provider
      value={{ inverters, getUserInvertes, activeInverters }}
    >
      {children}
    </InverterContext.Provider>
  );
};

export const useInverter = () => {
  return useContext(InverterContext);
};
