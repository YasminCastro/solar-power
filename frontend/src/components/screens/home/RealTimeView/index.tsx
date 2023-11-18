import { View, Text, TouchableOpacity } from "react-native";
import { useEffect } from "react";
import { useInverter } from "../../../../contexts/inverter";
import { useState } from "react";
import { IPowerGenerated } from "../../../../interfaces/powerGenerated";
import { getPowerGeneratedRealTime } from "../../../../services/powerGenerated";
import CircleChart from "./CircleChart";
import SemiCircleText from "./SemiCircleText";
import { Entypo } from "@expo/vector-icons";
import SimpleModal from "../../../global/SimpleModal";

export default function RealTimeView() {
  const { activeInverters } = useInverter();
  const [powerGenerated, setPowerGenerated] = useState<IPowerGenerated | null>(
    null
  );
  const [maxValue, setMaxValue] = useState<number>(100);
  const [isTodayModalVisible, setTodayModalVisible] = useState(false);
  const [isMonthModalVisible, setMonthModalVisible] = useState(false);

  async function loadPowerGenerated() {
    if (activeInverters[0]) {
      let maxPower = activeInverters
        .map((inverter) => inverter.maxRealTimePower)
        .reduce((accumulator, currentValue) => accumulator + currentValue, 0);

      setMaxValue(maxPower);

      const data = await getPowerGeneratedRealTime(activeInverters[0]._id);
      setPowerGenerated(data);
    }
  }

  useEffect(() => {
    loadPowerGenerated();
  }, [activeInverters]);

  if (powerGenerated) {
    return (
      <View className="m-8">
        <CircleChart
          realTimePower={powerGenerated.powerInRealTime}
          maxValue={maxValue}
        />
        <View className="mt-8 flex flex-row justify-around">
          <View className="flex flex-row">
            <SemiCircleText
              number={powerGenerated.powerToday}
              text="Produção hoje"
            />
            <TouchableOpacity
              onPress={() => {
                setTodayModalVisible(true);
              }}
            >
              <Entypo name="info-with-circle" size={16} color="white" />
            </TouchableOpacity>
          </View>

          <View className="flex flex-row">
            <SemiCircleText
              number={powerGenerated.powerMonth}
              text="Produção mensal"
            />
            <TouchableOpacity
              onPress={() => {
                setMonthModalVisible(true);
              }}
            >
              <Entypo name="info-with-circle" size={16} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        <SimpleModal
          isModalVisible={isTodayModalVisible}
          setModalVisible={setTodayModalVisible}
          title={"Produção Diária de Energia"}
          text={
            "Aqui você encontra a quantidade total de energia produzida pelo seu sistema solar hoje, até o momento atual. O valor está em quilowatt-hora (kWh), que representa a energia gerada ao longo do dia."
          }
        />

        <SimpleModal
          isModalVisible={isMonthModalVisible}
          setModalVisible={setMonthModalVisible}
          title={"Produção Mensal de Energia"}
          text={
            "Este número mostra a quantidade de energia que seu sistema está gerando neste exato momento, medida em quilowatts (kW). É uma ótima maneira de acompanhar o desempenho instantâneo do seu sistema de energia solar."
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
