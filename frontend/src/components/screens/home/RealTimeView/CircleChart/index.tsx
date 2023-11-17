import { View, Text, TouchableOpacity } from "react-native";
import CircularProgress from "react-native-circular-progress-indicator";
import { Entypo } from "@expo/vector-icons";

interface IProps {
  realTimePower: number;
  maxValue: number;
}

export default function CircleChart({ realTimePower, maxValue }: IProps) {
  return (
    <View className="items-center">
      <View className="flex flex-row">
        <CircularProgress
          value={realTimePower}
          radius={100}
          delay={5}
          duration={2000}
          progressValueColor="#FFFFFF"
          maxValue={maxValue}
          title={"kW"}
          titleColor={"white"}
          titleStyle={{ fontWeight: "bold" }}
          activeStrokeColor="#FBCF24"
          inActiveStrokeColor="#5E6795"
          inActiveStrokeOpacity={0.5}
          inActiveStrokeWidth={30}
          activeStrokeWidth={30}
          activeStrokeSecondaryColor="#FDA933"
        />
        <TouchableOpacity>
          <Entypo name="info-with-circle" size={18} color="white" />
        </TouchableOpacity>
      </View>
      <Text className="mt-3 font-body text-xl text-gray-50">Tempo real</Text>
    </View>
  );
}
