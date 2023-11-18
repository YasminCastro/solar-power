import { View, Text, TouchableOpacity } from "react-native";

import { AntDesign } from "@expo/vector-icons";
import Modal from "react-native-modal";

interface IProps {
  isModalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  text: string;
  title: string;
}

const SimpleModal: React.FC<IProps> = ({
  isModalVisible,
  setModalVisible,
  text,
  title,
}) => {
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <Modal isVisible={isModalVisible}>
      <View className="items-center justify-center rounded-lg bg-slate-200 p-4 shadow-lg">
        <View>
          <View className="flex flex-row justify-between">
            <Text className="text-xl font-bold">{title}</Text>
            <TouchableOpacity onPress={toggleModal}>
              <AntDesign name="closecircle" size={24} />
            </TouchableOpacity>
          </View>

          <View className="mt-4">
            <Text className="text-base">{text}</Text>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default SimpleModal;
