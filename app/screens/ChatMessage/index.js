import CHeader from "../../components/Header";
import { BaseColors } from "../../config/theme";
import React, { useState } from "react";
import { View, StatusBar, Dimensions } from "react-native";
import { createStyles } from "./styles";
import { useTheme } from "@react-navigation/native";

const IOS = Platform.OS === "ios";
const { width, height } = Dimensions.get("window");
export default function ChatMessage({ navigation, route }) {
  const details = route.params.details;
  const colors = useTheme();
  const styles = createStyles(colors);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: BaseColors.white,
      }}
    >
      <CHeader
        title={details?.name}
        leftIcon="Back"
        onLeftPress={() => navigation.goBack()}
      />
      <StatusBar
        translucent
        barStyle="light-content"
        backgroundColor={BaseColors.transparent}
      />
    </View>
  );
}
