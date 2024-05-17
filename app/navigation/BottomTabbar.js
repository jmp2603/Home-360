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
import { BaseColors } from "../config/theme";
import { CustomIcon } from "../config/LoadIcons";
import { useSelector } from "react-redux";

export default function BottomTabBar({ state, descriptors, navigation }) {
  const totalWidth = Dimensions.get("window").width;
  const { notificationCount } = useSelector((state) => state.notification);
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
          <View style={styles.tabIconView}>
            <CustomIcon
              name={isFocused ? "Home-Filled" : "Home"}
              size={24}
              color={isFocused ? "white" : "white"}
            />
          </View>
        );
      case "NotificationStackNavigator":
        return (
          <View style={styles.tabIconView}>
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
              name={isFocused ? "Notification-Filled" : "Notification"}
              size={24}
              color={isFocused ? "white" : "white"}
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
        style={{
          backgroundColor: BaseColors.primary,
          paddingVertical: 5,
        }}
      >
        <View style={styles.tabContainer}>
          <View style={{ flexDirection: "row" }}>
            <Animated.View
              style={[
                styles.topSlider,
                {
                  transform: [
                    {
                      translateX: translateValue,
                    },
                  ],
                  width: tabWidth - 20,
                  alignItems: "center",
                  justifyContent: "center",
                },
              ]}
            />
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
                    : state.index === 1
                    ? state.index * tabWidth - 5
                    : state.index === 2
                    ? state.index * tabWidth - 15
                    : state.index * tabWidth - 25,
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
                    paddingBottom: 15,
                    alignItems: "center",
                    justifyContent: "space-around",
                  }}
                >
                  {getIcons(label, isFocused, index)}
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </View>
    )
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    backgroundColor: BaseColors.primary,
    // paddingHorizontal: 20,

    // borderTopLeftRadius: 12,
    // borderTopRightRadius: 12,
  },
  topSlider: {
    position: "absolute",
    top: 0,
    backgroundColor: BaseColors.white,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  tabIconView: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 15,
  },
  tabTilteTxt: {
    color: BaseColors.white,
    paddingTop: 5,
    fontSize: 12,
  },
});
