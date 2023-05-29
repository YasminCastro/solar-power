import { View, Text } from "react-native";
import SemiCircle from "../../assets/semi-circle.svg";

interface IProps {
  text: string;
  number: string;
}

export default function SemiCircleText({ text, number }: IProps) {
  let numberParsed: any = number;
  let lastThreeChars = "";

  if (number.includes("kWh") || number.includes("MWh")) {
    numberParsed = parseInt(number);
    lastThreeChars = number.slice(-3);
  }

  return (
    <View className="items-center justify-center">
      <SemiCircle width={120} height={120} />
      <View className="absolute top-16 flex-row items-baseline gap-1">
        <Text className="font-numberLight text-2xl text-yellow-300">
          {numberParsed}
        </Text>
        <Text className="align-baseline font-numberLight text-xs text-yellow-300">
          {lastThreeChars}
        </Text>
      </View>
      <Text className="bottom-5 font-body text-sm text-gray-50">{text}</Text>
    </View>
  );
}
