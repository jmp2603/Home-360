import { StyleSheet, Platform } from "react-native";
import { BaseColors, FontFamily } from "../../config/theme";
import { color } from "react-native-reanimated";
import DeviceInfo from "react-native-device-info";

const IOS = Platform.OS === "ios";
const isTabletDevice = DeviceInfo.isTablet();

export const createStyles = (colors) => {
  return StyleSheet.create({
    mainView: {
      flex: 1,
      justifyContent: "center",
      alignContent: "center",
      backgroundColor: "hsla(360, 20%,2%, 0.6)",
    },
    background: {
      // marginTop: '30%',
      borderRadius: 10,
      backgroundColor: BaseColors.modalHeaderColor,
      paddingVertical: 10,
      elevation: 10,
      justifyContent: "center",
      alignSelf: "center",
      shadowColor: BaseColors.transparent,
      paddingBottom: 25,
    },
    barStyle: {
      alignSelf: "center",
      backgroundColor: BaseColors.primary,
      borderRadius: 10,
      width: 75,
      height: 5,
    },
    titleView: {
      paddingVertical: 10,
      justifyContent: "center",
      alignItems: "center",
    },
    titletxt: {
      fontSize: 24,
      color: BaseColors.textColor,
      textAlign: "center",
      // fontFamily: 'Poppins',
      fontWeight: "500",
    },
    sheetView: {
      flexGrow: 1,
    },
    promptView: {
      // flexDirection: 'row',
    },
    promptTxt: {
      fontSize: isTabletDevice ? 18 : 16,
      color: BaseColors.textColor,
      textAlign: "center",
      // fontFamily: FontFamily.regular,
      // paddingHorizontal: 40,
      paddingBottom: 30,
      // fontFamily: 'Poppins',
      fontWeight: "400",
    },
    promptBtn: {
      //   width: 150,
    },
    alertView: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    buttonNo: {
      width: "44%",
      borderRadius: 7,
    },
    buttonYes: {
      width: "44%",
      borderRadius: 7,
    },
    textStyle: {
      fontSize: 14,
      letterSpacing: 1,
    },
  });
};
