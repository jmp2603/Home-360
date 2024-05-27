import { BaseColors } from "../../config/theme";
import { Platform, StyleSheet } from "react-native";
import DeviceInfo from "react-native-device-info";
const isTabletDevice = DeviceInfo.isTablet();
const IOS = Platform.OS === "ios";

export const createStyles = (colors) => {
  return StyleSheet.create({
    cardSty: {
      marginVertical: 4,
      width: "100%",
      borderRadius: 10,
    },
    barStyle: {
      width: 3,
      height: 50,
      borderRadius: 8,
      justifyContent: "center",
    },
    titleStyle: {
      color: BaseColors.black,
      fontSize: 16,
      paddingVertical: 3,
      fontWeight: "600",
    },
    descriptionStyle: {
      color: BaseColors.textColor,
      fontSize: 14,
      paddingVertical: 3,
    },
    dotStyle: {
      width: 8,
      height: 8,
      borderRadius: 10,
      marginRight: 5,
    },
    dateStyle: {
      color: BaseColors.grey,
      fontSize: 14,
      fontWeight: "500",
    },
    dateVal: {
      color: BaseColors.titleColor,
      fontSize: 15,
    },
    attechStyle: {
      width: 25,
      height: 25,
      borderRadius: 20,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: BaseColors.redColor,
      borderColor: BaseColors.redColor,
    },
    dayContainer: {
      marginHorizontal: 10,
      flexDirection: "row",
      marginVertical: 2,
      marginTop: 10,
    },
    dayStyle: {
      borderWidth: 1,
      marginLeft: 8,
      borderRadius: 10,
      borderColor: BaseColors.greenColor,
    },
    dayTextStyle: {
      paddingVertical: 8,
      paddingHorizontal: 6,
      fontSize: 16,
      fontWeight: "500",
    },
  });
};
