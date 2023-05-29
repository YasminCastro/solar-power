import React from "react";
import { StatusBar } from "expo-status-bar";

import WelcomeView from "../../components/Screens/Home/WelcomeView";
import { SafeAreaView } from "react-native-safe-area-context";
import RealTimeView from "../../components/Screens/Home/RealTimeView";

const Home = () => {
  return (
    <SafeAreaView className="flex-1 bg-blueDark-500 pt-1">
      <StatusBar style="auto" />
      <WelcomeView />
      <RealTimeView />
    </SafeAreaView>
  );
};

export default Home;
