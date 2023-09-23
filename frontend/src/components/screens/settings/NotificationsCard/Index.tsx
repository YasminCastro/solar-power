import { Text, TouchableOpacity, View } from "react-native";
import { IStepSettings } from "../../../../screens/Settings";
import { AntDesign } from "@expo/vector-icons";
import Notification from "./Notification/Index";
import { INotification } from "../../../../interfaces/notifications";

interface IProps {
  setCardActive: React.Dispatch<React.SetStateAction<IStepSettings>>;
}

//TODO: criar e editar notificações

const NotificationsCard: React.FC<IProps> = ({ setCardActive }) => {
  return (
    <View>
      <TouchableOpacity onPress={() => setCardActive("settings")} className="">
        <AntDesign name="arrowleft" size={30} color="white" />
      </TouchableOpacity>
      <Text className="font-title text-3xl text-yellow-300">Notificações</Text>
      {notificationsData.map((notificationData, index) => (
        <View className="mt-4" key={index}>
          <Notification notification={notificationData} />
        </View>
      ))}
    </View>
  );
};

export default NotificationsCard;

const notificationsData: INotification[] = [
  {
    title: "Limpeza das placas",
    description:
      "É recomendado fazer a limpeza dos painés solares a cada 6 meses.",
    notificationData: {
      title: "Mantenha suas placas solares brilhando! ☀️",
      body: "Limpe suas placas solares para otimizar a produção de energia e aumentar a eficiência.",
      timeInMinutes: 1,
    },
  },
];
