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
    BtnViewSty: {
      padding: 6,
      width: "50%",
      justifyContent: "center",
      alignSelf: "center",
      borderRadius: 8,
    },
    mainView: {
      flexDirection: "row",
      borderBottomColor: BaseColors.inactive,
      marginTop: 5,
      padding: 5,
      borderRadius: 3,
      justifyContent: "center",
      alignItems: "center",
    },
  });
};
