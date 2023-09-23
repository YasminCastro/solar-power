export interface INotification {
  title: string;
  description: string;
  notificationData: IScheduleNotification;
}

export interface IScheduleNotification {
  title: string;
  body: string;
  timeInMinutes: number;
}
