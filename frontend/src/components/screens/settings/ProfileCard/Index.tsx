import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { IStepSettings } from "../../../../screens/Settings";
import { AntDesign } from "@expo/vector-icons";

interface IProps {
  setCardActive: React.Dispatch<React.SetStateAction<IStepSettings>>;
}

const ProfileCard: React.FC<IProps> = ({ setCardActive }) => {
  return (
    <View>
      <TouchableOpacity onPress={() => setCardActive("settings")} className="">
        <AntDesign name="arrowleft" size={30} color="white" />
      </TouchableOpacity>
      <Text className="text-white">EDITAR PROFILE</Text>
    </View>
  );
};

export default ProfileCard;
