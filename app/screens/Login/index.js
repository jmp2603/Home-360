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
import FastImage from "react-native-fast-image";
import styles from "./styles";
import FIcon from "react-native-vector-icons/Feather";
import BaseSetting from "../../config/setting";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { translate } from "../../lang/Translate";
import { CustomIcon } from "../../config/LoadIcons";

const IOS = Platform.OS === "ios";
export default function Login({ navigation }) {
  let backPressed = 0;
  const emailRef = useRef();
  const passwordRef = useRef();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailErr, setEmailErr] = useState({ err: false, txt: "" });
  const [passwordErr, setPasswordErr] = useState({ err: false, txt: "" });
  const [btnLoader, setBtnLoader] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);

  const togglePasswordVisibility = () => {
    setHidePassword(!hidePassword);
  };

  // Validation for Login...
  const loginValidate = async () => {
    let valid = true;
    if (email === "") {
      setEmailErr({ err: true, txt: translate("emailvalidation") });
      valid = false;
    } else {
      if (BaseSetting.emailRegex.test(email) === false) {
        setEmailErr({ err: true, txt: translate("entervalidemail") });
        valid = false;
      } else {
        setEmailErr({ err: false, txt: "" });
      }
    }
    if (password === "") {
      valid = false;
      setPasswordErr({ err: true, txt: translate("passwordvalidation") });
    } else {
      if (password.length < 6) {
        valid = false;
        setPasswordErr({ err: true, txt: translate("entervalidpassword") });
      } else {
        setPasswordErr({ err: false, txt: "" });
      }
    }
    if (valid) {
      navigation.navigate("Dashbaord");
    }
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
        paddingTop: getStatusBarHeight(),
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
          <View
            style={[
              styles.imageView,
              {
                paddingTop: Dimensions.get("window").height / 9.3,
              },
            ]}
          >
            <FastImage
              source={Images.logo}
              style={[
                styles.logoSty,
                {
                  width: Dimensions.get("window").width / 1.5,
                  height: 150,
                },
              ]}
            />
          </View>

          <View>
            <Text style={styles.titletxt}>{translate("Welcome Back")}</Text>
            <Text style={styles.txtsty}>
              {translate("Log in to countinue")}{" "}
            </Text>
            <View style={{ paddingVertical: 15 }}>
              <TextInput
                ref={emailRef}
                title={translate("Email")}
                placeholderText={translate("email")}
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
              <View style={{ paddingBottom: 15 }}>
                <TextInput
                  password
                  ref={passwordRef}
                  title={translate("Password")}
                  placeholderText={translate("password")}
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
              </View>
              <TouchableOpacity
                style={{
                  position: "absolute",
                  top: IOS ? 32 : 34,
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
                justifyContent: "flex-end",
                flexDirection: "row",
              }}
            >
              <TouchableOpacity
                onPress={() => {}}
                style={{ flexDirection: "row", alignItems: "center" }}
              >
                <FIcon name="lock" size={20} style={{ color: "red" }} />
                <Text style={styles.notetxtSty}>
                  {translate("Forgot Password")}
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                width: "90%",
                justifyContent: "center",
                alignSelf: "center",
              }}
            >
              <Button
                containerStyle={{
                  backgroundColor: BaseColors.primary,
                  height: 45,
                }}
                style={{ marginTop: 30 }}
                loading={btnLoader}
                onBtnClick={() => {
                  navigation.navigate("Dashbaord");
                  loginValidate();
                }}
              >
                {"Login"}
              </Button>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}
