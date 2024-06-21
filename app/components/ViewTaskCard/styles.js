import { BaseColors } from "../../config/theme";
import { Dimensions, StyleSheet } from "react-native";

export const createStyles = (colors) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: BaseColors.white,
    },
    cardSty: {
      marginVertical: 3,
      width: "100%",
      borderRadius: 20,
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
    optionsContainer: {
      // width: nWidth,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      marginVertical: 5,
    },
    titleSty: {
      paddingBottom: 5,
      opacity: 1,
      fontSize: 14,
      fontWeight: "500",
    },
    errTxt: {
      fontSize: 13,
      color: BaseColors.errorRed,
      paddingVertical: 5,
      fontWeight: "500",
    },
    imageContainer: {
      borderWidth: 1,
      padding: 5,
      borderRadius: 4,
      justifyContent: "center",
      marginVertical: 5,
      borderColor: BaseColors.inactive,
    },
    mainViewStyMultiple: {
      alignItems: "center",
      backgroundColor: BaseColors.primary,
      borderRadius: 10,
      padding: 1.5,
      position: "absolute",
      zIndex: 1,
      bottom: 0,
      top: -3,
      right: 0,
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
    imageView: {
      borderRadius: 6,
      backgroundColor: BaseColors.white,
      borderColor: BaseColors.inputBorder,
      alignItems: "center",
      justifyContent: "center",
      marginRight: 15,
      marginTop: 5,
      overflow: "hidden",
    },
    dayContainer: {
      // flex: 1,
      justifyContent: "center",
      alignItems: "center",
      // margin: 1, // Optional: to create a small space between days
    },
    dayText: {
      color: "#2d4150",
      fontSize: 14,
      fontWeight: "200",
    },
    disabledText: {
      color: "red",
    },
  });
};
