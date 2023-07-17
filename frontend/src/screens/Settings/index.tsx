import { Text, TouchableOpacity, View } from "react-native";
import { useAuth } from "../../contexts/auth";
import { SafeAreaView } from "react-native-safe-area-context";

const Settings: React.FC = () => {
  const { signOut } = useAuth();

  function handleSingOut() {
    signOut();
  }
  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-blueDark-500">
      <TouchableOpacity
        className="flex h-12 flex-row items-center justify-center rounded-full bg-solar-100 px-6"
        onPress={handleSingOut}
      >
        <View className="flex flex-1 items-center">
          <Text className="font-body text-base text-solar-500">Sair</Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Settings;
