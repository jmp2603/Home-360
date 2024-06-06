/* eslint-disable react-native/no-inline-styles */
import React, { useRef, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { BaseColors } from "../../config/theme";
import { createStyles } from "./styles";
import { isEmpty, size } from "lodash";
import { useIsFocused, useTheme } from "@react-navigation/native";
import { Button, NoData } from "../../components";
import Swipeable from "react-native-swipeable";
import { CustomIcon } from "../../config/LoadIcons";
import RBSheet from "react-native-raw-bottom-sheet";
import { Images } from "../../config";

const { width, height } = Dimensions.get("window");
export default function TaskEvent(props) {
  const { navigation } = props;
  const isFocused = useIsFocused();
  const ActionOpenSheet = useRef();
  const IOS = Platform.OS === "ios";
  const colors = useTheme();
  const styles = createStyles(colors);
  const [loader, setLoader] = useState(false);
  const [activeItem, setActiveItem] = useState(null);
  const [currentlyOpenSwipeable, setCurrentlyOpenSwipeable] = useState(null);
  const [btnloader, setBtnLoader] = useState(false);
  const [selectData, setSelectData] = useState();

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

  // Static Array..
  const staticArray = [
    {
      id: 1,
      name: "Abraham Meade",
      message: "What kind of strategy is better?",
      time: "20:24",
      seen: true,
      status: "delevered",
      avatar: Images.Profile, // Replace with actual path
    },
    {
      id: 2,
      name: "Dr. Bonnie Barstow",
      message: "What kind of strategy is better?",
      time: "12:12",
      seen: true,
      status: "delevered",
      avatar: Images.Profile, // Replace with actual path
    },
    {
      id: 3,
      name: "Chris Sullivan",
      message: "Bro, I have a good idea!",
      time: "19:38",
      seen: false,
      avatar: Images.Profile, // Replace with actual path
    },
    {
      id: 4,
      name: "Steven Kramer",
      message: "Hello! Good Morning!",
      time: "08:14",
      seen: false,
      unreadCount: 4,
      avatar: Images.Profile, // Replace with actual path
    },
    {
      id: 5,
      name: "Catherine Hall",
      message: "Image",
      time: "Nov 1, 2023",
      seen: true,
      status: "sent",
      avatar: Images.Profile, // Replace with actual path
      attachment: "image",
    },
    {
      id: 6,
      name: "Steven Kramer",
      message: "Hello! Good Morning!",
      time: "08:14",
      seen: false,
      avatar: Images.Profile, // Replace with actual path
    },
    {
      id: 7,
      name: "Susan Kerr",
      message: "Actually I wanted to check with you...",
      time: "Nov 2, 2023",
      seen: true,
      unreadCount: 2,
      avatar: Images.Profile, // Replace with actual path
    },
    {
      id: 7,
      name: "Susan Kerr",
      message: "Actually I wanted to check with you...",
      time: "Nov 2, 2023",
      seen: true,
      status: "sent",
      unreadCount: 2,
      avatar: Images.Profile, // Replace with actual path
    },
    {
      id: 7,
      name: "Susan Kerr",
      message: "Actually I wanted to check with you...",
      time: "Nov 2, 2023",
      seen: true,
      status: "sent",
      unreadCount: 2,
      avatar: Images.Profile, // Replace with actual path
    },
    {
      id: 8,
      name: "Lawrence Borden",
      message: "https://www.londonbridge.com/",
      time: "Yesterday",
      seen: true,
      status: "sent",
      avatar: Images.Profile, // Replace with actual path
      attachment: "link",
    },
  ];

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
              marginVertical: 5,
              backgroundColor: item.seen
                ? BaseColors.white
                : BaseColors.offWhite,
            }}
          >
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.deleteContainer}
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
          onPress={() => navigation.navigate("ChatMessage", { details: item })}
          activeOpacity={0.7}
          style={[
            styles.mainView,
            {
              backgroundColor: item.seen
                ? BaseColors.white
                : BaseColors.offWhite,
              marginBottom: staticArray.length - 1 == index ? height / 10 : 5,
            },
          ]}
        >
          <View style={{ width: width / 1.1 }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text
                numberOfLines={1}
                style={{
                  color: BaseColors.titleColor,
                  fontSize: 16,
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  fontWeight: item?.seen ? "500" : "700",
                }}
              >
                {item?.name}
              </Text>
              <Text
                style={{
                  color: item.seen ? BaseColors.grey : BaseColors.titleColor,
                  fontSize: 14,
                  fontWeight: item?.seen ? "500" : "700",
                }}
              >
                {item?.time}
              </Text>
            </View>
            <View
              style={{
                paddingLeft: 10,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View style={{ flexDirection: "row" }}>
                {item.status === "delevered" ? (
                  <CustomIcon
                    name="Read"
                    style={{ marginTop: 3 }}
                    color={BaseColors.primary}
                  />
                ) : item.status === "sent" ? (
                  <CustomIcon
                    name="Deliverdmark"
                    style={{ marginTop: 3 }}
                    color={BaseColors.primary}
                  />
                ) : null}
                <Text
                  numberOfLines={1}
                  style={{
                    width: Dimensions.get("window").width / 1.41,
                    color: item.seen ? BaseColors.grey : BaseColors.titleColor,
                    fontSize: 14,
                    fontWeight: item.seen ? "400" : "500",
                  }}
                >
                  {item?.message}
                </Text>
              </View>
              {item.unreadCount > 0 ? (
                <View
                  style={{
                    width: 18,
                    height: 18,
                    borderRadius: 10,
                    backgroundColor: BaseColors.primary,
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      color: BaseColors.white,
                      fontSize: 12,
                      fontWeight: "700",
                      textAlign: "center",
                    }}
                  >
                    {item?.unreadCount}
                  </Text>
                </View>
              ) : (
                <View
                  style={{
                    width: 15,
                    height: 15,
                  }}
                />
              )}
            </View>
          </View>
        </TouchableOpacity>
      </Swipeable>
    );
  };
  // End

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: BaseColors.white,
      }}
    >
      <View style={{ flex: 1 }}>
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
        ) : isEmpty(staticArray) ? (
          <NoData />
        ) : (
          <FlatList
            data={staticArray}
            showsVerticalScrollIndicator={false}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            onendreachedthreshold={0.8}
            style={{ marginBottom: 5 }}
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
              fontSize: 22,
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
              paddingHorizontal: 10,
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
              paddingVertical: 12,
              backgroundColor: BaseColors.yellow,
            }}
            style={{ backgroundColor: BaseColors.yellow, borderWidth: 0 }}
          >
            CANCEL
          </Button>
          <View style={{ marginHorizontal: 10 }}>
            <Button
              loading={btnloader}
              containerStyle={{ width: 160, paddingVertical: 12 }}
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
