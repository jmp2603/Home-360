import { Images } from "../../config";
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

let backPressed = 0;

const SplashScreen = ({ navigation }) => {
  const { accessToken } = useSelector((state) => state.auth);
  const scale = useSharedValue(0);
  const transform = useSharedValue(0);
  const aniImgLogo = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  useEffect(() => {
    scale.value = withTiming(1, { duration: 2000 });
    transform.value = withSpring(200, { duration: 2000 });
    setTimeout(() => {
      if (accessToken) {
        navigation.replace("Home");
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
        barStyle="dark-content"
        backgroundColor={"#F7EBDA"}
        translucent
      />

      <View style={styles.mainView}>
        <Animated.View style={[aniImgLogo, styles.aniView]}>
          <FastImage
            source={Images.logo}
            style={styles.logoSty}
            resizeMode="contain"
          />
        </Animated.View>
      </View>
    </>
  );
};

export default SplashScreen;
