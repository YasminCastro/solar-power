import { Text } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

const Games: React.FC = () => {
  return (
    <SafeAreaView className="flex-1 bg-blueDark-500 pt-1">
      <StatusBar style="light" />
      <Text className="m-10 text-2xl text-white">Social page</Text>
    </SafeAreaView>
  );
};

export default Games;