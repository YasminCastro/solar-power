import { ScrollView, Text, View } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import MonthGraph from "../../components/screens/data/MonthGraph";
import ComponenteDivision from "../../components/global/ComponenteDivision";
import YearGraph from "../../components/screens/data/YearGraph";

//TODO: botões no começo para ir direto para a região que quer
//TODO: botoão fluante que volta pro inicio da scroll view

const Data: React.FC = () => {
  return (
    <SafeAreaView className="flex-1 bg-blueDark-500 pt-1">
      <StatusBar style="light" />
      <ScrollView>
        <View className="m-4">
          <Text className="font-title text-2xl text-yellow-300">
            Visão Energética
          </Text>
          <Text className="font-body text-base/3 text-gray-200">
            Seu panorama de produção e economia solar
          </Text>
        </View>
        <View>
          {/* <Text className="font-title text-base text-white">
            TODO: Botões para ir direto para o topico que quer ir ouu fazer
            igual nas configurações!
          </Text> */}
        </View>
        <MonthGraph />
        <ComponenteDivision />
        <YearGraph />
        <ComponenteDivision />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Data;
