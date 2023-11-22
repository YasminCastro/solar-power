import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";

import { FontAwesome5 } from "@expo/vector-icons";
import { FlatList, TextInput } from "react-native-gesture-handler";
import { useState } from "react";
import { IStepSettings } from "../../../../../screens/Settings";
import { IStepInverter } from "../Index";
import { useInverter } from "../../../../../contexts/inverter";
import { IInverter } from "../../../../../interfaces/inverter";
import { Feather } from "@expo/vector-icons";
import DeleteModal from "./DeleteModal";

interface IProps {
  setCardActive: React.Dispatch<React.SetStateAction<IStepSettings>>;
  setInverterCardActive: React.Dispatch<React.SetStateAction<IStepInverter>>;
  setInverterId: React.Dispatch<React.SetStateAction<string>>;
  setInverter: React.Dispatch<React.SetStateAction<IInverter | null>>;
}

//TODO: arrumar css
// TODO: Procurar um icone de lupa para colocar na pesquisa dsos inversores
// TODO: Arrumar botão de adicionar um novo inversor

const ListInverters: React.FC<IProps> = ({
  setCardActive,
  setInverterCardActive,
  setInverter,
}) => {
  const { inverters } = useInverter();
  const [search, setSearch] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);

  const filteredInverters = inverters?.filter((el) => {
    if (!search) {
      return inverters;
    }

    return el.name.toLocaleLowerCase().includes(search.toLocaleLowerCase());
  });

  const handleEditInverter = async (inverter: IInverter) => {
    setInverter(inverter);
    setInverterCardActive("edit");
  };

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
              renderItem={({ item }) => {
                return (
                  <View className="w-full items-center" key={item._id}>
                    <View className=" mx-8 my-4 h-24 w-full rounded-md bg-white">
                      <View className="flex flex-row justify-between p-4">
                        <View>
                          <Text className="font-title text-2xl text-blueDark-300">
                            {item.name}
                          </Text>
                          <Text className="text-base font-medium uppercase text-blueDark-300">
                            {item.model}
                          </Text>
                        </View>
                        <View className="flex flex-col justify-evenly gap-3">
                          <TouchableOpacity>
                            <Feather
                              name="edit"
                              size={24}
                              color="black"
                              onPress={() => handleEditInverter(item)}
                            />
                          </TouchableOpacity>
                          {/* <TouchableOpacity
                            onPress={() => handleEditInverter(item)}
                          >
                            {loading ? (
                              <ActivityIndicator size="small" color="#FEBE3D" />
                            ) : (
                              <Feather
                                name={item.active ? "eye" : "eye-off"}
                                size={24}
                                color="black"
                              />
                            )}
                          </TouchableOpacity> */}

                          <TouchableOpacity
                            onPress={() => setModalVisible(true)}
                          >
                            <Feather
                              name={item.active ? "trash" : "eye-off"}
                              size={24}
                              color="black"
                            />
                          </TouchableOpacity>
                          <DeleteModal
                            isModalVisible={isModalVisible}
                            setModalVisible={setModalVisible}
                            title={`Deseja deletar o inversor: ${item.name}`}
                            inverterId={item._id}
                          />
                        </View>
                      </View>
                    </View>
                  </View>
                );
              }}
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
