import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import moment from "moment";
import { useAuth } from "../../../../contexts/auth";
import { useInverter } from "../../../../contexts/inverter";

export default function RealTimeView() {
  const { user } = useAuth();
  const { activeInverters } = useInverter();

  console.log(activeInverters);

  const hour = moment().hour();

  let welcomeMessage = "Olá";
  if (hour < 12) {
    welcomeMessage = "Bom dia";
  } else if (hour < 18) {
    welcomeMessage = "Boa tarde";
  } else {
    welcomeMessage = "Boa noite";
  }

  return (
    <View className="m-7 flex flex-row items-center justify-between">
      <View className="flex-row items-center gap-3">
        <Text className="font-title text-3xl text-white">
          {welcomeMessage}!
        </Text>
      </View>
      <View>
        <TouchableOpacity
          onPress={() => console.log("ativar ou desativar notificação")}
        >
          <Ionicons name="notifications" size={24} color="#FEBE3D" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
