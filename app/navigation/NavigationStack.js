/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo, useReducer } from "react";
import { Platform } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import SplashScreen from "../screens/SplashScreen";
import { NotificationContext } from "../components";
import RemotePushController from "../components/Common/RemotePushController";
import notificationReducer from "../redux/reducers/notificationReducer";
import { navigationRef } from "./NavigationService";
import Login from "../screens/Login";
import BottomTabBar from "./BottomTabbar";
import Home from "../screens/Home";
import Notification from "../screens/Notification";
import ViewDetails from "../screens/ViewDetails";
import SideDrawer from "./SideDrawer";
import ViewTask from "../screens/ViewTask";
import { BaseColors } from "../config/theme";
import ClockIn from "../screens/ClockIn";
import Chat from "../screens/Chat";
import UpcomingTask from "../screens/UpcomingTask";

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
  const ClockInStack = createStackNavigator();
  const ChatStack = createStackNavigator();

  const HomeStackNavigator = () => {
    return (
      <HomeStack.Navigator>
        <HomeStack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
      </HomeStack.Navigator>
    );
  };
  const ClockInNavigator = () => {
    return (
      <ClockInStack.Navigator>
        <ClockInStack.Screen
          name="ClockIn"
          component={ClockIn}
          options={{ headerShown: false }}
        />
      </ClockInStack.Navigator>
    );
  };
  const ChatNavigator = () => {
    return (
      <ChatStack.Navigator>
        <ChatStack.Screen
          name="Chat"
          component={Chat}
          options={{ headerShown: false }}
        />
      </ChatStack.Navigator>
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
        <Tab.Screen name="ClockInNavigator" component={ClockInNavigator} />
        <Tab.Screen name="ChatNavigator" component={ChatNavigator} />
        <Tab.Screen
          name="NotificationStackNavigator"
          component={NotificationStackNavigator}
        />
      </Tab.Navigator>
    );
  };

  const DrawerNavigator = () => (
    <Drawer.Navigator
      initialRouteName="BottomTabsNavigator"
      detachInactiveScreens={IOS ? true : false}
      drawerContentOptions={{
        drawerType: "front",
        drawerPosition: "right",
      }}
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          width: "60%",
          borderTopStartRadius: 50,
          borderBottomStartRadius: 50,
        },
      }}
      drawerContent={(props) => <SideDrawer {...props} />}
      defaultStatus="closed"
    >
      <Drawer.Screen
        name="BottomTabsNavigator"
        component={BottomTabsNavigator}
      />
    </Drawer.Navigator>
  );

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
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Home"
            component={DrawerNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Notification"
            component={Notification}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="TaskDetails"
            component={ViewDetails}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ViewTask"
            component={ViewTask}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="UpcomingTask"
            component={UpcomingTask}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </NotificationContext.Provider>
  );
}

export default App;
