import React, { Component } from "react";
import "react-native-gesture-handler";
import { ActivityIndicator, Text, TextInput, LogBox } from "react-native";
import DatePicker from "react-native-date-picker";
// import codePush from 'react-native-code-push';
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/es/integration/react";
import { ThemeProvider } from "@react-navigation/native";
// import NToast from 'react-native-toast-message';
import Toast from "./components/Toast";
import CTopNotify from "./components/CTopNotify";
import CStatusBar from "./components/CStatusBar";
import { persistor, store } from "./redux/store/configureStore";
import Navigator from "./navigation/index";
import AuthAction from "./redux/reducers/auth/actions";
import Orientation, {
  OrientationLocker,
} from "react-native-orientation-locker";
import { InAppNotificationProvider } from "./libs/react-native-in-app-notification";
import DeviceInfo from "react-native-device-info";
const isTabletDevice = DeviceInfo.isTablet();

// const IOS = Platform.OS === 'ios';
LogBox.ignoreLogs(["Warning: ..."]); // Ignore log notification by message
LogBox.ignoreAllLogs();
// const codePushOptions = {s
//   installMode: codePush.InstallMode.IMMEDIATE,
//   checkFrequency: codePush.CheckFrequency.ON_APP_START,

//   updateDialog: {
//     appendReleaseDescription: true,
//     descriptionPrefix: "\n\nWhat's New:",
//     mandatoryContinueButtonLabel: 'Install',
//   },
// };

/**
 * @class EntryPoint
 */
class index extends Component {
  constructor(props) {
    super(props);
    this.notifyToast = React.createRef();
    this.state = {
      processing: false,
      loading: true,
    };

    // Bugsnag.start();
  }

  componentDidMount() {
    if (isTabletDevice) {
      store.dispatch(AuthAction.setIsTabletDevice(true));
    }
  }

  showToast = (message) => {
    if (this.notifyToast?.current) {
      this.notifyToast?.current?.show(message, 2000);
    }
  };

  onBeforeLift = () => {
    if (store) {
      this.setState({
        loading: false,
      });
    }
  };

  render() {
    const { processing, loading } = this.state;

    return (
      <ThemeProvider>
        <InAppNotificationProvider>
          <Provider store={store}>
            <PersistGate
              loading={<ActivityIndicator />}
              persistor={persistor}
              onBeforeLift={this.onBeforeLift}
            >
              <CStatusBar />
              {loading ? (
                <ActivityIndicator />
              ) : (
                <>
                  <OrientationLocker
                    orientation={isTabletDevice ? "PORTRAIT" : "PORTRAIT"}
                  />
                  <Navigator />
                </>
              )}
              {processing && <CTopNotify title="Installing updates" />}
            </PersistGate>
            <Toast
              ref={this.notifyToast}
              position="top"
              positionValue={100}
              fadeInDuration={750}
              fadeOutDuration={2000}
              opacity={0.8}
            />
          </Provider>
        </InAppNotificationProvider>
      </ThemeProvider>
    );
  }
}

if (Text.defaultProps == null) Text.defaultProps = {};
Text.defaultProps.allowFontScaling = false;
Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;
TextInput.defaultProps = TextInput.defaultProps || {};
TextInput.defaultProps.allowFontScaling = false;
DatePicker.defaultProps = DatePicker.defaultProps || {};
DatePicker.defaultProps.allowFontScaling = false;

let indexExport = index;
// if (!__DEV__) {
//   indexExport = codePush(codePushOptions)(index);
// }

export default indexExport;
