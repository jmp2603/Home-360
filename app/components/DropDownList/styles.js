import { StyleSheet, Platform, Dimensions } from "react-native";
import { BaseColors, FontFamily } from "../../config/theme";
import DeviceInfo from "react-native-device-info";

const IOS = Platform.OS === "ios";
const isTabletDevice = DeviceInfo.isTablet();

export const createStyles = (colors) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      borderWidth: 2,
    },
    dropdown: {
      // height: Dimensions.get("window").height / 19,
      height: IOS ? 35 : 40,
      width: "100%",

      // borderColor: BaseColors.primary,
      // borderBottomWidth: 1,
    },
    titleTxt: {
      paddingBottom: 5,
      marginBottom: IOS ? 0 : 0,
      marginTop: IOS ? 0 : 0,
      opacity: 1,
      fontSize: 14,
      textTransform: "capitalize",
      // color: colors.colors.textColor,
      // fontFamily: 'Poppins',
      fontWeight: "500",
    },
    showTextSty: {
      color: colors.colors.dropdownTextColor,
      fontFamily: FontFamily.medium,
      marginHorizontal: 7,
      fontSize: isTabletDevice ? 16 : null,
    },
    errorTxt: {
      fontSize: 13,
      color: BaseColors.errorRed,
      paddingLeft: 5,
      marginTop: 0,
      fontWeight: "500",
    },
    listItem: {
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "center",
      paddingVertical: 3,
      marginHorizontal: 15,
      borderBottomColor: BaseColors.primary,
    },
    listItemTxt: {
      fontSize: isTabletDevice ? 18 : 16,
      paddingVertical: 5,
      color: colors.colors.black,
      fontFamily: FontFamily.semiBold,
    },
    multipleSelectItem: {
      paddingVertical: 2,
      backgroundColor: "white",
      borderRadius: 4,
      borderColor: colors.colors.inactive,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.3,
      shadowRadius: 1.41,
      elevation: 4,
    },
  });
};
