import { View } from "react-native";

import { IStepSettings } from "../../../../screens/Settings";
import { useMemo, useState } from "react";
import ListInverters from "./ListInverters/Index";
import EditInverter from "./EditInverter/Index";
import CreateInverter from "./CreateInverter/Index";

interface IProps {
  setCardActive: React.Dispatch<React.SetStateAction<IStepSettings>>;
}

export type IStepInverter = "list" | "edit" | "create";

const InverterCard: React.FC<IProps> = ({ setCardActive }) => {
  const [inverterId, setInverterId] = useState<string>("");
  const [inverterCardActive, setInverterCardActive] =
    useState<IStepInverter>("list");

  const Cards = useMemo(
    () => ({
      list: () => (
        <ListInverters
          setCardActive={setCardActive}
          setInverterCardActive={setInverterCardActive}
          setInverterId={setInverterId}
        />
      ),
      edit: () => (
        <EditInverter
          setInverterCardActive={setInverterCardActive}
          inverterId={inverterId}
        />
      ),
      create: () => (
        <CreateInverter setInverterCardActive={setInverterCardActive} />
      ),
    }),
    []
  );

  return <View>{Cards[inverterCardActive]()}</View>;
};

export default InverterCard;
