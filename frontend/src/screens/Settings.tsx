import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { useAuth } from "../contexts/AuthContext";

const Settings = () => {
  const { onLogout } = useAuth();

  const logout = async () => {
    await onLogout!();
  };

  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-blueDark-500">
      <TouchableOpacity
        className="flex h-12 flex-row items-center justify-center rounded-full bg-solar-100 px-6"
        onPress={logout}
      >
        <View className="flex flex-1 items-center">
          <Text className="font-body text-base text-solar-500">Logout</Text>
        </View>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
};

export default Settings;
