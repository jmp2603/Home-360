/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Platform,
  Animated,
  Keyboard,
} from "react-native";
import { BaseColors, FontFamily, DarkBaseColor } from "../config/theme";
import { CustomIcon } from "../config/LoadIcons";
import { useSelector } from "react-redux";
import DeviceInfo from "react-native-device-info";

const IOS = Platform.OS === "ios";
const isTabletDevice = DeviceInfo.isTablet();

export default function BottomTabBar({ state, descriptors, navigation }) {
  const totalWidth = Dimensions.get("window").width;
  const { notificationCount, announcementCount } = useSelector(
    (state) => state.notification
  );

  const tabWidth = totalWidth / state.routes.length;
  const [translateValue] = useState(new Animated.Value(5));
  const [visible, setVisible] = useState(false);
  const focusedOptions = descriptors[state.routes[state.index].key].options;
  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  const getIcons = (label, isFocused, index) => {
    const tabIconColor = isFocused ? BaseColors.white : BaseColors.white;
    switch (label) {
      case "HomeStackNavigator":
        return (
          <View
            style={[
              styles.tabIconView,
              isFocused && {
                backgroundColor: BaseColors.orangeColor,
                padding: 15,
                borderRadius: 30,
                justifyContent: "center",
              },
            ]}
          >
            <CustomIcon
              name={isFocused ? "Home-Filled" : "Home"}
              size={24}
              color={"white"}
            />
          </View>
        );
      case "ClockInNavigator":
        return (
          <View
            style={[
              styles.tabIconView,
              isFocused && {
                backgroundColor: BaseColors.orangeColor,
                padding: 15,
                borderRadius: 30,
                justifyContent: "center",
              },
            ]}
          >
            <CustomIcon
              name={isFocused ? "Clock-Out-Filled" : "Clock-In"}
              size={24}
              color={"white"}
            />
          </View>
        );
      case "ChatNavigator":
        return (
          <View
            style={[
              styles.tabIconView,
              isFocused && {
                backgroundColor: BaseColors.orangeColor,
                padding: 15,
                borderRadius: 30,
                justifyContent: "center",
              },
            ]}
          >
            <CustomIcon
              name={isFocused ? "Chat-Filled" : "Bottom-Chat"}
              size={24}
              color={"white"}
            />
          </View>
        );
      case "NotificationStackNavigator":
        return (
          <View
            style={[
              styles.tabIconView,
              isFocused && {
                backgroundColor: BaseColors.orangeColor,
                padding: 15,
                borderRadius: 30,
                justifyContent: "center",
              },
            ]}
          >
            {notificationCount?.normalCount > 0 && (
              <View
                style={{
                  zIndex: 1,
                  position: "relative",
                  top: 30,
                  left: 10,
                }}
              >
                <View
                  style={{
                    flex: 1,
                    backgroundColor: BaseColors.red,
                    position: "absolute",
                    bottom: 15,
                    borderRadius: 30,
                    justifyContent: "center",
                    alignSelf: "center",
                    height: 18,
                    width: 18,
                  }}
                >
                  <Text
                    style={{
                      color: BaseColors.white,
                      fontSize: 10,
                      justifyContent: "center",
                      alignSelf: "center",
                    }}
                  >
                    {notificationCount?.normalCount > 100
                      ? "99+"
                      : notificationCount?.normalCount}
                  </Text>
                </View>
              </View>
            )}
            <CustomIcon
              name={isFocused ? "notification-filled" : "Notification"}
              size={24}
              color={"white"}
            />
          </View>
        );
    }
  };

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  useEffect(() => {
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false); // or some other action
      }
    );

    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true); // or some other action
      }
    );

    return () => {
      if (isKeyboardVisible) {
        keyboardDidHideListener.remove();
      } else {
        keyboardDidShowListener.remove();
      }
    };
  }, [isKeyboardVisible]);

  return (
    !isKeyboardVisible && (
      <View
        style={[styles.tabContainer, { backgroundColor: BaseColors.primary }]}
      >
        <View
          style={{
            flexDirection: "row",
          }}
        >
          {state.routes.map((route, index) => {
            const { options } = descriptors[route.key];
            const label =
              options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                ? options.title
                : route.name;

            const isFocused = state.index === index;

            Animated.spring(translateValue, {
              toValue:
                state.index === 0
                  ? state.index * tabWidth + 5
                  : state.index * tabWidth - 5,
              velocity: 10,
              useNativeDriver: true,
            }).start();

            const onPress = () => {
              const event = navigation.emit({
                type: "tabPress",
                target: route.key,
                canPreventDefault: true,
              });
              if (!isFocused && !event.defaultPrevented) {
                if (route.name === "ProfileStackNavigator") {
                  setVisible(true);
                } else {
                  navigation.navigate(route.name);
                }
              }
            };

            const onLongPress = () => {
              navigation.emit({
                type: "tabLongPress",
                target: route.key,
              });
            };

            return (
              <TouchableOpacity
                key={index}
                activeOpacity={0.7}
                accessibilityRole="button"
                accessibilityState={isFocused ? { selected: true } : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarTestID}
                onPress={() => {
                  onPress();
                }}
                onLongPress={onLongPress}
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {getIcons(label, isFocused, index)}
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
      // </View>
    )
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    position: "absolute",
    width: Dimensions.get("window").width / 1.2,
    bottom: 15,
    justifyContent: "center",
    alignSelf: "center",
    borderRadius: 40,
    paddingVertical: 10,
  },
  tabIconView: {
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    // paddingTop: 15,
  },
  tabTilteTxt: {
    color: BaseColors.white,
    paddingTop: 5,
    fontSize: 12,
  },
});
