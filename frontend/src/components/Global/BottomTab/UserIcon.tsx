import { View, Text } from "react-native";
import { useUser } from "../../../contexts/UserContext";

export default function UserCircle() {
  const { user } = useUser();
  return (
    <View className="h-8 w-8 rounded-full bg-yellow-300">
      <Text className="text-center font-title text-2xl uppercase text-blueDark-300">
        {user?.name[0]}
      </Text>
    </View>
  );
}
