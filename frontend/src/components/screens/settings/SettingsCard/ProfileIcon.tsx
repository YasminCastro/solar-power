import { View, Text, Pressable } from "react-native";
import { useAuth } from "../../../../contexts/auth";
import { IStepSettings } from "../../../../screens/Settings";
import { Feather, FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from "react-native-svg";

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
            className="h-20 w-20 items-center justify-center rounded-full bg-orange-250 z-30"
            onPress={() => {
              setCardActive("profile");
            }}
          >
            <Text className="text-4xl font-bold text-blueDark-500">
              {user.name.charAt(0).toUpperCase()}
            </Text>
          </Pressable>
          <LinearGradient></LinearGradient>
          <Pressable className="bg-blueLight-950 rounded-full p-1.5 z-40 -mt-4 ml-14">
            <FontAwesome5 name="pen" size={11} color="white" />
          </Pressable>
          <Text className="mt-2 text-xl font-body text-white">{user.name}</Text>
        </View>
      )}
    </View>
  );
}
