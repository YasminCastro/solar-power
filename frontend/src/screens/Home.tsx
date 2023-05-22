import { Text, SafeAreaView, View, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../contexts/AuthContext";

import api from "../lib/api";
import Spinner from "react-native-loading-spinner-overlay/lib";

const Home = () => {
  const [powerGenerated, setPowerGenerated] = useState<any>(null);
  const { user, authState } = useAuth();

  async function loadPowerGenerated() {
    const response = await api.get("/users/1", {
      headers: {
        Authorization: `Bearer ${authState.token}`,
      },
    });

    setPowerGenerated(response.data.powerGenerated[0]);
  }

  useEffect(() => {
    loadPowerGenerated();
  }, []);

  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-blueDark-500">
      <StatusBar style="auto" />
      <View className="absolute top-24 flex-row justify-between">
        <View className="flex-row">
          <Text className="text-yellow-300">LOGO</Text>
          <Text className="font-title text-2xl text-white">Bom dia!</Text>
        </View>
        <Pressable>
          <Ionicons name="notifications" size={24} color="#FEBE3D" />
        </Pressable>
      </View>
      {powerGenerated ? (
        <View>
          <Text className="text-number text-2xl text-white">
            Tempo real: {powerGenerated.powerInRealTime}kW
          </Text>
          <Text className="text-number text-2xl text-white">
            Produção Hoje: {powerGenerated.powerToday}KWh
          </Text>
          <Text className="text-number text-2xl text-white">
            Tempo: {powerGenerated.tempC}° C
          </Text>
        </View>
      ) : (
        <Spinner visible={true} color="#FEBE3D" />
      )}
    </SafeAreaView>
  );
};

export default Home;
