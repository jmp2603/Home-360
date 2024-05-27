import CHeader from "../../components/Header";
import { BaseColors } from "../../config/theme";
import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  Dimensions,
} from "react-native";
import { createStyles } from "./styles";
import { useTheme } from "@react-navigation/native";

const IOS = Platform.OS === "ios";
const { width, height } = Dimensions.get("window");
export default function Chat({ navigation, index }) {
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
      <CHeader title={"Chat"} />
      <StatusBar
        translucent
        barStyle="light-content"
        backgroundColor={BaseColors.transparent}
      />
      <View style={{ marginHorizontal: 10, marginVertical: 10 }}>
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
                    : BaseColors.titleColor,
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
                    : BaseColors.titleColor,
                fontSize: 16,
                paddingVertical: 4,
                textAlign: "center",
                fontWeight: activeButton === "repeat" ? "600" : "400",
              }}
            >
              {"Recurring Tasks"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
