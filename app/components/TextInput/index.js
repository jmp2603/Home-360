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
    ...rest
  } = props;

  const [focused, setFocused] = useState(false);
  const [timesPressed, setTimesPressed] = useState(false);
  const colors = useTheme();

  const handlePress = () => {};

  const [show, setShow] = useState(false);

  return (
    <>
      <View>
        {title ? (
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text
              style={[
                styles.titleTxt,
                titleSty,
                {
                  color: editable
                    ? colors.colors.textColor
                    : BaseColors.inactive,
                },
              ]}
            >
              {title}
              <Text
                style={{
                  fontSize: isTabletDevice ? 18 : 15,
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
                      height: isTabletDevice ? 38.9 : 38,
                      backgroundColor: BaseColors.whiteSmoke,
                      borderRadius: 5,
                      justifyContent: "center",
                      paddingHorizontal: 5,
                    }}
                  >
                    <Text
                      style={{
                        textAlign: "center",
                        color: BaseColors.textColor,
                      }}
                    >
                      {suffix}
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
                    height: textArea ? 55 : IOS ? 40 : 40,
                    minHeight: IOS ? 40 : 40,
                    maxHeight: textArea ? 82 : 40,
                    justifyContent: "center",
                    alignSelf: "center",
                    borderWidth: 1,
                    borderColor: editable
                      ? BaseColors.inputBorder
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
                {isPreffix && (
                  <View
                    style={{
                      position: "absolute",
                      height: isTabletDevice ? 38.9 : 38,
                      backgroundColor: BaseColors.whiteSmoke,
                      borderRadius: 5,
                      justifyContent: "center",
                      paddingHorizontal: 5,
                      right: 1,
                      top: 1,
                    }}
                  >
                    <Text
                      style={{
                        textAlign: "center",
                        color: BaseColors.textColor,
                        fontSize: isTabletDevice ? 16 : null,
                      }}
                    >
                      {preffix}
                    </Text>
                  </View>
                )}
              </View>
            )}
          </View>
        </TouchableOpacity>

        {showError || DateError ? (
          <Text style={[styles.errorTxt, errorStyle]}>{errorText}</Text>
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
    color: BaseColors.red,
    paddingBottom: 5,
    fontWeight: "500",
  },
});

export default React.forwardRef(CInput);
