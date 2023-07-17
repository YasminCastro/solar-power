import { Text, Touchable, TouchableOpacity, View } from "react-native";
import { useAuth } from "../../../../contexts/auth";
import ProfileIcon from "./ProfileIcon";
import { IStepSettings } from "../../../../screens/Settings";
import SettingsButtons from "./SettingsButtons";

import { FontAwesome5 } from "@expo/vector-icons";

interface IProps {
  setCardActive: React.Dispatch<React.SetStateAction<IStepSettings>>;
}

const SettingsCard: React.FC<IProps> = ({ setCardActive }) => {
  const { signOut } = useAuth();

  return (
    <View>
      <TouchableOpacity onPress={() => signOut()}>
        <Text className="font-body text-base text-gray-200">Sair</Text>
      </TouchableOpacity>
      <ProfileIcon setCardActive={setCardActive} />

      <View className="mt-5">
        <SettingsButtons
          setCardActive={setCardActive}
          cardName="inverter"
          buttonName="Inversor"
          icon={<FontAwesome5 name="solar-panel" size={24} color="black" />}
        />
      </View>
    </View>
  );
};

export default SettingsCard;
