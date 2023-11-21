import { ScrollView, Text, View } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import Achievements from "../../components/screens/games/Achievements";
import ComponenteDivision from "../../components/global/ComponenteDivision";

const Games: React.FC = () => {
  return (
    <SafeAreaView className="flex-1 bg-blueDark-500 pt-1">
      <StatusBar style="light" />

      <ScrollView>
        <View className="m-4">
          <Text className="font-title text-2xl text-yellow-300">SolarHub</Text>
          <Text className="font-body text-base/3 text-gray-200">
            Explore, conecte-se e cresça no mundo da energia solar.
          </Text>
        </View>

        <Achievements />
        <ComponenteDivision />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Games;
