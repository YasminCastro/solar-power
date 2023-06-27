import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../screens/Login";
import Signup from "../screens/SignUp";
import Inverter from "../screens/SignUp/Inverter";

const AuthStack = createStackNavigator();

export default function AuthStackNavigation() {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="Login" component={Login} />
      <AuthStack.Screen name="SignUp" component={Signup} />
      <AuthStack.Screen name="Inverter" component={Inverter} />
    </AuthStack.Navigator>
  );
}
