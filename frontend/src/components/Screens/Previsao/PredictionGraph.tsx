import { View, Dimensions, Text, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { useUser } from "../../../contexts/UserContext";
import PowerGenerated from "../../../interfaces/powerGenerated";
import api from "../../../lib/api";
import { AntDesign } from "@expo/vector-icons";

import { LineChart, BarChart } from "react-native-chart-kit";
import moment from "moment";
import CircleData from "../../Global/CircleData";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

export default function PredictionGraph() {
  const [label, setLabel] = useState<string[]>([]);
  const [month, setMonth] = useState<string>(moment().format("MMMM"));
  const [allMonth, setAllMonth] = useState<string>("");
  const [dataset, setDataset] = useState<number[]>([]);
  const { authState } = useAuth();
  const { user } = useUser();

  async function loadPowerGenerated() {
    if (user && user?.inversors) {
      let invertersId: number[] = [];

      user?.inversors.forEach((inverter) => {
        if (inverter.active) {
          invertersId.push(inverter.id);
        }
      });

      const { data } = await api.get(`/power-generated`, {
        params: {
          userId: user.id,
          inverterId: invertersId[0],
          today: true,
        },
        headers: {
          Authorization: `Bearer ${authState.token}`,
        },
      });

      setDataset([]);
      setLabel([]);

      setAllMonth(data[data.length - 1].powerMonth);

      data.forEach((element: PowerGenerated) => {
        const parsedDate = moment(element.createdAt).format("HH");
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
    <View>
      {label.length > 0 && dataset.length > 0 && (
        <>
          <View className="m-4">
            <Text className="font-title text-3xl text-yellow-300">
              Previsão de geração
            </Text>
            <Text className="text-1xl font-regular text-gray-200">
              Previsão de geração para os próximos dias.
            </Text>
          </View>

          <View className="items-center">
            <BarChart
              data={{
                labels: label,
                datasets: [
                  {
                    data: dataset,
                  },
                ],
              }}
              yAxisSuffix="kW"
              yAxisLabel=""
              width={Dimensions.get("window").width - 40}
              height={280}
              chartConfig={{
                backgroundColor: "#7179A5",
                backgroundGradientFrom: `rgba(113, 121, 165, 100)`,
                backgroundGradientTo: `rgba(111, 119, 195, 0)`,
                color: (opacity = 1) => `rgba(248, 197, 81, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
                propsForDots: {
                  fill: "#FEA259",
                },
              }}
              style={{
                marginVertical: 8,
                borderRadius: 16,
              }}
            />
          </View>
        </>
      )}
    </View>
  );
}
