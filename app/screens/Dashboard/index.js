/* eslint-disable handle-callback-err */
/* eslint-disable react-native/no-inline-styles */
import React, { useEffect } from "react";
import { BaseColors } from "../../config/theme";
import {
  StatusBar,
  Text,
  View,
  BackHandler,
  TouchableOpacity,
} from "react-native";
import styles from "./styles";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { translate } from "../../lang/Translate";
import CHeader from "../../components/Header";
import { CustomIcon } from "../../config/LoadIcons";

export default function Dashboard({ navigation }) {
  let backPressed = 0;

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

  const DetailArray = [
    { name: "Pending Task", icon: "home-selected", bgColor: "red", number: 20 },
    {
      name: "Completed Task",
      icon: "home-selected",
      bgColor: "yellow",
      number: 40,
    },
    { name: "OverView", icon: "home-selected", bgColor: "green", number: 100 },
    { name: "Pending Task", icon: "home-selected", bgColor: "red", number: 70 },
    {
      name: "Completed Task",
      icon: "home-selected",
      bgColor: "yellow",
      number: 90,
    },
    { name: "OverView", icon: "home-selected", bgColor: "green", number: 120 },
    { name: "Pending Task", icon: "home-selected", bgColor: "red", number: 20 },
    {
      name: "Completed Task",
      icon: "home-selected",
      bgColor: "yellow",
      number: 40,
    },
    { name: "OverView", icon: "home-selected", bgColor: "green", number: 100 },
    { name: "Pending Task", icon: "home-selected", bgColor: "red", number: 70 },
    {
      name: "Completed Task",
      icon: "home-selected",
      bgColor: "yellow",
      number: 90,
    },
    { name: "OverView", icon: "home-selected", bgColor: "green", number: 120 },
  ];

  return (
    <View
      style={{
        flex: 1,
        paddingTop: getStatusBarHeight(),
        backgroundColor: BaseColors.primary,
      }}
    >
      <CHeader
        title={<Text style={{ color: BaseColors.white }}>Dashboard</Text>}
        rightIcon="Notification"
        rightIconSty={{ color: BaseColors.white }}
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
        <StatusBar
          translucent
          barStyle="dark-content"
          backgroundColor={BaseColors.transparent}
        />
        <View style={{ paddingHorizontal: 20, paddingBottom: 20 }}>
          <Text
            style={{ color: BaseColors.white, fontSize: 20, fontWeight: "800" }}
          >
            Hello,
          </Text>
          <Text
            style={{ color: BaseColors.white, fontSize: 18, fontWeight: "500" }}
          >
            Jaimin Prajapati
          </Text>
        </View>
        <View
          style={{
            backgroundColor: BaseColors.whiteSmoke,
            flex: 1,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
          }}
        >
          <View
            style={{
              paddingTop: 20,
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: 20,
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "600" }}>OverView</Text>
            <TouchableOpacity
              style={{
                borderWidth: 1,
                borderColor: BaseColors.inactive,
                backgroundColor: BaseColors.inactive,
                borderRadius: 5,
              }}
              activeOpacity={0.6}
            >
              <Text style={{ padding: 4 }}>10/05/2024</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: "row",
              paddingHorizontal: 20,
              flexWrap: "wrap",
              marginTop: 10,
            }}
          >
            {DetailArray &&
              DetailArray.map((li) => {
                return (
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={{
                      width: 100,
                      height: 140,
                      backgroundColor: BaseColors.white,
                      borderRadius: 7,
                      justifyContent: "center",
                      margin: 8,
                      shadowColor: "#000",
                      shadowOffset: { width: 2, height: 4 },
                      shadowOpacity: 0.2,
                      shadowRadius: 4,
                    }}
                    onPress={() => navigation.navigate("TaskScreen")}
                  >
                    <View
                      style={{
                        width: 50,
                        height: 50,
                        borderRadius: 30,
                        backgroundColor: li.bgColor,
                        justifyContent: "center",
                        alignSelf: "center",
                      }}
                    >
                      <CustomIcon
                        name={li.icon}
                        size={25}
                        color={"white"}
                        style={{
                          justifyContent: "center",
                          alignSelf: "center",
                        }}
                      />
                    </View>
                    <Text
                      style={{
                        justifyContent: "center",
                        textAlign: "center",
                        paddingVertical: 8,
                        fontSize: 14,
                        fontWeight: "600",
                      }}
                    >
                      {li.name}
                    </Text>
                    <Text
                      style={{
                        justifyContent: "center",
                        textAlign: "center",
                        fontSize: 14,
                        fontWeight: "600",
                        color: "green",
                      }}
                    >
                      {li.number}
                    </Text>
                  </TouchableOpacity>
                );
              })}
          </View>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}
