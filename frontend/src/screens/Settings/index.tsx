import { Button, View } from "react-native";
import { useAuth } from "../../contexts/auth";

const Settings: React.FC = () => {
  const { signOut } = useAuth();

  function handleSingOut() {
    signOut();
  }
  return (
    <View className="flex-1 justify-center">
      <Button title="Sign out" onPress={handleSingOut} />
    </View>
  );
};

export default Settings;
