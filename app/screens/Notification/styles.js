import { BaseColors } from "../../config/theme";
import { Dimensions, Platform, StyleSheet } from "react-native";
import DeviceInfo from "react-native-device-info";
import { getStatusBarHeight } from "react-native-status-bar-height";

const IOS = Platform.OS === "ios";
const isTabletDevice = DeviceInfo.isTablet();

export const createStyles = (colors) => {
  return StyleSheet.create({
    emptydata: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 10,
    },
    mainView: {
      flexDirection: "row",
      borderBottomWidth: 1,
      borderBottomColor: BaseColors.inactive,
      marginTop: isTabletDevice ? 10 : 5,
      padding: isTabletDevice ? 10 : 5,
      borderRadius: 3,
    },
    dotIcon: {
      width: 8,
      height: 8,
      borderRadius: 50,
      backgroundColor: BaseColors.primary,
      // marginLeft: 10,
      alignSelf: "center",
      marginRight: 10,
    },
    btnContainer: {
      backgroundColor: "gray",
      borderColor: "gray",
      borderWidth: 1,
      justifyContent: "center",
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 3,
    },
    mainModalView: {
      flex: 1,
      justifyContent: "center",
      alignContent: "center",
      backgroundColor: "hsla(360, 20%,2%, 0.6)",
    },
    background: {
      // marginTop: '30%',
      borderRadius: 5,
      backgroundColor: BaseColors.white,
      paddingHorizontal: 30,
      paddingVertical: 20,
      elevation: 10,
      width: "90%",
      justifyContent: "center",
      alignSelf: "center",
      shadowColor: BaseColors.transparent,
    },
    barStyle: {
      alignSelf: "center",
      backgroundColor: BaseColors.primary,
      borderRadius: 10,
      width: 75,
      height: 5,
    },
    titleView: {
      justifyContent: "center",
      alignItems: "center",
    },
    marBtm15: {
      marginVertical: 10,
    },
    cleardatatxt: {
      fontSize: isTabletDevice ? 20 : 16,
      // fontFamily: FontFamily.bold,
      color: BaseColors.secondary,
      marginTop: 10,
      // fontFamily: 'Poppins',
      fontWeight: "bold",
    },
  });
};
