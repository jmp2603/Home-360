/* eslint-disable handle-callback-err */
/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState, useRef } from "react";
import { Button } from "../../components";
import TextInput from "../../components/TextInput";
import { Images } from "../../config";
import { BaseColors } from "../../config/theme";
import {
  Platform,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  BackHandler,
  Modal,
} from "react-native";
import styles from "./styles";
import Toast from "react-native-simple-toast";
import { getApiData } from "../../utils/apiHelper";
import BaseSetting from "../../config/setting";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AuthAuthentication from "../../redux/reducers/auth/actions";
import { useDispatch, useSelector } from "react-redux";
import FastImage from "react-native-fast-image";
import OTPInputView from "@twotalltotems/react-native-otp-input";

const IOS = Platform.OS === "ios";
const { setUserData, setAccessToken } = AuthAuthentication;
export default function Login({ navigation }) {
  let backPressed = 0;
  const { fcmToken } = useSelector((state) => state.notification);
  const phoneRef = useRef();
  const passwordRef = useRef();
  const dispatch = useDispatch();
  const [phone, setPhone] = useState(__DEV__ ? "9995277508" : "");
  const [password, setPassword] = useState(__DEV__ ? "593304" : "");
  const [phoneErr, setPhoneErr] = useState({ err: false, txt: "" });
  const [passwordErr, setPasswordErr] = useState({ err: false, txt: "" });
  const [btnLoader, setBtnLoader] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);
  const [visible, setVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setHidePassword(!hidePassword);
  };

  /**
   * Function for Check Validation..
   * @function loginValidate
   */
  const loginValidate = async () => {
    let valid = true;
    if (phone === "") {
      setPhoneErr({ err: true, txt: "Phone Required" });
      valid = false;
    } else {
      if (phone.length < 10) {
        setPhoneErr({ err: true, txt: "Enter Valid Phone" });
        valid = false;
      } else {
        setPhoneErr({ err: false, txt: "" });
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
      userLogin();
    }
  };

  /**
   * Function for save fcm Token for Notificaiton.
   * @function saveFcmToken
   */
  const saveFcmToken = () => {
    let url = BaseSetting.endpoints.saveFcmToken;
    const userData = {
      "AuthUserUuid[uuid]": fcmToken,
      "AuthUserUuid[platform]": IOS ? "ios" : "android",
    };
    getApiData(url, "POST", userData, "", true)
      .then(async (resp) => {})
      .catch((err) => {
        Toast.show("Something went wrong");
      });
  };

  /**
   * Function for user Login
   * @function userLogin
   */
  const userLogin = () => {
    setBtnLoader(true);
    let url = BaseSetting.endpoints.signin;
    const userData = {
      "UserLogin[phone]": Number(phone) || "",
      "UserLogin[pin]": Number(password) || "",
    };
    getApiData(url, "POST", userData, "", true)
      .then(async (resp) => {
        if (resp.status) {
          const user = {
            name: resp?.data?.name,
            phone: resp?.data?.phone,
          };
          saveFcmToken();
          dispatch(setUserData(user));
          dispatch(setAccessToken(resp?.data?.access_token));
          Toast.show(resp?.message);
          navigation.replace("Home");
          setBtnLoader(false);
        } else {
          Toast.show(resp?.message);
          setBtnLoader(false);
        }
      })
      .catch((err) => {
        Toast.show("Something went wrong");
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
      Toast.show("Press Again To Exit");
      setTimeout(() => {
        backPressed = 0;
      }, 2000);
      return true;
    }
    return true;
  }
  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress1", handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        "hardwareBackPress1",
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
      <StatusBar
        translucent
        barStyle="dark-content"
        backgroundColor={BaseColors.transparent}
      />
      <KeyboardAwareScrollView
        bounces={false}
        contentContainerStyle={{
          flexGrow: 1,
        }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        enableOnAndroid={false}
      >
        <View style={styles.container}>
          <View style={[styles.imageView]}>
            <FastImage
              source={Images.logo}
              style={{ width: "100%", height: "100%" }}
              resizeMode="contain"
            />
          </View>
          <View style={{ marginVertical: 20 }}>
            <View style={{ paddingVertical: 10 }}>
              <Text
                style={{ textAlign: "center", fontSize: 30, fontWeight: "700" }}
              >
                Login
              </Text>
            </View>
            <View>
              <Text
                style={{
                  textAlign: "center",
                  flexWrap: "wrap",
                  fontSize: 14,
                  fontWeight: "400",
                }}
              >
                {"Please login by providing your \n phone number and pin"}
              </Text>
            </View>
          </View>
          <View style={{ paddingVertical: 15 }}>
            <TextInput
              isSuffix
              phoneNumber={true}
              keyBoardType="number-pad"
              title={"Mobile Number"}
              placeholderText={"Mobile number"}
              suffixStyle={{
                height: 50,
                backgroundColor: BaseColors.transparent,
              }}
              textInputStyle={{
                paddingHorizontal: 80,
                minHeight: 50,
                backgroundColor: BaseColors.offWhite,
                borderRadius: 10,
                borderColor: phoneErr.err
                  ? BaseColors.errorRed
                  : BaseColors.offWhite,
              }}
              onChange={(value) => {
                setPhone(value.replace(/  +/g, " "));
                if (value) {
                  setPhoneErr({ err: false, txt: "" });
                }
              }}
              maxLength={10}
              value={phone}
              returnKeyType="next"
              showError={phoneErr.err}
              errorText={phoneErr.txt}
              countryCode={"IN"}
              mandatory={true}
            />
          </View>
          <View style={{ paddingTop: 15 }}>
            <Text style={styles.titleTxt}>
              {"Enter Pin"}
              <Text
                style={{
                  fontSize: 15,
                }}
              >
                {" *"}
              </Text>
            </Text>
          </View>
          <View style={{ marginVertical: 20 }}>
            <OTPInputView
              style={{ width: "100%", height: 10 }}
              pinCount={6}
              code={password} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
              onCodeChanged={(code) => {
                setPassword(code);
              }}
              codeInputFieldStyle={[styles.OtpStyle]}
              codeInputHighlightStyle={{ color: BaseColors.black }}
              onCodeFilled={(code) => {
                console.log(`Code is ${code}, you are good to go!`);
              }}
            />
          </View>
          {/* <View
            style={{
              justifyContent: "flex-end",
              paddingTop: 15,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                setVisible(true);
              }}
              style={{ flexDirection: "row", alignItems: "center" }}
            >
              <Text style={styles.notetxtSty}>{"Forgot Pin"}</Text>
            </TouchableOpacity>
          </View> */}
          <View style={{ marginTop: 20 }}>
            <Button
              containerStyle={{
                backgroundColor: BaseColors.primary,
                height: 45,
              }}
              style={{ marginTop: 30 }}
              loading={btnLoader}
              onBtnClick={() => {
                loginValidate();
              }}
            >
              {"Login"}
            </Button>
          </View>
        </View>
      </KeyboardAwareScrollView>
      {/* Forgot Pin Information Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        close={() => {
          setVisible(false);
        }}
        onRequestClose={() => {
          setVisible(false);
        }}
      >
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setVisible(false)}
          style={styles.modalView}
        >
          <TouchableOpacity
            onPress={() => {
              null;
            }}
            activeOpacity={1}
            style={[
              styles.background,
              {
                paddingHorizontal: 20,
              },
            ]}
          >
            <View style={{ justifyContent: "center" }}>
              <Text
                style={{ textAlign: "center", fontSize: 16, fontWeight: "700" }}
              >
                Note
              </Text>
            </View>
            <View style={{ marginVertical: 10 }}>
              <Text style={{ color: BaseColors.textColor }}>
                Administrators should have a way to manually reset a user's PIN.
                This might involve verifying the user's identity through
                additional information.
              </Text>
            </View>
            <View style={{ paddingVertical: 5 }}>
              <Button type="primary" onBtnClick={() => setVisible(false)}>
                OK
              </Button>
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
      {/* End */}
    </View>
  );
}
