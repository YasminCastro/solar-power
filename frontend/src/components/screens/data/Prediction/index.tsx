import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import { useEffect } from "react";
import { useInverter } from "../../../../contexts/inverter";
import { useState } from "react";
import { IPowerGenerated } from "../../../../interfaces/powerGenerated";
import * as powerGeneratedApi from "../../../../services/powerGenerated";
import { filterByHour } from "../../../../utils/dataFilter";
import moment from "moment";
import { AntDesign } from "@expo/vector-icons";

import { LineChart } from "react-native-chart-kit";
import CircleData from "../CircleData";

import { MaterialIcons } from "@expo/vector-icons";

// TODO: css

export default function Prediction() {
  const { activeInverters } = useInverter();
  const [label, setLabel] = useState<string[]>([]);
  const [dataset, setDataset] = useState<number[]>([]);
  const [allMonth, setAllMonth] = useState<number>(0);
  const [month, setMonth] = useState<string>(moment().format("MMMM"));

  async function loadPowerGenerated() {
    if (activeInverters[0]) {
      const data = await powerGeneratedApi.getMonth(activeInverters[0]._id);
      setLabel([]);
      setDataset([]);

      const dataFilterd = filterByHour(data);

      dataFilterd.forEach((element: IPowerGenerated) => {
        const parsedDate = moment(element.createdAt, "YYYY-MM-DD HH:mm").format(
          "HH"
        );
        const parseData = element.powerInRealTime;
        setAllMonth(element.powerMonth);

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
        <View className="m-4 flex flex-row justify-between">
          <Text className="font-title text-2xl text-yellow-300">
            Produção mensal
          </Text>
          <TouchableOpacity>
            <AntDesign name="calendar" size={24} color="grey" />
          </TouchableOpacity>
        </View>
        <View className="items-center">
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
            fromZero
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
            Produção de {month}
          </Text>
        </View>
        <View className="mt-10 flex flex-row justify-around">
          <CircleData
            text="Produção do mês"
            data={allMonth.toString()}
            icon={<MaterialIcons name="highlight" size={50} color="#0F1E44" />}
          />
          <CircleData
            text="Economias"
            data="R$300"
            icon={
              <MaterialIcons name="attach-money" size={50} color="#0F1E44" />
            }
          />
        </View>
      </View>
    );
  }

  return (
    <Text className="text-center text-lg text-white">
      Nenhum dado encontrado.
    </Text>
  );
}
