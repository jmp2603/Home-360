/* eslint-disable react-native/no-inline-styles */
import { BaseColors } from "../../config/theme";
import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StatusBar,
  FlatList,
  Platform,
  ActivityIndicator,
  Dimensions,
  Alert,
} from "react-native";
import { createStyles } from "./styles";
import { useIsFocused, useTheme } from "@react-navigation/native";
import { getStatusBarHeight } from "react-native-status-bar-height";
import FastImage from "react-native-fast-image";
import { Images } from "../../config";
import { CustomIcon } from "../../config/LoadIcons";
import Popover, { PopoverPlacement } from "react-native-popover-view";
import { TouchableOpacity } from "react-native";
import moment from "moment";
import Toast from "react-native-simple-toast";
import { useSelector } from "react-redux";
import BaseSetting from "../../config/setting";
import { getApiData } from "../../utils/apiHelper";
import { Button, NoData } from "../../components";
import { flattenDeep, isArray, isEmpty, isObject, size } from "lodash";
import { chatFilesVal, urlParams } from "../../utils/CommonFunc";
import RBSheet from "react-native-raw-bottom-sheet";
import CAlert from "../../components/CAlert";
import ImagePicker from "react-native-image-crop-picker";

const IOS = Platform.OS === "ios";
const { width, height } = Dimensions.get("window");
export default function Home({ navigation, index }) {
  const isFocused = useIsFocused();
  const colors = useTheme();
  const styles = createStyles(colors);
  const flatListRef = useRef();
  const touchable = useRef();
  const ActionSheetRef = useRef();
  const ActionUploadRef = useRef();
  const ActionCompleted = useRef();
  const [showPopover, setShowPopover] = useState(false);
  const { userData } = useSelector((state) => state.auth);
  const [taskList, setTaskList] = useState([]);
  const [nextPage, setNextPage] = useState(false);
  const [nextLoading, setNextLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [screenLoader, setScreenLoader] = useState(false);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [multipicLoader, setMultipicLoader] = useState(false);
  const [pagination, setPagination] = useState({});
  const [selectedDate, setSelectedDate] = useState(
    moment().format("YYYY-MM-DD")
  );
  const [dates, setDates] = useState([]);
  const [btnLoading, setBtnLoading] = useState(false);
  const [selectItem, setSelectItem] = useState({});
  const [completedLoader, setCompletedLoader] = useState(false);

  useEffect(() => {
    generateDatesForCurrentMonth();
  }, []);

  useEffect(() => {
    if (dates.length > 0) {
      const currentDate = moment().format("YYYY-MM-DD");
      const currentDateIndex = dates.indexOf(currentDate);
      if (currentDateIndex !== -1 && flatListRef.current) {
        flatListRef.current.scrollToIndex({
          index: currentDateIndex,
          animated: true,
        });
      }
    }
  }, [dates]);

  const generateDatesForCurrentMonth = () => {
    const startOfMonth = moment().startOf("month");
    const endOfMonth = moment().endOf("month");
    const datesArray = [];
    for (
      let date = startOfMonth;
      date.isBefore(endOfMonth);
      date.add(1, "days")
    ) {
      datesArray.push(date.clone().format("YYYY-MM-DD"));
    }
    setDates(datesArray);
  };

  const renderDayHeader = ({ item }) => {
    const isSelected = item === selectedDate;
    return (
      <View
        activeOpacity={0.7}
        onPress={() => setSelectedDate(item)}
        style={[styles.dateItem, isSelected && styles.selectedDateItem]}
      >
        <Text style={[styles.dateText, isSelected && styles.selectedDateText]}>
          {moment(item).format("DD")}
        </Text>
        <Text style={[styles.dateText, isSelected && styles.selectedDateText]}>
          {moment(item).format("ddd")}
        </Text>
      </View>
    );
  };

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
        setPagination(resp?.pagination);
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
  }, [isFocused]);

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
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => navigation.navigate("TaskDetails", { detail: item })}
        style={{
          ...styles.cardSty,
          backgroundColor: background,
          marginBottom: taskList.length - 1 === index ? height / 11 : 5,
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
                fontSize: 16,
                paddingVertical: 3,
                fontWeight: "600",
              }}
            >
              {item?.title}{" "}
              {item?.status === 2 && (
                <CustomIcon
                  name="warning"
                  size={16}
                  color={BaseColors.errorRed}
                />
              )}
            </Text>
            <Text
              numberOfLines={1}
              style={{
                color: BaseColors.textColor,
                fontSize: 14,
                paddingVertical: 3,
              }}
            >
              {item?.description}
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
                    fontSize: 16,
                    paddingVertical: 3,
                  }}
                >
                  {item?.status === 0
                    ? "Pending"
                    : item?.status === 1
                    ? "Completed"
                    : "Overdue "}
                </Text>
                {item?.type !== "once" && (
                  <Text
                    style={{
                      color: color,
                      fontSize: 16,
                      paddingVertical: 3,
                    }}
                  >
                    {" "}
                    | <CustomIcon name="Refresh" />
                  </Text>
                )}
              </View>
              <View style={{ flexDirection: "row" }}>
                {item?.status !== 1 && (
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => {
                      setUploadedImages(item?.proof_files);
                      setSelectItem(item);
                      ActionUploadRef.current.open();
                    }}
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
                )}
                <TouchableOpacity
                  activeOpacity={0.7}
                  disabled={item?.status === 1}
                  onPress={() => {
                    setSelectItem(item);
                    ActionCompleted.current.open();
                  }}
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
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  /**
   * Function for Upload Images.
   * @function upload
   * @param {Object} imag - Show Image Object for Upload
   */
  async function upload(imag) {
    setMultipicLoader(true);
    let imagData = {};
    const name =
      isObject(imag) && imag.path
        ? imag.path.substring(imag.path.lastIndexOf("/") + 1)
        : "";
    imagData = {
      type: imag.mime,
      name,
      uri: imag.path,
    };
    try {
      setUploadedImages([...uploadedImages, imagData]);
      setTimeout(() => {
        ActionUploadRef.current.open();
      }, 500);
      ActionSheetRef.current.close();
      setMultipicLoader(false);
    } catch (err) {
      setMultipicLoader(false);
    }
  }

  const openGallery = () => {
    ImagePicker.openPicker({
      cropping: true,
    }).then((image) => {
      const fType = image?.mime || "";
      const isValidFile = chatFilesVal(fType, image.size);
      if (isValidFile) {
        upload(image);
      } else {
        setTimeout(() => {
          setProfileImg(image?.path);
        }, 2000);
      }
    });
  };

  const openCamera = () => {
    ImagePicker.openCamera({
      width: 110,
      height: 110,
      // useFrontCamera: true,
    }).then((image) => {
      const fType = image?.mime || "";
      const isValidFile = chatFilesVal(fType, image.size);
      if (isValidFile) {
        upload(image);
      } else {
        setTimeout(() => {
          CAlert(
            "Please select valid file or file size must be exceeded",
            "Alert!"
          );
        }, 2000);
      }
    });
  };

  const options = [
    <TouchableOpacity
      onPress={() => openGallery()}
      style={[styles.optionsContainer, { paddingVertical: 10 }]}
    >
      <CustomIcon name="Image-2" size={18} color={BaseColors.titleColor} />
      <Text
        style={{ marginLeft: 15, color: BaseColors.titleColor, fontSize: 16 }}
      >
        {"Gallery"}
      </Text>
    </TouchableOpacity>,
    <TouchableOpacity
      onPress={() => openCamera()}
      style={[
        styles.optionsContainer,
        {
          borderColor: "#e6e6e6",
          paddingBottom: 10,
        },
      ]}
    >
      <CustomIcon name="Camera" size={20} color={BaseColors.titleColor} />
      <Text
        style={{ marginLeft: 15, color: BaseColors.titleColor, fontSize: 16 }}
      >
        {"Camera"}
      </Text>
    </TouchableOpacity>,
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => {
        ActionSheetRef.current.close();
      }}
      style={[styles.cancleButton]}
    >
      <Text
        style={{ color: BaseColors.white, textAlign: "center", fontSize: 16 }}
      >
        {"Cancel"}
      </Text>
    </TouchableOpacity>,
  ];

  async function uploadMultiImage() {
    setBtnLoading(true);
    let uploadImg = {};
    uploadedImages &&
      uploadedImages.map((li, ind) => {
        uploadImg = { ...uploadImg, [`TaskData[proofFile][${ind}]`]: li };
      });
    const passData = {
      ...uploadImg,
    };
    const url =
      BaseSetting.endpoints.uploadImage +
      `?taskDataId=${selectItem?.task_data_id}`;
    try {
      const resp = await getApiData(url, "POST", passData, "", true);
      if (resp.status) {
        getTaskList(1, "onEndreached");
        ActionUploadRef.current.close();
        Toast.show(resp?.message);
      }
      setBtnLoading(false);
    } catch (er) {
      ActionUploadRef.current.close();
      setBtnLoading(false);
    }
  }

  async function markAsCompleted() {
    setCompletedLoader(true);
    const url =
      BaseSetting.endpoints.markasComplete +
      `?taskDataId=${selectItem?.task_data_id}`;
    try {
      const resp = await getApiData(url, "GET");
      if (resp.status) {
        getTaskList(1);
      }
      setCompletedLoader(false);
      Toast.show(resp?.message);
      ActionCompleted.current.close();
    } catch (er) {
      ActionCompleted.current.close();
      setCompletedLoader(false);
    }
  }

  const removeImage = async (id, ind) => {
    const removeImage = [...uploadedImages];
    if (removeImage) {
      if (id) {
        const url = BaseSetting.endpoints.deleteImage + `?id=${id}`;
        try {
          const resp = await getApiData(url, "GET");
          if (resp.status) {
            removeImage.splice(ind, 1);
            Toast.show(resp?.message);
          }
        } catch (er) {}
      } else {
        removeImage.splice(ind, 1);
      }
      setUploadedImages(removeImage);
    }
  };

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
        <View
          style={{
            backgroundColor: BaseColors.primary,
            paddingTop: getStatusBarHeight() + (IOS ? 50 : 30),
            flexDirection: "row",
            justifyContent: "space-between",
            marginHorizontal: 20,
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <FastImage
              source={Images.Profile}
              style={{
                width: 50,
                height: 50,
                borderRadius: 30,
                marginRight: 15,
              }}
            />
            <View>
              <Text style={{ color: BaseColors.white, fontSize: 18 }}>
                Hello! 👋
              </Text>
              <Text
                style={{
                  color: BaseColors.white,
                  fontSize: 18,
                  fontWeight: "600",
                }}
              >
                {userData?.name || "-"}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => navigation.toggleDrawer()}
            style={{
              backgroundColor: BaseColors.orangeColor,
              width: 40,
              height: 40,
              borderRadius: 20,
              justifyContent: "center",
            }}
          >
            <CustomIcon
              name="Side-Menu"
              size={20}
              color={BaseColors.white}
              style={{ textAlign: "center" }}
            />
          </TouchableOpacity>
        </View>
        <View style={{ marginVertical: 20 }}>
          <FlatList
            ref={flatListRef}
            data={dates}
            renderItem={renderDayHeader}
            keyExtractor={(item) => item}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.dateList}
            getItemLayout={
              (data, index) => ({
                length: 60,
                offset: 60 * index,
                index,
              }) // Assuming each item has a width of 60
            }
            onScrollToIndexFailed={(info) => {
              if (flatListRef.current) {
                flatListRef.current.scrollToOffset({
                  offset: info.averageItemLength * info.index,
                  animated: true,
                });
                setTimeout(() => {
                  if (flatListRef.current) {
                    flatListRef.current.scrollToIndex({
                      index: info.index,
                      animated: true,
                    });
                  }
                }, 100);
              }
            }}
            style={{ marginBottom: 10 }}
          />
        </View>
      </View>
      <View style={{ marginHorizontal: 10, flex: 1 }}>
        <View
          ref={touchable}
          style={{
            flexDirection: "row",
            alignContent: "center",
            justifyContent: "space-between",
            marginBottom: 10,
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                fontSize: 20,
                marginTop: 10,
                fontWeight: "600",
                color: BaseColors.titleColor,
              }}
            >
              Today’s Task
            </Text>
            <TouchableOpacity
              ref={touchable}
              style={{ marginTop: IOS ? 8 : 10, marginHorizontal: 5 }}
              onPress={() => setShowPopover(true)}
            >
              <CustomIcon
                ref={touchable}
                name="Alert"
                size={25}
                color={BaseColors.primary}
                onPress={() => setShowPopover(true)}
              />
            </TouchableOpacity>
            <Popover
              from={touchable}
              isVisible={showPopover}
              statusBarTranslucent={true}
              popoverStyle={{ width: 600, borderRadius: 4 }} // Adjust as needed
              placement={PopoverPlacement.BOTTOM}
              onRequestClose={() => setShowPopover(false)}
            >
              <View
                style={{
                  paddingVertical: 5,
                  paddingHorizontal: 3,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    paddingVertical: 5,
                  }}
                >
                  <View
                    style={{
                      width: 15,
                      height: 15,
                      borderRadius: 10,
                      backgroundColor: BaseColors.redColor,
                      marginHorizontal: 5,
                    }}
                  />
                  <Text
                    style={{
                      color: BaseColors.titleColor,
                      fontSize: 14,
                    }}
                  >
                    Indicates task requires photo verification.
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      width: 15,
                      height: 15,
                      borderRadius: 10,
                      backgroundColor: BaseColors.grey,
                      marginHorizontal: 5,
                    }}
                  />
                  <Text
                    style={{
                      color: BaseColors.titleColor,
                      fontSize: 14,
                    }}
                  >
                    Indicates task doesn’t require photo verification.
                  </Text>
                </View>
              </View>
            </Popover>
          </View>
          <View style={{ justifyContent: "center", marginTop: 10 }}>
            <Text style={{ fontSize: 18, color: BaseColors.titleColor }}>
              {pagination?.completedCount || 0}/{pagination?.totalCount || 0}
            </Text>
          </View>
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
        )}
      </View>
      <RBSheet
        ref={ActionUploadRef}
        closeOnDragDown={true}
        closeOnPressMask={true}
        dragFromTopOnly={true}
        height={size(uploadedImages) <= 3 ? 250 : 350}
        customStyles={{
          container: {
            backgroundColor: "#FFF",
            borderTopRightRadius: 30,
            borderTopLeftRadius: 30,
          },
        }}
      >
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "600",
              marginVertical: 15,
              color: BaseColors.black,
            }}
          >
            Upload Proof
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: BaseColors.textColor,
            }}
          >
            Maximum 5 photos can be uploaded.
          </Text>
        </View>
        <View style={{ flexDirection: "row", flexWrap: "wrap", marginTop: 10 }}>
          <TouchableOpacity
            activeOpacity={0.7}
            disabled={size(uploadedImages) === 5}
            onPress={() => {
              if (ActionSheetRef.current) {
                setTimeout(() => {
                  ActionSheetRef.current.open();
                }, 500);
                ActionUploadRef.current.close();
              }
            }}
            style={{
              width: 80,
              height: 80,
              borderRadius: 50,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: BaseColors.lightOrange,
              marginTop: 10,
              marginLeft: 20,
              opacity: size(uploadedImages) === 5 ? 0.5 : 1,
            }}
          >
            <CustomIcon name="Plus" size={25} color={BaseColors.orangeColor} />
          </TouchableOpacity>
          {!isEmpty(uploadedImages) && isArray(uploadedImages)
            ? uploadedImages.map((d, index) => {
                return (
                  <TouchableOpacity
                    style={[
                      styles.imageContainer,
                      {
                        width: 85,
                        height: 85,
                        flexDirection: "row",
                        position: "relative",
                        marginLeft: 10,
                        borderRadius: 50,
                        flexWrap: "wrap",
                      },
                    ]}
                    activeOpacity={0.8}
                  >
                    <FastImage
                      style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: 50,
                      }}
                      resizeMode={"cover"}
                      source={{ uri: d?.file || d?.uri }}
                    />
                    {size(uploadedImages) > 0 && (
                      <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={() => {
                          Alert.alert(
                            "Remove",
                            "Are you sure you want to remove this photo?",
                            [
                              {
                                text: "No",
                                onPress: () => {},
                              },
                              {
                                text: "Yes",
                                onPress: () => {
                                  removeImage(d?.id, index);
                                },
                              },
                            ]
                          );
                        }}
                        style={[
                          styles.mainViewStyMultiple,
                          {
                            backgroundColor: BaseColors.white,
                          },
                        ]}
                      >
                        <CustomIcon name="Close" color={BaseColors.errorRed} />
                      </TouchableOpacity>
                    )}
                  </TouchableOpacity>
                );
              })
            : null}
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
            onBtnClick={() => ActionUploadRef.current.close()}
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
              loading={btnLoading}
              containerStyle={{ width: 160 }}
              onBtnClick={() => uploadMultiImage()}
            >
              Submit
            </Button>
          </View>
        </View>
      </RBSheet>
      <RBSheet
        ref={ActionSheetRef}
        closeOnDragDown={true}
        closeOnPressMask={true}
        dragFromTopOnly={true}
        height={200}
        customStyles={{
          container: {
            backgroundColor: "#FFF",
            borderTopRightRadius: 30,
            borderTopLeftRadius: 30,
          },
        }}
      >
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "600",
              marginVertical: 10,
              color: BaseColors.black,
            }}
          >
            Upload Proof
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: BaseColors.textColor,
            }}
          >
            Maximum 5 photos can be uploaded.
          </Text>
        </View>
        <View>
          {options?.map((item) => {
            return item;
          })}
        </View>
      </RBSheet>
      <RBSheet
        ref={ActionCompleted}
        closeOnDragDown={true}
        closeOnPressMask={true}
        dragFromTopOnly={true}
        height={150}
        customStyles={{
          container: {
            backgroundColor: "#FFF",
            borderTopRightRadius: 30,
            borderTopLeftRadius: 30,
          },
        }}
      >
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "700",
              marginVertical: 10,
              color: BaseColors.black,
            }}
          >
            Confirm
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "500",
              color: BaseColors.textColor,
            }}
          >
            Are you sure you want to complete this task?
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
            onBtnClick={() => ActionCompleted.current.close()}
            containerStyle={{
              width: 160,
              backgroundColor: BaseColors.yellow,
            }}
            style={{ backgroundColor: BaseColors.yellow, borderWidth: 0 }}
          >
            NO
          </Button>
          <View style={{ marginHorizontal: 10 }}>
            <Button
              loading={completedLoader}
              containerStyle={{ width: 160 }}
              onBtnClick={() => markAsCompleted()}
            >
              YES
            </Button>
          </View>
        </View>
      </RBSheet>
    </View>
  );
}
