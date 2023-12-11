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
import SimpleModal from "../../../global/SimpleModal";

interface IProps {
  refresh: boolean;
}

export default function TodayGraph({ refresh }: IProps) {
  const { activeInverters } = useInverter();
  const [label, setLabel] = useState<string[]>([]);
  const [dataset, setDataset] = useState<number[]>([]);
  const [isModalVisible, setModalVisible] = useState(false);

  async function loadPowerGenerated() {
    if (activeInverters[0]) {
      const data = await powerGeneratedApi.getToday(activeInverters[0]._id);
      setLabel([]);
      setDataset([]);

      const dataFilterd = filterByHour(data);

      dataFilterd.forEach((element: IPowerGenerated) => {
        const parsedDate = moment(element.createdAt).format("H[h]");
        const parseData = element.powerInRealTime;

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
        <View className="flex flex-row gap-4">
          <Text className="font-body text-sm text-gray-50">Produção hoje</Text>

          <TouchableOpacity
            onPress={() => {
              setModalVisible(true);
            }}
          >
            <Entypo name="info-with-circle" size={16} color="white" />
          </TouchableOpacity>
        </View>
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
          formatYLabel={(yLabel) => `${yLabel}kWh`}
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

        <SimpleModal
          isModalVisible={isModalVisible}
          setModalVisible={setModalVisible}
          title={"Produção Hoje"}
          text={`Este gráfico ilustra a quantidade de energia que seu sistema de energia solar gerou em cada hora do dia. Os valores são apresentados em quilowatts-hora (kWh), permitindo que você visualize como a eficiência do sistema varia com as condições de luz solar ao longo do dia.`}
        />
      </View>
    );
  }

  return <View></View>;
}
