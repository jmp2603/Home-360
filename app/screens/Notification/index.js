/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useRef, useState } from "react";
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
import Toast from "react-native-simple-toast";
import { useIsFocused, useTheme } from "@react-navigation/native";
import { Button, NoData } from "../../components";
import { getApiData } from "../../utils/apiHelper";
import BaseSetting from "../../config/setting";
import Swipeable from "react-native-swipeable";
import { CustomIcon } from "../../config/LoadIcons";
import { Duration, urlParams } from "../../utils/CommonFunc";
import moment from "moment";
import RBSheet from "react-native-raw-bottom-sheet";

const { width, height } = Dimensions.get("window");
export default function Notification({ navigation, route }) {
  const isFocused = useIsFocused();
  const ActionOpenSheet = useRef();
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
  const [btnloader, setBtnLoader] = useState(false);
  const [selectData, setSelectData] = useState();
  const [showPopover, setShowPopover] = useState(false);

  const backgroundColor = [
    BaseColors.lightPrimary,
    BaseColors.lightOrange,
    BaseColors.lightGreen,
  ];
  const iconColor = [
    BaseColors.primary,
    BaseColors.yellow,
    BaseColors.greenColor,
  ];

  const getColors = (index) => ({
    backgroundColor: backgroundColor[index % backgroundColor.length],
    iconColor: iconColor[index % iconColor.length],
  });

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
        let tempPArr;
        resp?.data.forEach((notification, index) => {
          const colors = getColors(index);
          notification.backgroundColor = colors.backgroundColor;
          notification.iconColor = colors.iconColor;
        });
        tempPArr = resp?.data;
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
  }, [isFocused]);

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

  const readNotificaiton = async (id) => {
    let url = `${BaseSetting.endpoints.readNotification}?id=${id}`;
    try {
      const resp = await getApiData(url, "GET");
      if (resp.status) {
        getNotificationList(1, "onEndreached");
      }
    } catch (error) {
      Toast.show("Something went wrong");
    }
  };

  // Render Item List...
  const renderItem = ({ item, index }) => {
    return (
      <Swipeable
        onSwipeStart={() => setActiveItem(index)}
        rightButtons={[
          <View
            style={{
              justifyContent: "center",
              flex: 1,
              marginTop: 5,
            }}
          >
            <TouchableOpacity
              style={{
                width: 50,
                height: 50,
                backgroundColor: BaseColors.errorRed,
                padding: 5,
                borderRadius: 30,
                justifyContent: "center",
                marginHorizontal: 10,
              }}
              onPress={() => {
                ActionOpenSheet.current.open();
                setSelectData(item.id);
              }}
            >
              <CustomIcon
                name="Delete"
                color={BaseColors.white}
                size={20}
                style={{ alignSelf: "center" }}
              />
            </TouchableOpacity>
          </View>,
        ]}
        onRightButtonsOpenRelease={onOpen}
        onRightButtonsCloseRelease={onClose}
      >
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => readNotificaiton(item?.id)}
          style={[
            styles.mainView,
            {
              marginBottom:
                notifications.length - 1 === index ? height / 11 : 5,
            },
          ]}
        >
          {item?.is_read === "N" && (
            <View
              style={{
                width: 10,
                height: 10,
                backgroundColor: item?.iconColor,
                position: "absolute",
                borderRadius: 10,
                top: 10,
                left: width / 7.6,
                zIndex: 1,
              }}
            />
          )}
          <View
            style={{
              justifyContent: "center",
              flexDirection: "row",
              alignItems: "center",
              width: 60,
              height: 60,
              borderRadius: 30,
              borderWidth: 1,
              marginRight: 5,
              backgroundColor: item?.backgroundColor,
              borderColor: item?.iconColor,
            }}
          >
            <CustomIcon name="Notification" size={25} color={item?.iconColor} />
          </View>
          <View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View style={{ width: width / 1.6 }}>
                <Text
                  numberOfLines={1}
                  style={{
                    color: BaseColors.titleColor,
                    fontSize: 18,
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    fontWeight: item?.is_read === "N" ? "700" : "500",
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
                    color:
                      item?.is_read === "N"
                        ? BaseColors.titleColor
                        : BaseColors.grey,
                    fontSize: 14,
                    fontWeight: item?.is_read === "N" ? "700" : "500",
                  }}
                >
                  {moment(item?.time).format("HH:mm")}
                  {/* {Duration(item.created_at)} */}
                </Text>
              </View>
            </View>
            <View
              style={{
                paddingLeft: 10,
              }}
            >
              <Text
                numberOfLines={1}
                style={{
                  width: Dimensions.get("window").width / 1.41,
                  color:
                    item?.is_read === "N"
                      ? BaseColors.titleColor
                      : BaseColors.grey,
                  fontSize: 16,
                  fontWeight: item?.is_read === "N" ? "500" : "400",
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
        ActionOpenSheet.current.close();
      } else {
        Toast.show(resp?.message);
      }
      setBtnLoader(false);
    } catch (error) {
      setBtnLoader(false);
      Toast.show("Something went wrong");
    }
  };

  const handleAllnotification = async () => {
    setBtnLoader(true);
    let url = `${BaseSetting.endpoints.allNotificationDelete}`;
    try {
      const resp = await getApiData(url, "GET");
      if (resp.status) {
        getNotificationList();
        Toast.show(resp?.message);
        ActionOpenSheet.current.close();
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
        backgroundColor: BaseColors.white,
      }}
    >
      <CHeader
        title={"Notification"}
        customIcon
        rightIcon
        setShowPopover={setShowPopover}
        showPopover={showPopover}
        popoverPress={() => {
          setShowPopover(false);
          setSelectData("");
          setTimeout(() => {
            ActionOpenSheet.current.open();
          }, 600);
        }}
      />
      <View style={{ marginHorizontal: 15, flex: 1 }}>
        <StatusBar
          translucent
          barStyle="light-content"
          backgroundColor={BaseColors.transparent}
        />
        {loader ? (
          <ActivityIndicator
            color={BaseColors.primary}
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
      {/* Delete Notification Sheet */}
      <RBSheet
        ref={ActionOpenSheet}
        closeOnDragDown={true}
        closeOnPressMask={true}
        dragFromTopOnly={true}
        height={180}
        customStyles={{
          container: {
            backgroundColor: "#FFF",
            borderTopRightRadius: 30,
            borderTopLeftRadius: 30,
          },
        }}
      >
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: 10,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "700",
              marginVertical: 15,
              color: BaseColors.black,
            }}
          >
            Confirm
          </Text>
          <Text
            style={{
              fontSize: 18,
              color: BaseColors.titleColor,
              fontWeight: "500",
            }}
          >
            {`Are you sure you want to ${
              selectData ? "Delete this" : "Delete All"
            } notification?`}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            paddingHorizontal: 10,
            marginVertical: 10,
          }}
        >
          <Button
            onBtnClick={() => ActionOpenSheet.current.close()}
            containerStyle={{
              width: 160,
              backgroundColor: BaseColors.yellow,
            }}
            style={{ backgroundColor: BaseColors.yellow, borderWidth: 0 }}
          >
            CANCEL
          </Button>
          <View style={{ marginHorizontal: 10 }}>
            <Button
              loading={btnloader}
              containerStyle={{ width: 160 }}
              onBtnClick={() => {
                if (selectData) {
                  handledelete(selectData);
                } else {
                  handleAllnotification();
                }
              }}
            >
              Submit
            </Button>
          </View>
        </View>
      </RBSheet>
      {/* End */}
    </View>
  );
}
