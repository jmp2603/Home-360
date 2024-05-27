/* eslint-disable react-native/no-inline-styles */
import { BaseColors } from "../../config/theme";
import React from "react";
import { View, Text, StatusBar, Platform, Dimensions } from "react-native";
import { createStyles } from "./styles";
import { useIsFocused, useTheme } from "@react-navigation/native";
import FastImage from "react-native-fast-image";
import { Images } from "../../config";
import { useSelector } from "react-redux";

const IOS = Platform.OS === "ios";
const { width, height } = Dimensions.get("window");
export default function ClockIn({ navigation, index }) {
  const isFocused = useIsFocused();
  const colors = useTheme();
  const styles = createStyles(colors);
  const { userData } = useSelector((state) => state.auth);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: BaseColors.white,
      }}
    >
      <StatusBar
        translucent
        barStyle="light-content"
        backgroundColor={BaseColors.primary}
      />
      <View
        style={{
          backgroundColor: BaseColors.primary,
          borderRadius: 20,
        }}
      >
        <View style={styles.headerStyle}>
          <View style={{ flexDirection: "row" }}>
            <FastImage source={Images.Profile} style={styles.profileImage} />
            <View>
              <Text style={{ color: BaseColors.white, fontSize: 18 }}>
                Hello! 👋
              </Text>
              <Text
                style={{
                  color: BaseColors.white,
                  fontSize: 20,
                  fontWeight: "600",
                }}
              >
                {userData?.name || "-"}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
