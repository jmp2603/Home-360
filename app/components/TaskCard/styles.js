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
  });
};
