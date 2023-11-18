import { View, Text, TouchableOpacity } from "react-native";
import CircularProgress from "react-native-circular-progress-indicator";
import { Entypo } from "@expo/vector-icons";
import { useState } from "react";
import SimpleModal from "../../../../global/SimpleModal";

interface IProps {
  realTimePower: number;
  maxValue: number;
}

export default function CircleChart({ realTimePower, maxValue }: IProps) {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <View className="items-center">
      <View className="flex flex-row">
        <CircularProgress
          value={realTimePower}
          radius={100}
          delay={5}
          duration={2000}
          progressValueColor="#FFFFFF"
          maxValue={maxValue}
          title={"kW"}
          titleColor={"white"}
          titleStyle={{ fontWeight: "bold" }}
          activeStrokeColor="#FBCF24"
          inActiveStrokeColor="#5E6795"
          inActiveStrokeOpacity={0.5}
          inActiveStrokeWidth={30}
          activeStrokeWidth={30}
          activeStrokeSecondaryColor="#FDA933"
        />
        <TouchableOpacity onPress={toggleModal}>
          <Entypo name="info-with-circle" size={18} color="white" />
        </TouchableOpacity>
      </View>
      <Text className="mt-3 font-body text-xl text-gray-50">Tempo real</Text>
      <SimpleModal
        isModalVisible={isModalVisible}
        setModalVisible={setModalVisible}
        title={"Energia em Tempo Real"}
        text={
          "Este número mostra a quantidade de energia que seu sistema está gerando neste exato momento, medida em quilowatts (kW). É uma ótima maneira de acompanhar o desempenho instantâneo do seu sistema de energia solar."
        }
      />
    </View>
  );
}
