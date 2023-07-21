import { Text, TouchableOpacity, View } from "react-native";
import { IStepSettings } from "../../../../screens/Settings";
import { AntDesign } from "@expo/vector-icons";

interface IProps {
  setCardActive: React.Dispatch<React.SetStateAction<IStepSettings>>;
}

//TODO: editar perfil

const ProfileCard: React.FC<IProps> = ({ setCardActive }) => {
  return (
    <View>
      <TouchableOpacity onPress={() => setCardActive("settings")} className="">
        <AntDesign name="arrowleft" size={30} color="white" />
      </TouchableOpacity>
      <Text className="text-white">EDITAR PERFIL</Text>
    </View>
  );
};

export default ProfileCard;
