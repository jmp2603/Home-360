/* eslint-disable react-native/no-inline-styles */
import CHeader from "../../components/Header";
import { BaseColors } from "../../config/theme";
import React, { useRef, useState } from "react";
import { View, StatusBar } from "react-native";
import { createStyles } from "./styles";
import { useTheme } from "@react-navigation/native";
import { Text } from "react-native";
import { Calendar } from "react-native-calendars";
import { CustomIcon } from "../../config/LoadIcons";
import Popover, { PopoverPlacement } from "react-native-popover-view";
import moment from "moment";

export default function ViewAttendance({ navigation, index }) {
  const colors = useTheme();
  const touchable = useRef();
  const styles = createStyles(colors);
  const [changeMonth, setChangeMonth] = useState(new Date());
  const [popover, setPopover] = useState(false);

  const popoverArray = [
    { color: BaseColors.errorRed, title: "Approved Leave" },
    { color: BaseColors.grey, title: "Day-off" },
    { color: BaseColors.yellow, title: "Today" },
    { color: BaseColors.primary, title: "Applied for Leave" },
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
        <Calendar
          firstDay={1}
          theme={{
            calendarBackground: BaseColors.lightPrimary,
            textDayFontSize: 16,
            textDayFontWeight: "500",
            arrowColor: BaseColors.primary,
            textMonthFontWeight: "800",
            textMonthFontSize: 18,
            textDayHeaderFontSize: 14,
            textDayHeaderFontWeight: "700",
            textSectionTitleColor: "black",
          }}
          style={{
            borderWidth: 1,
            borderRadius: 10,
            borderColor: BaseColors.primary,
            height: 320,
            backgroundColor: BaseColors.lightPrimary,
          }}
          onMonthChange={(date) => setChangeMonth(date?.dateString)}
          renderHeader={(date) => {
            return (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  margin: 10,
                }}
              >
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                  {moment(changeMonth).format("MMMM YYYY")}
                </Text>
                <View style={{ flexDirection: "row", marginHorizontal: 10 }}>
                  <View
                    style={[
                      styles.headerCircle,
                      { backgroundColor: BaseColors.redColor },
                    ]}
                  />
                  <View
                    style={[
                      styles.headerCircle,
                      {
                        backgroundColor: BaseColors.yellow,
                        marginLeft: -3,
                        zIndex: 3,
                      },
                    ]}
                  />
                  <View
                    style={[
                      styles.headerCircle,
                      {
                        backgroundColor: BaseColors.grey,
                        marginLeft: -3,
                        zIndex: 3,
                        marginRight: 2,
                      },
                    ]}
                  />
                </View>
                <Popover
                  from={(sourceRef) => (
                    <CustomIcon
                      onPress={() => setPopover(true)}
                      name="info-circle"
                      style={{ fontWeight: "bold", fontSize: 15 }}
                      color={BaseColors.primary}
                    />
                  )}
                  isVisible={popover}
                  statusBarTranslucent={true}
                  popoverStyle={{ width: 200, borderRadius: 8 }} // Adjust as needed
                  placement={PopoverPlacement.BOTTOM}
                  onRequestClose={() => setPopover(false)}
                >
                  <View style={{ marginVertical: 4 }}>
                    {popoverArray &&
                      popoverArray.map((li) => {
                        return (
                          <View
                            style={{
                              flexDirection: "row",
                              paddingHorizontal: 10,
                              paddingVertical: 5,
                            }}
                          >
                            <View
                              style={{
                                width: 5,
                                height: 5,
                                backgroundColor: BaseColors.primary,
                                borderRadius: 10,
                                alignSelf: "center",
                                marginRight: 5,
                              }}
                            />
                            <View
                              style={{
                                width: 15,
                                height: 15,
                                borderRadius: 10,
                                backgroundColor: li.color,
                                marginRight: 5,
                              }}
                            />
                            <Text style={{ color: BaseColors.titleColor }}>
                              {li.title}
                            </Text>
                          </View>
                        );
                      })}
                  </View>
                </Popover>
              </View>
            );
          }}
          // Mark specific dates as marked
          markedDates={{
            "2024-06-01": {
              selected: true,
              selectedColor: BaseColors.greenColor,
            },
            "2024-06-02": {
              selected: true,
              selectedColor: BaseColors.errorRed,
            },
            "2024-06-03": {
              selected: true,
              selectedColor: BaseColors.greenColor,
            },
            "2024-06-04": {
              selected: true,
              selectedColor: BaseColors.greenColor,
            },
            "2024-06-05": {
              selected: true,
              selectedColor: BaseColors.greenColor,
            },
          }}
        />
      </View>
    </View>
  );
}
