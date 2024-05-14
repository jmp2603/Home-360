/* eslint-disable react-native/no-inline-styles */
import CHeader from "../../components/Header";
import { BaseColors } from "../../config/theme";
import React, { useState } from "react";
import { View, Text, TouchableOpacity, StatusBar } from "react-native";
import { createStyles } from "./styles";
import { useTheme } from "@react-navigation/native";
import TaskCard from "../../components/TaskCard";

export default function Home({ navigation, index }) {
  const colors = useTheme();
  const styles = createStyles(colors);
  const [activeButton, setActiveButton] = useState("pending");

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.colors.white,
      }}
    >
      <CHeader
        leftIconSty={{
          fontSize: 22,
          color: colors.colors.textColor,
        }}
        title={"Task"}
      />
      <StatusBar
        translucent
        barStyle="dark-content"
        backgroundColor={BaseColors.transparent}
      />
      <View style={{ marginHorizontal: 15, marginBottom: 5 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            backgroundColor: "#e6ecf0",
            borderRadius: 5,
          }}
        >
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              setActiveButton("pending");
            }}
            style={[
              styles.BtnViewSty,
              {
                backgroundColor:
                  activeButton === "pending"
                    ? BaseColors.primary
                    : colors.colors.textColor,
              },
            ]}
          >
            <Text
              style={{
                color:
                  activeButton === "pending"
                    ? BaseColors.white
                    : colors.colors.textColor,
                fontSize: 18,
                paddingVertical: 4,
                textAlign: "center",
                fontWeight: activeButton === "pending" ? "700" : "400",
              }}
            >
              {"Pending Tasks"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              setActiveButton("complete");
            }}
            style={[
              styles.BtnViewSty,
              {
                backgroundColor:
                  activeButton === "complete"
                    ? BaseColors.primary
                    : colors.colors.textColor,
              },
            ]}
          >
            <Text
              style={{
                color:
                  activeButton === "complete"
                    ? BaseColors.white
                    : colors.colors.textColor,
                fontSize: 18,
                paddingVertical: 4,
                textAlign: "center",
                fontWeight: activeButton === "complete" ? "700" : "400",
              }}
            >
              {"Completed Tasks"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {
        <TaskCard
          type={activeButton === "pending" ? 0 : 1}
          navigation={navigation}
        />
      }
    </View>
  );
}
