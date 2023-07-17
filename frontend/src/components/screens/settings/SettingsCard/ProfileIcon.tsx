import { View, Text, Pressable } from "react-native";
import { useAuth } from "../../../../contexts/auth";
import { IStepSettings } from "../../../../screens/Settings";

interface IProps {
  setCardActive: React.Dispatch<React.SetStateAction<IStepSettings>>;
}

export default function ProfileIcon({ setCardActive }: IProps) {
  const { user } = useAuth();

  return (
    <View className="items-center">
      {user && (
        <View className="items-center">
          <Pressable
            className="h-20 w-20 items-center justify-center rounded-full bg-yellow-300"
            onPress={() => {
              setCardActive("profile");
            }}
          >
            <Text className="text-4xl font-bold text-blueDark-500">
              {user.name.charAt(0).toUpperCase()}
            </Text>
          </Pressable>
          <Text className="mt-2 text-xl text-white">{user.name}</Text>
        </View>
      )}
    </View>
  );
}
