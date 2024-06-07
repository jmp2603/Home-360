import DeviceInfo from "react-native-device-info";
import { BaseColors, FontFamily } from "../../config/theme";
import { StyleSheet } from "react-native";

const isTabletDevice = DeviceInfo.isTablet();

export const createStyles = (colors) => {
  return StyleSheet.create({
    round: {
      borderTopStartRadius: 100,
      borderTopEndRadius: 100,
      borderBottomStartRadius: 100,
      borderBottomEndRadius: 100,
    },
    square: {
      borderRadius: 3,
    },
    btnContainer: {
      alignItems: "center",
      justifyContent: "center",
      shadowColor: BaseColors.black,
      // paddingVertical: 10,
      // paddinHorizontal:10,
      width: "100%",
    },

    primary: {
      borderWidth: 1,
      borderRadius: 7,
      backgroundColor: BaseColors.primary,
      borderColor: colors.colors.white,
    },
    btnText: {
      fontSize: 16,
      textAlign: "center",
      fontWeight: "600",
    },
    shadow: {
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.3,
      shadowRadius: 4.65,
      elevation: 4,
    },
  });
};
