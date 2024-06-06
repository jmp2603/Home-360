/* eslint-disable react-native/no-inline-styles */
import { BaseColors } from "../../config/theme";
import React, { useEffect, useState } from "react";
import { View, Text, StatusBar, Platform, Dimensions } from "react-native";
import { createStyles } from "./styles";
import { useIsFocused, useTheme } from "@react-navigation/native";
import FastImage from "react-native-fast-image";
import { Images } from "../../config";
import { useSelector } from "react-redux";
import moment from "moment";
import { Button } from "../../components";
import * as Progress from "react-native-progress";

const IOS = Platform.OS === "ios";
const { width, height } = Dimensions.get("window");
export default function ClockIn({ navigation, index }) {
  const isFocused = useIsFocused();
  const colors = useTheme();
  const styles = createStyles(colors);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [isClockedIn, setIsClockedIn] = useState(false);
  const [intervalId, setIntervalId] = useState(null);
  const [clockInTime, setClockInTime] = useState("");
  const [clockOutTime, setClockOutTime] = useState("");
  const [progress, setProgress] = useState(0);
  const { userData } = useSelector((state) => state.auth);
  const currentDate = new Date();

  // Function for Clock In ..
  const handleClockIn = () => {
    setIsClockedIn(true);
    setClockInTime(moment(currentDate).format("hh:mm A"));
    setClockOutTime(null);
    setHours(0);
    setMinutes(0);
    const id = setInterval(() => {
      setMinutes((prevMinutes) => {
        if (prevMinutes + 1 === 60) {
          setHours((prevHours) => prevHours + 1);
          return 0;
        }
        return prevMinutes + 1;
      });
    }, 60000); // Update every minute
    setIntervalId(id);
  };

  // Function for Clock Out..
  const handleClockOut = () => {
    setClockOutTime(moment(currentDate).format("hh:mm A"));
    setIsClockedIn(false);
    clearInterval(intervalId);
    setMinutes(minutes);
    setHours(hours);
    // Make an API call to save clock-out time if needed
  };

  const updateProgress = (totalElapsedMinutes) => {
    const progressValue = totalElapsedMinutes / 480; // Assuming 8-hour workday
    setProgress(progressValue);
  };

  useEffect(() => {
    const totalMinutes = hours * 60 + minutes;
    updateProgress(totalMinutes);
  }, [hours, minutes]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: BaseColors.white,
      }}
    >
      <StatusBar
        translucent
        barStyle="light-content"
        backgroundColor={BaseColors.primary}
      />
      <View
        style={{
          backgroundColor: BaseColors.primary,
          borderRadius: 20,
        }}
      >
        <View style={styles.headerStyle}>
          <View style={{ flexDirection: "row" }}>
            <FastImage source={Images.Profile} style={styles.profileImage} />
            <View>
              <Text style={{ color: BaseColors.white, fontSize: 18 }}>
                Hello! 👋
              </Text>
              <Text
                style={{
                  color: BaseColors.white,
                  fontSize: 20,
                  fontWeight: "600",
                }}
              >
                {userData?.name || "-"}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.timeContainer}>
        <Text style={styles.date}>{moment().format("ddd, DD MMM YYYY")}</Text>
        <View style={{ flexDirection: "row" }}>
          <View style={styles.times}>
            <Text style={styles.time}>
              {hours ? (hours > 9 ? hours : `0${hours}`) : "00"}
            </Text>
          </View>
          <Text style={styles.separator}>:</Text>
          <View style={styles.times}>
            <Text style={styles.time}>
              {minutes ? (minutes > 9 ? minutes : `0${minutes}`) : "00"}
            </Text>
          </View>
        </View>
        <View style={{ marginTop: 20 }}>
          <Progress.Bar
            progress={progress}
            width={320}
            height={7}
            style={{
              backgroundColor: BaseColors.lightOrange,
              borderColor: BaseColors.lightOrange,
            }}
            color={BaseColors.greenColor}
          />
          <View style={styles.clockTimeContainer}>
            <Text style={styles.clockTime}>{clockInTime}</Text>
            <Text style={styles.clockTime}>{clockOutTime}</Text>
          </View>
        </View>
      </View>
      <View style={{ marginHorizontal: 20 }}>
        <Button
          children={isClockedIn ? "CLOCK OUT" : "CLOCK IN"}
          onBtnClick={isClockedIn ? handleClockOut : handleClockIn}
          style={{ borderWidth: 0 }}
          containerStyle={{
            backgroundColor: isClockedIn
              ? BaseColors.orangeColor
              : BaseColors.primary,
            borderWidth: 0,
          }}
        />
      </View>
    </View>
  );
}
