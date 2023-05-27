import { View } from "react-native";
import CircularProgress from "react-native-circular-progress-indicator";

interface IProps {
  realTimePower: string;
}

export default function CircleChart({ realTimePower }: IProps) {
  const title = realTimePower.slice(-2);
  const value = parseFloat(realTimePower);

  return (
    <View>
      <CircularProgress
        value={100}
        radius={100}
        delay={5}
        duration={2000}
        progressValueColor="#FFFFFF"
        maxValue={50}
        title={title}
        titleColor={"white"}
        titleStyle={{ fontWeight: "bold" }}
        activeStrokeColor="#FBCF24"
        inActiveStrokeColor="#5E6795"
        inActiveStrokeOpacity={0.5}
        inActiveStrokeWidth={30}
        activeStrokeWidth={30}
        activeStrokeSecondaryColor="#FDA933"
      />
    </View>
  );
}
