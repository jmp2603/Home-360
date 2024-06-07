/* eslint-disable react-native/no-inline-styles */
import { BaseColors } from "../../config/theme";
import React, { useState } from "react";
import { View, Text } from "react-native";
import { createStyles } from "./styles";
import { useTheme } from "@react-navigation/native";
import { Calendar } from "react-native-calendars";
import { CustomIcon } from "../../config/LoadIcons";
import Popover, { PopoverPlacement } from "react-native-popover-view";
import moment from "moment";

export default function Calender(props) {
  const colors = useTheme();
  const styles = createStyles(colors);
  const currentDate = new Date();
  const [changeMonth, setChangeMonth] = useState(currentDate);
  const [popover, setPopover] = useState(false);

  const popoverArray = [
    { color: BaseColors.errorRed, title: "Approved Leave" },
    { color: BaseColors.grey, title: "Day-off" },
    { color: BaseColors.yellow, title: "Today" },
    { color: BaseColors.primary, title: "Applied for Leave" },
  ];

  return (
    <View>
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
        style={styles.calenderStyle}
        onMonthChange={(date) => setChangeMonth(date?.dateString)}
        renderHeader={(date) => {
          return (
            <View style={styles.headerContainer}>
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
                          <View style={styles.smallCircle} />
                          <View
                            style={[
                              styles.bigCircle,
                              {
                                backgroundColor: li.color,
                              },
                            ]}
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
          [moment(currentDate).format("YYYY-MM-DD")]: {
            selected: true,
            selectedColor: BaseColors.yellow,
          },
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
  );
}
