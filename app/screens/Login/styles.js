import { BaseColors } from "../../config/theme";
import { Dimensions, StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    justifyContent: "center",
    alignContent: "center",
    marginHorizontal: 15,
    marginTop: 60,
    alignSelf: "center",
  },
  imageView: {
    width: Dimensions.get("window").width / 1.5,
    height: 150,
    justifyContent: "center",
    alignSelf: "center",
  },
  notetxtSty: {
    fontSize: 14,
    fontWeight: "400",
    color: BaseColors.primary,
  },
  titleTxt: {
    paddingBottom: 5,
    opacity: 1,
    fontSize: 14,
    fontWeight: "500",
    color: BaseColors.textColor,
  },
  modalView: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    backgroundColor: "hsla(360, 20%,2%, 0.6)",
  },
  background: {
    backgroundColor: BaseColors.modalHeaderColor,
    paddingHorizontal: 30,
    paddingVertical: 20,
    elevation: 10,
    width: "90%",
    justifyContent: "center",
    alignSelf: "center",
    shadowColor: BaseColors.transparent,
    borderRadius: 10,
  },
  errTxt: {
    fontSize: 13,
    color: BaseColors.red,
    paddingVertical: 5,
    fontWeight: "500",
  },
});
