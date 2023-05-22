import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

import { LoginScreenNavigationProp } from "./interface";
import { useAuth } from "../../contexts/AuthContext";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigation = useNavigation<LoginScreenNavigationProp>();

  const { onLogin } = useAuth();

  const login = async () => {
    const result = await onLogin!("yasmincastro@gmail.com", "teste1234");
    if (result && result.error) {
      alert(result.message);
    }
  };

  return (
    <View className="w-full max-w-sm flex-1 items-center justify-center bg-slate-50 p-8">
      <View>
        <Text>Bem Vindo</Text>
        <Text>Faça o Login</Text>
      </View>

      <TouchableOpacity className="mb-4 flex h-12 items-center justify-center rounded-md bg-blue-500">
        <View className="flex flex-row space-x-6 ">
          <Ionicons name="logo-google" size={24} className="bg-white" />
          <Text className="text-base font-medium text-white">
            Entrar com o Google
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        className="flex h-12 flex-row items-center justify-center rounded-md bg-blue-900 px-6"
        onPress={() => navigation.navigate("SignUp")}
      >
        <Text className="text-base font-medium text-white">
          Ainda não tem uma conta? Cadastre já!
        </Text>
      </TouchableOpacity>

      <View>
        <TextInput
          className="mb-4 h-12 w-full rounded-md border border-slate-200 bg-white px-4"
          placeholderTextColor="#000"
          placeholder="E-mail"
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <View>
          <TextInput
            className="mb-4 h-12 w-full rounded-md border border-slate-200 bg-white px-4"
            placeholderTextColor="#000"
            placeholder="Senha"
            secureTextEntry={!showPassword}
          />

          <TouchableOpacity
            className="flex h-12 flex-row items-center justify-center rounded-md bg-blue-900 px-6"
            onPress={() => navigation.navigate("SignUp")}
          >
            <Text className="text-base font-medium text-white">
              Esqueceu a senha?
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          className="flex h-12 flex-row items-center justify-center rounded-md bg-blue-900 px-6"
          onPress={login}
        >
          <Text className="text-base font-medium text-white">Entrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
