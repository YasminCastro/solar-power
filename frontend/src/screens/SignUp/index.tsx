import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  TouchableOpacity,
} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";

import LogoGoogle from "../assets/icons8-google-24.svg";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../contexts/AuthContext";
import registerSchema from "../../validation/registerSchema";
import { AuthScreenNavigationProp } from "../../interfaces/auth";

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const navigation = useNavigation<AuthScreenNavigationProp>();

  const { onRegister } = useAuth();

  const handleRegistration = async () => {
    setError("");
    try {
      await registerSchema.validate({ email, password, passwordConfirm, name });

      const result = await onRegister!(email, password, name);
      if (result.error) {
        setError(result.message);
      }

      navigation.navigate("Inverter");
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <View className="flex-1 items-center justify-center bg-solar-50">
      <View className="h-1/2 w-full max-w-sm justify-center p-8 ">
        <View>
          <Text className="text-center font-title text-4xl  text-white">
            Bem vindo
          </Text>
          <Text className="text-1xl mb-6 mr-1 text-center font-regular text-gray-100">
            Faça seu Cadastro
          </Text>
        </View>

        {/* <View>
          <Pressable className="mb-4 flex h-12 items-center justify-center rounded-full bg-white">
            <View className="flex flex-row space-x-6 ">
              <LogoGoogle></LogoGoogle>
              <Text className="text- font-regular text-base text-solar-400">
                Cadastre com o Google
              </Text>
            </View>
          </Pressable>
        </View> */}
      </View>

      {error ? (
        <View className="absolute top-8 mx-8 w-full max-w-sm rounded-md bg-red-400 p-4">
          <Text className="font-bold text-white">{error}</Text>
        </View>
      ) : null}

      <LinearGradient
        className="h-1/2 w-full rounded-lg  "
        colors={["#B08C09", "#10237A"]}
        start={[0, 0]}
      >
        <View className=" w-full max-w-sm p-6 ">
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
              placeholder="E-mail"
              autoCapitalize="none"
              keyboardType="email-address"
              onChangeText={(text) => setEmail(text)}
            />

            <TextInput
              className="mb-4 h-12 w-full rounded-sm border border-x-0 border-t-0 border-white bg-transparent px-4 font-regular text-white"
              placeholderTextColor="#ffff"
              placeholder="Senha"
              secureTextEntry={!showPassword}
              onChangeText={(text) => setPassword(text)}
            />

            <TextInput
              className="mb-4 h-12 w-full rounded-sm border border-x-0 border-t-0 border-white bg-transparent px-4 font-regular text-white"
              placeholderTextColor="#ffff"
              placeholder="Repita a senha"
              secureTextEntry={!showPassword}
              onChangeText={(text) => setPasswordConfirm(text)}
            />

            <Text className="text-1xl mb-14 text-center font-regular text-white">
              Já tem uma conta? Clique aqui para logar!
            </Text>
          </View>

          <TouchableOpacity
            className="flex h-12 flex-row items-center justify-center rounded-full bg-solar-100 px-6"
            onPress={handleRegistration}
          >
            <View className="flex flex-1 items-center">
              <Text className="font-body text-base text-solar-500">
                Continuar
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );
}
