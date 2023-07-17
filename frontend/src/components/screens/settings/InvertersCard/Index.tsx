import { Text, TouchableOpacity, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";

import { useAuth } from "../../../../contexts/auth";
import { IStepSettings } from "../../../../screens/Settings";
import { FontAwesome5 } from "@expo/vector-icons";
import InverterBlock from "./Inverter/Index";

interface IProps {
  setCardActive: React.Dispatch<React.SetStateAction<IStepSettings>>;
}

const InverterCard: React.FC<IProps> = ({ setCardActive }) => {
  const { user } = useAuth();
  const inverters = user?.inverters;

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
      <View>
        <Text className="text-white">Search Bar</Text>
      </View>
      {inverters &&
        inverters.map((inverter) => <InverterBlock inverter={inverter} />)}
    </View>
  );
};

export default InverterCard;
