import {
  Text,
  SafeAreaView,
  View,
  Pressable,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../../contexts/AuthContext";

import api from "../../lib/api";
import CircleChart from "../../components/Screens/Home/CircleChart";
import PowerGenerated from "../../interfaces/powerGenerated";
import { useUser } from "../../contexts/UserContext";

const Home = () => {
  const [powerGenerated, setPowerGenerated] = useState<PowerGenerated | null>(
    null
  );
  const { authState } = useAuth();
  const { user, userInverters } = useUser();

  async function loadPowerGenerated() {
    console.log(userInverters);

    if (user) {
      const { data } = await api.get(
        `/power-generated?userId=${user.id}&limit=1`,
        {
          headers: {
            Authorization: `Bearer ${authState.token}`,
          },
        }
      );

      setPowerGenerated(data[0]);
    }
  }

  useEffect(() => {
    loadPowerGenerated();
  }, [user]);

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
          <CircleChart realTimePower={powerGenerated.powerInRealTime} />

          <Text className="text-number text-2xl text-white">
            Tempo real: {powerGenerated.powerInRealTime}
          </Text>
          <Text className="text-number text-2xl text-white">
            Produção Hoje: {powerGenerated.powerToday}
          </Text>
          <Text className="text-number text-2xl text-white">
            Tempo: {powerGenerated.tempC}° C
          </Text>
        </View>
      ) : (
        <ActivityIndicator size="large" color="#FEBE3D" />
      )}
    </SafeAreaView>
  );
};

export default Home;
