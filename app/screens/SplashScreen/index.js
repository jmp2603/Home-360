// import { Images } from "../../config";
import { Images } from "../../config";
import { BaseColors } from "../../config/theme";
import React, { useEffect } from "react";
import { BackHandler, View, StatusBar, Text, Dimensions } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { useSelector } from "react-redux";
import styles from "./styles";
import FastImage from "react-native-fast-image";
import DeviceInfo from "react-native-device-info";

let backPressed = 0;

const SplashScreen = ({ navigation }) => {
  const { introScreens, accessToken } = useSelector((state) => state.auth);
  const scale = useSharedValue(0);
  const transform = useSharedValue(0);
  const aniImgLogo = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });
  const version = DeviceInfo.getVersion();

  useEffect(() => {
    scale.value = withTiming(1, { duration: 2000 });
    transform.value = withSpring(200, { duration: 2000 });
    setTimeout(() => {
      if (introScreens) {
        if (accessToken) {
          navigation.replace("Dashbaord");
        } else {
          navigation.replace("Login");
        }
      } else {
        navigation.replace("Login");
      }
    }, 3000);
  }, []);

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        "hardwareBackPress",
        handleBackButtonClick
      );
    };
  }, []);

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

  return (
    <>
      <StatusBar
        animated
        barStyle="light-content"
        backgroundColor={BaseColors.white}
        translucent
      />

      <View style={styles.mainView}>
        <Animated.View style={[aniImgLogo, styles.aniView]}>
          {/* <Svg height="100" width="100">
            <Image href={Images.oceananutLogo} style={styles.logoSty} />
          </Svg> */}
          <FastImage source={Images.oceananutpngLogo} style={styles.logoSty} />
        </Animated.View>
        <View
          style={{
            alignItems: "center",
            marginBottom: Dimensions.get("window").height / 8,
          }}
        >
          <Text style={{ color: "#464E5F" }}>{`Version: ${version}`}</Text>
        </View>
      </View>
    </>
  );
};

export default SplashScreen;
