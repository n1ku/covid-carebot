import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';


export class Notification {

    static registerForPushNotificationsAsync = async () => {
        if (Constants.isDevice) {
          const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
          let finalStatus = existingStatus;
          if (existingStatus !== 'granted') {
            const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
            finalStatus = status;
          }
          if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
          }
          token = await Notifications.getExpoPushTokenAsync();
          console.log(token);
          this.setState({ expoPushToken: token });
        } else {
          alert('Must use physical device for Push Notifications');
        }
    
        if (Platform.OS === 'android') {
          Notifications.createChannelAndroidAsync('default', {
            name: 'default',
            sound: true,
            priority: 'max',
            vibrate: [0, 250, 250, 250],
          });
        }
      };



    /* create notification object
    https://docs.expo.io/versions/latest/sdk/notifications/#localnotification
    */
    static createNotification(title, body, data=null, categoryId=null){
        if (typeof title=="undefined" || typeof body == "undefined"){
            throw "Must have parameters were not given."
        }
        this.notification = {
            title:title,
            body:body,
        }
        if (data != null) this.notification.data = data;
        if (categoryId != null) this.notification.categoryId = categoryId;
        return this.notification;
    }

    /* push the notification async
    https://docs.expo.io/versions/latest/sdk/notifications/#arguments-2
    */ 
    static async pushNotification(notification, schedule){
        if (typeof notification == "undefined"){
            if (typeof this.notification == "undefined"){
                throw "No notification is given to push.";
            } else {
                notification = this.notification;
            }
        }
        if (typeof schedule != 'undefined'){
            promise = await Notifications.scheduleLocalNotificationAsync(notification, schedule);
        } else {
            promise = await Notifications.presentLocalNotificationAsync(notification);
        }
        return promise;
    }

}