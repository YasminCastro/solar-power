import { View, Text, Pressable, TouchableOpacity } from "react-native";
import HuaweiLogo from "../../assets/huawei-logo.svg";
import ElginLogo from "../../assets/elgin.svg";
import { useNavigation } from "@react-navigation/native";
import { AuthScreenNavigationProp } from "src/interfaces/auth";
import { IStepActive } from "src/screens/SignUp/Inverter";

interface IProps {
  setStep: React.Dispatch<React.SetStateAction<IStepActive>>;
}

export default function HauweiForm({ setStep }: IProps) {
  const navigation = useNavigation<AuthScreenNavigationProp>();

  return (
    <View className="flex-1 items-center justify-center bg-solar-50">
      <View className="h-1/3 w-full max-w-sm justify-center p-8">
        <Text className="text-center font-title text-4xl  text-white">
          Form Hauwei
        </Text>
      </View>

      <View className="h-1/3 w-full max-w-sm justify-center gap-4 p-6">
        <TouchableOpacity
          className="flex h-12 flex-row items-center justify-center rounded-full bg-solar-100 px-6"
          onPress={() => {
            setStep("Start");
          }}
        >
          <View className="flex flex-1 items-center">
            <Text className="font-body text-base text-solar-500">Voltar</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
