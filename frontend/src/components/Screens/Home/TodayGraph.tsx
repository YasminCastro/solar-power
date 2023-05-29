import { View, Text, Dimensions } from "react-native";
import CircleChart from "./CircleChart";
import { useEffect, useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { useUser } from "../../../contexts/UserContext";
import PowerGenerated from "../../../interfaces/powerGenerated";
import api from "../../../lib/api";
import SemiCircleText from "../../Global/SemiCircleText";
import { Entypo } from "@expo/vector-icons";

import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";

export default function TodayGraph() {
  const [powerGenerated, setPowerGenerated] = useState<PowerGenerated | null>(
    null
  );
  const [maxValue, setMaxValue] = useState<number>(100);
  const { authState } = useAuth();
  const { user } = useUser();

  async function loadPowerGenerated() {
    if (user && user?.inversors) {
      let invertersId: number[] = [];
      let maxValuSum = 0;

      user?.inversors.forEach((inverter) => {
        if (inverter.active) {
          maxValuSum += inverter.maxRealTimePower;
        }
      });
      setMaxValue(maxValuSum);

      let params: any = { userId: user.id };
      if (invertersId.length === 1) {
        params.inverterId = invertersId[0].toString();
        params.limit = 1;
      } else if (invertersId.length > 1) {
        params.invertersId = invertersId.toString();
      }

      const { data } = await api.get(`/power-generated`, {
        params,
        headers: {
          Authorization: `Bearer ${authState.token}`,
        },
      });

      setPowerGenerated(data[0]);
    }
  }

  useEffect(() => {
    loadPowerGenerated();
  }, [user]);

  return (
    <View className="mt-4 items-center">
      <LineChart
        data={{
          labels: ["January", "February", "March", "April", "May", "June"],
          datasets: [
            {
              data: [1, 2, 3, 4, 5, 6],
            },
          ],
        }}
        width={Dimensions.get("window").width - 40}
        height={280}
        yAxisInterval={1}
        onDataPointClick={(data) => console.log(data)}
        chartConfig={{
          backgroundColor: "#7179A5",
          backgroundGradientFrom: `rgba(113, 121, 165, 100)`,
          backgroundGradientTo: `rgba(111, 119, 195, 0)`,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            fill: "#FEA259",
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    </View>
  );
}
