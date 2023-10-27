import { Switch, Text, View } from "react-native";
import { useEffect, useState } from "react";

import {
  getNotificationId,
  isNotificationActive,
  setNotificationId,
  updateNotifications,
} from "../../../../../utils/storage/notifications";
import {
  INotification,
  IScheduleNotification,
} from "../../../../../interfaces/notifications";
import * as Notifications from "expo-notifications";

// Apenas notificações locais

interface IProps {
  notification: INotification;
}

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

const Notification: React.FC<IProps> = ({ notification }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = async () => {
    let enabledStatus = isEnabled;

    setIsEnabled((previousState) => {
      enabledStatus = !previousState;
      return !previousState;
    });
    await updateNotifications({
      ...notification,
      active: !isEnabled,
    });

    if (enabledStatus) {
      const notificationId = await schedulePushNotification({
        title: notification.notificationData.title,
        body: notification.notificationData.body,
        timeInMinutes: notification.notificationData.timeInMinutes,
      });

      await setNotificationId(notificationId, notification.title);
    } else {
      const notificationId = await getNotificationId(notification.title);
      if (notificationId) {
        await Notifications.cancelScheduledNotificationAsync(notificationId);
        await setNotificationId(null, notification.title);
      }
    }
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
                trackColor={{ false: "#767577", true: "#010B2B" }}
                thumbColor={isEnabled ? "#5E9EFF" : "#f4f3f4"}
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

async function schedulePushNotification({
  title,
  body,
  timeInMinutes,
}: IScheduleNotification) {
  const minutesInSecods = timeInMinutes * 60;
  const identifier = await Notifications.scheduleNotificationAsync({
    content: {
      title,
      body,
    },
    trigger: { seconds: minutesInSecods, repeats: true },
  });

  return identifier;
}
