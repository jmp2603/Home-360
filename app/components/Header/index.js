import React from "react";
import PropTypes from "prop-types";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  StatusBar,
  Dimensions,
} from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { BaseColors } from "../../config/theme";
import { CustomIcon } from "../../config/LoadIcons";
import { useTheme } from "@react-navigation/native";
import DeviceInfo from "react-native-device-info";

const isTabletDevice = DeviceInfo.isTablet();

const IOS = Platform.OS === "ios";
const isProMax = getStatusBarHeight(true);
const styles = StyleSheet.create({
  mainCon: {
    width: "100%",
    // height: getStatusBarHeight() + 50,
    flexDirection: "row",
    alignItems: "center",
    paddingTop: isTabletDevice
      ? getStatusBarHeight() + 20
      : IOS && isProMax <= 20
      ? getStatusBarHeight() + 40
      : IOS
      ? getStatusBarHeight() + 10
      : getStatusBarHeight() + 20,
    // paddingTop: IOS ? getStatusBarHeight() : 0,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  titleCon: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  titleTxt: {
    textAlign: "center",
    fontSize: isTabletDevice ? 22 : 18,
    // textTransform: 'capitalize',
    // fontFamily: 'Poppins',
    fontWeight: "600",
  },
  defaultIconSty: {
    fontSize: isTabletDevice ? 30 : 22,
  },
  rTxt: {
    color: BaseColors.textColor,
    fontSize: 16,
  },
  defaultLesticonSty: {
    fontSize: 20,
    // color: "#464E5F",
  },
  defaultRightTextSty: {
    alignItems: "flex-end",
    justifyContent: "center",
    width: 50,
  },
});

/**
 *Header component
 * @function CHeader
 *
 */
export default function CHeader(props) {
  const {
    onHeaderPress,
    ContainerSty,
    title,
    titleSty,
    leftIcon,
    leftIconSty,
    onLeftPress,
    rText,
    rTextClick,
    rightIcon,
    rightIconSty,
    onRightPress,
    Rsize,
    defaultRtxtSty,
    rtxtsty,
    disabled,
    rTextDisabled = false,
    notification,
  } = props;
  const colors = useTheme();

  return (
    <>
      <View
        style={[
          styles.mainCon,
          {
            backgroundColor: colors.colors.white,
          },
          ContainerSty,
        ]}
      >
        <StatusBar
          barStyle="dark-content"
          backgroundColor={BaseColors.transparent}
          translucent
        />
        {leftIcon ? (
          <TouchableOpacity
            disabled={disabled}
            activeOpacity={0.5}
            onPress={onLeftPress}
            style={[
              styles.defaultLesticonSty,
              {
                alignItems: "flex-start",
                justifyContent: "center",
                width: isTabletDevice ? 65 : 50,
              },
            ]}
          >
            <CustomIcon
              name={leftIcon}
              style={[
                styles.defaultIconSty,
                {
                  fontWeight: "600",
                  color: colors.colors.textColor,
                },
                leftIconSty,
              ]}
            />
          </TouchableOpacity>
        ) : (
          <View style={{ width: 50 }} />
        )}
        {title ? (
          <TouchableOpacity
            activeOpacity={1}
            onPress={null}
            style={[
              styles.titleCon,
              {
                paddingLeft:
                  notification &&
                  isTabletDevice &&
                  Dimensions.get("window").width / 8,
              },
            ]}
          >
            <Text
              numberOfLines={1}
              onPress={onHeaderPress}
              style={[
                styles.titleTxt,
                titleSty,
                { color: colors.colors.textColor }, // fontFamily: 'Poppins'}
              ]}
            >
              {title}
            </Text>
          </TouchableOpacity>
        ) : null}

        {rightIcon ? (
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={onRightPress}
            style={[
              {
                alignItems: "flex-end",
                justifyContent: "center",
                width: 50,
              },
            ]}
          >
            <CustomIcon
              name={rightIcon}
              size={Rsize}
              // color={colors.colors.textColor}
              style={[
                styles.defaultIconSty,
                { color: colors.colors.primary },
                rightIconSty,
              ]}
            />
          </TouchableOpacity>
        ) : rText ? (
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={rTextClick}
            disabled={rTextDisabled}
            style={[styles.defaultRightTextSty, defaultRtxtSty]}
          >
            <Text style={[styles.rTxt, rtxtsty]}>{rText}</Text>
          </TouchableOpacity>
        ) : (
          <View style={{ width: 50 }} />
        )}
      </View>
    </>
  );
}

CHeader.propTypes = {
  title: PropTypes.string,
  rText: PropTypes.string,
  dark: PropTypes.bool,
  barColor: PropTypes.string,
  onHeaderPress: PropTypes.func,
  leftIcon: PropTypes.string,
  onLefttPress: PropTypes.func,
  rightIcon: PropTypes.string,
  onRightPress: PropTypes.func,
  onFilterPress: PropTypes.func,
};

CHeader.defaultProps = {
  title: " ",
  rText: "",
  dark: false,
  barColor: BaseColors.primary,
  onHeaderPress: () => {},
  leftIcon: "",
  onLefttPress: () => {},
  rightIcon: "",
  onRightPress: () => {},
  onFilterPress: () => {},
};
