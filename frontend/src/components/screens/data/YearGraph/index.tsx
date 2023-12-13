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

export default function YearGraph() {
  const { activeInverters } = useInverter();
  const [label, setLabel] = useState<string[]>([]);
  const [dataset, setDataset] = useState<number[]>([]);
  const [allYear, setAllYear] = useState<number>(0);
  const [isMonthModalVisible, setMonthModalVisible] = useState(false);
  const [isEconomyModalVisible, setEconomyModalVisible] = useState(false);

  async function loadPowerGenerated() {
    if (activeInverters[0]) {
      const data = await powerGeneratedApi.getYear(activeInverters[0]._id);
      setLabel([]);
      setDataset([]);

      data.forEach((element: IPowerGenerated) => {
        const parsedDate = moment(element.createdAt).format("MM");
        let powerMonth = element.powerMonth;
        setAllYear(element.powerYear);

        if (typeof element.powerMonth === "string") {
          powerMonth = parseInt(element.powerMonth); //remove this later
        }

        setLabel((prev) => [...prev, parsedDate]);
        setDataset((prev) => [...prev, powerMonth]);
      });
    }
  }

  useEffect(() => {
    loadPowerGenerated();
  }, [activeInverters]);

  if (label.length > 0 && dataset.length > 0) {
    return (
      <View className="items-center">
        <View className="m-4 flex flex-row gap-3">
          <Text className="font-title text-2xl text-yellow-300">
            Produção Anual
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
            formatYLabel={(yLabel) => `${parseInt(yLabel)}kWh`}
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
            Produção de {moment().format("YYYY")}
          </Text>
        </View>
        <View className="mt-10 flex w-full flex-row justify-around">
          <TouchableOpacity
            onPress={() => {
              setMonthModalVisible(true);
            }}
          >
            <CircleData
              text="Produção do ano"
              data={`${allYear} kWh`}
              icon={
                <MaterialIcons name="highlight" size={50} color="#0F1E44" />
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
              data={`R$ ${calculateEnergySavings(allYear).toString()}`}
              icon={
                <MaterialIcons name="attach-money" size={50} color="#0F1E44" />
              }
            />
          </TouchableOpacity>
        </View>

        <SimpleModal
          isModalVisible={isMonthModalVisible}
          setModalVisible={setMonthModalVisible}
          title={"Produção Anual de Energia"}
          text={
            "O valor exibido reflete a energia total gerada pelo seu sistema de energia solar ao longo do ano, em quilowatt-hora (kWh). Esta métrica é crucial para entender a eficiência e o impacto a longo prazo do seu investimento em energia renovável. Além de proporcionar uma visão geral do desempenho anual, permite-lhe avaliar a contribuição do seu sistema para a sustentabilidade e a independência energética ao longo das estações do ano."
          }
        />
        <SimpleModal
          isModalVisible={isEconomyModalVisible}
          setModalVisible={setEconomyModalVisible}
          title={"Economia Anual Acumulada"}
          text={
            "Este valor oferece uma estimativa de quanto você pode ter economizado este ano com a energia produzida pelo seu sistema fotovoltaico. A economia é estimada multiplicando a energia gerada (em kWh) pela tarifa convencional de energia elétrica em Goiás, que é de R$0,71 por kWh, conforme estabelecido pela ANEEL em 2023.\n\nLembre-se de que esta é uma estimativa, e pequenas variações podem ocorrer devido a mudanças na tarifação ou no seu padrão de consumo. \n\nEste número reflete o impacto positivo do seu investimento em energia solar, tanto financeiramente quanto para o meio ambiente."
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
