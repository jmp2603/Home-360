import DeviceInfo from "react-native-device-info";
import { BaseColors } from "../../config/theme";
import { Dimensions, Platform, StyleSheet } from "react-native";

const IOS = Platform.OS === "ios";
const isTabletDevice = DeviceInfo.isTablet();

export default StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  imageView: {
    justifyContent: "center",
    alignItems: "center",
    // paddingTop: 50,
    // paddingTop: 60,
    paddingTop: Dimensions.get("window").height / 9.3,
  },
  logoSty: {
    // width: Dimensions.get('window').width / 3.8,
    // height: Dimensions.get("window").width / 3.6,
    // width: 103,
  },
  titletxt: {
    paddingTop: isTabletDevice ? 40 : 20,
    textAlign: "center",
    fontSize: isTabletDevice ? 30 : 20,
    fontWeight: "500",
    color: BaseColors.primary,
  },
  txtsty: {
    fontSize: isTabletDevice ? 26 : 16,
    color: BaseColors.primary,
    fontWeight: "400",
    // fontFamily: 'Poppins',
    textAlign: "center",
    paddingBottom: 20,
  },
  checkboxView: {
    paddingTop: 5,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  checkboxTxt: {
    fontSize: isTabletDevice ? 24 : 14,
    // fontFamily: FontFamily.regular,
    color: BaseColors.white,
    maxWidth: 197,
  },
  checkIcon: {
    alignSelf: "flex-start",
    fontSize: isTabletDevice ? 35 : 25,
    color: BaseColors.white,
  },

  btnView: {
    paddingHorizontal: 40,
    paddingVertical: 30,
    // width: '100%',
    // position: 'absolute',
    // bottom: 25,
  },
  clickSty: {
    borderWidth: 1,
    borderColor: BaseColors.red,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    height: 18,
    width: 18,
  },
  txtSty: {
    borderBottomColor: BaseColors.white,
    borderBottomWidth: 1,
    color: BaseColors.white,
    // textAlign: 'center',
    // backgroundColor: 'pink',
  },
  txtView: {
    flexDirection: "row",
  },
  gogleiconSty: {
    height: 40,
    width: 40,
    alignSelf: "center",
  },
  notetxtSty: {
    fontSize: isTabletDevice ? 20 : 12,
    fontWeight: "400",
    paddingHorizontal: 10,
    color: "#464E5F",
    paddingTop: isTabletDevice ? 3 : 0,
    // fontFamily: 'Poppins',
  },
  bordersty: {
    borderBottomWidth: 0.2,
    borderColor: BaseColors.inactive,
    display: "flex",
    flexDirection: "row",
    height: 0,
    width: 70,
    paddingBottom: 10,
  },
});
