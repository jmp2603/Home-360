import DeviceInfo from "react-native-device-info";
import { BaseColors } from "../../config/theme";
import { Dimensions, Platform, StyleSheet } from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";

const IOS = Platform.OS === "ios";
const isTabletDevice = DeviceInfo.isTablet();

export const createStyles = (colors) => {
  return StyleSheet.create({
    headerStyle: {
      backgroundColor: BaseColors.primary,
      paddingTop: getStatusBarHeight() + (IOS ? 50 : 30),
      paddingBottom: getStatusBarHeight(),
      flexDirection: "row",
      justifyContent: "space-between",
      marginHorizontal: 20,
    },
    profileImage: {
      width: 50,
      height: 50,
      borderRadius: 30,
      marginRight: 15,
    },
    timeContainer: {
      alignItems: "center",
      marginVertical: 20,
      backgroundColor: "#E9F8FF",
      paddingVertical: 10,
      marginHorizontal: 20,
      borderRadius: 10,
    },
    date: {
      fontSize: 18,
      fontWeight: "700",
      color: BaseColors.titleColor,
      marginTop: 5,
      marginBottom: 18,
    },
    times: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: BaseColors.greenColor,
      width: 50,
      height: 50,
      borderRadius: 8,
    },
    time: {
      fontSize: 22,
      fontWeight: "bold",
      color: BaseColors.white,
    },
    separator: {
      fontSize: 18,
      fontWeight: "700",
      alignSelf: "center",
      marginHorizontal: 10,
    },
    clockTimeContainer: {
      justifyContent: "space-between",
      flexDirection: "row",
      marginTop: 8,
    },
    clockTime: {
      color: BaseColors.grey,
    },
  });
};
