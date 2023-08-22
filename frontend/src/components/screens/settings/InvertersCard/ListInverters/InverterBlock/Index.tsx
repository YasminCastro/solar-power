import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import { IInverter } from "../../../../../../interfaces/inverter";
import { IStepInverter } from "../../Index";
import { editInverterStatus } from "../../../../../../services/inverters";
import { useInverter } from "../../../../../../contexts/inverter";

interface IProps {
  inverter: IInverter;
  setInverterCardActive: React.Dispatch<React.SetStateAction<IStepInverter>>;
  setInverterId: React.Dispatch<React.SetStateAction<string>>;
}

const InverterBlock: React.FC<IProps> = ({
  inverter,
  setInverterCardActive,
  setInverterId,
}) => {
  const [active, setActive] = useState(inverter.active);
  const [loading, setLoading] = useState(false);
  const { getUserInvertes } = useInverter();

  const handleEditInverter = async () => {
    try {
      setLoading(true);

      setActive(!active);
      await editInverterStatus(inverter._id, !active);
      await getUserInvertes();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className=" mx-8 my-4 h-24 w-80 rounded-md bg-white">
      <View className="flex flex-row justify-between p-4">
        <View>
          <Text className="font-title text-2xl text-blueDark-300">
            {inverter.name}
          </Text>
          <Text className="text-base font-medium uppercase text-blueDark-300">
            {inverter.model}
          </Text>
        </View>
        <View className="flex flex-col justify-evenly gap-3">
          <TouchableOpacity>
            <Feather
              name="edit"
              size={24}
              color="black"
              onPress={() => {
                setInverterCardActive("edit");
                setInverterId(inverter._id);
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleEditInverter}>
            {loading ? (
              <ActivityIndicator size="small" color="#FEBE3D" />
            ) : (
              <Feather
                name={active ? "eye" : "eye-off"}
                size={24}
                color="black"
              />
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default InverterBlock;
