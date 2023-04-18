import "react-native-gesture-handler";

import { StyleSheet } from "react-native";
import { AuthProvider } from "./src/context/AuthContext";
import Layout from "./src/Routes/Layout";

export default function App() {
  return (
    <AuthProvider>
      <Layout></Layout>
    </AuthProvider>
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
