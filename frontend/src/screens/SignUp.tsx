import { useState } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Ionicons from '@expo/vector-icons/Ionicons';



export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);

  return (
    <View className="flex-1 items-center justify-center bg-slate-50">
      {error ? (
        <View className="absolute top-8 w-full bg-red-400 mx-8 max-w-sm p-4 rounded-md">
          <Text className="text-white font-bold">Os e-mails não conferem</Text>
        </View>
      ) : null}
      <View className="p-8 w-full max-w-sm">
        <Text className="text-5xl font-bold mb-6 text-slate-900">Crie sua conta</Text>

        <Pressable
        className="h-12 bg-blue-500 rounded-md items-center mb-4 flex justify-center"
        >
        <View className="flex flex-row space-x-6 ">
            <Ionicons name="logo-google" size={24} className="bg-white" />
            <Text className="text-white text-base font-medium">Criar conta com Google</Text>
        </View>
        </Pressable>

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
          placeholder="Confirme seu e-mail"
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <TextInput
          className="w-full bg-white border border-slate-200 rounded-md h-12 px-4 mb-4"
          placeholderTextColor="#000"
          placeholder="Digite sua senha"
          secureTextEntry={!showPassword}
        />

        <TextInput
          className="w-full bg-white border border-slate-200 rounded-md h-12 px-4"
          placeholderTextColor="#000"
          placeholder="Confirme sua senha"
          secureTextEntry={!showPassword}
        />

        <View className="flex-row items-center my-8 mr-3">
          <Pressable
            className="flex items-center justify-center bg-white border border-slate-200 h-6 w-6 rounded-sm mr-3"
          >
            <View className="bg-amber-500 h-4 w-4 rounded-sm" />
          </Pressable>
          <Text className="text-slate-900">
            Li e concordo com os termos de uso e política de privacidade.
          </Text>
        </View>

        <Pressable
          className="h-12 bg-blue-900 rounded-md flex flex-row justify-center items-center px-6"
        >
          <View className="flex-1 flex items-center">
            <Text className="text-white text-base font-medium">Criar conta</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
}