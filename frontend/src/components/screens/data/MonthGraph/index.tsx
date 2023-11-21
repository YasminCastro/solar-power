import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import { useEffect } from "react";
import { useInverter } from "../../../../contexts/inverter";
import { useState } from "react";
import { IPowerGenerated } from "../../../../interfaces/powerGenerated";
import * as powerGeneratedApi from "../../../../services/powerGenerated";
import moment from "moment";
import { AntDesign } from "@expo/vector-icons";

import { LineChart } from "react-native-chart-kit";
import CircleData from "../CircleData";

import { MaterialIcons } from "@expo/vector-icons";
import calculateEnergySavings from "../../../../utils/calculateEnergySavings";
import SimpleModal from "../../../global/SimpleModal";

export default function MonthGraph() {
  const { activeInverters } = useInverter();
  const [label, setLabel] = useState<string[]>([]);
  const [dataset, setDataset] = useState<number[]>([]);
  const [allMonth, setAllMonth] = useState<number>(0);
  const [month, setMonth] = useState<string>(moment().format("MMMM"));
  const [isMonthModalVisible, setMonthModalVisible] = useState(false);
  const [isEconomyModalVisible, setEconomyModalVisible] = useState(false);

  async function loadPowerGenerated() {
    if (activeInverters[0]) {
      const data = await powerGeneratedApi.getMonth(activeInverters[0]._id);
      setLabel([]);
      setDataset([]);

      data.forEach((element: IPowerGenerated) => {
        const parsedDate = moment(element.createdAt).format("DD");
        const parseData = element.powerToday;

        setAllMonth(element.powerMonth);

        if (typeof parseData === "string") return; // remove this later

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
        <View className="m-4 flex flex-row gap-3">
          <Text className="font-title text-2xl text-yellow-300">
            Produção Mensal
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
            formatYLabel={(yLabel) => `${yLabel}kWh`}
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
            Rendimento {month}
          </Text>
        </View>
        <View className="mt-10 flex w-full flex-row justify-around ">
          <TouchableOpacity
            onPress={() => {
              setMonthModalVisible(true);
            }}
          >
            <CircleData
              text="Rendimento do mês"
              data={`${allMonth} kWh`}
              icon={
                <MaterialIcons name="highlight" size={45} color="#0F1E44" />
              }
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setEconomyModalVisible(true);
            }}
          >
            <CircleData
              text="Economias"
              data={`R$ ${calculateEnergySavings(allMonth).toString()}`}
              icon={
                <MaterialIcons name="attach-money" size={45} color="#0F1E44" />
              }
            />
          </TouchableOpacity>
        </View>

        <SimpleModal
          isModalVisible={isMonthModalVisible}
          setModalVisible={setMonthModalVisible}
          title={"Produção Mensal de Energia"}
          text={
            "Este número mostra a quantidade de energia que seu sistema está gerando neste exato momento, medida em quilowatts (kW). É uma ótima maneira de acompanhar o desempenho instantâneo do seu sistema de energia solar."
          }
        />
        <SimpleModal
          isModalVisible={isEconomyModalVisible}
          setModalVisible={setEconomyModalVisible}
          title={"Economia Mensal Acumulada"}
          text={
            "Este valor indica uma estimativa aproximada de quanto você pode ter economizado este mês com a energia produzida pelo seu sistema solar. A economia é calculada multiplicando a energia gerada (em kWh) pelo custo unitário de R$0,67 por kWh.  \n\nLembre-se de que este é um valor estimado, e pequenas variações podem ocorrer devido a mudanças na tarifação ou no padrão de consumo. \n\nEste número é um reflexo direto do impacto positivo que seu investimento em energia solar está trazendo para o seu bolso e para o planeta."
          }
        />
      </View>
    );
  }

  return (
    <Text className="text-center text-lg text-white">
      Nenhum dado encontrado.
    </Text>
  );
}
