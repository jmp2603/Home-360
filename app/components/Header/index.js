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
import FIcon from "react-native-vector-icons/Feather";
import DeviceInfo from "react-native-device-info";

const isTabletDevice = DeviceInfo.isTablet();

const IOS = Platform.OS === "ios";
const isProMax = getStatusBarHeight(true);
const styles = StyleSheet.create({
  mainCon: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    paddingTop:
      IOS && isProMax <= 20
        ? getStatusBarHeight() + 40
        : IOS
        ? getStatusBarHeight() + 10
        : getStatusBarHeight() + 20,
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  titleCon: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  titleTxt: {
    textAlign: "center",
    fontSize: 23,
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
    width: 40,
    height: 40,
    borderWidth: 1,
    borderRadius: 30,
    backgroundColor: BaseColors.yellow,
    borderColor: BaseColors.yellow,
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
    rightIcon,
    rightIconSty,
    onRightPress,
    Rsize,
    disabled,
    customIcon,
    notification,
  } = props;

  return (
    <>
      <View
        style={[
          styles.mainCon,
          {
            backgroundColor: BaseColors.primary,
          },
          ContainerSty,
        ]}
      >
        <StatusBar
          barStyle="light-content"
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
                alignItems: "center",
                justifyContent: "center",
              },
            ]}
          >
            <CustomIcon
              name={leftIcon}
              style={[
                styles.defaultIconSty,
                {
                  fontWeight: "600",
                  color: BaseColors.white,
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
            style={[styles.titleCon]}
          >
            <Text
              numberOfLines={1}
              onPress={onHeaderPress}
              style={[
                styles.titleTxt,
                titleSty,
                { color: BaseColors.white }, // fontFamily: 'Poppins'}
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
            {customIcon ? (
              <FIcon name="more-vertical" size={20} color={BaseColors.white} />
            ) : (
              <CustomIcon
                name={rightIcon}
                size={Rsize}
                style={[
                  styles.defaultIconSty,
                  { color: BaseColors.white },
                  rightIconSty,
                ]}
              />
            )}
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
