import { ScrollView } from "react-native";
import { viewWrapperStyles } from "../../styles/app";
import { SafeAreaView } from "react-native-safe-area-context";

import { StatusBar } from "expo-status-bar";
import WelcomeView from "../../components/pages/home/WelcomeView";
import RealTimeView from "../../components/pages/home/RealTimeView";

const Home: React.FC = () => {
  return (
    <SafeAreaView className={viewWrapperStyles}>
      <StatusBar style="light" />
      <ScrollView>
        <WelcomeView />
        <RealTimeView />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
