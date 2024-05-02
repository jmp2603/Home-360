/* eslint-disable handle-callback-err */
/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState, useRef } from "react";
import { Button } from "../../components";
import TextInput from "../../components/TextInput";
import { Images } from "../../config";
import { BaseColors } from "../../config/theme";
import {
  Keyboard,
  Platform,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  BackHandler,
  Dimensions,
} from "react-native";
import styles from "./styles";
import Toast from "react-native-simple-toast";
import { getApiData } from "../../utils/apiHelper";
import BaseSetting from "../../config/setting";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { CustomIcon } from "../../config/LoadIcons";
import AuthAuthentication from "../../redux/reducers/auth/actions";
import { useDispatch } from "react-redux";
import DeviceInfo from "react-native-device-info";
import FastImage from "react-native-fast-image";

const IOS = Platform.OS === "ios";
const { setUserData, setAccessToken } = AuthAuthentication;
export default function Login({ navigation }) {
  let backPressed = 0;
  const emailRef = useRef();
  const passwordRef = useRef();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailErr, setEmailErr] = useState({ err: false, txt: "" });
  const [passwordErr, setPasswordErr] = useState({ err: false, txt: "" });
  const [checkBoxErr, setCheckBoxErr] = useState({ err: false, txt: "" });
  const [btnLoader, setBtnLoader] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);
  const isTabletDevice = DeviceInfo.isTablet();

  const togglePasswordVisibility = () => {
    setHidePassword(!hidePassword);
  };

  // Validation for Login...
  const loginValidate = async () => {
    let valid = true;
    if (email === "") {
      setEmailErr({ err: true, txt: "Phone Required" });
      valid = false;
    } else {
      if (email.length < 10) {
        setEmailErr({ err: true, txt: "Enter Valid Phone" });
        valid = false;
      } else {
        setEmailErr({ err: false, txt: "" });
      }
    }
    if (password === "") {
      valid = false;
      setPasswordErr({ err: true, txt: "Pin Required" });
    } else {
      if (password.length < 6) {
        valid = false;
        setPasswordErr({ err: true, txt: "Enter Valid Pin" });
      } else {
        setPasswordErr({ err: false, txt: "" });
      }
    }
    if (valid) {
      navigation.replace("Home");
      // userLogin();
    }
  };

  // User Login API Integration..
  const userLogin = () => {
    setBtnLoader(true);
    let url = BaseSetting.endpoints.signin;
    const userData = {
      email: email || "",
      password: password || "",
      language_id: "en" || "",
      app_login: 1,
    };
    getApiData(url, "POST", userData)
      .then(async (resp) => {
        if (resp.status) {
          dispatch(setUserData(resp?.data?.user));
          dispatch(setAccessToken(resp?.data?.token));
          Toast.show(resp?.message);
          setBtnLoader(false);
        } else {
          Toast.show(resp?.message);
          setBtnLoader(false);
        }
      })
      .catch((err) => {
        Toast.show("somethingWentWrong");
        setBtnLoader(false);
      });
  };

  // this is for hard back from app....
  function handleBackButtonClick() {
    if (backPressed > 0) {
      BackHandler.exitApp();
      backPressed = 0;
    } else {
      backPressed++;
      // Toast.show("Press again to exit");
      setTimeout(() => {
        backPressed = 0;
      }, 2000);
      return true;
    }
    return true;
  }
  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        "hardwareBackPress",
        handleBackButtonClick
      );
    };
  }, []);

  return (
    <View
      style={{
        flex: 1,
        paddingTop: getStatusBarHeight() + 20,
        backgroundColor: BaseColors.white,
      }}
    >
      <KeyboardAwareScrollView
        bounces={false}
        contentContainerStyle={{
          flexGrow: 1,
        }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        enableOnAndroid={false}
      >
        <StatusBar
          translucent
          barStyle="dark-content"
          backgroundColor={BaseColors.transparent}
        />
        <View style={styles.container}>
          <View style={[styles.imageView]}>
            <FastImage
              source={Images.logo}
              style={{ width: "100%", height: "100%" }}
              resizeMode="contain"
            />
          </View>
          <View style={{ paddingVertical: 15 }}>
            <TextInput
              keyboardType="numeric"
              ref={emailRef}
              maxLength={10}
              title={"Phone"}
              placeholderText={"Phone"}
              value={email}
              containerSty={{}}
              onChange={(value) => {
                setEmail(value);
                if (value?.length > 0) {
                  setEmailErr(false);
                }
              }}
              showError={emailErr.err}
              errorText={emailErr.txt}
              onSubmit={() => {
                passwordRef.current.focus();
              }}
              returnKeyType="next"
              textInputStyle={{ color: BaseColors.textColor }}
            />
          </View>
          <View style={{ flexDirection: "row" }}>
            <TextInput
              keyboardType="numeric"
              ref={passwordRef}
              maxLength={6}
              title={"Pin"}
              placeholderText={"Pin"}
              value={password}
              secureText={hidePassword}
              containerSty={{}}
              onChange={(value) => {
                setPassword(value);
                if (value.length > 0) {
                  setPasswordErr(false);
                }
              }}
              onSubmit={() => {
                Keyboard.dismiss();
              }}
              showError={passwordErr.err}
              errorText={passwordErr.txt}
              textInputStyle={{ color: BaseColors.textColor }}
              returnKeyType="done"
            />
            <TouchableOpacity
              style={{
                position: "absolute",
                top: isTabletDevice
                  ? Dimensions.get("window").height / 32
                  : IOS
                  ? 32
                  : 34,
                right: 10,
              }}
              onPress={togglePasswordVisibility}
            >
              <CustomIcon
                size={20}
                name={hidePassword ? "CloseEye" : "eye"}
                style={{ color: BaseColors.inputBorder }}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              justifyContent: "space-between",
              flexDirection: "row",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("ForgotPassword");
              }}
              style={{ flexDirection: "row", alignItems: "center" }}
            >
              <Text style={styles.notetxtSty}>{'Forgot Pin'}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.errView}>
            {checkBoxErr.err && (
              <Text style={styles.checkboxErr}>{checkBoxErr.txt}</Text>
            )}
          </View>
          <View style={{ marginTop: 30 }}>
            <Button
              loading={btnLoader}
              onBtnClick={() => {
                loginValidate();
              }}
            >
              {'Login'}
            </Button>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}
