import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { WhiteLogo } from "../components/Logo";
import { useAuth } from "../context/AuthContext";
import { useNavigation } from "@react-navigation/native";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { onLogin, onRegister } = useAuth();
  const navigation = useNavigation();
  const signup = () => {
    console.log("signup");
    // navigation.navigate("Detail", { food });
  };

  const login = async () => {
    const result = await onLogin!(email, password);

    if (result && result.error) {
      alert("Login failed");
    }
  };

  const register = async () => {
    const result = await onRegister!(email, password);

    if (result && result.error) {
      alert("Login failed");
    } else {
      login();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoArea}>
        <WhiteLogo />
      </View>

      <View style={styles.triangle}></View>
      <View style={styles.blueArea}>
        <View style={styles.form}>
          <Text style={styles.loginText}>Login</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            onChangeText={(text: string) => setEmail(text)}
            value={email}
          />
          <TextInput
            style={styles.input}
            placeholder="Senha"
            onChangeText={(text: string) => setPassword(text)}
            secureTextEntry={true}
            value={password}
          ></TextInput>
          <Button onPress={login} title="Entrar" />
          <Text style={styles.simpleText}>Ou continue com</Text>
          <Button onPress={register} title="Google" />
          <TouchableOpacity style={styles.signUp} onPress={signup}>
            <Text style={styles.simpleText}>Não tem conta?</Text>
            <Text style={styles.signUpText}>Crie agora</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FDD03F",
  },
  logoArea: { alignSelf: "center", height: "40%", justifyContent: "center" },
  triangle: {
    flex: 1,
    justifyContent: "flex-end",
    width: "100%",
    borderTopLeftRadius: 150,
    borderTopRightRadius: 150,
    backgroundColor: "#003566",
  },
  blueArea: {
    justifyContent: "flex-end",
    backgroundColor: "#003566",
    height: "40%",
    borderColor: "#003566",
  },
  loginText: {
    color: "#FFF",
    fontSize: 32,
    fontFamily: "Roboto",
    fontWeight: "800",
    alignSelf: "center",
  },
  form: {
    alignSelf: "center",
    gap: 10,
    width: "80%",
    borderColor: "red",
  },
  input: {
    borderBottomColor: "#FFF",
    borderBottomWidth: 1,
    padding: 4,
  },
  signUp: {
    alignSelf: "center",
    flexDirection: "row",
    gap: 6,
    marginBottom: 50,
  },
  simpleText: {
    alignSelf: "center",
    color: "#94a3b8",
    fontSize: 18,
    fontWeight: "400",
    justifyContent: "center",
  },
  signUpText: {
    alignSelf: "center",
    justifyContent: "center",
    color: "#FFF",
    fontSize: 18,
    fontWeight: "400",
  },
});

export default Login;
