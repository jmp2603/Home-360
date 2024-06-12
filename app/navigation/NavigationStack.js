/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo, useReducer } from "react";
import { Platform } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SplashScreen from "../screens/SplashScreen";
import { NotificationContext, NoInternet } from "../components";
import RemotePushController from "../components/Common/RemotePushController";
import notificationReducer from "../redux/reducers/notificationReducer";
import { navigationRef } from "./NavigationService";
import Dashbaord from "../screens/Dashboard";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Login from "../screens/Login";
import BottomTabBar from "./BottomTabbar";
import Notification from "../screens/Notification";
import TaskScreen from "../screens/TaskScreen";

const intitialNotificationState = {
  notification: null,
  openedNotification: null,
  countOfNotification: 0,
};
const IOS = Platform.OS === "ios";

function App() {
  const [Notifystate, dispatchState] = useReducer(
    notificationReducer,
    intitialNotificationState
  );
  const notiValue = useMemo(() => {
    return { Notifystate, dispatchState };
  }, [Notifystate, dispatchState]);

  const Stack = createStackNavigator();
  const Tab = createBottomTabNavigator();
  const Drawer = createDrawerNavigator();
  const HomeStack = createStackNavigator();
  const NotificationStack = createStackNavigator();

  const HomeStackNavigator = () => {
    return (
      <HomeStack.Navigator>
        <HomeStack.Screen
          name="Home"
          component={Dashbaord}
          options={{ headerShown: false }}
        />
      </HomeStack.Navigator>
    );
  };

  const NotificationStackNavigator = () => {
    return (
      <NotificationStack.Navigator>
        <NotificationStack.Screen
          name="Notification"
          component={Notification}
          options={{ headerShown: false }}
        />
      </NotificationStack.Navigator>
    );
  };

  const BottomTabsNavigator = () => {
    return (
      <Tab.Navigator
        initialRouteName={"Home"}
        tabBar={(props) => <BottomTabBar {...props} />}
        screenOptions={{
          animationEnabled: false,
          headerShown: false,
          tabBarHideOnKeyboard: true,
        }}
      >
        <Tab.Screen name="HomeStackNavigator" component={HomeStackNavigator} />
        <Tab.Screen
          name="NotificationStackNavigator"
          component={NotificationStackNavigator}
        />
      </Tab.Navigator>
    );
  };

  return (
    <NotificationContext.Provider value={notiValue}>
      <RemotePushController />
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator
          initialRouteName={"SplashScreen"}
          detachInactiveScreens={IOS ? true : false}
          screenOptions={{
            animationEnabled: true,
            gestureEnabled: IOS ? true : false,
          }}
        >
          <Stack.Screen
            name="SplashScreen"
            component={SplashScreen}
            options={{ headerShown: false, animationEnabled: false }}
          />
          <Stack.Screen
            name="Dashbaord"
            component={BottomTabsNavigator}
            options={{
              headerShown: false,
              animationEnabled: false,
            }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="TaskScreen"
            component={TaskScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Notification"
            component={Notification}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </NotificationContext.Provider>
  );
}

export default App;
