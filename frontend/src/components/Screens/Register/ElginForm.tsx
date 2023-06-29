import {
  View,
  Text,
  Pressable,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { IStepActive } from "../../../screens/SignUp/Inverter";
import { AuthScreenNavigationProp } from "../../../interfaces/auth";
import { useInverter } from "../../../contexts/InverterContext";

interface IProps {
  setStep: React.Dispatch<React.SetStateAction<IStepActive>>;
}

export default function ElginForm({ setStep }: IProps) {
  const navigation = useNavigation<AuthScreenNavigationProp>();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [cep, setCep] = useState("");
  const [maxRealTimePower, setmaxRealTimePower] = useState(0);

  const { onRegisterInverter } = useInverter();

  const registerInverter = async () => {
    const result = await onRegisterInverter!({
      name,
      username,
      password,
      cep,
      maxRealTimePower,
      model: "elgin",
    });
  };

  return (
    <View className="flex-1 items-center justify-center bg-solar-50">
      <View className="h-1/3 w-full max-w-sm justify-center p-8">
        <View className="">
          <TextInput
            className="mb-4 h-12 w-full rounded-sm border border-x-0 border-t-0 border-white bg-transparent px-4 font-regular text-white"
            placeholderTextColor="#ffff"
            placeholder="Nome"
            onChangeText={(text) => setName(text)}
          />

          <TextInput
            className="mb-4 h-12 w-full rounded-sm border border-x-0 border-t-0 border-white bg-transparent px-4 font-regular text-white"
            placeholderTextColor="#ffff"
            placeholder="Usuário"
            autoCapitalize="none"
            onChangeText={(text) => setUsername(text)}
          />

          <TextInput
            className="mb-4 h-12 w-full rounded-sm border border-x-0 border-t-0 border-white bg-transparent px-4 font-regular text-white"
            placeholderTextColor="#ffff"
            placeholder="Senha"
            autoCapitalize="none"
            onChangeText={(text) => setPassword(text)}
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
        <TouchableOpacity className="flex h-12 flex-row items-center justify-center rounded-full bg-solar-100 px-6">
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
