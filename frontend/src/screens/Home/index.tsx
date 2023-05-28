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
import Logo from "../../assets/logo.svg";

const Home = () => {
  const [powerGenerated, setPowerGenerated] = useState<PowerGenerated | null>(
    null
  );
  const [maxValue, setMaxValue] = useState<number>(100);
  const { authState } = useAuth();
  const { user } = useUser();

  async function loadPowerGenerated() {
    if (user && user?.inversors) {
      let invertersId: number[] = [];
      let maxValuSum = 0;

      user?.inversors.forEach((inverter) => {
        if (inverter.active) {
          console.log(maxValuSum);
          maxValuSum += inverter.maxRealTimePower;
        }
      });
      setMaxValue(maxValuSum);

      let params: any = { userId: user.id };
      if (invertersId.length === 1) {
        params.inverterId = invertersId[0].toString();
        params.limit = 1;
      } else if (invertersId.length > 1) {
        params.invertersId = invertersId.toString();
      }

      const { data } = await api.get(`/power-generated`, {
        params,
        headers: {
          Authorization: `Bearer ${authState.token}`,
        },
      });

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
          <Logo width={40} height={40} />
          <Text className="font-title text-2xl text-white">Bom dia!</Text>
        </View>
        <Pressable>
          <Ionicons name="notifications" size={24} color="#FEBE3D" />
        </Pressable>
      </View>
      {powerGenerated && (
        <View>
          <CircleChart
            realTimePower={powerGenerated.powerInRealTime}
            maxValue={maxValue}
          />

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
      )}
    </SafeAreaView>
  );
};

export default Home;
