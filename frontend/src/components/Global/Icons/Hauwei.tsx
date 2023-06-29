import { View, Text } from "react-native";

import HuaweiLogo from "../../../assets/huawei-logo.svg";

export default function HauweiIcon() {
  return (
    <View className="mb-4 flex flex h-28 flex-row items-center justify-center space-x-14 rounded-lg bg-white">
      <HuaweiLogo />
      <Text className="font-regular text-3xl text-solar-400">Huawei</Text>
    </View>
  );
}
