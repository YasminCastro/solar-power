import { Text, TouchableOpacity } from "react-native";
import { IStepSettings } from "../../../../screens/Settings";

interface IProps {
  setCardActive: React.Dispatch<React.SetStateAction<IStepSettings>>;
  cardName: IStepSettings;
  buttonName: string;
  icon: any;
}

export default function SettingsButtons({
  setCardActive,
  cardName,
  buttonName,
  icon,
}: IProps) {
  return (
    <TouchableOpacity
      className="flex h-9 w-36 items-center justify-center rounded-sm bg-solar-100 "
      onPress={() => setCardActive(cardName)}
    >
      {icon}
      <Text>{buttonName}</Text>
    </TouchableOpacity>
  );
}
