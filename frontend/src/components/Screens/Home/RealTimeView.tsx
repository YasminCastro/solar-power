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
  const { user } = useUser();

  async function loadPowerGenerated() {
    if (user && user?.inversors) {
      let invertersId: number[] = [];
      let maxValuSum = 0;

      user?.inversors.forEach((inverter) => {
        if (inverter.active) {
          maxValuSum += inverter.maxRealTimePower;
        }
      });
      setMaxValue(maxValuSum);

      let params: any = { userId: user.id };
      if (invertersId.length === 1) {
        params.inverterId = invertersId[0].toString();
        params.limit = 1;
      } else if (invertersId.length > 1) {
        params.invertersId = invertersId.toString();
      }

      const { data } = await api.get(`/power-generated`, {
        params,
        headers: {
          Authorization: `Bearer ${authState.token}`,
        },
      });

      setPowerGenerated(data[0]);
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
