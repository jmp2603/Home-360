/* eslint-disable react-native/no-inline-styles */
import CHeader from "../../components/Header";
import React, { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  Text,
  View,
  ActivityIndicator,
  Platform,
  StatusBar,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { createStyles } from "./styles";
import { useIsFocused, useTheme } from "@react-navigation/native";
import Toast from "react-native-simple-toast";
import { BaseColors } from "../../config/theme";
import BaseSetting from "../../config/setting";
import { getApiData } from "../../utils/apiHelper";
import { NoData } from "../../components";
import { flattenDeep, isEmpty } from "lodash";
import { urlParams } from "../../utils/CommonFunc";
import { CustomIcon } from "../../config/LoadIcons";

const { width, height } = Dimensions.get("window");
const IOS = Platform.OS === "ios";
export default function UpcomingTask({ navigation, route }) {
  const colors = useTheme();
  const styles = createStyles(colors);
  const isFocused = useIsFocused();
  const [taskList, setTaskList] = useState([]);
  const [nextPage, setNextPage] = useState(false);
  const [nextLoading, setNextLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [screenLoader, setScreenLoader] = useState(false);
  const [selected, setSelected] = useState(1);

  const upcomingTask = [
    {
      title: "Car Maintenance",
      due_date: "25-06-2024",
      start_time: "08:00 AM",
      end_time: "12:00 PM",
      status: 2,
    },
    {
      title: "Birthday Party",
      due_date: "25-06-2024",
      start_time: "08:00 AM",
      end_time: "12:00 PM",
      status: 0,
    },
    {
      title: "Birthday Party",
      due_date: "25-06-2024",
      start_time: "08:00 AM",
      end_time: "12:00 PM",
      status: 2,
    },
    {
      title: "Anniversary Celebration",
      due_date: "25-06-2024",
      start_time: "08:00 AM",
      end_time: "12:00 PM",
      status: 0,
    },
    {
      title: "Housewarming Party",
      due_date: "25-06-2024",
      start_time: "08:00 AM",
      end_time: "12:00 PM",
      status: 1,
    },
    {
      title: "Washing the car",
      due_date: "25-06-2024",
      start_time: "08:00 AM",
      end_time: "12:00 PM",
      status: 1,
    },
  ];

  const dayArr = [
    { name: "All", value: "all" },
    { name: "Today", value: "today" },
    { name: "This week", value: "week" },
    { name: "This month", value: "month" },
  ];

  /**
   * Function for Get Task List...
   * @function getTaskList
   * @param {Number} p - Set for Page Number
   * @param {String} ty - Type for loader.
   */
  const getTaskList = async (p = 1, ty) => {
    setScreenLoader(ty == "onEndreached" ? false : true);
    const data = { page: p };
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

  // Render Task List Item...
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
    return (
      <View
        activeOpacity={0.7}
        onPress={() => navigation.navigate("TaskDetails", { detail: item })}
        style={{
          ...styles.cardSty,
          backgroundColor: background,
          marginBottom: 5,
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <View
            style={{
              justifyContent: "center",
            }}
          >
            <View
              style={[
                styles.barStyle,
                {
                  backgroundColor: color,
                },
              ]}
            />
          </View>
          <View
            style={{
              paddingVertical: 8,
              paddingHorizontal: 10,
              width: "100%",
            }}
          >
            <Text numberOfLines={1} style={styles.titleStyle}>
              {item?.title}{" "}
              {item?.status === 2 && (
                <CustomIcon
                  name="warning"
                  size={16}
                  color={BaseColors.errorRed}
                />
              )}
            </Text>
            <Text style={styles.dateStyle}>
              Due Date : <Text style={styles.dateVal}>{item?.due_date}</Text>
            </Text>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={styles.dateStyle}>
                Start time :
                <Text style={styles.dateVal}>{item?.start_time}</Text>
              </Text>
              <Text style={styles.dateStyle}>
                End time :<Text style={styles.dateVal}>{item?.end_time}</Text>
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 6,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {item.status === 2 ? (
                  <>
                    <View
                      style={[
                        styles.dotStyle,
                        {
                          backgroundColor: color,
                        },
                      ]}
                    />
                    <Text
                      style={{
                        color: color,
                        fontSize: 16,
                        paddingVertical: 3,
                        paddingHorizontal: 5,
                      }}
                    >
                      {item?.status === 0
                        ? "Pending"
                        : item?.status === 1
                        ? "Completed"
                        : "Overdue "}{" "}
                      |
                    </Text>
                    <CustomIcon name="Maintanance" size={18} color={color} />
                  </>
                ) : (
                  <View>
                    <CustomIcon name="Calendar" size={20} color={color} />
                  </View>
                )}
              </View>
              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => {}}
                  style={[
                    styles.attechStyle,
                    {
                      marginHorizontal: 10,
                      backgroundColor: BaseColors.yellow,
                    },
                  ]}
                >
                  <CustomIcon name="Voice" size={18} color={BaseColors.white} />
                </TouchableOpacity>
                {item?.status === 2 && (
                  <View style={{ flexDirection: "row" }}>
                    <TouchableOpacity
                      activeOpacity={0.7}
                      onPress={() => {}}
                      style={[
                        styles.attechStyle,
                        {
                          backgroundColor:
                            item?.proof_needed === 0
                              ? BaseColors.grey
                              : BaseColors.errorRed,
                        },
                      ]}
                    >
                      <CustomIcon
                        name="Attech"
                        size={18}
                        color={BaseColors.white}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      activeOpacity={0.7}
                      disabled={item?.status === 1}
                      onPress={() => {}}
                      style={[
                        styles.attechStyle,
                        {
                          marginHorizontal: 10,
                          backgroundColor: BaseColors.greenColor,
                          opacity: item?.status === 1 ? 0.5 : 1,
                        },
                      ]}
                    >
                      <CustomIcon
                        name="Deliverdmark"
                        size={18}
                        color={BaseColors.white}
                      />
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  };

  useEffect(() => {
    getTaskList(1);
  }, [isFocused]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: BaseColors.white,
      }}
    >
      <CHeader
        leftIcon="Back"
        title={"Upcoming Events"}
        onLeftPress={() => navigation.goBack()}
      />
      <StatusBar
        translucent
        barStyle="light-content"
        backgroundColor={BaseColors.primary}
      />
      <View style={styles.dayContainer}>
        {dayArr &&
          dayArr.map((li, ind) => {
            return (
              <TouchableOpacity
                onPress={() => setSelected(ind)}
                activeOpacity={0.8}
                style={[
                  styles.dayStyle,
                  {
                    backgroundColor:
                      selected === ind
                        ? BaseColors.greenColor
                        : BaseColors.white,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.dayTextStyle,
                    {
                      color:
                        selected === ind
                          ? BaseColors.white
                          : BaseColors.greenColor,
                    },
                  ]}
                >
                  {li.name}
                </Text>
              </TouchableOpacity>
            );
          })}
      </View>
      <View style={{ marginHorizontal: 10, flex: 1, marginTop: 10 }}>
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
        ) : isEmpty(upcomingTask) ? (
          <NoData />
        ) : (
          <FlatList
            bounces={false}
            showsVerticalScrollIndicator={false}
            data={upcomingTask}
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
        )}
      </View>
    </View>
  );
}
