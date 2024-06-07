/* eslint-disable react-native/no-inline-styles */
import CHeader from "../../components/Header";
import { BaseColors } from "../../config/theme";
import React, { useRef, useState } from "react";
import { View, StatusBar, Dimensions } from "react-native";
import { createStyles } from "./styles";
import { useTheme } from "@react-navigation/native";
import Calender from "../../components/Calender";
import { Button } from "../../components";
import { Text } from "react-native";
import TextInput from "../../components/TextInput";
import { TouchableOpacity } from "react-native";
import { CustomIcon } from "../../config/LoadIcons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const { width, height } = Dimensions.get("window");
export default function AppliedLeave({ navigation, index }) {
  const colors = useTheme();
  const styles = createStyles(colors);
  const [description, setDescription] = useState(false);
  const [descriptionVal, setDescriptionVal] = useState("");

  return (
    <View
      style={{
        backgroundColor: BaseColors.white,
      }}
    >
      <CHeader
        leftIcon="Back"
        title={"Apply For Leave"}
        onLeftPress={() => navigation.goBack()}
      />
      <StatusBar
        translucent
        barStyle="light-content"
        backgroundColor={BaseColors.transparent}
      />
      <KeyboardAwareScrollView
        bounces={false}
        contentContainerStyle={{ marginHorizontal: 20, flexGrow: 1 }}
      >
        <View style={{ marginVertical: 15 }}>
          <Text style={styles.headerStl}>Select Day/Days:</Text>
          <Calender />
        </View>
        <Text style={[styles.headerStl, { marginBottom: 5 }]}>
          Description:
        </Text>
        <View
          style={{
            paddingVertical: 5,
            marginBottom: 20,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          {description ? (
            <View style={{ height: 80, justifyContent: "center" }}>
              <TextInput
                textArea
                placeholderText="Type here..."
                value={descriptionVal}
                textInputStyle={{
                  backgroundColor: BaseColors.offWhite,
                }}
                onChange={(value) => setDescriptionVal(value)}
              />
            </View>
          ) : (
            <>
              <View style={{ width: "84%" }}>
                <TextInput
                  isSuffix
                  suffixIcon="Voice"
                  placeholderText="Hold on mic to record voice"
                  textInputStyle={{
                    paddingHorizontal: 40,
                    minHeight: 50,
                    backgroundColor: BaseColors.offWhite,
                    borderRadius: 10,
                    borderColor: BaseColors.offWhite,
                  }}
                  onChange={(value) => {}}
                />
              </View>
              <View style={{ marginBottom: 0 }}>
                <TouchableOpacity
                  onPress={() => setDescription(true)}
                  activeOpacity={0.7}
                  style={{
                    width: "20%",
                    marginHorizontal: 10,
                    width: 50,
                    height: 50,
                    borderRadius: 30,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: BaseColors.primary,
                  }}
                >
                  <CustomIcon name="Chat" size={25} color={BaseColors.white} />
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
        <Button children="APPLY" onBtnClick={() => navigation.goBack()} />
      </KeyboardAwareScrollView>
    </View>
  );
}
