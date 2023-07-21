import { ScrollView, Text, View } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import Logo from "../../assets/logos/solar-power-logo.svg";
import MonthGraph from "../../components/screens/data/MonthGraph";
import Stripes from "../../components/global/Stripes";
import YearGraph from "../../components/screens/data/YearGraph";
import Prediction from "../../components/screens/data/Prediction";

//TODO: botões no começo para ir direto para a região que quer
//TODO: botoão fluante que volta pro inicio da scroll view

const Data: React.FC = () => {
  return (
    <SafeAreaView className="flex-1 bg-blueDark-500 pt-1">
      <StatusBar style="light" />
      <ScrollView>
        <View className="m-7 flex flex-row items-center justify-between">
          <View className="flex-row items-center gap-3">
            <Logo width={40} height={40} />
            <Text className="font-title text-3xl text-white">
              Geração de energia
            </Text>
          </View>
        </View>
        <View>
          <Text className="font-title text-base text-white">
            Botões para ir direto para o topico que quer ir ouu fazer igual nas
            configurações!
          </Text>
        </View>
        <MonthGraph />
        <Stripes />
        <YearGraph />
        <Stripes />
        {/* <Prediction /> */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Data;
