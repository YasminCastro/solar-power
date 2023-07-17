import { Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { Feather } from "@expo/vector-icons";

interface IProps {
  setEditItem: React.Dispatch<
    React.SetStateAction<{
      edit: boolean;
      inverterId: string | null;
    }>
  >;
}

const EditInverter = ({ setEditItem }: IProps) => {
  return (
    <View className="">
      <Text className="font-regular text-gray-200">Editar inversor</Text>
      <TouchableOpacity>
        <Feather
          name="x"
          size={24}
          color="white"
          onPress={() => setEditItem({ edit: false, inverterId: null })}
        />
      </TouchableOpacity>
    </View>
  );
};

export default EditInverter;
