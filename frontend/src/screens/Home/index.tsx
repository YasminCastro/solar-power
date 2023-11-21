import { RefreshControl, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { StatusBar } from "expo-status-bar";
import WelcomeView from "../../components/screens/home/WelcomeView";
import RealTimeView from "../../components/screens/home/RealTimeView";
import TodayGraph from "../../components/screens/home/TodayGraph";
import { useCallback, useState } from "react";

const Home: React.FC = () => {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-blueDark-500 pt-1">
      <StatusBar style="light" />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <WelcomeView />
        <RealTimeView refresh={refreshing} />
        <TodayGraph refresh={refreshing} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
