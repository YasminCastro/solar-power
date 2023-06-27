import { View, Text, Pressable, TouchableOpacity, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { AuthScreenNavigationProp } from "../../interfaces/auth";
import InverterModel from "../../components/Screens/Register/InverterModel";
import ElginForm from "../../components/Screens/Register/ElginForm";
import HauweiForm from "../../components/Screens/Register/HauweiForm";

export type IStepActive = "Start" | "Elgin" | "Hauwei";

export default function Inverter() {
  const navigation = useNavigation<AuthScreenNavigationProp>();

  const [step, setStep] = useState<IStepActive>("Start");

  switch (step) {
    case "Start":
      return <InverterModel setStep={setStep} />;
    case "Hauwei":
      return <HauweiForm setStep={setStep} />;
    case "Elgin":
      return <ElginForm setStep={setStep} />;
    default:
      return <Text>Erro: passo desconhecido</Text>;
  }
}
