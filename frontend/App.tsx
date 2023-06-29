import "moment/locale/pt-br";
import moment from "moment";

moment.locale("pt-br");

import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

import {
  Ubuntu_700Bold,
  Ubuntu_500Medium,
  Ubuntu_400Regular,
  useFonts,
} from "@expo-google-fonts/ubuntu";

import { Poppins_700Bold, Poppins_300Light } from "@expo-google-fonts/poppins";

import Layout from "./src/Routes/Layout";
import AuthStackNavigation from "./src/Routes/Auth";

import { AuthProvider, useAuth } from "./src/contexts/AuthContext";
import { InverterProvider } from "./src/contexts/InverterContext";
import { UserProvider } from "./src/contexts/UserContext";

export default function App() {
  const [hasLoadedFonts] = useFonts({
    Ubuntu_700Bold,
    Ubuntu_500Medium,
    Ubuntu_400Regular,
    Poppins_700Bold,
    Poppins_300Light,
  });

  if (!hasLoadedFonts) {
    return null;
  }

  return (
    <AuthProvider>
      <UserProvider>
        <InverterProvider>
          <SafeAreaProvider>
            <AppLayout />
          </SafeAreaProvider>
        </InverterProvider>
      </UserProvider>
    </AuthProvider>
  );
}

function AppLayout() {
  const { authState } = useAuth();

  return (
    <NavigationContainer>
      <StatusBar style="light" />

      {authState.isAuth ? <Layout /> : <AuthStackNavigation />}
    </NavigationContainer>
  );
}
