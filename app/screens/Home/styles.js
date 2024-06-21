import DeviceInfo from "react-native-device-info";
import { BaseColors } from "../../config/theme";
import { Dimensions, Platform, StyleSheet } from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";

const IOS = Platform.OS === "ios";
const isTabletDevice = DeviceInfo.isTablet();

export const createStyles = (colors) => {
  return StyleSheet.create({
    mainContainer: {
      flex: 1,
      backgroundColor: BaseColors.white,
    },
    headerContainer: {
      backgroundColor: BaseColors.primary,
      borderRadius: 20,
    },
    profileImgContainer: {
      backgroundColor: BaseColors.primary,
      paddingTop: getStatusBarHeight() + (IOS ? 50 : 30),
      flexDirection: "row",
      justifyContent: "space-between",
      marginHorizontal: 20,
    },
    imageStyle: {
      width: 50,
      height: 50,
      borderRadius: 30,
      marginRight: 15,
    },
    nameStyle: {
      color: BaseColors.white,
      fontSize: 18,
    },
    sideDrawerSty: {
      backgroundColor: BaseColors.orangeColor,
      width: 40,
      height: 40,
      borderRadius: 20,
      justifyContent: "center",
    },
    listContainer: {
      flexDirection: "row",
      alignContent: "center",
      justifyContent: "space-between",
      marginBottom: 10,
    },
    taskText: {
      fontSize: 20,
      marginTop: 10,
      fontWeight: "600",
      color: BaseColors.titleColor,
    },
    popoverDot: {
      width: 15,
      height: 15,
      borderRadius: 10,
      backgroundColor: BaseColors.redColor,
      marginHorizontal: 5,
    },
    popTextContainer: {
      flexDirection: "row",
      alignItems: "center",
    },
    cardSty: {
      marginVertical: 4,
      width: "100%",
      borderRadius: 20,
    },
    dateItem: {
      width: 55,
      height: 70,
      borderWidth: 1,
      borderColor: "white",
      borderBottomRightRadius: IOS ? 10 : 20,
      borderBottomLeftRadius: IOS ? 10 : 20,
      borderTopStartRadius: 50,
      borderTopEndRadius: 50,
      justifyContent: "center",
      alignItems: "center",
      marginLeft: 10,
    },
    dateText: {
      fontSize: 14,
      color: "white",
    },
    selectedDateItem: {
      backgroundColor: "white",
    },
    selectedDateText: {
      fontSize: 16,
      fontWeight: "600",
      color: BaseColors.primary,
    },
    attechStyle: {
      width: 25,
      height: 25,
      borderRadius: 20,
      // borderWidth: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: BaseColors.redColor,
      borderColor: BaseColors.redColor,
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
    imageContainer: {
      width: 85,
      height: 85,
      flexDirection: "row",
      position: "relative",
      marginLeft: 10,
      borderRadius: 50,
      flexWrap: "wrap",
      padding: 5,
      justifyContent: "center",
      marginVertical: 5,
      borderColor: BaseColors.inactive,
    },
    mainViewStyMultiple: {
      alignItems: "center",
      backgroundColor: BaseColors.white,
      borderRadius: 10,
      padding: 1.5,
      position: "absolute",
      zIndex: 1,
      bottom: 0,
      top: 3,
      right: 10,
      width: 18,
      height: 18,
      elevation: 1,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
    },
    uploadText: {
      fontSize: 18,
      fontWeight: "600",
      marginVertical: 15,
      color: BaseColors.black,
    },
    noteText: {
      fontSize: 14,
      color: BaseColors.textColor,
    },
    plusContainer: {
      width: 80,
      height: 80,
      borderRadius: 50,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: BaseColors.lightOrange,
      marginTop: 10,
      marginLeft: 20,
    },
    uploadedImg: {
      width: "100%",
      height: "100%",
      borderRadius: 50,
    },
    btnContainer: {
      flexDirection: "row",
      justifyContent: "center",
      paddingHorizontal: 10,
      marginVertical: 10,
    },
    confirmText: {
      fontSize: 20,
      fontWeight: "700",
      marginVertical: 10,
      color: BaseColors.black,
    },
  });
};
