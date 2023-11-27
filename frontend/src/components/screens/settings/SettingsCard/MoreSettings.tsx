import { Text, TouchableOpacity, View } from "react-native";
import { IStepSettings } from "../../../../screens/Settings";
import { AntDesign, FontAwesome5, Ionicons, MaterialIcons } from '@expo/vector-icons';

interface IProps {
  setCardActive: React.Dispatch<React.SetStateAction<IStepSettings>>;
  navigateToAbout: () => void;
  navigateToChangeLanguage: () => void;
  navigateToChangePassword: () => void;
}
const MoreSettingsCard: React.FC<IProps> = ({ setCardActive, navigateToAbout, navigateToChangeLanguage, navigateToChangePassword }) => {
  return (
    <View className="flex flex-col">

      <View className="flex flex-row gap-3 mb-4">
        <TouchableOpacity onPress={() => setCardActive("settings")} className="mr-4">
          <AntDesign name="arrowleft" size={30} color="white" />
        </TouchableOpacity>
        <View className="flex-row items-center">
          <Text className="font-title text-3xl text-yellow-300 mr-3">
            Mais Configurações
          </Text>
          <FontAwesome5 name="cogs" size={30} color="#febe3d" />
        </View>
      </View>


      <View className="pt-4 ">
        <TouchableOpacity onPress={() => setCardActive("about")} className="flex flex-row items-center mb-5">
          <Ionicons name="information-circle-outline" size={30} color="white" />
          <Text className="font-body text-lg text-white ml-7">Sobre o aplicativo</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={navigateToChangeLanguage} className="flex flex-row items-center mb-5">
          <MaterialIcons name="language" size={30} color="white"  />
          <Text className="font-body text-lg text-white ml-7">Alterar o idioma</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={navigateToChangePassword} className="flex flex-row items-center">
          <FontAwesome5 name="lock" size={30} color="white"  />
          <Text className="font-body text-lg text-white ml-7">Alterar a senha</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MoreSettingsCard;