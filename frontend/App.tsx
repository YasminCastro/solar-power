import "moment/locale/pt-br";
import moment from "moment";

moment.locale("pt-br");

import { NavigationContainer } from "@react-navigation/native";

import {
  Ubuntu_700Bold,
  Ubuntu_500Medium,
  Ubuntu_400Regular,
  useFonts,
} from "@expo-google-fonts/ubuntu";

import { Poppins_700Bold, Poppins_300Light } from "@expo-google-fonts/poppins";

import React from "react";

import { AuthProvider } from "./src/contexts/auth";
import Routes from "./src/routes";

export default function App() {
  const [fontsLoaded] = useFonts({
    Ubuntu_700Bold,
    Ubuntu_500Medium,
    Ubuntu_400Regular,
    Poppins_700Bold,
    Poppins_300Light,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </NavigationContainer>
  );
}
