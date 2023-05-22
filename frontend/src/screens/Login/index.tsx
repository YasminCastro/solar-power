import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity , Pressable} from "react-native";
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

  const { onLogin, authState } = useAuth();

  const login = async () => {
    console.log("LOGIN");
    // const result = await onLogin!("yasminsdcastro@gmail.com", "teste1234");
    // if (result && result.error) {
    //   alert(result.message);
    // }
  };

  return (
    <View className="flex-1 items-center justify-center bg-solar-50">
      {error ? (
        <View className="absolute top-8 w-full bg-red-400 mx-8 max-w-sm p-4 rounded-md">
          <Text className="text-white font-bold">Os e-mails não conferem</Text>
        </View>
      ) : null}
      <View className="p-8 w-full max-w-sm">

        <View>
          <Text className="text-4xl text-center font-title  text-white">Bem vindo</Text>
          <Text className="text-1xl text-center font-regular mb-6 mr-1 text-gray-100">Faça o Login</Text>
        </View>
        
        <View>
          <Pressable
          className="h-12 bg-white rounded-full items-center mb-4 flex justify-center"
          >
          <View className="flex flex-row space-x-6 ">
              <Ionicons name="logo-google" size={24} className="bg-white" />
              <Text className="text- text-base text-solar-400 font-regular">Entrar com o Google</Text>
          </View>
          </Pressable>
        </View>

        <View>
          <Text className="text-1xl text-center font-regular mb-6 mr-1 text-white">Ainda não tem uma conta? Cadastre já</Text>
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

      <View className=" p-8 w-full max-w-sm bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 "> 

      <View>

          <TextInput
            className="w-full bg-white border border-slate-200 rounded-md h-12 px-4 mb-4"
            placeholderTextColor="#000"
            placeholder="Digite seu e-mail"
            autoCapitalize="none"
            keyboardType="email-address"
          />

    
          <TextInput
            className="w-full bg-white border border-slate-200 rounded-md h-12 px-4 mb-4"
            placeholderTextColor="#000"
            placeholder="Digite sua senha"
            secureTextEntry={!showPassword}
          />

          <Text className="text-1xl text-right font-regular mb-6 mr-1 text-white">Esqueceu a senha?</Text>


        </View>

        <Pressable
          className="h-12 bg-solar-100 rounded-full flex flex-row justify-center items-center px-6"
        >
          <View className="flex-1 flex items-center">
            <Text className="text-solar-500 text-base font-body">Entrar</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );

}