import AsyncStorage from "@react-native-async-storage/async-storage";

export interface INotification {
  title: string;
  active: boolean;
  recallTimeInMonths: number;
}

export async function getNotifications() {
  const notifications = await AsyncStorage.getItem("@solarpower/notifications");

  if (notifications === null) {
    return [];
  }

  return JSON.parse(notifications);
}

export async function updateNotifications(updateNotification: INotification) {
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

  if (updateNotification.active) {
    console.log("schedule update notification");
  } else {
    console.log("cancel schedule update notification");
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
