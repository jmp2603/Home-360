import DeviceInfo from "react-native-device-info";
import { BaseColors } from "../../config/theme";
import { Dimensions, Platform, StyleSheet } from "react-native";

const IOS = Platform.OS === "ios";
const isTabletDevice = DeviceInfo.isTablet();

export const createStyles = (colors) => {
  return StyleSheet.create({
    countContainer: {
      width: 170,
      height: 80,
      flexDirection: "row",
      borderRadius: 15,
    },
    stickStyle: {
      width: 4,
      height: 30,
      alignSelf: "center",
      marginRight: 10,
      borderRadius: 2,
    },
    countStyle: {
      color: BaseColors.titleColor,
      fontSize: 18,
      fontWeight: "bold",
    },
  });
};
