import React, { useCallback, useState } from "react";
import { ScrollView, RefreshControl, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

import WelcomeView from "../../components/Screens/Home/WelcomeView";
import RealTimeView from "../../components/Screens/Home/RealTimeView";
import TodayGraph from "../../components/Screens/Home/TodayGraph";
import { styled } from "nativewind";
import Stripes from "../../assets/stripes.svg";
import MonthGraph from "../../components/Screens/Home/MonthGraph";

const Home = () => {
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
        <StatusBar style="light" />
        <WelcomeView />
        <RealTimeView key={key + 1} />
        <TodayGraph key={key + 2} />
        <StyledStripes
          className=".."
          style={{
            transform: [{ rotate: "90deg" }],
            position: "absolute",
            top: 470,
          }}
        />
        <MonthGraph key={key + 3} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
