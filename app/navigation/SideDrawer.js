/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Text,
  Dimensions,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Ensure you have this import
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { BaseColors } from "../config/theme"; // Ensure this path is correct
import DeviceInfo from "react-native-device-info";
import { useIsFocused } from "@react-navigation/native";
import { CustomIcon } from "../config/LoadIcons";

const isTabletDevice = DeviceInfo.isTablet();
const IOS = Platform.OS === "ios";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BaseColors.primary,
    paddingTop: Dimensions.get("window").height / 9,
  },
  closeIconContainer: {
    alignItems: "flex-start",
    padding: 16,
  },
  drawerContent: {
    flex: 1,
    paddingLeft: 20,
  },
  sectionTitle: {
    color: "white",
    fontSize: 18,
    marginBottom: 20,
    fontWeight: "700",
  },
  drawerItemLabel: {
    color: "white",
    fontSize: 16,
  },
});

export default function SideDrawer(props) {
  const isFocused = useIsFocused();
  const [clickedEvent, setIsClickedEvent] = useState(false);

  useEffect(() => {
    if (!isFocused) {
      setTimeout(() => {
        setIsClickedEvent(false);
      }, 200);
    }
  }, [isFocused]);

  function FocusAwareStatusBar(props) {
    return isFocused ? <StatusBar {...props} /> : null;
  }

  return (
    <>
      <FocusAwareStatusBar barStyle="light-content" />
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={styles.container}
      >
        <View style={styles.closeIconContainer}>
          <TouchableOpacity
            onPress={() => props.navigation.closeDrawer()}
            style={{
              width: 40,
              height: 40,
              borderWidth: 1,
              borderRadius: 20,
              justifyContent: "center",
              alignItems: "center",
              borderColor: BaseColors.yellow,
              backgroundColor: BaseColors.yellow,
            }}
          >
            <CustomIcon name="Close" size={15} color="white" />
          </TouchableOpacity>
        </View>
        <View style={styles.drawerContent}>
          <Text style={styles.sectionTitle}>General</Text>
          <DrawerItem
            label="View Tasks"
            onPress={() => props.navigation.navigate("ViewTask")} // Ensure this route exists
            labelStyle={styles.drawerItemLabel}
          />
        </View>
      </DrawerContentScrollView>
    </>
  );
}
