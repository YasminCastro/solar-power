import { Button, View } from "react-native";
import { useAuth } from "../../contexts/auth";

const Games: React.FC = () => {
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

export default Games;
