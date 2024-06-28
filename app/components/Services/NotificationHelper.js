import PushNotification from "react-native-push-notification";
import { Platform } from "react-native";
import PushNotificationIOS from "@react-native-community/push-notification-ios";
/**
 *
 *@function showNotification
 *
 */
export const showNotification = (remoteMessage, isForeground = false) => {
  const { data, notification } = remoteMessage;
  // sendLocalNotification(data.title, data.message);
  if (
    !remoteMessage.hasOwnProperty("notification") /*notification === undefined*/
  ) {
    // For Handling Comet Chat Notifications
    const { title, alert, message } = data;
    let notificationTitle = title;
    console.log("title>>>", title);
    console.log("alert>>>", alert);
    console.log("message>>>", message ? JSON.stringify(message) : "");
    if (message) {
      sendLocalNotification(notificationTitle, alert, message);
    }
  } else {
    console.log("Notification key present");
  }
  // if (source != undefined && source == 'CarsBn') {
  //Receiving Notification from our server in foreground
  const { body, title } = notification;
  sendLocalNotification(title, body, data);
  // }
  // }
};

const sendLocalNotification = (title, body, data) => {
  if (Platform.OS === "android") {
    PushNotification.localNotification({
      channelId: "default-channel-id",
      // largeIcon: 'ic_launcher', // (optional) default: "ic_launcher"
      smallIcon: "ic_launcher", // (optional) default: "ic_notification" with fallback for "ic_launcher"
      title: title,
      message: body,
      userInfo: data,
      // tag: tag,
    });
  } else {
    let details = {
      alertTitle: title,
      alertBody: body,
      userInfo: data,
      applicationIconBadgeNumber: 0,
      // userInfo: JSON.parse(tag),
    };

    PushNotificationIOS.setApplicationIconBadgeNumber(0);
    PushNotificationIOS.presentLocalNotification(details);
  }
};
