import {
  Ubuntu_700Bold,
  Ubuntu_500Medium,
  Ubuntu_400Regular,
  useFonts,
} from "@expo-google-fonts/ubuntu";

import { Poppins_700Bold, Poppins_300Light } from "@expo-google-fonts/poppins";
import { AuthProvider, useAuth } from "./src/contexts/AuthContext";
import { NavigationContainer } from "@react-navigation/native";
import AuthStackNavigation from "./src/routes/Auth";
import Layout from "./src/routes/Layout";
import { UserProvider } from "./src/contexts/UserContext";
import { SafeAreaProvider } from "react-native-safe-area-context";
import moment from "moment";
import "moment/locale/pt-br";
import { StatusBar } from "expo-status-bar";

moment.locale("pt-br");

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
        <SafeAreaProvider>
          <AppLayout />
        </SafeAreaProvider>
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
