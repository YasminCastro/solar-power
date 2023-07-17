import { Text, TouchableOpacity, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";

import { useAuth } from "../../../../contexts/auth";
import { IStepSettings } from "../../../../screens/Settings";
import { FontAwesome5 } from "@expo/vector-icons";
import InverterBlock from "./ListInverters/Index";
import { TextInput } from "react-native-gesture-handler";
import { useState } from "react";
import ListInverters from "./ListInverters/Index";
import EditInverter from "./EditInverter/Index";

interface IProps {
  setCardActive: React.Dispatch<React.SetStateAction<IStepSettings>>;
}

const InverterCard: React.FC<IProps> = ({ setCardActive }) => {
  const [editItem, setEditItem] = useState<{
    edit: boolean;
    inverterId: string | null;
  }>({ edit: false, inverterId: null });

  console.log(editItem);

  return (
    <View>
      {editItem.edit ? (
        <EditInverter setEditItem={setEditItem} />
      ) : (
        <ListInverters
          setCardActive={setCardActive}
          setEditItem={setEditItem}
        />
      )}
    </View>
  );
};

export default InverterCard;
