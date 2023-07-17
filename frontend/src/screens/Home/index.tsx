import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { StatusBar } from "expo-status-bar";
import WelcomeView from "../../components/pages/home/WelcomeView";
import RealTimeView from "../../components/pages/home/RealTimeView";

const Home: React.FC = () => {
  return (
    <SafeAreaView className="flex-1 bg-blueDark-500 pt-1">
      <StatusBar style="light" />
      <ScrollView>
        <WelcomeView />
        <RealTimeView />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
