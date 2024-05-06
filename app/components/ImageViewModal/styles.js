import { BaseColors } from "../../config/theme";
import { Dimensions, Platform, StyleSheet } from "react-native";

const IOS = Platform.OS === "ios";

export const createStyles = (colors) => {
  return StyleSheet.create({
    modalSty: {
      justifyContent: "center",
      alignItems: "center",
      position: "absolute",
    },
    modalViewSty: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "hsla(360, 20%,2%, 0.6)",
      width: "100%",
      height: "100%",
    },
    ImageViewSty: {
      width: Dimensions.get("screen").width / 1.1,
      backgroundColor: BaseColors.modalHeaderColor,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 5,
    },
    title: {
      fontSize: 18,
      fontWeight: "700",
      color: colors.colors.modalheaderTitle,
      textAlign: "center",
    },
  });
};
