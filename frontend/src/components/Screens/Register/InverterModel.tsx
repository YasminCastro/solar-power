import { View, Text, Pressable, TouchableOpacity } from "react-native";
import HuaweiLogo from "../../../assets/huawei-logo.svg";
import ElginLogo from "../../../assets/elgin-logo.svg";
import { AuthScreenNavigationProp } from "../../../interfaces/auth";
import { useNavigation } from "@react-navigation/native";
import { IStepActive } from "src/screens/SignUp/Inverter";

interface IProps {
  setStep: React.Dispatch<React.SetStateAction<IStepActive>>;
}

export default function InverterModel({ setStep }: IProps) {
  const navigation = useNavigation<AuthScreenNavigationProp>();

  return (
    <View className="flex-1 items-center justify-center bg-solar-50">
      <View className="h-1/3 w-full max-w-sm justify-center p-8">
        <Text className="text-center font-title text-4xl  text-white">
          Qual a marca do seu inversor?
        </Text>
      </View>

      <View className="h-1/3 w-full max-w-sm p-6 ">
        <Pressable
          className="mb-4 flex h-28 items-center justify-center rounded-lg bg-white"
          onPress={() => setStep("Hauwei")}
        >
          <View className="flex flex-row space-x-14 ">
            <HuaweiLogo></HuaweiLogo>
            <Text className="font-regular text-3xl text-solar-400">Huawei</Text>
          </View>
        </Pressable>

        <Pressable
          className="mb-4 flex h-28 items-center justify-center rounded-lg bg-white "
          onPress={() => setStep("Elgin")}
        >
          <View className="flex flex-row space-x-14 ">
            <ElginLogo></ElginLogo>
            <Text className="font-regular text-3xl text-solar-400">Elgin</Text>
          </View>
        </Pressable>
      </View>

      <View className="h-1/3 w-full max-w-sm justify-center gap-4 p-6">
        <TouchableOpacity
          className="flex h-12 flex-row items-center justify-center rounded-full bg-solar-100 px-6"
          onPress={() => {
            navigation.navigate("Login");
          }}
        >
          <View className="flex flex-1 items-center">
            <Text className="font-body text-base text-solar-500">Pular</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
