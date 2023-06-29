import { View, Text, Pressable, TouchableOpacity } from "react-native";
import { AuthScreenNavigationProp } from "../../../interfaces/auth";
import { useNavigation } from "@react-navigation/native";
import { IStepActive } from "../../../screens/SignUp/Inverter";
import HauweiIcon from "../../Global/Icons/Hauwei";
import ElginIcon from "../../Global/Icons/Elgin";

interface IProps {
  setStep: React.Dispatch<React.SetStateAction<IStepActive>>;
}

export default function InverterModel({ setStep }: IProps) {
  const navigation = useNavigation<any>();

  return (
    <View className="flex-1 items-center justify-center bg-solar-50">
      <View className="h-1/3 w-full max-w-sm justify-center p-8">
        <Text className="text-center font-title text-4xl  text-white">
          Qual a marca do seu inversor?
        </Text>
      </View>

      <View className="h-1/3 w-full max-w-sm p-6 ">
        <Pressable onPress={() => setStep("Hauwei")}>
          <HauweiIcon />
        </Pressable>

        <Pressable onPress={() => setStep("Elgin")}>
          <ElginIcon />
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
