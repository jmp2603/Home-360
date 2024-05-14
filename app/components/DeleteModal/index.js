/* eslint-disable react-native/no-inline-styles */
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
  Platform,
  Dimensions,
} from "react-native";
import Button from "../../components/Button";
import Iicon from "react-native-vector-icons/Feather";
import PropTypes from "prop-types";
import { BaseColors } from "../../config/theme";
import { createStyles } from "./styles";
import { useTheme } from "@react-navigation/native";
import DeviceInfo from "react-native-device-info";

/**
 * Module DeleteModal
 * @module DeleteModal
 *
 */

const IOS = Platform.OS === "ios";
const { height } = Dimensions.get("window");

export default function DeleteModal(props, navigation) {
  const {
    children,
    customPanelSty,
    title,
    description,
    btnYTitle,
    btnNTitle,
    btnYPress,
    btnNPress,
    visible,
    setVisible,
    loader,
    endTrip,
  } = props;

  const colors = useTheme();
  const styles = createStyles(colors);
  const isTabletDevice = DeviceInfo.isTablet();

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      close={() => {
        setVisible(!visible);
      }}
      onRequestClose={() => {
        setVisible(!visible);
      }}
    >
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => setVisible(!visible)}
        style={styles.mainView}
      >
        <TouchableOpacity
          onPress={() => {
            null;
          }}
          activeOpacity={1}
          style={[
            styles.background,
            {
              paddingHorizontal: children ? 20 : 30,
              height: "auto",
              width: isTabletDevice ? "94%" : "90%",
            },
            customPanelSty,
          ]}
        >
          <View style={styles.titleView}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Iicon
                name="alert-circle"
                size={30}
                color={"#cf1313"}
                style={{ paddingRight: 5 }}
              />
              <Text style={styles.titletxt}>
                {title === "" ? "Delete" : title}
              </Text>
            </View>
          </View>
          <>
            <Text style={styles.promptTxt}>
              {description === ""
                ? "Are you sure you want to delete?"
                : description}
            </Text>
            <View style={styles.alertView}>
              <Button
                type="outlined"
                style={styles.buttonNo}
                onBtnClick={btnNPress}
              >
                <Text style={styles.textStyle}>{btnNTitle} </Text>
              </Button>
              <Button
                type="primary"
                style={styles.buttonYes}
                onBtnClick={btnYPress}
              >
                {!loader ? (
                  <Text style={styles.textStyle}>{btnYTitle}</Text>
                ) : (
                  <ActivityIndicator animating color={BaseColors.white} />
                )}
              </Button>
            </View>
          </>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
}
DeleteModal.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  btnYTitle: PropTypes.string,
  btnNTitle: PropTypes.string,
  btnYPress: PropTypes.func,
  btnNPress: PropTypes.func,
  btnXPress: PropTypes.func,
  btnOkPress: PropTypes.func,
  bt: PropTypes.func,
  lottieViewVisible: PropTypes.bool,
};

DeleteModal.defaultProps = {
  title: "",
  description: "",
  btnYTitle: "Yes",
  btnNTitle: "Cancel",
  btnYPress: () => {},
  btnNPress: () => {},
  onClose: false,
  loader: false,
  lottieViewVisible: true,
  btnOkPress: () => {},
};
