/* eslint-disable react-native/no-inline-styles */
import CHeader from "../../components/Header";
import { BaseColors } from "../../config/theme";
import React, { useRef, useState } from "react";
import { View, StatusBar } from "react-native";
import { createStyles } from "./styles";
import { useTheme } from "@react-navigation/native";
import { Text } from "react-native";
import Calender from "../../components/Calender";

export default function ViewAttendance({ navigation, index }) {
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
        leftIcon="Back"
        title={"View Attendance"}
        onLeftPress={() => navigation.goBack()}
      />
      <StatusBar
        translucent
        barStyle="light-content"
        backgroundColor={BaseColors.transparent}
      />
      <View
        style={{
          flexDirection: "row",
          marginVertical: 10,
          marginHorizontal: 20,
        }}
      >
        <View
          style={[
            styles.countContainer,
            {
              backgroundColor: "#EAFFF6",
              marginRight: 10,
            },
          ]}
        >
          <View
            style={[
              styles.stickStyle,
              { backgroundColor: BaseColors.greenColor },
            ]}
          />
          <View style={{ justifyContent: "center" }}>
            <Text
              style={{ color: BaseColors.grey, fontSize: 16, marginBottom: 5 }}
            >
              Present Days :
            </Text>
            <Text style={styles.countStyle}>13.0</Text>
          </View>
        </View>
        <View
          style={[
            styles.countContainer,
            {
              backgroundColor: BaseColors.lightRed,
            },
          ]}
        >
          <View
            style={[
              styles.stickStyle,
              { backgroundColor: BaseColors.errorRed },
            ]}
          />
          <View style={{ justifyContent: "center" }}>
            <Text
              style={{ color: BaseColors.grey, fontSize: 16, marginBottom: 5 }}
            >
              Absent Days :
            </Text>
            <Text style={styles.countStyle}>2.0</Text>
          </View>
        </View>
      </View>
      <View style={{ marginVertical: 5, marginHorizontal: 20 }}>
        <Calender />
      </View>
    </View>
  );
}
