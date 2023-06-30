import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { useState } from "react";
import { Feather } from "@expo/vector-icons";
import IInverter from "../../../interfaces/inverter";
import { useAuth } from "../../../contexts/AuthContext";
import api from "../../../lib/api";

interface IProps {
  inverter: IInverter;
  setEditItem: React.Dispatch<
    React.SetStateAction<{
      edit: boolean;
      inverterId: string | null;
    }>
  >;
}

const Inverters = ({ inverter, setEditItem }: IProps) => {
  const [active, setActive] = useState(inverter.active);
  const [loading, setLoading] = useState(false);
  const { authState } = useAuth();

  const handleOnPress = async () => {
    try {
      setLoading(true);
      const newActiveStatus = !active;

      await api.put(
        `/inverters/${inverter._id}`,
        {
          active: newActiveStatus,
        },
        {
          headers: {
            Authorization: `Bearer ${authState.token}`,
          },
        }
      );

      setActive(newActiveStatus);
    } catch (error) {
      console.log("Erro ao atualizar inverter");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className=" mx-8 my-4 h-24 w-80 rounded-md bg-white">
      <View className="flex flex-row justify-between p-4">
        <View>
          <Text className="font-title text-2xl text-blueDark-300">
            {inverter.name}
          </Text>
          <Text className="text-base font-medium uppercase text-blueDark-300">
            {inverter.model}
          </Text>
        </View>
        <View className="flex flex-col justify-evenly gap-3">
          <TouchableOpacity>
            <Feather
              name="edit"
              size={24}
              color="black"
              onPress={() =>
                setEditItem({ edit: true, inverterId: inverter._id })
              }
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleOnPress()}>
            {loading ? (
              <ActivityIndicator size="small" color="#FEBE3D" />
            ) : (
              <Feather
                name={active ? "eye" : "eye-off"}
                size={24}
                color="black"
              />
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Inverters;
