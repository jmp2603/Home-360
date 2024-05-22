import { BaseColors } from "../../config/theme";
import { Platform, StyleSheet } from "react-native";
import DeviceInfo from "react-native-device-info";
const isTabletDevice = DeviceInfo.isTablet();
const IOS = Platform.OS === "ios";

export const createStyles = (colors) => {
  return StyleSheet.create({
    container: {
      width: "100%",
      paddingHorizontal: 15,
      marginVertical: 10,
    },
    header: {
      fontSize: 25,
      fontWeight: "600",
      color: BaseColors.black,
      paddingBottom: 5,
    },
    dateTxt: {
      fontSize: 16,
      color: BaseColors.grey,
      paddingBottom: 5,
    },
    title: {
      fontSize: 20,
      fontWeight: "600",
      color: BaseColors.black,
    },
    cotent: {
      flexDirection: "row",
      paddingVertical: 10,
    },
    imageContainer: {
      width: 80,
      height: 80,
      borderWidth: 1,
      margin: 2,
      borderColor: BaseColors.inactive,
      borderRadius: 50,
      padding: 2,
    },
    optionsContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      marginVertical: 5,
    },
    cancleButton: {
      padding: 10,
      backgroundColor: BaseColors.yellow,
      marginHorizontal: 30,
      borderRadius: 5,
    },
    value: {
      fontSize: 14,
      fontWeight: "600",
      textAlign: "center",
    },
  });
};
