import { View, Text, StyleSheet, Button } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAuth } from "../context/AuthContext";
import Home from "../screens/Home";
import Login from "../screens/Login";

const Stack = createNativeStackNavigator();

const Layout = () => {
  const { autState, onLogout } = useAuth();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {autState?.isAuth ? (
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              headerRight: () => <Button onPress={onLogout} title="Sair" />,
            }}
          />
        ) : (
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Layout;
