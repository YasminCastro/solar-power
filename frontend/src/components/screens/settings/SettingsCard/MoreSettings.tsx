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
    <View className="flex flex-col gap-3 p-4">
      {/* Existing content */}
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

      {/* About the App button */}
      <TouchableOpacity onPress={() => setCardActive("about")} className="flex flex-row items-center mb-3">
        <Ionicons name="information-circle-outline" size={30} color="white" className="mr-3" />
        <Text className="text-white text-lg">Sobre o aplicativo</Text>
      </TouchableOpacity>

      {/* Change Language button */}
      <TouchableOpacity onPress={navigateToChangeLanguage} className="flex flex-row items-center mb-3">
        <MaterialIcons name="language" size={30} color="white" className="mr-3" />
        <Text className="text-white text-lg">Alterar o idioma</Text>
      </TouchableOpacity>

      {/* Change Password button */}
      <TouchableOpacity onPress={navigateToChangePassword} className="flex flex-row items-center">
        <FontAwesome5 name="lock" size={30} color="white" className="mr-3" />
        <Text className="text-white text-lg">Alterar a senha</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MoreSettingsCard;