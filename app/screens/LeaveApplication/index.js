/* eslint-disable react-native/no-inline-styles */
import CHeader from "../../components/Header";
import { BaseColors } from "../../config/theme";
import React, { useRef, useState } from "react";
import { View, StatusBar, FlatList, Dimensions } from "react-native";
import { createStyles } from "./styles";
import { useTheme } from "@react-navigation/native";
import { Text } from "react-native";
import Calender from "../../components/Calender";
import { Button, NoData } from "../../components";
import { ActivityIndicator } from "react-native";
import { isEmpty } from "lodash";

const { width, height } = Dimensions.get("window");
export default function LeaveApplication({ navigation, index }) {
  const colors = useTheme();
  const styles = createStyles(colors);
  const [screenLoader, setScreenLoader] = useState(false);
  const leaveData = [
    {
      date: "10 May 2024",
      description: "Applied for Leave",
      status: "Approved",
    },
    {
      date: "13 May 2024",
      description: "Applied for Leave",
      status: "Approved",
    },
    {
      date: "18 May 2024",
      description: "Applied for Leave",
      status: "Rejected",
    },
    {
      date: "13 May 2024",
      description: "Applied for Leave",
      status: "Approved",
    },
    {
      date: "22 May 2024 to 25 May 2024",
      description: "Applied for Leave",
      status: "Pending",
    },
    {
      date: "13 May 2024",
      description: "Applied for Leave",
      status: "Approved",
    },
    {
      date: "18 May 2024",
      description: "Applied for Leave",
      status: "Rejected",
    },
    {
      date: "13 May 2024",
      description: "Applied for Leave",
      status: "Approved",
    },
    {
      date: "22 May 2024 to 25 May 2024",
      description: "Applied for Leave",
      status: "Pending",
    },
  ];

  const renderItem = ({ item, index }) => {
    const color =
      item?.status === "Approved"
        ? BaseColors.greenColor
        : item?.status === "Rejected"
        ? BaseColors.errorRed
        : BaseColors.yellow;
    return (
      <View style={{ paddingVertical: 10 }}>
        <Text style={{ fontSize: 14, fontWeight: "700" }}>{item.date}</Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 8,
          }}
        >
          <Text
            style={{ fontSize: 16, fontWeight: "400", color: BaseColors.grey }}
          >
            {item.description}
          </Text>
          <Text style={{ color: color, fontWeight: "700", fontSize: 14 }}>
            {item.status}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: BaseColors.white,
      }}
    >
      <CHeader
        leftIcon="Back"
        title={"Leave Application"}
        onLeftPress={() => navigation.goBack()}
      />
      <StatusBar
        translucent
        barStyle="light-content"
        backgroundColor={BaseColors.transparent}
      />
      <View style={{ marginHorizontal: 20, flex: 1 }}>
        <View style={{ marginVertical: 15 }}>
          <Calender />
        </View>
        <View>
          {screenLoader ? (
            <ActivityIndicator
              size={IOS ? "small" : "large"}
              color={BaseColors.primary}
              style={{
                flex: 1,
                justifyContent: "center",
                alignSelf: "center",
              }}
            />
          ) : isEmpty(leaveData) ? (
            <NoData />
          ) : (
            <FlatList
              bounces={false}
              showsVerticalScrollIndicator={false}
              data={leaveData}
              renderItem={renderItem}
              maxHeight={height / 2.8}
              keyExtractor={(item, index) => index.toString()}
              //   onEndReached={onEndReached}
              onendreachedthreshold={0.8}
              //   ListFooterComponent={renderListFooter}
              style={{ marginBottom: 10 }}
            />
          )}
        </View>
        <Button
          children="APPLY FOR LEAVE"
          onBtnClick={() => navigation.navigate("AppliedLeave")}
        />
      </View>
    </View>
  );
}
