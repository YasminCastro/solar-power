import { Text, View } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";
import { IStepInverter } from "../Index";

interface IProps {
  setInverterCardActive: React.Dispatch<React.SetStateAction<IStepInverter>>;
}

const CreateInverter = ({ setInverterCardActive }: IProps) => {
  return (
    <View>
      <View className="flex flex-row items-center justify-between">
        <Text className="font-title text-2xl text-yellow-300">
          Criar inversor
        </Text>
        <Feather
          name="x"
          size={24}
          color="white"
          onPress={() => setInverterCardActive("list")}
        />
      </View>
    </View>
  );
};

export default CreateInverter;
