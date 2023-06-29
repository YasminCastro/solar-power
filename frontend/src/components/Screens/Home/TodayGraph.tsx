import { View, Dimensions, Text } from "react-native";
import { useEffect, useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { useUser } from "../../../contexts/UserContext";
import PowerGenerated from "../../../interfaces/powerGenerated";
import api from "../../../lib/api";

import { LineChart } from "react-native-chart-kit";
import moment from "moment";
import { filterByHour } from "../../../utils/dataFilter";

export default function TodayGraph() {
  const [label, setLabel] = useState<string[]>([]);
  const [dataset, setDataset] = useState<number[]>([]);
  const { authState } = useAuth();
  const { user, userInverters } = useUser();

  async function loadPowerGenerated() {
    if (userInverters) {
      let inverterId = userInverters
        .filter((inverter) => inverter.active)
        .map((inverter) => inverter._id)
        .join(",");

      const { data } = await api.get(`/power-generated/day`, {
        params: { inverterId },
        headers: {
          Authorization: `Bearer ${authState.token}`,
        },
      });

      setLabel([]);
      setDataset([]);

      const dataFilterd = filterByHour(data);

      dataFilterd.forEach((element: PowerGenerated) => {
        const parsedDate = moment(element.localtime, "YYYY-MM-DD HH:mm").format(
          "HH"
        );
        const parseData = parseFloat(element.powerInRealTime);

        setLabel((prev) => [...prev, parsedDate]);

        setDataset((prev) => [...prev, parseData]);
      });
    }
  }

  useEffect(() => {
    loadPowerGenerated();
  }, [user]);

  return (
    <View className="mt-4 items-center">
      {label.length > 0 && dataset.length > 0 && (
        <>
          <LineChart
            data={{
              labels: label,
              datasets: [
                {
                  data: dataset,
                },
              ],
            }}
            width={Dimensions.get("window").width - 40}
            height={280}
            yAxisInterval={1}
            formatYLabel={(yLabel) => `${yLabel}kW`}
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
          <Text className="font-body text-sm text-gray-50">
            Rendimento hoje
          </Text>
        </>
      )}
    </View>
  );
}
