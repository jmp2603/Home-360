/* eslint-disable react-native/no-inline-styles */
import CHeader from "../../components/Header";
import { BaseColors } from "../../config/theme";
import React, { useRef, useState } from "react";
import { View, StatusBar, FlatList, Dimensions } from "react-native";
import { createStyles } from "./styles";
import { useTheme } from "@react-navigation/native";
import { Text } from "react-native";
import { Button, NoData } from "../../components";
import { ActivityIndicator } from "react-native";
import { isEmpty } from "lodash";

const { width, height } = Dimensions.get("window");
export default function SalaryHistory({ navigation, index }) {
  const colors = useTheme();
  const styles = createStyles(colors);
  const [screenLoader, setScreenLoader] = useState(false);
  const salaryData = [
    {
      salaryMonth: "May 2024",
      salaryAmount: "",
      receivedDate: "",
      paymentMethod: "",
    },
    {
      salaryMonth: "April 2024",
      salaryAmount: "25,000",
      receivedDate: "16-04-2024",
      paymentMethod: "Cash",
    },
    {
      salaryMonth: "March 2024",
      salaryAmount: "25,000",
      receivedDate: "16-03-2024",
      paymentMethod: "UPI",
    },
    {
      salaryMonth: "February 2024",
      salaryAmount: "25,000",
      receivedDate: "16-02-2024",
      paymentMethod: "UPI",
    },
    {
      salaryMonth: "February 2024",
      salaryAmount: "25,000",
      receivedDate: "16-02-2024",
      paymentMethod: "UPI",
    },
  ];

  const renderItem = ({ item, index }) => {
    return (
      <View
        style={{
          marginVertical: 5,
          backgroundColor: "#E5EDFF",
          borderRadius: 20,
          flexDirection: "row",
        }}
      >
        <View
          style={{
            width: 5,
            height: 90,
            backgroundColor: "#8093C5",
            alignSelf: "center",
            borderRadius: 5,
          }}
        />
        <View style={{ padding: 15 }}>
          <Text style={styles.title}>
            Salary Month: <Text style={styles.value}> {item.salaryMonth}</Text>
          </Text>
          <Text style={styles.title}>
            Salary Amount:{" "}
            <Text style={styles.value}> ₹ {item.salaryAmount || "---"} </Text>
          </Text>
          <Text style={styles.title}>
            Received Date:{" "}
            <Text style={styles.value}> {item.receivedDate || "---"} </Text>
          </Text>
          <Text style={styles.title}>
            Payment Method:{" "}
            <Text style={styles.value}> {item.paymentMethod || "---"} </Text>
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
        title={"View Salary History"}
        onLeftPress={() => navigation.goBack()}
      />
      <StatusBar
        translucent
        barStyle="light-content"
        backgroundColor={BaseColors.transparent}
      />
      <View style={{ marginHorizontal: 15, flex: 1, marginTop: 10 }}>
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
        ) : isEmpty(salaryData) ? (
          <NoData />
        ) : (
          <FlatList
            bounces={false}
            showsVerticalScrollIndicator={false}
            data={salaryData}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            //   onEndReached={onEndReached}
            onendreachedthreshold={0.8}
            //   ListFooterComponent={renderListFooter}
            style={{ marginBottom: 20 }}
          />
        )}
      </View>
    </View>
  );
}
