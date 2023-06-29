import { View, Text } from "react-native";

import ElginLogo from "../../../assets/elgin-logo.svg";

export default function ElginIcon() {
  return (
    <View className="mb-4 flex flex h-28 flex-row items-center justify-center space-x-14 rounded-lg bg-white">
      <ElginLogo />
      <Text className="font-regular text-3xl text-solar-400">Elgin</Text>
    </View>
  );
}
