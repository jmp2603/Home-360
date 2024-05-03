/* eslint-disable react-native/no-inline-styles */
import CHeader from "../../components/Header";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Text,
  View,
  ActivityIndicator,
  Platform,
} from "react-native";
import { createStyles } from "./styles";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useTheme } from "@react-navigation/native";
import { BaseColors } from "../../config/theme";
import BaseSetting from "../../config/setting";
import { getApiData } from "../../utils/apiHelper";
import moment from "moment";

const { width, height } = Dimensions.get("window");
export default function ViewDetails({ navigation, route }) {
  const IOS = Platform.OS === "ios";
  const detail = route?.params?.detail;
  const colors = useTheme();
  const styles = createStyles(colors);
  const [taskDetail, setTaskDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);

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
        </KeyboardAwareScrollView>
      )}
    </View>
  );
}
