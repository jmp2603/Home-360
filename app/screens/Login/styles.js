import { BaseColors } from "../../config/theme";
import { Dimensions, StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    justifyContent: "center",
    alignContent: "center",
    marginHorizontal: 20,
    alignSelf: "center",
    marginVertical: 10,
  },
  imageView: {
    width: Dimensions.get("window").width / 2.5,
    height: 100,
    justifyContent: "center",
    alignSelf: "center",
    marginVertical: 10,
    marginTop: Dimensions.get("window").width / 8,
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
    color: BaseColors.titleColor,
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
  textInputStyle: {
    paddingHorizontal: 80,
    minHeight: 50,
    backgroundColor: BaseColors.offWhite,
    borderRadius: 10,
  },
  OtpStyle: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: BaseColors.offWhite,
    backgroundColor: BaseColors.offWhite,
    color: BaseColors.black,
    borderRadius: 10,
  },
  textInputStyle: {
    paddingHorizontal: 80,
    minHeight: 50,
    backgroundColor: BaseColors.offWhite,
    borderRadius: 10,
  },
});
