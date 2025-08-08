export interface INotification {
    description : string;
    is_read:boolean;
}
export interface INotificationsList {
    notification : [INotification];
}


