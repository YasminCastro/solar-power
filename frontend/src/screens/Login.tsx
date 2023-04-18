import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import React from "react";
import { Logo } from "../components/Logo";

const Login = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Logo />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Login;
