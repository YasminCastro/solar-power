import { Text, TouchableOpacity, View } from "react-native";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";

import { FontAwesome5 } from "@expo/vector-icons";
import { FlatList, TextInput } from "react-native-gesture-handler";
import { useState } from "react";
import { IStepSettings } from "../../../../../screens/Settings";
import InverterBlock from "./InverterBlock/Index";
import { IStepInverter } from "../Index";
import { useInverter } from "../../../../../contexts/inverter";

interface IProps {
  setCardActive: React.Dispatch<React.SetStateAction<IStepSettings>>;
  setInverterCardActive: React.Dispatch<React.SetStateAction<IStepInverter>>;
  setInverterId: React.Dispatch<React.SetStateAction<string>>;
}

//TODO: arrumar css
// TODO: Procurar um icone de lupa para colocar na pesquisa dsos inversores
// TODO: Arrumar botão de adicionar um novo inversor

const ListInverters: React.FC<IProps> = ({
  setCardActive,
  setInverterCardActive,
  setInverterId,
}) => {
  const { inverters } = useInverter();
  const [search, setSearch] = useState("");

  const filteredInverters = inverters?.filter((el) => {
    if (!search) {
      return inverters;
    }

    return el.name.toLocaleLowerCase().includes(search.toLocaleLowerCase());
  });

  return (
    <View>
      <TouchableOpacity onPress={() => setCardActive("settings")}>
        <AntDesign name="arrowleft" size={30} color="white" />
      </TouchableOpacity>
      <View className="flex flex-row items-center justify-between">
        <View>
          <View className="flex flex-row gap-3">
            <FontAwesome5 name="solar-panel" size={30} color="#febe3d" />
            <Text className="font-title text-3xl text-yellow-300">
              Inversores
            </Text>
          </View>

          <Text className="font-regular text-gray-200">
            Inversores cadastrados no app
          </Text>
        </View>

        <TouchableOpacity onPress={() => setInverterCardActive("create")}>
          <MaterialIcons name="my-library-add" size={30} color="#febe3d" />
        </TouchableOpacity>
      </View>

      {filteredInverters && (
        <View className="mt-4">
          <TextInput
            className="mb-4 h-12 w-full rounded-sm border border-white bg-transparent px-4 font-regular text-white"
            placeholderTextColor="#ffff"
            placeholder="Buscar Inversores"
            autoCapitalize="none"
            onChangeText={(text) => setSearch(text)}
          />

          {filteredInverters.length > 0 ? (
            <FlatList
              data={filteredInverters}
              renderItem={({ item }) => (
                <InverterBlock
                  key={item.name}
                  inverter={item}
                  setInverterCardActive={setInverterCardActive}
                  setInverterId={setInverterId}
                />
              )}
            ></FlatList>
          ) : (
            <Text className="mt-4 text-xl text-white">
              Nenhum inversor encontrado.
            </Text>
          )}
        </View>
      )}

      {!inverters && (
        <Text className="mt-4 text-xl text-white">
          Nenhum inversor cadastrado.
          <TouchableOpacity onPress={() => setInverterCardActive("create")}>
            <MaterialIcons name="my-library-add" size={30} color="#febe3d" />
          </TouchableOpacity>
        </Text>
      )}
    </View>
  );
};

export default ListInverters;
