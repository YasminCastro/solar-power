import { View, Text, TouchableOpacity } from "react-native";

import { AntDesign } from "@expo/vector-icons";
import Modal from "react-native-modal";
import { useState } from "react";
import Toast from "react-native-toast-message";
import * as invertersApi from "../../../../../services/inverters";

interface IProps {
  isModalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  inverterId: string;
}

const DeleteModal: React.FC<IProps> = ({
  isModalVisible,
  setModalVisible,
  title,
  inverterId,
}) => {
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const [loading, setLoading] = useState(false);

  const handleDeleteInverter = async (inverterId: string) => {
    setLoading(true);
    try {
      const response = await invertersApi.deleteInverter(inverterId);
      if (response.message === "Inverter successfully deleted") {
        Toast.show({
          type: "success",
          text1: "Inversor deletado com sucesso.",
        });
      }
      toggleModal();
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Erro ao criar inversor, tente novamente mais tarde.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isVisible={isModalVisible}>
      <View className="rounded-lg bg-slate-200 p-4 shadow-lg">
        <View>
          <View className="flex flex-row justify-between">
            <Text className="text-xl font-bold">{title}</Text>
            <TouchableOpacity onPress={toggleModal}>
              <AntDesign name="closecircle" size={24} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            className="mt-10 flex h-10 flex-row items-center  rounded-full bg-solar-100 px-6"
            onPress={() => {
              handleDeleteInverter(inverterId);
            }}
            disabled={loading}
          >
            <View className="flex flex-1 items-center">
              <Text className="font-body text-base text-solar-500">
                {loading ? "Carregando..." : "Deletar"}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default DeleteModal;
