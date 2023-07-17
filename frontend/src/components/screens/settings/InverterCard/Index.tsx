import { Text, TouchableOpacity, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";

import { useAuth } from "../../../../contexts/auth";
import { IStepSettings } from "../../../../screens/Settings";

interface IProps {
  setCardActive: React.Dispatch<React.SetStateAction<IStepSettings>>;
}

const InverterCard: React.FC<IProps> = ({ setCardActive }) => {
  const { signOut } = useAuth();

  return (
    <View>
      <TouchableOpacity onPress={() => setCardActive("settings")} className="">
        <AntDesign name="arrowleft" size={30} color="white" />
      </TouchableOpacity>
      <Text className="text-white">EDITAR INVERSOR</Text>
    </View>
  );
};

export default InverterCard;
