/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import CHeader from "../../components/Header";
import { BaseColors } from "../../config/theme";
import { createStyles } from "./styles";
import { StatusBar } from "react-native";
import { flattenDeep, isEmpty } from "lodash";
import FastImage from "react-native-fast-image";
import { Images } from "../../config";
import Toast from "react-native-simple-toast";
import { useTheme } from "@react-navigation/native";
import { NoData } from "../../components";
import { getApiData } from "../../utils/apiHelper";
import BaseSetting from "../../config/setting";
import Swipeable from "react-native-swipeable";
import { CustomIcon } from "../../config/LoadIcons";
import { Duration, urlParams } from "../../utils/CommonFunc";
import DeleteModal from "../../components/DeleteModal";

export default function Notification({ navigation, route }) {
  const IOS = Platform.OS === "ios";
  const colors = useTheme();
  const styles = createStyles(colors);
  const [notificationList, setNotificationList] = useState([]);
  const [loader, setLoader] = useState(false);
  const [page, setPage] = useState(1);
  const [nextPage, setNextPage] = useState(false);
  const [nextLoading, setNextLoading] = useState(false);
  const [activeItem, setActiveItem] = useState(null);
  const [currentlyOpenSwipeable, setCurrentlyOpenSwipeable] = useState(null);
  const [visible, setVisible] = useState(false);
  const [btnloader, setBtnLoader] = useState(false);
  const [selectData, setSelectData] = useState();

  /**
   * Function for Get Task List...
   * @function getNotificationList
   * @param {Number} p - Set for Page Number
   * @param {String} ty - Type for loader.
   */
  const getNotificationList = async (p = 1, ty) => {
    setLoader(ty == "onEndreached" ? false : true);
    const data = { page: p };
    const string = urlParams(data);
    const url = BaseSetting.endpoints.notificationList + string?._j;
    try {
      const resp = await getApiData(url, "GET");
      if (resp?.status) {
        let tempPArr = resp?.data;
        if (p > 1) {
          tempPArr = flattenDeep([notificationList, tempPArr]);
        }
        setPage(Number(resp?.pagination?.currentPage));
        setNotificationList(tempPArr);
        if (resp?.pagination?.isMore) {
          setNextPage(true);
        } else {
          setNextPage(false);
        }
        setNextLoading(false);
      } else {
        setNotificationList([]);
      }
      setLoader(false);
    } catch (error) {
      setNotificationList([]);
      setLoader(false);
      Toast.show("Something went wrong");
    }
  };
  const onEndReached = () => {
    if (nextPage && !nextLoading) {
      setNextLoading(true);
      const tempPage = page + 1;
      setPage(tempPage);
      getNotificationList(tempPage, "onEndreached");
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
    getNotificationList(1);
  }, []);

  function onOpen(event, gestureState, swipeable) {
    if (currentlyOpenSwipeable && currentlyOpenSwipeable !== swipeable) {
      currentlyOpenSwipeable.recenter();
    }
    setCurrentlyOpenSwipeable(swipeable);
  }

  function onClose() {
    if (currentlyOpenSwipeable) {
      currentlyOpenSwipeable.recenter();
    }
    setActiveItem(null);
    setCurrentlyOpenSwipeable(null);
  }

  // Render Item List...
  const renderItem = ({ item, index }) => {
    return (
      <Swipeable
        onSwipeStart={() => setActiveItem(index)}
        rightButtons={[
          <View
            style={{
              backgroundColor: "#e6ecf0",
              borderBottomColor: "#e7e9eb",
              justifyContent: "center",
              flex: 1,
              marginTop: 5,
            }}
          >
            <TouchableOpacity
              style={{
                width: 50,
                height: 50,
                backgroundColor: "#EBE9E9",
                padding: 5,
                borderRadius: 20,
                justifyContent: "center",
              }}
              onPress={() => {
                setVisible(true);
                setSelectData(item.id);
              }}
            >
              <CustomIcon
                name="Delete"
                color={"red"}
                size={20}
                style={{ alignSelf: "center" }}
              />
            </TouchableOpacity>
          </View>,
        ]}
        onRightButtonsOpenRelease={onOpen}
        onRightButtonsCloseRelease={onClose}
      >
        <TouchableOpacity activeOpacity={0.7} style={[styles.mainView]}>
          <View
            style={{
              justifyContent: "center",
              flexDirection: "row",
              alignSelf: "center",
            }}
          >
            <FastImage
              source={Images.Profile}
              style={{
                width: 50,
                height: 50,
                borderRadius: 20,
                borderWidth: 1,
                borderColor: BaseColors.inactive,
                backgroundColor: BaseColors.inactive,
              }}
            />
          </View>
          <View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View>
                <Text
                  style={{
                    color: BaseColors.primary,
                    fontSize: 14,
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    fontWeight: "600",
                  }}
                >
                  {item?.title}
                </Text>
              </View>
              <View
                style={{
                  justifyContent: "flex-end",
                  alignItems: "flex-end",
                  alignContent: "flex-end",
                }}
              >
                <Text
                  style={{
                    textAlign: "right",
                    color: BaseColors.titleColor,
                    fontSize: 10,
                  }}
                >
                  {Duration(item.created_at)}
                </Text>
              </View>
            </View>
            <View
              style={{
                paddingLeft: 10,
              }}
            >
              <Text
                style={{
                  width: Dimensions.get("window").width / 1.41,
                  color: BaseColors.msgColor,
                  fontSize: 12,
                }}
              >
                {item?.message}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </Swipeable>
    );
  };
  // End

  const handledelete = async (id) => {
    setBtnLoader(true);
    let url = `${BaseSetting.endpoints.deleteNotification}?id=${id}`;
    try {
      const resp = await getApiData(url, "GET");
      if (resp.status) {
        getNotificationList();
        Toast.show(resp?.message);
        setVisible(!visible);
      } else {
        Toast.show(resp?.message);
      }
      setBtnLoader(false);
    } catch (error) {
      setBtnLoader(false);
      Toast.show("Something went wrong");
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.colors.white,
      }}
    >
      <CHeader title={"Notification"} customIcon rightIcon />
      <View style={{ marginHorizontal: 15, flex: 1 }}>
        <StatusBar
          translucent
          barStyle="dark-content"
          backgroundColor={BaseColors.transparent}
        />
        {loader ? (
          <ActivityIndicator
            color={colors.colors.primary}
            size={IOS ? "small" : "large"}
            style={{
              flex: 1,
              justifyContent: "center",
              alignSelf: "center",
            }}
          />
        ) : isEmpty(notificationList) ? (
          <NoData />
        ) : (
          <FlatList
            data={notificationList}
            showsVerticalScrollIndicator={false}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            onendreachedthreshold={0.8}
            style={{ marginBottom: 5 }}
            onEndReached={onEndReached}
            ListFooterComponent={renderListFooter}
          />
        )}
      </View>
      <DeleteModal
        visible={visible}
        loader={btnloader}
        setVisible={setVisible}
        btnNPress={() => {
          setVisible(!visible);
        }}
        btnYPress={(d) => {
          handledelete(selectData);
        }}
      />
    </View>
  );
}
