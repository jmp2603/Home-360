/* eslint-disable react-native/no-inline-styles */
import CHeader from "../../components/Header";
import React, { useEffect, useState } from "react";
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
import ImageViewModal from "../../components/ImageViewModal";
import CommentView from "../../components/CommentView";
import { CustomIcon } from "../../config/LoadIcons";

const { width, height } = Dimensions.get("window");
export default function ViewDetails({ navigation, route }) {
  const IOS = Platform.OS === "ios";
  const detail = route?.params?.detail;
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

  const closeModal = () => {
    setImgVisible(false);
    setSelectedImag({});
  };

  return (
    <View style={{ backgroundColor: BaseColors.white, flex: 1 }}>
      <CHeader
        title={"View Detail"}
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
              <Text style={styles.header} numberOfLines={1}>
                Title:{" "}
              </Text>
              <Text style={styles.value}>{taskDetail?.title || "-"}</Text>
            </View>
            <View style={styles.cotent}>
              <Text style={styles.header} numberOfLines={1}>
                Description:{" "}
              </Text>
              <Text style={styles.value}>{taskDetail?.description || "-"}</Text>
            </View>
            <View style={styles.cotent}>
              <Text style={styles.header} numberOfLines={1}>
                Created Date:{" "}
              </Text>
              <Text style={styles.value}>
                {taskDetail?.created_at
                  ? moment.unix(taskDetail?.created_at).format("DD/MM/YYYY")
                  : "-"}
              </Text>
            </View>
            <View style={styles.cotent}>
              <Text style={styles.header} numberOfLines={1}>
                Status:{" "}
              </Text>
              <Text
                style={[
                  styles.value,
                  {
                    color: taskDetail?.status === 0 ? "red" : "green",
                    fontWeight: "600",
                  },
                ]}
              >
                {taskDetail?.status === 0 ? "Pending" : "Completed"}
              </Text>
            </View>
          </View>
          {!isEmpty(taskDetail?.task_files) && (
            <View style={{ paddingHorizontal: 15 }}>
              <Text style={styles.header}>Task Images :</Text>
              <View style={{ flexDirection: "row", marginVertical: 5 }}>
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
            </View>
          )}
          {!isEmpty(taskDetail?.proof_files) && (
            <View style={{ paddingHorizontal: 15 }}>
              <Text style={styles.header}>Proof Images :</Text>
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
          )}
          <TouchableOpacity
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
            {commentView ? (
              <CustomIcon
                name={"Down-Vector"}
                color={BaseColors.textColor}
                size={11}
                style={{
                  justifyContent: "center",
                  paddingHorizontal: 5,
                  alignSelf: "center",
                }}
              />
            ) : (
              <CustomIcon
                name={"up"}
                color={BaseColors.textColor}
                size={14}
                style={{
                  justifyContent: "center",
                  paddingHorizontal: 5,
                  alignSelf: "center",
                }}
              />
            )}
          </TouchableOpacity>
          {commentView && <CommentView detail={detail} />}
        </KeyboardAwareScrollView>
      )}
      <ImageViewModal
        visible={imgVisible}
        onRequestClose={closeModal}
        content={{
          type: "image",
          source: selectedImag,
        }}
        onPress={(event) => {
          closeModal();
        }}
      />
    </View>
  );
}
