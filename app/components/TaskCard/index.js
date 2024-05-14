/* eslint-disable react-native/no-inline-styles */
import { BaseColors } from "../../config/theme";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Modal, Text, View } from "react-native";
import { createStyles } from "./styles";
import { useTheme } from "@react-navigation/native";
import { Button, NoData } from "../../components";
import { flattenDeep, isEmpty } from "lodash";
import Toast from "react-native-simple-toast";
import { urlParams } from "../../utils/CommonFunc";
import BaseSetting from "../../config/setting";
import { getApiData } from "../../utils/apiHelper";
import moment from "moment";
import CreateTask from "./CompleteTask";
import TextInput from "../../components/TextInput";

export default function TaskCard(props) {
  const { type, navigation } = props;
  const colors = useTheme();
  const styles = createStyles(colors);
  const [taskList, setTaskList] = useState([]);
  const [nextPage, setNextPage] = useState(false);
  const [nextLoading, setNextLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [screenLoader, setScreenLoader] = useState(false);
  const [visible, setVisible] = useState(false);
  const [selectItem, setSelectItem] = useState({});
  const [searchVal, setSearchVal] = useState("");

  /**
   * Function for Get Task List...
   * @function getTaskList
   * @param {Number} p - Set for Page Number
   * @param {String} ty - Type for loader.
   */
  const getTaskList = async (p = 1, name, ty) => {
    setScreenLoader(ty == "onEndreached" ? false : true);
    const data = { type: type, page: p, title: name };
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
      getTaskList(tempPage, "", "onEndreached");
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
    getTaskList(1);
  }, [type]);

  /**
   * Function for Render Task list..
   * @function renderItem
   * @param {Object} param0 - This is Map of object Array
   * @returns
   */
  const renderItem = ({ item, index }) => {
    return (
      <View style={styles.cardSty}>
        <View
          style={{
            backgroundColor: BaseColors.white,
            padding: 8,
            borderRadius: 5,
          }}
        >
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
              : "-"}
          </Text>
          {type === 0 ? (
            <View
              style={{ flexDirection: "row", justifyContent: "space-around" }}
            >
              {type === 0 && (
                <Button
                  onBtnClick={() => handleComplete(item)}
                  txtSty={{ fontSize: 14 }}
                  style={{
                    borderColor: BaseColors.inactive,
                  }}
                  containerStyle={{
                    backgroundColor: "green",
                  }}
                >
                  Completed
                </Button>
              )}
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
          ) : (
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
          )}
        </View>
      </View>
    );
  };

  const handleComplete = (item) => {
    setSelectItem(item);
    setVisible(true);
  };

  return (
    <>
      <View style={{ ...styles.container, backgroundColor: BaseColors.white }}>
        <View style={{ marginHorizontal: 15 }}>
          <TextInput
            placeholderText="Search task"
            value={searchVal}
            numberOfLines={4}
            numberofLine={4}
            onChange={(value) => {
              setSearchVal(value);
              getTaskList(1, value);
            }}
          />
        </View>
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
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        close={() => {
          setVisible(false);
        }}
        onRequestClose={() => {
          setVisible(false);
        }}
      >
        <CreateTask
          setVisible={setVisible}
          visible={visible}
          selectItem={selectItem}
          handleSubmit={() => getTaskList()}
        />
      </Modal>
    </>
  );
}
