/* eslint-disable react-native/no-inline-styles */
import { BaseColors } from "../../config/theme";
import React, { useState } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { createStyles } from "./styles";
import { useTheme } from "@react-navigation/native";
import { Button, NoData } from "../../components";
import { isEmpty } from "lodash";
import moment from "moment";
import CHeader from "../../components/Header";

export default function TaskScreen({ navigation, route }) {
  const colors = useTheme();
  const styles = createStyles(colors);
  const [screenLoader, setScreenLoader] = useState(false);
  const [searchVal, setSearchVal] = useState("");

  const taskList = [
    { title: "Task 1", description: "Description for Task 1" },
    { title: "Task 2", description: "Description for Task 2" },
    { title: "Task 3", description: "Description for Task 3" },
    { title: "Task 4", description: "Description for Task 4" },
    { title: "Task 5", description: "Description for Task 5" },
    { title: "Task 6", description: "Description for Task 6" },
    { title: "Task 7", description: "Description for Task 7" },
    { title: "Task 8", description: "Description for Task 8" },
    { title: "Task 9", description: "Description for Task 9" },
    { title: "Task 10", description: "Description for Task 10" },
  ];

  /**
   * Function for Render Task list..
   * @function renderItem
   * @param {Object} param0 - This is Map of object Array
   * @returns
   */
  const renderItem = ({ item, index }) => {
    return (
      <View
        style={{
          ...styles.cardSty,
          borderRadius: 8,
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <View>
            <View
              style={{
                width: 6,
                height: 120,
                borderRadius: 8,
                backgroundColor: "green",
              }}
            />
          </View>
          <View style={{ padding: 8 }}>
            <Text
              numberOfLines={1}
              style={{
                color: BaseColors.primary,
                fontSize: 16,
                paddingVertical: 3,
              }}
            >
              {item?.title}
            </Text>
            <Text
              numberOfLines={2}
              style={{
                color: item.color ? BaseColors.white : BaseColors.black,
                fontSize: 14,
                paddingVertical: 3,
              }}
            >
              {item?.description}
            </Text>
            <Text
              style={{
                color: item.color ? BaseColors.white : BaseColors.black,
                paddingVertical: 3,
                fontSize: 14,
              }}
            >
              {item?.created_at
                ? moment.unix(item.created_at).format("DD/MM/YYYY")
                : "12/05/2024"}
            </Text>
            <View style={{ flexDirection: "row" }}>
              <Button
                onBtnClick={() =>
                  navigation.navigate("TaskDetails", { detail: item })
                }
                txtSty={{ fontSize: 14 }}
                style={{
                  borderColor: BaseColors.inactive,
                }}
                containerStyle={{
                  backgroundColor: BaseColors.primary,
                }}
              >
                View Details
              </Button>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <>
      <CHeader
        leftIcon="Back"
        title={"Task"}
        rightIcon="filter"
        rightIconSty={{ color: BaseColors.primary }}
      />
      <View
        style={{ ...styles.container, backgroundColor: BaseColors.whiteSmoke }}
      >
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
          <FlatList
            showsVerticalScrollIndicator={false}
            data={taskList}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            onendreachedthreshold={0.8}
            contentContainerStyle={{
              padding: 0,
              margin: 0,
            }}
            style={{ marginBottom: 20 }}
          />
        )}
      </View>
    </>
  );
}
