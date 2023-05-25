import {
  Ubuntu_700Bold,
  Ubuntu_500Medium,
  Ubuntu_400Regular,
  useFonts,
} from "@expo-google-fonts/ubuntu";

import { Poppins_700Bold } from "@expo-google-fonts/poppins";
import { AuthProvider, useAuth } from "./src/contexts/AuthContext";
import { NavigationContainer } from "@react-navigation/native";
import AuthStackNavigation from "./src/routes/Auth";
import Layout from "./src/routes/Layout";
import Login from "./src/screens/Login/index";

export default function App() {
  const [hasLoadedFonts] = useFonts({
    Ubuntu_700Bold,
    Ubuntu_500Medium,
    Ubuntu_400Regular,
    Poppins_700Bold,
  });

  if (!hasLoadedFonts) {
    return null;
  }

  return (
    <AuthProvider>
      <AppLayout />
    </AuthProvider>
  );
}

function AppLayout() {
  const { authState } = useAuth();

  return (
    <NavigationContainer>
      {authState.isAuth ? <Layout /> : <AuthStackNavigation />}
    </NavigationContainer>
  );
}
