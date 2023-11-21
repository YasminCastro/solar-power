import { View, Text, TouchableOpacity } from "react-native";

import { AntDesign } from "@expo/vector-icons";
import Modal from "react-native-modal";

interface IProps {
  isModalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  text: string;
  title: string;
  icon: any;
}

const AchievementsModal: React.FC<IProps> = ({
  isModalVisible,
  setModalVisible,
  text,
  title,
  icon,
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
          <View className="m-4 items-center">{icon}</View>
          <View>
            <Text className="text-base">{text}</Text>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AchievementsModal;
