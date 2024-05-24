/* eslint-disable react-native/no-inline-styles */
import { BaseColors } from "../../config/theme";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { createStyles } from "./styles";
import { useTheme } from "@react-navigation/native";
import { NoData } from "../../components";
import { flattenDeep, isEmpty } from "lodash";
import { CustomIcon } from "../../config/LoadIcons";
import { Calendar } from "react-native-calendars";
import BaseSetting from "../../config/setting";
import { urlParams } from "../../utils/CommonFunc";
import { getApiData } from "../../utils/apiHelper";
import moment from "moment";

export default function ViewTaskCard(props) {
  const { type, navigation, searchVal, selectedFilter } = props;
  const colors = useTheme();
  const styles = createStyles(colors);
  const [screenLoader, setScreenLoader] = useState(false);
  const [openCalender, setOpenCalender] = useState(null);
  const [taskList, setTaskList] = useState([]);
  const [nextPage, setNextPage] = useState(false);
  const [nextLoading, setNextLoading] = useState(false);
  const [page, setPage] = useState(1);

  /**
   * Function for Get Task List...
   * @function getTaskList
   * @param {Number} p - Set for Page Number
   * @param {String} ty - Type for loader.
   */
  const getTaskList = async (p = 1, ty, selected) => {
    setScreenLoader(ty == "onEndreached" ? false : true);
    const data = {
      type: type,
      page: p,
      title: searchVal,
      status: selected === "all" ? null : selected,
    };
    const string = urlParams(data);
    const url = BaseSetting.endpoints.taskList + string?._j;
    try {
      const resp = await getApiData(url, "GET");
      if (resp?.status) {
        let tempPArr = resp?.data;
        if (p > 1) {
          tempPArr = flattenDeep([taskList, tempPArr]);
        }
        setPage(Number(resp?.pagination?.currentPage));
        setTaskList(tempPArr);
        if (resp?.pagination?.isMore) {
          setNextPage(true);
        } else {
          setNextPage(false);
        }
        setNextLoading(false);
      } else {
        setTaskList([]);
      }
      setScreenLoader(false);
    } catch (error) {
      setTaskList([]);
      setScreenLoader(false);
      Toast.show("Something went wrong");
    }
  };
  const onEndReached = () => {
    if (nextPage && !nextLoading) {
      setNextLoading(true);
      const tempPage = page + 1;
      setPage(tempPage);
      getTaskList(tempPage, "onEndreached");
    }
  };
  const renderListFooter = () => {
    if (!nextPage) {
      return (
        <Text
          style={{
            width: "100%",
            textAlign: "center",
            textAlignVertical: "center",
            height: 20,
          }}
        >
          {/* No more Data */}
        </Text>
      );
    }
    if (nextLoading) {
      return (
        <ActivityIndicator style={{ color: BaseColors.primary, height: 60 }} />
      );
    }
    return null;
  };

  useEffect(() => {
    const type = !isEmpty(searchVal) ? "onEndreached" : "";
    getTaskList(1, type, selectedFilter);
  }, [type, searchVal, selectedFilter]);

  const getMarkedDates = (dates, color) => {
    const markedDates = {};
    dates &&
      dates.forEach((dateItem) => {
        markedDates[dateItem.end_date] = {
          selected: true,
          selectedColor: color,
        };
      });
    return markedDates;
  };

  const renderItem = ({ item, index }) => {
    const background =
      item?.status === 0
        ? BaseColors.lightYellow
        : item?.status === 1
        ? BaseColors.lightPrimary
        : BaseColors.lightRed;
    const color =
      item?.status === 0
        ? BaseColors.yellow
        : item?.status === 1
        ? BaseColors.primary
        : BaseColors.redColor;
    const markedDate =
      type === "repeat" &&
      !isEmpty(item?.task_data) &&
      getMarkedDates(item?.task_data, color);
    return (
      <View key={index}>
        <View
          style={{
            ...styles.cardSty,
            borderRadius: 10,
            backgroundColor: background,
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <View
              style={{
                justifyContent: "center",
              }}
            >
              <View
                style={{
                  width: 3,
                  height: 50,
                  borderRadius: 8,
                  backgroundColor: color,
                  justifyContent: "center",
                }}
              />
            </View>
            <View
              style={{
                paddingVertical: 8,
                paddingHorizontal: 10,
                width: "100%",
              }}
            >
              <Text
                numberOfLines={1}
                style={{
                  color: BaseColors.black,
                  fontSize: 18,
                  paddingVertical: 3,
                  fontWeight: "600",
                }}
              >
                {item?.title}
              </Text>
              <Text
                numberOfLines={1}
                style={{
                  color: BaseColors.black,
                  fontSize: 14,
                  paddingVertical: 3,
                }}
              >
                Assigned By : {item?.assignedBy || "Admin"}
              </Text>
              <Text
                style={{
                  color: BaseColors.black,
                  paddingVertical: 3,
                  fontSize: 14,
                }}
              >
                Next Due Date :{" "}
                {moment(item?.end_date).format("DD-MM-YYYY") || "-"}
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      width: 8,
                      height: 8,
                      backgroundColor: color,
                      borderRadius: 10,
                      marginRight: 5,
                    }}
                  />
                  <Text
                    style={{
                      color: color,
                      paddingVertical: 3,
                      fontSize: 16,
                      fontWeight: "400",
                    }}
                  >
                    {item?.status === 0
                      ? "Pending"
                      : item?.status === 1
                      ? "Completed"
                      : "Overdue "}
                  </Text>
                  {type === "repeat" && (
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <Text style={{ marginHorizontal: 2, color: color }}>
                        {" "}
                        |{" "}
                      </Text>
                      <CustomIcon name="Refresh" size={18} color={color} />
                      <Text style={{ marginHorizontal: 2, color: color }}>
                        {" "}
                        |{" "}
                      </Text>
                      <CustomIcon
                        name="Calendar"
                        size={20}
                        color={color}
                        onPress={() => {
                          if (index === openCalender) {
                            setOpenCalender(null);
                          } else {
                            setOpenCalender(index);
                          }
                        }}
                      />
                    </View>
                  )}
                </View>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() =>
                    navigation.navigate("TaskDetails", { detail: item })
                  }
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 20,
                    backgroundColor: BaseColors.primary,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <CustomIcon
                    name="Eye"
                    style={{ padding: 5 }}
                    color={BaseColors.white}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
        {type === "repeat" && openCalender === index && (
          <View style={{ marginVertical: 5 }}>
            <Calendar
              firstDay={1}
              theme={{
                calendarBackground: background,
                textDayFontSize: 16,
                textDayFontWeight: "500",
                arrowColor: color,
                textMonthFontWeight: "800",
                textMonthFontSize: 18,
                textDayHeaderFontWeight: "700",
                textSectionTitleColor: "black",
              }}
              style={{
                borderWidth: 1,
                borderRadius: 10,
                borderColor: color,
                height: 320,
                backgroundColor: background,
              }}
              // Mark specific dates as marked
              markedDates={markedDate}
            />
          </View>
        )}
      </View>
    );
  };

  return (
    <>
      <View style={{ ...styles.container, backgroundColor: BaseColors.white }}>
        {screenLoader ? (
          <ActivityIndicator
            color={BaseColors.primary}
            style={{
              flex: 1,
              justifyContent: "center",
              alignSelf: "center",
            }}
          />
        ) : isEmpty(taskList) ? (
          <NoData />
        ) : (
          <View style={{ marginHorizontal: 10 }}>
            <FlatList
              bounces={false}
              showsVerticalScrollIndicator={false}
              data={taskList}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
              onEndReached={onEndReached}
              onendreachedthreshold={0.8}
              ListFooterComponent={renderListFooter}
              contentContainerStyle={{
                padding: 0,
                margin: 0,
              }}
            />
          </View>
        )}
      </View>
    </>
  );
}
