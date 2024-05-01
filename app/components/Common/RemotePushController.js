import {useEffect} from 'react';
import messaging from '@react-native-firebase/messaging';
import {showNotification} from '../Services/NotificationHelper';
import PushNotification from 'react-native-push-notification';
import {store} from '../../redux/store/configureStore';
import NotificationAction from '../../redux/reducers/notification/actions';
import {navigationRef} from '../../navigation/NavigationService';

const storeFCMToken = async token => {
  const {
    notification: {fcmToken},
  } = store.getState();

  try {
    if (fcmToken.localeCompare(token) != 0) {
      await store.dispatch(NotificationAction.setFcmToken(token));
    }
  } catch (error) {}
};

/**
 *firebase notification
 * @function  RemotePushController
 */
const RemotePushController = () => {
  useEffect(() => {
    PushNotification.configure({
      // (required) Called when a remote or local notification is opened or received
      onNotification: function (notification) {
        // console.log('LOCAL NOTIFICATION ==>', JSON.stringify(notification));
        // old app code
        // dispatch({ type: 'onNotificationOpen', payload: notification });
        store.dispatch(NotificationAction.onNotificationOpen(notification));
        if (notification.userInteraction && notification.foreground) {
          navigationRef.current.navigate('NotificationStackNavigator', {
            screen: 'Notification',
            params: {type: 'normal'},
          });
        } else if (notification.userInteraction && !notification.foreground) {
          navigationRef.current.navigate('NotificationStackNavigator', {
            screen: 'Notification',
            params: {type: 'normal'},
          });
        }
      },

      popInitialNotification: true,
      requestPermissions: true,
    });

    PushNotification.createChannel(
      {
        channelId: 'default-channel-id', // (required)
        channelName: 'Default channel', // (required)
        channelDescription: 'A default channel', // (optional) default: undefined.
        soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
        importance: 4, // (optional) default: 4. Int value of the Android notification importance
        vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
      },
      created =>
        console.log(`createChannel 'default-channel-id' returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
    );

    messaging().onNotificationOpenedApp(remoteMessage => {
      if (remoteMessage?.data) {
        navigationRef.current.navigate('NotificationStackNavigator', {
          screen: 'Notification',
          params: {type: 'normal'},
        });
      }
    });
    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          navigationRef.current.navigate('NotificationStackNavigator', {
            screen: 'Notification',
            params: {type: 'normal'},
          });
        }
      });

    // Get the device token
    messaging()
      .getToken()
      .then(token => {
        // console.log('FCM Token', token);
        return storeFCMToken(token);
      });

    // Listen to whether the token changes
    return messaging().onTokenRefresh(token => {
      storeFCMToken(token);
    });
  }, []);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      // console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
      // dispatch({ type: 'updateNotification', payload: remoteMessage });
      store.dispatch(NotificationAction.updateNotification(remoteMessage));
      showNotification(remoteMessage, true);
    });
    return unsubscribe;
  }, []);

  return null;
};

export default RemotePushController;
