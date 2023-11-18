import { View, Text } from "react-native";
import Logo from "../../../assets/logos/solar-power-logo.svg";
import moment from "moment";

export default function WelcomeView() {
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
        <Logo width={40} height={40} />
        <Text className="font-title text-3xl text-white">
          {welcomeMessage}!
        </Text>
      </View>
    </View>
  );
}
