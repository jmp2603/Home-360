/* eslint-disable react-native/no-inline-styles */
import CHeader from "../../components/Header";
import React, { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  Text,
  View,
  ActivityIndicator,
  Platform,
  TouchableOpacity,
  Alert,
} from "react-native";
import { createStyles } from "./styles";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useTheme } from "@react-navigation/native";
import { BaseColors } from "../../config/theme";
import BaseSetting from "../../config/setting";
import { getApiData } from "../../utils/apiHelper";
import moment from "moment";
import FastImage from "react-native-fast-image";
import { isArray, isEmpty, isObject, size } from "lodash";
import { CustomIcon } from "../../config/LoadIcons";
import Toast from "react-native-simple-toast";
import CAlert from "../../components/CAlert";
import ImageCropPicker from "react-native-image-crop-picker";
import { chatFilesVal } from "../../utils/CommonFunc";
import RBSheet from "react-native-raw-bottom-sheet";
import { Button } from "../../components";
import CommentView from "../../components/CommentView";

const { width, height } = Dimensions.get("window");
export default function ViewDetails({ navigation, route }) {
  const IOS = Platform.OS === "ios";
  const detail = route?.params?.detail;
  const ActionSheetRef = useRef();
  const colors = useTheme();
  const styles = createStyles(colors);
  const [taskDetail, setTaskDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [multipicLoader, setMultipicLoader] = useState(false);
  const [completedLoader, setCompletedLoader] = useState(false);
  const [disabled, setDisabled] = useState(false);

  // View Vessel Details...
  async function getTaskDetails() {
    setIsLoading(true);
    const url = BaseSetting.endpoints.taskDetail + `?taskId=${detail?.id}`;
    try {
      const res = await getApiData(url, "GET");
      if (res.status) {
        setTaskDetails(res?.data);
        setUploadedImages(res?.data?.proof_files);
        if (res?.data?.status === 1) {
          setDisabled(true);
        } else if (isEmpty(res?.data?.proof_files) && res?.data.proof_needed) {
          setDisabled(true);
        }
      }
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false); // Hide loader whether successful or not
    }
  }
  // End

  useEffect(() => {
    getTaskDetails();
  }, [detail]);

  /**
   * Function for Upload Images.
   * @function uploadImage
   * @param {Object} imag - Show Image Object for Upload
   */
  async function uploadImage(imag) {
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
    const uploadData = {
      [`TaskData[proofFile][0]`]: imagData,
    };
    const url =
      BaseSetting.endpoints.uploadImage + `?taskDataId=${detail?.task_data_id}`;
    try {
      const resp = await getApiData(url, "POST", uploadData, "", true);
      if (resp?.status) {
        setDisabled(false);
        setUploadedImages([...uploadedImages, imagData]);
        ActionSheetRef.current.close();
      }
      setMultipicLoader(false);
    } catch (err) {
      setMultipicLoader(false);
    }
  }

  const openGallery = () => {
    ImageCropPicker.openPicker({
      cropping: true,
    }).then((image) => {
      const fType = image?.mime || "";
      const isValidFile = chatFilesVal(fType, image.size);
      if (isValidFile) {
        uploadImage(image);
      } else {
        setTimeout(() => {
          setProfileImg(image?.path);
        }, 2000);
      }
    });
  };

  const openCamera = () => {
    ImageCropPicker.openCamera({
      width: 110,
      height: 110,
      // useFrontCamera: true,
    }).then((image) => {
      const fType = image?.mime || "";
      const isValidFile = chatFilesVal(fType, image.size);
      if (isValidFile) {
        uploadImage(image);
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
      if (isEmpty(removeImage)) {
        setDisabled(true);
      }
      setUploadedImages(removeImage);
    }
  };

  async function markAsCompleted() {
    setCompletedLoader(true);
    const url =
      BaseSetting.endpoints.markasComplete +
      `?taskDataId=${detail?.task_data_id}`;
    try {
      const resp = await getApiData(url, "GET");
      if (resp.status) {
        navigation.goBack();
      }
      setCompletedLoader(false);
      Toast.show(resp?.message);
    } catch (er) {
      setCompletedLoader(false);
    }
  }

  return (
    <View style={{ backgroundColor: BaseColors.white, flex: 1 }}>
      <CHeader
        title={"Task Details"}
        leftIcon="Back"
        onLeftPress={() => navigation.goBack()}
      />
      {isLoading ? ( // Show loader if isLoading is true
        <ActivityIndicator
          size={IOS ? "small" : "large"}
          color={BaseColors.primary}
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        />
      ) : (
        <KeyboardAwareScrollView
          bounces={false}
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
        >
          <View
            style={{
              ...styles.container,
            }}
          >
            <View style={styles.cotent}>
              <Text style={styles.title}>{taskDetail?.title || "-"}</Text>
            </View>
            {taskDetail?.last_completed && (
              <View style={[styles.cotent, { paddingVertical: 5 }]}>
                <Text style={styles.dateTxt}>Last completion date : </Text>
                <Text style={styles.value}>
                  {moment(taskDetail?.last_completed).format("DD-MM-YYYY") ||
                    "-"}
                </Text>
              </View>
            )}
            {taskDetail?.type !== "once" && (
              <View style={styles.cotent}>
                <Text style={styles.dateTxt}>Next due date: </Text>
                <Text style={styles.value}>
                  {taskDetail?.end_date
                    ? moment(taskDetail?.end_date).format("DD-MM-YYYY")
                    : "-"}
                </Text>
              </View>
            )}
            <View
              style={{ borderBottomWidth: 1, borderColor: BaseColors.offWhite }}
            />
            <View style={{ marginTop: 10 }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "600",
                  color: BaseColors.titleColor,
                }}
              >
                Task Description :
              </Text>
            </View>
            <Text style={{ color: BaseColors.textColor, marginTop: 10 }}>
              {taskDetail?.description}
            </Text>
            {!isEmpty(taskDetail?.task_files) && (
              <View
                style={{
                  flexDirection: "row",
                  marginVertical: 5,
                  flexWrap: "wrap",
                }}
              >
                {taskDetail?.task_files &&
                  taskDetail?.task_files.map((li) => {
                    return (
                      <TouchableOpacity
                        onPress={() => {}}
                        style={[
                          styles.imageContainer,
                          {
                            flexDirection: "row",
                            position: "relative",
                            marginLeft: 10,
                            borderRadius: 50,
                            marginTop: 10,
                            flexWrap: "wrap",
                            borderWidth: 1,
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
                          source={{ uri: li }}
                          resizeMode={"cover"}
                        />
                      </TouchableOpacity>
                    );
                  })}
              </View>
            )}
            <View
              style={{
                borderBottomWidth: 1,
                borderColor: BaseColors.offWhite,
                paddingVertical: 10,
              }}
            />
            <View style={{ marginTop: 10 }}>
              <Text style={styles.header}>
                Upload Photos{" "}
                {taskDetail.proof_needed ? (
                  <Text style={{ color: BaseColors.redColor }}>*</Text>
                ) : null}{" "}
              </Text>
              <Text style={{ color: BaseColors.textColor, fontSize: 16 }}>
                Maximum 5 photos can be uploaded.
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  marginTop: 10,
                }}
              >
                <TouchableOpacity
                  activeOpacity={0.7}
                  disabled={detail?.status === 1 || size(uploadedImages) === 5}
                  onPress={() => {
                    ActionSheetRef.current.open();
                  }}
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: 50,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: BaseColors.lightOrange,
                    marginTop: 10,
                    opacity:
                      detail?.status === 1 || size(uploadedImages) === 5
                        ? 0.5
                        : 1,
                  }}
                >
                  <CustomIcon
                    name="Plus"
                    size={25}
                    color={BaseColors.orangeColor}
                  />
                </TouchableOpacity>
                {!isEmpty(uploadedImages) && isArray(uploadedImages)
                  ? uploadedImages.map((d, index) => {
                      return (
                        <TouchableOpacity
                          style={[
                            styles.imageContainer,
                            {
                              flexDirection: "row",
                              position: "relative",
                              marginLeft: 10,
                              borderRadius: 50,
                              marginTop: 10,
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
                            source={{ uri: d?.uri || d?.file }}
                          />
                          {size(uploadedImages) > 0 && detail?.status !== 1 && (
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
                                        removeImage(d.id, index);
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
                              <CustomIcon
                                name="Close"
                                color={BaseColors.errorRed}
                                size={10}
                              />
                            </TouchableOpacity>
                          )}
                        </TouchableOpacity>
                      );
                    })
                  : null}
              </View>
            </View>
            <View
              style={{
                borderBottomWidth: 1,
                borderColor: BaseColors.offWhite,
                paddingVertical: 10,
              }}
            />
            <View>
              <Text
                style={{
                  paddingVertical: 10,
                  paddingHorizontal: 5,
                  fontSize: 18,
                  fontWeight: "600",
                }}
              >
                Comments
              </Text>
              {<CommentView detail={detail} />}
            </View>
            <View style={{ marginVertical: 10 }}>
              <Button
                loading={completedLoader}
                onBtnClick={() => markAsCompleted()}
                disabled={disabled}
                txtSty={{ fontSize: 16, textTransform: "uppercase" }}
              >
                {" "}
                MARK COMPLETE
              </Button>
            </View>
          </View>
        </KeyboardAwareScrollView>
      )}
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
    </View>
  );
}
