/* eslint-disable react-native/no-inline-styles */
import React, { useState } from "react";
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
import { isEmpty } from "lodash";
import FastImage from "react-native-fast-image";
import { Images } from "../../config";
import { useTheme } from "@react-navigation/native";
import { NoData } from "../../components";

export default function Notification({ navigation, route }) {
  const IOS = Platform.OS === "ios";
  const colors = useTheme();
  const styles = createStyles(colors);
  const [notificationList, setNotificationList] = useState([]);
  const [loader, setLoader] = useState(false);

  // Render Item List...
  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={[
          styles.mainView,
          {
            backgroundColor: "#e6ecf0",
          },
        ]}
      >
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
              width: 35,
              height: 35,
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
              display: "flex",
              flexDirection: "row",
              paddingHorizontal: 10,
              justifyContent: "space-between",
              width: Dimensions.get("screen").width / 1.32,
            }}
          >
            <View
              style={{
                flexDirection: "row",
              }}
            >
              <View>
                <Text
                  style={{
                    color: BaseColors.textColor,
                    fontSize: 14,
                    fontWeight: "bold",
                  }}
                >
                  {item.user}
                </Text>
              </View>
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
    );
  };
  // End

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.colors.white,
      }}
    >
      <CHeader
        title={"Notification"}
        defaultRtxtSty={{
          width: "20%",
          borderWidth: 1,
          borderColor: BaseColors.inactive,
          borderRadius: 3,
        }}
        rtxtsty={{
          alignSelf: "center",
          color: colors.colors.primary,
          fontSize: 15,
          paddingVertical: 3,
        }}
      />
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
            onendreachedthreshold={0.2}
            style={{ marginBottom: 5 }}
          />
        )}
      </View>
    </View>
  );
}
