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
import AIcon from "react-native-vector-icons/AntDesign";
import FastImage from "react-native-fast-image";
import UserAvatar from "react-native-user-avatar";
import { useSelector } from "react-redux";
import { useTheme } from "@react-navigation/native";
import { Images } from "../../config";
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
    dark,
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
    rightdashboardicon,
    onimageclick,
    disabled,
    rTextDisabled = false,
    notification,
    onFilterPress,
  } = props;
  const { userData, skipOffline } = useSelector((state) => state.auth);
  const colors = useTheme();

  const { notificationCount } = useSelector((state) => state.notification);

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
        ) : rightdashboardicon ? (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              width: 50,
              // backgroundColor: "pink",
              // paddingRight: 20,
            }}
          >
            <View>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={onRightPress}
                style={[
                  {
                    alignItems: "flex-end",
                    justifyContent: "center",
                    // width: 50,
                    paddingRight: 20,
                  },
                ]}
              >
                {notificationCount?.criticalCount > 0 && (
                  <View
                    style={{
                      zIndex: 1,
                      position: "relative",
                      top: 30,
                      left: -1,
                    }}
                  >
                    <View
                      style={{
                        flex: 1,
                        backgroundColor: BaseColors.red,
                        position: "absolute",
                        bottom: 15,
                        borderRadius: 30,
                        justifyContent: "center",
                        alignSelf: "center",
                        height: 18,
                        width: 18,
                      }}
                    >
                      <Text
                        style={{
                          color: BaseColors.white,
                          fontSize: 10,
                          justifyContent: "center",
                          alignSelf: "center",
                        }}
                      >
                        {notificationCount?.criticalCount > 100
                          ? "99+"
                          : notificationCount?.criticalCount}
                      </Text>
                    </View>
                  </View>
                )}
                <AIcon
                  name="warning"
                  style={[
                    styles.defaultIconSty,
                    { color: dark ? BaseColors.white : BaseColors.red },
                    rightIconSty,
                  ]}
                  size={Rsize}
                />
              </TouchableOpacity>
            </View>
            <View
              style={[
                {
                  alignItems: "flex-end",
                  justifyContent: "center",
                  // width: 50,
                  paddingRight: 26.5,
                },
              ]}
            >
              <TouchableOpacity
                activeOpacity={1}
                onPress={onimageclick}
                style={{ width: 30, height: 30, borderRadius: 15 }}
              >
                {userData?.user_profile_url ? (
                  <FastImage
                    source={
                      userData?.user_profile_url
                        ? { uri: userData?.user_profile_url }
                        : Images.Profile
                    }
                    style={{ width: "100%", height: "100%", borderRadius: 15 }}
                    resizeMode="contain"
                  />
                ) : (
                  <UserAvatar
                    style={{ width: "100%", height: "100%", borderRadius: 15 }}
                    name={`${userData.first_name} ${userData.last_name}`}
                  />
                )}
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={{ width: 50 }} />
        )}
        {notification ? (
          <CustomIcon
            name={"filter"}
            onPress={onFilterPress}
            style={[
              styles.defaultIconSty,
              { color: colors.colors.primary, paddingLeft: 10 },
            ]}
          />
        ) : null}
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
