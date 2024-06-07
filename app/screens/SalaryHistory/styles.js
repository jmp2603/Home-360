import DeviceInfo from "react-native-device-info";
import { BaseColors } from "../../config/theme";
import { Dimensions, Platform, StyleSheet } from "react-native";

const IOS = Platform.OS === "ios";
const isTabletDevice = DeviceInfo.isTablet();

export const createStyles = (colors) => {
  return StyleSheet.create({
    value: {
      color: BaseColors.titleColor,
      fontSize: 16,
      fontWeight: "500",
    },
    title: {
      fontSize: 16,
      fontWeight: "400",
      color: BaseColors.grey,
      marginVertical: 5,
    },
  });
};
