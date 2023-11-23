import { Text, TouchableOpacity, View } from "react-native";
import { useAuth } from "../../../../contexts/auth";
import ProfileIcon from "./ProfileIcon";
import { IStepSettings } from "../../../../screens/Settings";
import SettingsButtons from "./SettingsButtons";
import { LinearGradient } from "expo-linear-gradient";
import { Feather } from '@expo/vector-icons'; 


import { FontAwesome5 } from "@expo/vector-icons";

interface IProps {
  setCardActive: React.Dispatch<React.SetStateAction<IStepSettings>>;
}

const SettingsCard: React.FC<IProps> = ({ setCardActive }) => {
  const { signOut } = useAuth();

  return (
    <View>
      <TouchableOpacity className="mb-10" onPress={() => signOut()}>
        <Text className="font-body text-base text-gray-200 text-right">Sair da conta</Text>
      </TouchableOpacity>
      <ProfileIcon setCardActive={setCardActive} />
      

      <View className="my-14">
        <View className="m-2 flex flex-row justify-around">
          <SettingsButtons
            setCardActive={setCardActive}
            cardName="inverter"
            buttonName="Inversores"
            icon={<FontAwesome5 name="solar-panel" size={30} color="#FEBE3D" />}
          />
          <SettingsButtons
            setCardActive={setCardActive}
            cardName="notifications"
            buttonName="Notificações"
            icon={<FontAwesome5 name="bell" size={30} color="#FEBE3D" />}
          />
        </View>

      </View>


      <TouchableOpacity className="mt-12 justify-center items-center flex flex-row space-x-4" onPress={() => setCardActive("moreSettings")} >
        <Feather name="settings" size={15} color="white" />
        <Text className="font-body text-base text-white ">Mais Configurações</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SettingsCard;
