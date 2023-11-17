import { View, Text } from "react-native";
import SemiCircle from "../../../../../assets/shapes/semi-circle.svg";
import getEnergySufix from "../../../../../utils/autoKWhConvert";

interface IProps {
  text: string;
  number: number;
}

export default function SemiCircleText({ text, number }: IProps) {
  const { suffix, value } = getEnergySufix(number);

  return (
    <View className="items-center justify-center">
      <SemiCircle width={120} height={120} />
      <View className="absolute top-16 flex-row items-baseline gap-1">
        <Text className="font-numberLight text-2xl text-yellow-300">
          {value}
        </Text>
        <Text className="align-baseline font-numberLight text-xs text-yellow-300">
          {suffix}
        </Text>
      </View>
      <Text className="bottom-5 font-body text-sm text-gray-50">{text}</Text>
    </View>
  );
}
