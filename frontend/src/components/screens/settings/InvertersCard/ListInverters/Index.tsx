import { Text, TouchableOpacity, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";

import { FontAwesome5 } from "@expo/vector-icons";
import { TextInput } from "react-native-gesture-handler";
import { useState } from "react";
import { IStepSettings } from "../../../../../screens/Settings";
import { useAuth } from "../../../../../contexts/auth";
import InverterBlock from "../InverterBlock/Index";

interface IProps {
  setCardActive: React.Dispatch<React.SetStateAction<IStepSettings>>;
  setEditItem: React.Dispatch<React.SetStateAction<any>>;
}

const ListInverters: React.FC<IProps> = ({ setCardActive, setEditItem }) => {
  const { user } = useAuth();
  const inverters = user?.inverters;
  const [search, setSearch] = useState("");

  return (
    <View>
      <TouchableOpacity onPress={() => setCardActive("settings")}>
        <AntDesign name="arrowleft" size={30} color="white" />
      </TouchableOpacity>
      <View className="flex flex-row items-center justify-between">
        <View>
          <Text className="font-title text-3xl text-yellow-300">
            Inversores
          </Text>
          <Text className="font-regular text-gray-200">
            Inversores cadastrados no app
          </Text>
        </View>
        <FontAwesome5 name="solar-panel" size={30} color="#febe3d" />
      </View>
      <View className="mt-4">
        <TextInput
          className="mb-4 h-12 w-full rounded-sm border border-white bg-transparent px-4 font-regular text-white"
          placeholderTextColor="#ffff"
          placeholder="Buscar Inversores"
          autoCapitalize="none"
          onChangeText={(text) => setSearch(text)}
        />
        {inverters &&
          inverters.map((inverter) => (
            <InverterBlock
              key={inverter.name}
              inverter={inverter}
              setEditItem={setEditItem}
            />
          ))}
      </View>
    </View>
  );
};

export default ListInverters;
