import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import {
  Ubuntu_700Bold,
  Ubuntu_500Medium,
  Ubuntu_400Regular,
  useFonts,
} from "@expo-google-fonts/ubuntu";

import { Poppins_700Bold } from "@expo-google-fonts/poppins";

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
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
