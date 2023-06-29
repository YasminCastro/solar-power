import { View, TouchableOpacity } from "react-native";
import CircleChart from "./CircleChart";
import { useEffect, useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { useUser } from "../../../contexts/UserContext";
import PowerGenerated from "../../../interfaces/powerGenerated";
import api from "../../../lib/api";
import SemiCircleText from "../../Global/SemiCircleText";
import { Entypo } from "@expo/vector-icons";

export default function RealTimeView() {
  const [powerGenerated, setPowerGenerated] = useState<PowerGenerated | null>(
    null
  );
  const [maxValue, setMaxValue] = useState<number>(100);
  const { authState } = useAuth();
  const { user, userInverters } = useUser();

  async function loadPowerGenerated() {
    if (userInverters) {
      let maxPower = userInverters
        .filter((inverter) => inverter.active)
        .map((inverter) => inverter.maxRealTimePower)
        .reduce((accumulator, currentValue) => accumulator + currentValue, 0);

      setMaxValue(maxPower);

      let invertersId = userInverters
        .filter((inverter) => inverter.active)
        .map((inverter) => inverter._id)
        .join(",");

      const { data } = await api.get(`/power-generated/real-time`, {
        params: { invertersId },
        headers: {
          Authorization: `Bearer ${authState.token}`,
        },
      });

      setPowerGenerated(data);
    }
  }

  useEffect(() => {
    loadPowerGenerated();
  }, [user]);

  return (
    <View className="mt-8">
      {powerGenerated && (
        <>
          <CircleChart
            realTimePower={powerGenerated.powerInRealTime}
            maxValue={maxValue}
          />

          <View className="mt-8 flex flex-row justify-around">
            <View className="flex flex-row">
              <SemiCircleText
                number={`${powerGenerated.tempC}°`}
                text="Temperatura"
              />
              <TouchableOpacity onPress={() => console.log("Info temp")}>
                <Entypo name="info-with-circle" size={16} color="white" />
              </TouchableOpacity>
            </View>

            <View className="flex flex-row">
              <SemiCircleText
                number={powerGenerated.powerToday}
                text="Produção hoje"
              />
              <TouchableOpacity onPress={() => console.log("Info produção")}>
                <Entypo name="info-with-circle" size={16} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        </>
      )}
    </View>
  );
}
