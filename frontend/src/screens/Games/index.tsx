import { ScrollView, Text, View } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

const Games: React.FC = () => {
  return (
    <SafeAreaView className="flex-1 bg-blueDark-500 pt-1">
      <StatusBar style="light" />

      <ScrollView>
        <View className="m-4">
            <Text className="font-title text-2xl text-yellow-300">
              Comunidade
            </Text>
          <Text className="font-body text-base/3 text-gray-200">
              Pessoas e conquistas
          </Text>
        </View>
        <View>
          
        </View>
        
        {/* <Stripes /> */}
        {/* <Prediction /> */}
      </ScrollView>

    </SafeAreaView>
  );
};

export default Games;
