import React, { useCallback, useState } from "react";
import { ScrollView, RefreshControl, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { styled } from "nativewind";
import Stripes from "../../assets/stripes.svg";
import PredictionGraph from "../../components/Screens/Previsao/PredictionGraph";
import CircleData from "../../components/Global/CircleData";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

const Previsao = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [key, setKey] = useState(0);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setKey((prevKey) => prevKey + 1);

    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const StyledStripes = styled(Stripes);

  return (
    <SafeAreaView className="flex-1 bg-blueDark-500 pt-1">
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <PredictionGraph />

        <StyledStripes
          className=".."
          style={{
            transform: [{ rotate: "90deg" }],
            position: "absolute",
            top: -15,
          }}
        />

        <View className="mt-14 ">
          <Text className="ml-4 font-regular text-2xl text-yellow-300">
            Benefícios ambientais
          </Text>
          <View className="mt-5 flex flex-row justify-around">
            <CircleData
              text="CO2 Evitado"
              data="251.16 t"
              icon={
                <MaterialCommunityIcons
                  name="molecule-co2"
                  size={50}
                  color="#0F1E44"
                />
              }
            />

            <CircleData
              text="Carvão poupado"
              data="211.51 t"
              icon={<FontAwesome name="fire" size={50} color="#0F1E44" />}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Previsao;
