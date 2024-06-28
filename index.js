/**
 * @format
 */
import "react-native-gesture-handler";
import { AppRegistry } from "react-native";
import { name as appName } from "./app.json";
import messaging from "@react-native-firebase/messaging";
import { showNotification } from "./app/components/Services/NotificationHelper";
const App = require("./app/Entrypoint").default;
// Register background handler
// messaging().setBackgroundMessageHandler(async (remoteMessage) => {
//   console.log("Message handled in the background!", remoteMessage);
//   showNotification(remoteMessage, false);
// });

AppRegistry.registerComponent(appName, () => App);
