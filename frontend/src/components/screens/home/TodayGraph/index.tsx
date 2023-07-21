import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import { useEffect } from "react";
import { useInverter } from "../../../../contexts/inverter";
import { useState } from "react";
import { IPowerGenerated } from "../../../../interfaces/powerGenerated";
import * as powerGeneratedApi from "../../../../services/powerGenerated";
import { Entypo } from "@expo/vector-icons";
import { filterByHour } from "../../../../utils/dataFilter";
import moment from "moment";
import { LineChart } from "react-native-chart-kit";

export default function TodayGraph() {
  const { activeInverters } = useInverter();
  const [powerGenerated, setPowerGenerated] = useState<IPowerGenerated | null>(
    null
  );
  const [label, setLabel] = useState<string[]>([]);
  const [dataset, setDataset] = useState<number[]>([]);

  async function loadPowerGenerated() {
    if (activeInverters[0]) {
      const data = await powerGeneratedApi.getToday(activeInverters[0]._id);
      setLabel([]);
      setDataset([]);

      const dataFilterd = filterByHour(data);

      dataFilterd.forEach((element: IPowerGenerated) => {
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
  }, [activeInverters]);

  if (label.length > 0 && dataset.length > 0) {
    return (
      <View className="mt-4 items-center">
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
        <Text className="font-body text-sm text-gray-50">Rendimento hoje</Text>
      </View>
    );
  }

  return <Text className="text-white">Nenhum dado encontrado.</Text>;
}
