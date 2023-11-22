import { View } from "react-native";

import { IStepSettings } from "../../../../screens/Settings";
import { useState } from "react";
import ListInverters from "./ListInverters/Index";
import EditInverter from "./EditInverter/Index";
import CreateInverter from "./CreateInverter/Index";
import { IInverter } from "../../../../interfaces/inverter";

interface IProps {
  setCardActive: React.Dispatch<React.SetStateAction<IStepSettings>>;
}

export type IStepInverter = "list" | "edit" | "create";

const InverterCard: React.FC<IProps> = ({ setCardActive }) => {
  const [inverterId, setInverterId] = useState<string>("");
  const [inverter, setInverter] = useState<IInverter | null>(null);
  const [inverterCardActive, setInverterCardActive] =
    useState<IStepInverter>("list");

  return (
    <View>
      {inverterCardActive === "list" && (
        <ListInverters
          setCardActive={setCardActive}
          setInverterCardActive={setInverterCardActive}
          setInverterId={setInverterId}
          setInverter={setInverter}
        />
      )}
      {inverterCardActive === "edit" && inverter && (
        <EditInverter
          setInverterCardActive={setInverterCardActive}
          inverterId={inverterId}
          inverter={inverter}
          setInverter={setInverter}
        />
      )}
      {inverterCardActive === "create" && (
        <CreateInverter setInverterCardActive={setInverterCardActive} />
      )}
    </View>
  );
};

export default InverterCard;
