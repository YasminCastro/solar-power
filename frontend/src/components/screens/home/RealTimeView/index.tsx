import { View, Text, TouchableOpacity } from "react-native";
import { useEffect } from "react";
import { useInverter } from "../../../../contexts/inverter";
import { useState } from "react";
import { IPowerGenerated } from "../../../../interfaces/powerGenerated";
import { getPowerGeneratedRealTime } from "../../../../services/powerGenerated";
import CircleChart from "./CircleChart";
import SemiCircleText from "./SemiCircleText";
import { Entypo } from "@expo/vector-icons";

export default function RealTimeView() {
  const { activeInverters } = useInverter();
  const [powerGenerated, setPowerGenerated] = useState<IPowerGenerated | null>(
    null
  );
  const [maxValue, setMaxValue] = useState<number>(100);

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

  if (powerGenerated && powerGenerated.powerInRealTime) {
    return (
      <View className="m-8">
        <CircleChart
          realTimePower={powerGenerated.powerInRealTime}
          maxValue={maxValue}
        />
        <View className="mt-8 flex flex-row justify-around">
          <View className="flex flex-row">
            <SemiCircleText
              number={`${powerGenerated.powerToday}kWh`}
              text="Produção hoje"
            />
            <TouchableOpacity onPress={() => console.log("Info produção")}>
              <Entypo name="info-with-circle" size={16} color="white" />
            </TouchableOpacity>
          </View>

          <View className="flex flex-row">
            <SemiCircleText
              number={`${powerGenerated.powerMonth}kWh`}
              text="Produção mensal"
            />
            <TouchableOpacity onPress={() => console.log("Info produção")}>
              <Entypo name="info-with-circle" size={16} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  return <Text className="text-white">Nenhum dado encontrado.</Text>;
}
