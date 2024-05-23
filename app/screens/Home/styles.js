import DeviceInfo from "react-native-device-info";
import { BaseColors } from "../../config/theme";
import { Dimensions, Platform, StyleSheet } from "react-native";

const IOS = Platform.OS === "ios";
const isTabletDevice = DeviceInfo.isTablet();

export const createStyles = (colors) => {
  return StyleSheet.create({
    marBtm15: {
      marginBottom: 20,
      width: "100%",
    },
    btnView: {
      display: "flex",
      flexDirection: "row",
      marginTop: 20,
    },
    titleTxt: {
      opacity: 1,
      fontSize: 16,
      paddingBottom: IOS ? 10 : 5,
      color: "#464E5F",
    },
    mainView: {
      marginHorizontal: 20,
      flex: 1,
    },
    container: {
      flex: 1,
      backgroundColor: BaseColors.white,
      marginHorizontal: 10,
      marginBottom: 20,
    },
    dropdown: {
      height: 50,
      paddingHorizontal: 8,
      borderBottomWidth: 0.5,
      borderColor: BaseColors.inactive,
      backgroundColor: "white",
      elevation: 4,
      marginBottom: 10,
    },
    imageStyle: {
      width: 25,
      resizeMode: "contain",
    },
    placeholderStyle: {
      fontSize: 16,
    },
    selectedTextStyle: {
      fontSize: 14,
      marginLeft: 8,
    },
    titlesty: {
      fontSize: 16,
      // fontFamily: 'Poppins',
      fontWeight: "500",
      marginHorizontal: 10,
    },
    chartViewBox: {
      borderWidth: 1,
      backgroundColor: "white",
      borderColor: "white",
      marginBottom: 20,
      flex: 1,
      height: Dimensions.get("window").height / 2.8,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 4,
      borderRadius: 10,
    },
    BtnViewSty: {
      padding: 6,
      backgroundColor: "green",
      width: "50%",
      justifyContent: "center",
      alignSelf: "center",
      borderRadius: 5,
    },
    detailviewsty: {
      marginHorizontal: 20,
      flexDirection: "row",
      marginTop: 10,
    },
    titletxtsty: {
      width: "50%",
    },
    discriptiontxtsty: {
      width: "50%",
    },
    emptydata: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 10,
    },
    filterView: {
      flex: 1,
      justifyContent: "center",
      alignContent: "center",
      backgroundColor: "hsla(360, 20%,2%, 0.6)",
    },
    background: {
      // marginTop: '30%',
      backgroundColor: BaseColors.white,
      paddingHorizontal: 30,
      paddingVertical: 20,
      elevation: 10,
      width: "90%",
      justifyContent: "center",
      alignSelf: "center",
      shadowColor: BaseColors.transparent,
      borderRadius: 10,
    },
    TextStyle: {
      // fontFamily: 'Poppins',
      fontSize: isTabletDevice ? 18 : 14,
      fontWeight: "500",
      color: colors.colors.primary,
      paddingBottom: 5,
    },
    disTextStyle: {
      color: BaseColors.textColor,
      fontSize: isTabletDevice ? 18 : 14,
    },
    cardSty: {
      marginVertical: 4,
      width: "100%",
      borderRadius: 10,
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
    eventItem: {
      backgroundColor: "#f9f9f9",
      padding: 15,
      marginVertical: 5,
      borderRadius: 5,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.3,
      shadowRadius: 1,
      elevation: 2,
    },
    eventName: {
      fontSize: 16,
    },
    eventTime: {
      color: "gray",
    },
    noEventsText: {
      textAlign: "center",
      marginTop: 20,
      fontSize: 16,
      color: "gray",
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
      padding: 5,
      borderRadius: 20,
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
  });
};
