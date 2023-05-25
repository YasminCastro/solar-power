import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable,
} from "react-native";
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
    const result = await onLogin!(email, password);
    if (result && result.error) {
      alert(result.message);
    }
  };

  return (
    <View className="flex-1 items-center justify-center bg-solar-50">
      {error ? (
        <View className="absolute top-8 mx-8 w-full max-w-sm rounded-md bg-red-400 p-4">
          <Text className="font-bold text-white">Os e-mails não conferem</Text>
        </View>
      ) : null}
      <View className="w-full max-w-sm p-8">
        <View>
          <Text className="text-center font-title text-4xl  text-white">
            Bem vindo
          </Text>
          <Text className="text-1xl mb-6 mr-1 text-center font-regular text-gray-100">
            Faça o Login
          </Text>
        </View>

        <View>
          <Pressable className="mb-4 flex h-12 items-center justify-center rounded-full bg-white">
            <View className="flex flex-row space-x-6 ">
              <Ionicons name="logo-google" size={24} className="bg-white" />
              <Text className="text- font-regular text-base text-solar-400">
                Entrar com o Google
              </Text>
            </View>
          </Pressable>
        </View>

        <View>
          <Text className="text-1xl mb-6 mr-1 text-center font-regular text-white">
            Ainda não tem uma conta? Cadastre já
          </Text>
        </View>

        {/* <View className="flex-row items-center my-8 mr-3">
          <Pressable
            className="flex items-center justify-center bg-white border border-slate-200 h-6 w-6 rounded-sm mr-3"
          >
            <View className="bg-amber-500 h-4 w-4 rounded-sm" />
          </Pressable>
          <Text className="text-slate-900">
            Li e concordo com os termos de uso e política de privacidade.
          </Text>
        </View> */}
      </View>

      <View className=" w-full max-w-sm bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-8 ">
        <View>
          <TextInput
            className="mb-4 h-12 w-full rounded-md border border-slate-200 bg-white px-4"
            placeholderTextColor="#000"
            placeholder="Digite seu e-mail"
            autoCapitalize="none"
            keyboardType="email-address"
            onChangeText={(text) => setEmail(text)}
          />

          <TextInput
            className="mb-4 h-12 w-full rounded-md border border-slate-200 bg-white px-4"
            placeholderTextColor="#000"
            placeholder="Digite sua senha"
            secureTextEntry={!showPassword}
            onChangeText={(text) => setPassword(text)}
          />

          <Text className="text-1xl mb-6 mr-1 text-right font-regular text-white">
            Esqueceu a senha?
          </Text>
        </View>

        <TouchableOpacity
          className="flex h-12 flex-row items-center justify-center rounded-full bg-solar-100 px-6"
          onPress={login}
        >
          <View className="flex flex-1 items-center">
            <Text className="font-body text-base text-solar-500">Entrar</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
