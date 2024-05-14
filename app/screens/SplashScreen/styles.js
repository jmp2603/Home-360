import { Dimensions, Platform, StyleSheet } from "react-native";
import { BaseColors } from "../../config/theme";

const IOS = Platform.OS === "ios";

export default StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: "#F7EBDA",
    alignItems: "center",
    justifyContent: "center",
  },
  aniView: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  logoSty: {
    width: Dimensions.get("window").width / 1.5,
    height: Dimensions.get("window").width / 1.5,
  },
});
