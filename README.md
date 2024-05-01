# Oceanaut-app-React Native

Oceanaut: Mobile APP

# Getting Started

> **Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## Clone the Repository

First, clone the repository to your local machine using Git:

```bash
git clone <repository_url>
```

This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

## Getting Started

First, run the app:

```bash
npm start
# or
yarn start
```

You’ll need to enable debugging options on your phone to run this apk.

Debug APK
step:1 Go to the root of the project in the terminal
step:2 Go to android directory
cd android
step:3 Now in this android folder, run this command
./gradlew assembleDebug

There! you’ll find the apk file in the following path:
yourProject/android/app/build/outputs/apk/debug/app-debug.apk

Release APK
step:1 Go to the root of the project in the terminal
step:2 Go to android directory
cd android
step:3 Now in this android folder, run this command
For Windows,
gradlew assembleRelease
For Linux and Mac OS,
./gradlew assembleRelease

There! you’ll find the apk file in the following path:
yourProject/android/app/build/outputs/apk/app-release.apk

## Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

## MOBILE APP DETAILS:

Libraries / Dependencies utilized

- [@native-html/iframe-plugin](https://www.npmjs.com/package/@native-html/iframe-plugin): ^2.6.1
- [@ptomasroos/react-native-multi-slider](https://www.npmjs.com/package/@ptomasroos/react-native-multi-slider): ^2.2.2
- [@react-native-async-storage/async-storage](https://www.npmjs.com/package/@react-native-async-storage/async-storage): 1.19.8
- [@react-native-community/checkbox](https://www.npmjs.com/package/@react-native-community/checkbox): ^0.5.16
- [@react-native-community/geolocation](https://www.npmjs.com/package/@react-native-community/geolocation): ^3.1.0
- [@react-native-community/netinfo](https://www.npmjs.com/package/@react-native-community/netinfo): ^11.0.1
- [@react-native-community/push-notification-ios](https://www.npmjs.com/package/@react-native-community/push-notification-ios): ^1.11.0
- [@react-native-firebase/app](https://www.npmjs.com/package/@react-native-firebase/app): 19.0.0
- [@react-native-firebase/messaging](https://www.npmjs.com/package/@react-native-firebase/messaging): 19.0.0
- [@react-native-google-signin/google-signin](https://www.npmjs.com/package/@react-native-google-signin/google-signin): ^10.1.0
- [@react-navigation/bottom-tabs](https://www.npmjs.com/package/@react-navigation/bottom-tabs): ^6.5.11
- [@react-navigation/drawer](https://www.npmjs.com/package/@react-navigation/drawer): ^6.6.6
- [@react-navigation/native](https://www.npmjs.com/package/@react-navigation/native): ^6.1.9
- [@react-navigation/native-stack](https://www.npmjs.com/package/@react-navigation/native-stack): ^6.9.16
- [@react-navigation/stack](https://www.npmjs.com/package/@react-navigation/stack): ^6.3.20
- [@shopify/react-native-skia](https://www.npmjs.com/package/@shopify/react-native-skia): ^1.0.4
- [axios](https://www.npmjs.com/package/axios): ^1.6.0
- [i18n-js](https://www.npmjs.com/package/i18n-js): ^3.8.0
- [lodash](https://www.npmjs.com/package/lodash): ^4.17.21
- [lottie-react-native](https://www.npmjs.com/package/lottie-react-native): ^5.1.5
- [moment](https://www.npmjs.com/package/moment): ^2.29.4
- [react](https://www.npmjs.com/package/react): 18.2.0
- [react-image-picker](https://www.npmjs.com/package/react-image-picker): ^1.1.1
- [react-native](https://www.npmjs.com/package/react-native): 0.72.6
- [react-native-actionsheet](https://www.npmjs.com/package/react-native-actionsheet): ^2.4.2
- [react-native-animatable](https://www.npmjs.com/package/react-native-animatable): ^1.4.0
- [react-native-blob-util](https://www.npmjs.com/package/react-native-blob-util): 0.19.4
- [react-native-calendars](https://www.npmjs.com/package/react-native-calendars): ^1.1302.0
- [react-native-canvas](https://www.npmjs.com/package/react-native-canvas): ^0.1.39
- [react-native-chart-kit](https://www.npmjs.com/package/react-native-chart-kit): ^6.12.0
- [react-native-charts-wrapper](https://www.npmjs.com/package/react-native-charts-wrapper): ^0.6.0
- [react-native-collapsible](https://www.npmjs.com/package/react-native-collapsible): ^1.6.1
- [react-native-crypto-js](https://www.npmjs.com/package/react-native-crypto-js): ^1.0.0
- [react-native-date-picker](https://www.npmjs.com/package/react-native-date-picker): ^4.3.3
- [react-native-device-info](https://www.npmjs.com/package/react-native-device-info): ^10.11.0
- [react-native-document-picker](https://www.npmjs.com/package/react-native-document-picker): ^9.0.1
- [react-native-element-dropdown](https://www.npmjs.com/package/react-native-element-dropdown): ^2.10.0
- [react-native-elements](https://www.npmjs.com/package/react-native-elements): ^3.4.3
- [react-native-event-listeners](https://www.npmjs.com/package/react-native-event-listeners): ^1.0.7
- [react-native-fast-image](https://www.npmjs.com/package/react-native-fast-image): ^8.6.3
- [react-native-fs](https://www.npmjs.com/package/react-native-fs): ^2.20.0

## Modifying your App

Now that you have successfully run the app, let's modify it.

1. Open `index.js` in your text editor of choice and edit some lines.
2. For **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Developer Menu** (<kbd>Ctrl</kbd> + <kbd>M</kbd> (on Window and Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (on macOS)) to see your changes!

   For **iOS**: Hit <kbd>Cmd ⌘</kbd> + <kbd>R</kbd> in your iOS Simulator to reload the app and see your changes!

## Congratulations! 🎉 :

You've successfully run and modified your React Native App 🥳.

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [Introduction to React Native](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you can't get this to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.
