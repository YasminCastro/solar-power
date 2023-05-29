import React, { useCallback, useState } from "react";
import { ScrollView, RefreshControl } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

import WelcomeView from "../../components/Screens/Home/WelcomeView";
import RealTimeView from "../../components/Screens/Home/RealTimeView";
import TodayGraph from "../../components/Screens/Home/TodayGraph";

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
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
