import { BaseColors } from "../../config/theme";
import { Dimensions, StyleSheet } from "react-native";

export const createStyles = (colors) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: BaseColors.white,
    },
    cardSty: {
      marginVertical: 10,
      width: Dimensions.get("window").width / 1.07,
      marginRight: 15,
      borderRadius: 5,
      shadowColor: "#000",
      shadowOffset: { width: 2, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 4,
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
  });
};
