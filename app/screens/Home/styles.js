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
      padding: 4,
      backgroundColor: "green",
      width: "50%",
      justifyContent: "center",
      alignSelf: "center",
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

    cleardatatxt: {
      fontSize: isTabletDevice ? 20 : 16,
      // fontFamily: FontFamily.bold,
      color: BaseColors.secondary,
      marginTop: 10,
      // fontFamily: 'Poppins',
      fontWeight: "bold",
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
  });
};
