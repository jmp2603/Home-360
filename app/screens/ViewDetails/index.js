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
} from "react-native";
import { createStyles } from "./styles";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useTheme } from "@react-navigation/native";
import { BaseColors } from "../../config/theme";
import BaseSetting from "../../config/setting";
import { getApiData } from "../../utils/apiHelper";
import moment from "moment";
import FastImage from "react-native-fast-image";
import { isEmpty } from "lodash";
import { CustomIcon } from "../../config/LoadIcons";
import CAlert from "../../components/CAlert";
import ImageCropPicker from "react-native-image-crop-picker";
import { chatFilesVal } from "../../utils/CommonFunc";
import RBSheet from "react-native-raw-bottom-sheet";
import { Button } from "../../components";

const { width, height } = Dimensions.get("window");
export default function ViewDetails({ navigation, route }) {
  const IOS = Platform.OS === "ios";
  const detail = route?.params?.detail;
  const ActionSheetRef = useRef();
  const colors = useTheme();
  const styles = createStyles(colors);
  const [taskDetail, setTaskDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [imgVisible, setImgVisible] = useState(false);
  const [selectedImag, setSelectedImag] = useState({});
  const [commentView, setCommentView] = useState(false);

  // View Vessel Details...
  async function getTaskDetails() {
    setIsLoading(true);
    const url = BaseSetting.endpoints.taskDetail + `?taskId=${detail?.id}`;
    try {
      const res = await getApiData(url, "GET");
      if (res.status) {
        setTaskDetails(res?.data);
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

  const openGallery = () => {
    ImageCropPicker.openPicker({
      cropping: true,
    }).then((image) => {
      setLoader(true);
      const fType = image?.mime || "";
      const isValidFile = chatFilesVal(fType, image.size);
      if (isValidFile) {
        uploadImage(image);
        setLoader(false);
      } else {
        setTimeout(() => {
          setProfileImg(image?.path);
          setLoader(false);
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
      setLoader(true);
      const fType = image?.mime || "";
      const isValidFile = chatFilesVal(fType, image.size);
      if (isValidFile) {
        uploadImage(image);
        setLoader(false);
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

  return (
    <View style={{ backgroundColor: BaseColors.white, flex: 1 }}>
      <CHeader
        title={"Task Details"}
        leftIcon="Back"
        onLeftPress={() => navigation.goBack()}
      />
      {isLoading ? ( // Show loader if isLoading is true
        <ActivityIndicator
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
            <View style={[styles.cotent, { paddingVertical: 5 }]}>
              <Text style={styles.dateTxt}>Last completion date : </Text>
              <Text style={styles.value}>
                {moment(taskDetail?.end_date).format("DD-MM-YYYY") || "-"}
              </Text>
            </View>
            {taskDetail?.type !== "once" && (
              <View style={styles.cotent}>
                <Text style={styles.dateTxt}>Next due date: </Text>
                <Text style={styles.value}>
                  {taskDetail?.created_at
                    ? moment.unix(taskDetail?.created_at).format("DD-MM-YYYY")
                    : "15-05-2024"}
                </Text>
              </View>
            )}
            <View
              style={{ borderBottomWidth: 1, borderColor: BaseColors.offWhite }}
            />
            <View style={{ marginTop: 10 }}>
              <Text style={{ fontSize: 16, fontWeight: "600" }}>
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
                        activeOpacity={0.7}
                        onPress={() => {
                          setImgVisible(true);
                          setSelectedImag(li);
                        }}
                        style={styles.imageContainer}
                      >
                        <FastImage
                          style={{ width: "100%", height: "100%" }}
                          source={{ uri: li }}
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
            {/* {!isEmpty(taskDetail?.proof_files) && ( */}
            <View style={{ marginTop: 10 }}>
              <Text style={styles.header}>
                Upload Photos{" "}
                {taskDetail.is_required && (
                  <Text style={{ color: BaseColors.redColor }}>*</Text>
                )}{" "}
                :
              </Text>
              <Text style={{ color: BaseColors.textColor, fontSize: 16 }}>
                Maximum 5 photos can be uploaded.
              </Text>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => ActionSheetRef.current.open()}
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 50,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: BaseColors.lightOrange,
                  marginVertical: 20,
                }}
              >
                <CustomIcon
                  name="Plus"
                  size={25}
                  color={BaseColors.orangeColor}
                />
              </TouchableOpacity>
              <View style={{ flexDirection: "row" }}>
                {taskDetail?.proof_files &&
                  taskDetail?.proof_files.map((li) => {
                    return (
                      <TouchableOpacity
                        activeOpacity={0.7}
                        style={styles.imageContainer}
                        onPress={() => {
                          setImgVisible(true);
                          setSelectedImag(li);
                        }}
                      >
                        <FastImage
                          style={{ width: "100%", height: "100%" }}
                          source={{ uri: li }}
                        />
                      </TouchableOpacity>
                    );
                  })}
              </View>
            </View>
            {/* )} */}
            {/* <TouchableOpacity
              activeOpacity={0.7}
              style={{
                marginHorizontal: 15,
                marginTop: 10,
                flexDirection: "row",
                justifyContent: "space-between",
                backgroundColor: "#e6ecf0",
              }}
              onPress={() => setCommentView(!commentView)}
            >
              <Text
                style={{
                  paddingVertical: 6,
                  paddingHorizontal: 5,
                  fontSize: 16,
                  fontWeight: "600",
                }}
              >
                Comments
              </Text>
              <CustomIcon
                name={"Down-Arrow"}
                color={BaseColors.textColor}
                size={11}
                style={{
                  justifyContent: "center",
                  paddingHorizontal: 5,
                  alignSelf: "center",
                }}
              />
            </TouchableOpacity>
            {commentView && <CommentView detail={detail} />} */}
            <View style={{ marginVertical: 10 }}>
              <Button txtSty={{ fontSize: 16, textTransform: "uppercase" }}>
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
