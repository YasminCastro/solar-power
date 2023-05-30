import { View, Text } from "react-native";

interface IProps {
  data: string;
  text: string;
  icon: any;
}

export default function CircleData({ text, icon, data }: IProps) {
  return (
    <View className="items-center">
      <View className="h-20 w-20 items-center justify-center rounded-full bg-yellow-300">
        {icon}
      </View>
      <Text className="font-regular text-2xl text-yellow-300">{data}</Text>
      <Text className="font-regular text-xl text-white">{text}</Text>
    </View>
  );
}
