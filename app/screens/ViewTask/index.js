/* eslint-disable react-native/no-inline-styles */
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
import ViewTaskCard from "../../components/ViewTaskCard";
import { CustomIcon } from "../../config/LoadIcons";
import Popover from "react-native-popover-view";
import { TextInput } from "react-native";

export default function ViewTask({ navigation, index }) {
  const colors = useTheme();
  const touchable = useRef();
  const styles = createStyles(colors);
  const [activeButton, setActiveButton] = useState("once");
  const [searchVal, setSearchVal] = useState("");
  const [showPopover, setShowPopover] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("all");

  const filterArr = [
    { title: "All", val: "all" },
    { title: "Pending", val: 0 },
    { title: "Completed", val: 1 },
  ];

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
        <View style={{ flexDirection: "row" }}>
          <TextInput
            value={searchVal}
            placeholderTextColor={BaseColors.grey}
            placeholder={"Search here..."}
            onChangeText={(val) => setSearchVal(val)}
            isSuffix
            isPreffix
            style={{
              minHeight: 50,
              justifyContent: "center",
              alignSelf: "center",
              paddingRight: 50,
              borderWidth: 1,
              borderColor: BaseColors.offWhite,
              backgroundColor: BaseColors.offWhite,
              fontSize: 14,
              width: "100%",
              color: BaseColors.textColor,
              paddingHorizontal: 7,
              borderRadius: 5,
            }}
          />
          <View
            style={{
              position: "absolute",
              height: 50,
              borderRadius: 5,
              justifyContent: "center",
              paddingHorizontal: 10,
              right: 1,
              top: 1,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                textAlign: "center",
                color: BaseColors.grey,
                fontSize: 25,
                fontWeight: "200",
                paddingHorizontal: 5,
              }}
            >
              {"|"}
            </Text>
            <CustomIcon
              ref={touchable}
              name="Filter"
              onPress={() => setShowPopover(true)}
              size={25}
              color={BaseColors.primary}
            />
          </View>
        </View>
        <Popover
          from={touchable}
          isVisible={showPopover}
          statusBarTranslucent={true}
          popoverStyle={{ width: 120, borderRadius: 5, paddingHorizontal: 10 }} // Adjust as needed
          arrowSize={{ height: 0, width: 0 }}
          onRequestClose={() => setShowPopover(false)}
        >
          {filterArr &&
            filterArr.map((li, ind) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    setSelectedFilter(li.val);
                    setShowPopover(false);
                  }}
                  activeOpacity={0.8}
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    borderBottomWidth: filterArr.length - 1 === ind ? 0 : 1,
                    borderColor: BaseColors.offWhite,
                    paddingHorizontal: 2,
                  }}
                >
                  <Text
                    style={{
                      color: BaseColors.titleColor,
                      fontSize: 18,
                      paddingVertical: 10,
                    }}
                  >
                    {li.title}
                  </Text>
                </TouchableOpacity>
              );
            })}
        </Popover>
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
      {
        <ViewTaskCard
          type={activeButton}
          searchVal={searchVal}
          navigation={navigation}
          selectedFilter={selectedFilter}
        />
      }
    </View>
  );
}
