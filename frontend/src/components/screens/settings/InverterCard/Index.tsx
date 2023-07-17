import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../../../../contexts/auth";
import { IStepSettings } from "../../../../screens/Settings";

interface IProps {
  setCardActive: React.Dispatch<React.SetStateAction<IStepSettings>>;
}

const InverterCard: React.FC<IProps> = ({ setCardActive }) => {
  const { signOut } = useAuth();

  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-blueDark-500">
      <TouchableOpacity onPress={() => signOut()}>
        <Text className="font-body text-base text-gray-200">Sair</Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="flex h-12 flex-row items-center justify-center rounded-full bg-solar-100 px-6"
        onPress={() => setCardActive("inverter")}
      >
        <View className="flex flex-1 items-center">
          <Text className="font-body text-base text-solar-500">Inversor</Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default InverterCard;
