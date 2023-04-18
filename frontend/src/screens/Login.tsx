import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import React from "react";
import { WhiteLogo } from "../components/Logo";

const Login = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoArea}>
        <WhiteLogo />
      </View>

      <View style={styles.triangle}></View>
      <View style={styles.blueArea}>
        <Text style={styles.loginText}>Login</Text>
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
    lineHeight: 38,
    alignSelf: "center",
  },
});

export default Login;
