import { Text, TouchableOpacity, View } from "react-native";
import { IStepSettings } from "../../../../screens/Settings";
import { LinearGradient } from "expo-linear-gradient";


interface IProps {
  setCardActive: React.Dispatch<React.SetStateAction<IStepSettings>>;
  cardName: IStepSettings;
  buttonName: string;
  icon: any;
}

//TODO: fazer os botões igual no figma

export default function SettingsButtons({
  setCardActive,
  cardName,
  buttonName,
  icon,
}: IProps) {
  return (
    <LinearGradient  
    className=" rounded-lg py-4 "
        colors={["#192137", "#1C3985"]}
        start={[0, 0]}
    >
      <TouchableOpacity
        className="flex h-16 w-36 items-center justify-center rounded-sm "
        onPress={() => setCardActive(cardName)}
      >
        {icon}
        <Text className="text-white mt-3 font-body">{buttonName}</Text>
      </TouchableOpacity>

    </LinearGradient>
  );
}
