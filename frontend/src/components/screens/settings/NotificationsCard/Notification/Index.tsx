import { Switch, Text, View } from "react-native";
import { useEffect, useState } from "react";
import {
  isNotificationActive,
  updateNotifications,
} from "../../../../../utils/storage/notifications";

interface IProps {
  notification: {
    title: string;
    description: string;
  };
}

const Notification: React.FC<IProps> = ({ notification }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = async () => {
    setIsEnabled((previousState) => !previousState);
    await updateNotifications({
      title: notification.title,
      active: !isEnabled,
    });
  };

  async function getNotification() {
    const isActive = await isNotificationActive(notification.title);
    setIsEnabled(isActive);
  }

  useEffect(() => {
    getNotification();
    setIsLoading(false);
  }, []);

  return (
    <View>
      {isLoading ? (
        <Text>{notification.title}</Text>
      ) : (
        <View className="rounded-md bg-white px-4 py-2">
          <View>
            <View className="flex flex-row items-center justify-between">
              <Text className="font-title text-xl text-blueDark-300">
                {notification.title}
              </Text>
              <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
              />
            </View>
            <View>
              <View>
                <Text className="text-base text-solar-500">
                  {notification.description}
                </Text>
              </View>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default Notification;
