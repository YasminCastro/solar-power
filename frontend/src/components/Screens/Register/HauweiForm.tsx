import { View, Text, TouchableOpacity, TextInput } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { IStepActive } from "../../../screens/SignUp/Inverter";
import { useState } from "react";
import { useInverter } from "../../../contexts/InverterContext";
import HauweiIcon from "../../Global/Icons/Hauwei";

interface IProps {
  setStep: React.Dispatch<React.SetStateAction<IStepActive>>;
}

export default function HauweiForm({ setStep }: IProps) {
  const navigation = useNavigation<any>();

  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [cep, setCep] = useState("");
  const [maxRealTimePower, setmaxRealTimePower] = useState(0);
  const [error, setError] = useState(null);

  const { onRegisterInverter } = useInverter();

  const registerInverter = async () => {
    const result = await onRegisterInverter!({
      name,
      url,
      cep,
      maxRealTimePower,
      model: "hauwei",
    });

    if (result && result.error) {
      alert(result.message);
      setError(result.message);
    }

    navigation.navigate("Home");
  };

  return (
    <View className="flex-1 items-center justify-center bg-solar-50">
      {error ? (
        <View className="absolute top-8 mx-8 w-full max-w-sm rounded-md bg-red-400 p-4">
          <Text className="font-bold text-white">{error}</Text>
        </View>
      ) : null}

      <View className=" w-full max-w-sm justify-center p-8">
        <HauweiIcon />
        <View>
          <TextInput
            className="mb-4 h-12 w-full rounded-sm border border-x-0 border-t-0 border-white bg-transparent px-4 font-regular text-white"
            placeholderTextColor="#ffff"
            placeholder="Nome"
            onChangeText={(text) => setName(text)}
          />

          <TextInput
            className="mb-4 h-12 w-full rounded-sm border border-x-0 border-t-0 border-white bg-transparent px-4 font-regular text-white"
            placeholderTextColor="#ffff"
            placeholder="URL"
            autoCapitalize="none"
            onChangeText={(text) => setUrl(text)}
          />

          <TextInput
            className="mb-4 h-12 w-full rounded-sm border border-x-0 border-t-0 border-white bg-transparent px-4 font-regular text-white"
            placeholderTextColor="#ffff"
            placeholder="CEP da instalação"
            keyboardType="numeric"
            onChangeText={(text) => setCep(text)}
          />

          <TextInput
            className="mb-4 h-12 w-full rounded-sm border border-x-0 border-t-0 border-white bg-transparent px-4 font-regular text-white"
            placeholderTextColor="#ffff"
            placeholder="Máximo de produção"
            keyboardType="numeric"
            onChangeText={(text) => setmaxRealTimePower(parseInt(text))}
          />
        </View>
      </View>

      <View className="h-1/3 w-full max-w-sm justify-center gap-4 p-6">
        <TouchableOpacity
          className="flex h-12 flex-row items-center justify-center rounded-full bg-solar-100 px-6"
          onPress={registerInverter}
        >
          <View className="flex flex-1 items-center">
            <Text className="font-body text-base text-solar-500">Entrar</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          className="flex h-12 flex-row items-center justify-center rounded-full bg-solar-100 px-6"
          onPress={() => {
            setStep("Start");
          }}
        >
          <View className="flex flex-1 items-center">
            <Text className="font-body text-base text-solar-500">Voltar</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
