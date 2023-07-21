import { Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";
import { IStepInverter } from "../Index";

interface IProps {
  setInverterCardActive: React.Dispatch<React.SetStateAction<IStepInverter>>;
}

const CreateInverter = ({ setInverterCardActive }: IProps) => {
  return (
    <View className="">
      <Text className="font-regular text-gray-200">Criar inversor</Text>
      <TouchableOpacity>
        <Feather
          name="x"
          size={24}
          color="white"
          onPress={() => setInverterCardActive("list")}
        />
      </TouchableOpacity>
    </View>
  );
};

export default CreateInverter;
