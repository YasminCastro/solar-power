import AsyncStorage from "@react-native-async-storage/async-storage";
import { INotification } from "../../interfaces/notifications";

interface INotificationData extends INotification {
  active: boolean;
}

export async function getNotifications() {
  const notifications = await AsyncStorage.getItem("@solarpower/notifications");

  if (notifications === null) {
    return [];
  }

  return JSON.parse(notifications);
}

export async function updateNotifications(
  updateNotification: INotificationData
) {
  let notifications = await getNotifications();

  const index = notifications.findIndex(
    (notification: INotification) =>
      notification.title === updateNotification.title
  );

  if (index === -1) {
    notifications.push(updateNotification);
  } else {
    notifications[index] = updateNotification;
  }

  await AsyncStorage.setItem(
    "@solarpower/notifications",
    JSON.stringify(notifications)
  );
}

export async function isNotificationActive(notificationTitle: string) {
  let myNotifications = await getNotifications();

  const notificationFound = myNotifications.find(
    (item: Notification) => item.title === notificationTitle
  );

  if (notificationFound && notificationFound.active) {
    return true;
  }

  return false;
}

export async function setNotificationId(id: string | null, title: string) {
  if (!id) {
    await AsyncStorage.removeItem(`@solarpower/notifications/${title}`);

    return;
  }

  await AsyncStorage.setItem(`@solarpower/notifications/${title}`, id);
}

export async function getNotificationId(title: string) {
  const notificationId = await AsyncStorage.getItem(
    `@solarpower/notifications/${title}`
  );

  return notificationId;
}
