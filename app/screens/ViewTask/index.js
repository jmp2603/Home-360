/* eslint-disable react-native/no-inline-styles */
import CHeader from "../../components/Header";
import { BaseColors } from "../../config/theme";
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  Dimensions,
} from "react-native";
import { createStyles } from "./styles";
import { useTheme } from "@react-navigation/native";
import ViewTaskCard from "../../components/ViewTaskCard";
import TextInput from "../../components/TextInput";
import { CustomIcon } from "../../config/LoadIcons";

export default function ViewTask({ navigation, index }) {
  const colors = useTheme();
  const styles = createStyles(colors);
  const [activeButton, setActiveButton] = useState("once");

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: BaseColors.white,
      }}
    >
      <CHeader
        leftIcon="Back"
        title={"View Tasks"}
        onLeftPress={() => navigation.goBack()}
      />
      <StatusBar
        translucent
        barStyle="light-content"
        backgroundColor={BaseColors.transparent}
      />
      <View style={{ marginHorizontal: 15, marginVertical: 10, marginTop: 20 }}>
        {/* <CustomIcon name="Chat" style={{ right: 10, top: 10 }} /> */}
        <TextInput
          placeholderText={"Search here..."}
          textInputStyle={{
            minHeight: 50,
            backgroundColor: BaseColors.offWhite,
            borderRadius: 10,
            borderColor: BaseColors.offWhite,
          }}
        />
      </View>
      <View style={{ marginHorizontal: 15, marginVertical: 8 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            backgroundColor: BaseColors.offWhite,
            borderWidth: 1,
            borderColor: BaseColors.offWhite,
            borderRadius: 5,
          }}
        >
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              setActiveButton("once");
            }}
            style={[
              styles.BtnViewSty,
              {
                backgroundColor:
                  activeButton === "once"
                    ? BaseColors.greenColor
                    : BaseColors.offWhite,
              },
            ]}
          >
            <Text
              style={{
                color:
                  activeButton === "once"
                    ? BaseColors.white
                    : colors.colors.textColor,
                fontSize: 16,
                paddingVertical: 4,
                textAlign: "center",
                fontWeight: activeButton === "once" ? "600" : "400",
              }}
            >
              {"One-time Tasks"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              setActiveButton("repeat");
            }}
            style={[
              styles.BtnViewSty,
              {
                backgroundColor:
                  activeButton === "repeat"
                    ? BaseColors.greenColor
                    : BaseColors.offWhite,
              },
            ]}
          >
            <Text
              style={{
                color:
                  activeButton === "repeat"
                    ? BaseColors.white
                    : colors.colors.textColor,
                fontSize: 16,
                paddingVertical: 4,
                textAlign: "center",
                fontWeight: activeButton === "once" ? "600" : "400",
              }}
            >
              {"Recurring Tasks"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {<ViewTaskCard type={activeButton} navigation={navigation} />}
    </View>
  );
}
