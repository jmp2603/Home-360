import { BaseColors } from "../../config/theme";
import { Dimensions, Platform, StyleSheet } from "react-native";
import DeviceInfo from "react-native-device-info";
const isTabletDevice = DeviceInfo.isTablet();
const IOS = Platform.OS === "ios";

export const createStyles = (colors) => {
  return StyleSheet.create({
    container: {
      width: "100%",
      backgroundColor: colors.colors.activeIndex,
      paddingHorizontal: 15,
    },
    header: {
      fontSize: 16,
      fontWeight: "700",
      color: BaseColors.primary,
      width: "32%",
    },
    value: {
      fontSize: 14,
      fontWeight: "600",
      color: BaseColors.textColor,
      width: "68%",
    },
    cotent: {
      flexDirection: "row",
      paddingVertical: 3,
    },
    imageContainer: {
      width: 80,
      height: 80,
      borderWidth: 1,
      margin: 2,
      borderColor: BaseColors.inactive,
      borderRadius: 5,
      padding: 2,
    },
  });
};
