/* eslint-disable react-native/no-inline-styles */
import React, { useState } from "react";
import moment from "moment";
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  Platform,
  TouchableOpacity,
} from "react-native";
import { BaseColors } from "../../config/theme";
import DatePicker from "react-native-date-picker";
import Dicon from "react-native-vector-icons/Fontisto";
import { CustomIcon } from "../../config/LoadIcons";
import { useTheme } from "@react-navigation/native";
import DeviceInfo from "react-native-device-info";
import Icon from "react-native-vector-icons/Fontisto";
import { isEmpty } from "lodash";
import CountryPicker, {
  DEFAULT_THEME,
} from "react-native-country-picker-modal";

const isTabletDevice = DeviceInfo.isTablet();
const currentDate = new Date();
const IOS = Platform.OS === "ios";
/**
 *
 * Component for TextInput
 * @module CInput
 *
 */
function CInput(props, ref) {
  const {
    title = "",
    titleSty = {},
    placeholderText = "",
    onSubmit = () => {},
    onChange = () => {},
    value = "",
    secureText = false,
    textInputStyle = {},
    showError = false,
    keyBoardType = "default",
    errorText = "",
    returnKeyType,
    mandatory = false,
    containerSty,
    textArea = false,
    Date = false,
    onDateChange = () => {},
    selectedDate = currentDate,
    DateError = false,
    minDate,
    maxDate,
    editable = true,
    FinIconShow = false,
    FinIconPress = () => {},
    isSuffix = false,
    isPreffix = false,
    preffix = "",
    suffix = "",
    errorStyle,
    maxLength,
    phoneNumber,
    callingCode = "",
    countryCode = "",
    codeTxtSty,
    placeholderStyle,
    suffixStyle,
    ...rest
  } = props;

  const [focused, setFocused] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const colors = useTheme();

  const handlePress = () => {};

  const [show, setShow] = useState(false);
  const onSelect = (Country) => {
    onCountryChange(Country);
  };

  const myTheme = {
    ...DEFAULT_THEME,
    primaryColor: "#ccc",
    primaryColorVariant: "#eee",
    onBackgroundTextColor: !isVisible ? "white" : BaseColors.black,
    backgroundColor: BaseColors.white,
    filterPlaceholderTextColor: "#aaa",
    flagSize: 20,
    fontSize: 14,
  };

  return (
    <>
      <View>
        {title ? (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingBottom: 5,
            }}
          >
            <Text
              style={[
                styles.titleTxt,
                titleSty,
                {
                  color: editable ? BaseColors.titleColor : BaseColors.inactive,
                },
              ]}
            >
              {title}
              <Text
                style={{
                  fontSize: 15,
                }}
              >
                {mandatory ? " *" : ""}
              </Text>
            </Text>
            {FinIconShow ? (
              <CustomIcon
                name="inform"
                color={colors.colors.textColor}
                style={{ marginLeft: 5, paddingBottom: 2 }}
                onPress={FinIconPress}
                size={12}
              />
            ) : null}
          </View>
        ) : null}
        <TouchableOpacity
          activeOpacity={1}
          onPress={
            Date
              ? () => {
                  // setShow(true);
                  null;
                }
              : handlePress
          }
          style={{
            paddingBottom: 0,
            backgroundColor: "#0000",
            marginBottom: textArea
              ? showError || DateError
                ? 20
                : 10
              : DateError || showError
              ? 5
              : 0,

            borderColor: showError ? "#FF0B1E" : BaseColors.inputBorder,
            height: 40,
            justifyContent: "center",
            alignSelf: "center",
            ...containerSty,
          }}
        >
          <View
            style={{
              flexDirection: "row",
            }}
          >
            {Date ? (
              <View
                style={{
                  ...styles.datePickView,
                  height: textArea ? "auto" : IOS ? 40 : 40,
                  minHeight: IOS ? 40 : 40,
                  maxHeight: textArea ? 82 : 40,
                  justifyContent: "center",
                  alignSelf: "center",
                  borderWidth: 1,
                  borderColor: BaseColors.inputBorder,
                  fontSize: 14,
                  width: "100%",
                  textAlignVertical: textArea ? "top" : null,
                  paddingLeft: 5,
                }}
              >
                {show ? (
                  <DatePicker
                    ref={ref}
                    modal
                    open={show}
                    androidVariant="iosClone"
                    onConfirm={(date) => {
                      setShow(false);
                      onDateChange(date);
                    }}
                    onCancel={() => {
                      setShow(false);
                    }}
                    minimumDate={minDate}
                    maximumDate={maxDate}
                    date={selectedDate}
                    title={title}
                    mode="date"
                    theme="light"
                    confirmText="Confirm"
                    cancelText="Cancel"
                  />
                ) : (
                  <TouchableOpacity
                    style={{ ...styles.dateTxt }}
                    activeOpacity={0.5}
                    onPress={() => {
                      setShow(true);
                    }}
                  >
                    <Text
                      style={{
                        color: "#464E5F",
                        fontSize: 16,
                      }}
                    >
                      {selectedDate
                        ? moment(selectedDate).format("MM/DD/YYYY")
                        : "Select date"}
                    </Text>
                  </TouchableOpacity>
                )}
                <View
                  style={{
                    marginRight: 10,
                  }}
                >
                  <Dicon name="date" size={20} />
                </View>
              </View>
            ) : null}

            {!Date && (
              <View style={{ flexDirection: "row" }}>
                {isSuffix && (
                  <View
                    style={{
                      position: "absolute",
                      height: 38,
                      zIndex: 1,
                      borderRadius: 5,
                      alignItems: "center",
                      paddingHorizontal: 5,
                      flexDirection: "row",
                      ...suffixStyle,
                    }}
                  >
                    <CountryPicker
                      theme={myTheme}
                      containerButtonStyle={{}}
                      {...{
                        countryCode,
                        withCallingCode: true,
                        withFilter: true,
                        withAlphaFilter: true,
                        onSelect,
                        modalProps: {
                          visible: isVisible,
                        },
                      }}
                    />
                    <Icon name="angle-down" color="#6D7177" size={12} />
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: "200",
                        paddingHorizontal: 5,
                        color: "#6D7177",
                      }}
                    >
                      {" "}
                      |{" "}
                    </Text>
                  </View>
                )}
                <TextInput
                  {...rest}
                  ref={ref}
                  autoCorrect={false}
                  onFocus={() => {
                    setFocused(true);
                  }}
                  maxLength={maxLength}
                  blurOnSubmit={false}
                  multiline={textArea ? true : false}
                  value={value}
                  placeholderTextColor={BaseColors.inactive}
                  editable={editable}
                  placeholder={placeholderText}
                  onSubmitEditing={onSubmit}
                  onChangeText={onChange}
                  secureTextEntry={secureText}
                  keyboardType={keyBoardType}
                  returnKeyType={returnKeyType}
                  isSuffix={isSuffix}
                  style={{
                    height: textArea ? 55 : 40,
                    minHeight: 40,
                    maxHeight: textArea ? 82 : 40,
                    justifyContent: "center",
                    alignSelf: "center",
                    borderWidth: 1,
                    borderColor: editable
                      ? BaseColors.inputBorder
                      : showError
                      ? BaseColors.errorRed
                      : BaseColors.inactive,
                    fontSize: isTabletDevice ? 16 : 14,
                    width: "100%",
                    textAlignVertical: textArea ? "top" : null,
                    color:
                      editable === false
                        ? BaseColors.inactive
                        : colors.colors.textColor,
                    paddingHorizontal: 7,
                    borderRadius: 5,
                    marginTop: textArea ? 10 : 0,
                    ...textInputStyle,
                  }}
                  onBlur={() => {
                    setFocused(false);
                  }}
                />
              </View>
            )}
          </View>
        </TouchableOpacity>

        {showError || DateError ? (
          <View
            style={{
              marginTop: 7,
              backgroundColor: "#ffeded",
              borderRadius: 8,
              flexDirection: "row",
              alignItems: "center",
              paddingHorizontal: 10,
            }}
          >
            <CustomIcon name="inform" size={13} color={BaseColors.errorRed} />
            <Text style={[styles.errorTxt, errorStyle]}>{errorText}</Text>
          </View>
        ) : null}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  titleTxt: {
    paddingBottom: 5,
    opacity: 1,
    fontSize: isTabletDevice ? 18 : 14,
    fontWeight: "500",
  },
  datePickView: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  dateTxt: {
    flex: 1,
    textAlign: "left",
    paddingVertical: 2,
  },
  errorTxt: {
    fontSize: 13,
    color: BaseColors.errorRed,
    padding: 8,
    fontWeight: "500",
  },
  countryCodeTxt: {
    fontSize: 15,
    color: BaseColors.titleTxt,
    fontWeight: "500",
  },
  countryCodetxtsty: {
    fontSize: 15,
    color: BaseColors.titleTxt,
    fontWeight: "500",
    paddingRight: 5,
  },
  countryCodeView: {
    // paddingHorizontal: 10,
    // alignItems: "center",
    // justifyContent: "center",
    // overflow: "hidden",
  },
});

export default React.forwardRef(CInput);
