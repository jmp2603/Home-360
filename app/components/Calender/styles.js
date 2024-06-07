import DeviceInfo from "react-native-device-info";
import { BaseColors } from "../../config/theme";
import { Dimensions, Platform, StyleSheet } from "react-native";

const IOS = Platform.OS === "ios";
const isTabletDevice = DeviceInfo.isTablet();

export const createStyles = (colors) => {
  return StyleSheet.create({
    calenderStyle: {
      borderWidth: 1,
      borderRadius: 10,
      borderColor: BaseColors.primary,
      height: "auto",
      backgroundColor: BaseColors.lightPrimary,
    },
    headerContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      margin: 10,
    },
    headerCircle: {
      width: 15,
      height: 15,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: BaseColors.offWhite,
    },
    smallCircle: {
      width: 5,
      height: 5,
      backgroundColor: BaseColors.primary,
      borderRadius: 10,
      alignSelf: "center",
      marginRight: 5,
    },
    bigCircle: {
      width: 15,
      height: 15,
      borderRadius: 10,
      marginRight: 5,
    },
  });
};
