import { View, Text } from "react-native";
import { useAuth } from "../../contexts/AuthContext";

export default function UserCircle() {
  const { user } = useAuth();
  return (
    <View className="h-8 w-8 rounded-full bg-yellow-300">
      <Text className="text-center font-title text-2xl uppercase text-blueDark-300">
        {user?.name[0]}
      </Text>
    </View>
  );
}
