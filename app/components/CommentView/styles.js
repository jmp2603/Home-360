import { Dimensions, StyleSheet } from "react-native";
import { BaseColors, FontFamily } from "../../config/theme";

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomView: {
    backgroundColor: BaseColors.white,
    borderRadius: 5,
    marginVertical: 10,
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
  },
  heading: {
    color: BaseColors.white,
    justifyContent: "center",
  },

  details: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "red",
    padding: 10,
  },
  txtSty: {
    paddingBottom: 5,
    fontWeight: "bold",
    color: "#000023",
    fontSize: 14,
  },
  txtdesSty: {
    color: "#000023",
    paddingHorizontal: 15,
    paddingBottom: 5,
    fontSize: 14,
  },
  btnSty: {
    paddingVertical: 40,
    marginHorizontal: 40,
  },
  customIconSty: {
    backgroundColor: BaseColors.inactiveIndex,
    height: 40,
    width: 40,
    borderRadius: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  data: {
    textAlign: "center",
    width: 80,
    padding: 2,
  },
  dataTxtSty: {
    fontSize: 14,
    color: BaseColors.primary,
    // fontFamily: 'Poppins',
    fontWeight: "bold",
  },
  detailTxtSty: {
    fontSize: 14,
    color: BaseColors.black,
    // fontFamily: 'Poppins',
    fontWeight: "400",
    width: Dimensions.get("window").width / 1,
  },
});
