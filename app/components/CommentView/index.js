import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { BaseColors } from "../../config/theme";
import { flattenDeep, isEmpty } from "lodash";
import styles from "./styles";
import { getApiData } from "../../utils/apiHelper";
import BaseSetting from "../../config/setting";
import Toast from "react-native-simple-toast";
import { urlParams } from "../../utils/CommonFunc";
import TextInput from "../../components/TextInput";
import moment from "moment";
import { CustomIcon } from "../../config/LoadIcons";
import NoData from "../../components/NoData";

export default function CommentView(props) {
  const { detail } = props;
  const [page, setPage] = useState(1);
  const [nextPage, setNextPage] = useState(false);
  const [nextLoading, setNextLoading] = useState(false);
  const [textAreaVal, setTextAreaVal] = useState("");
  const [commentList, setCommentList] = useState([]);
  const [btnLoader, setBtnLoader] = useState(false);
  const [textValErr, setTextValErr] = useState({ err: false, txt: "" });
  const [commentLoader, setCommentLoader] = useState(false);

  // Get My All users
  async function getChatHistory(p = page, ty) {
    setCommentLoader(ty === "onEndreached" ? false : true);
    const ndata = {
      page: p,
      taskId: detail?.id,
    };
    const string = urlParams(ndata);
    const url = BaseSetting.endpoints.commentList + string?._j;
    try {
      const resp = await getApiData(url, "GET");
      if (resp?.status) {
        let tempPArr = resp?.data;
        if (p > 1) {
          tempPArr = flattenDeep([commentList, tempPArr]);
        }
        setPage(Number(resp?.pagination?.page));
        setCommentList(tempPArr);
        if (resp?.pagination?.isMore) {
          setNextPage(true);
        } else {
          setNextPage(false);
        }
        setNextLoading(false);
      } else {
        setCommentList([]);
        setNextLoading(false);
      }
      setCommentLoader(false);
    } catch (error) {
      setCommentList([]);
      Toast.show("something went wrong");
    }
  }
  // End
  const onEndReached = () => {
    if (nextPage && !nextLoading) {
      setNextLoading(true);
      const tempPage = page + 1;
      setPage(tempPage);
      getChatHistory(tempPage, "onEndreached");
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

  const validation = () => {
    let valid = true;
    if (textAreaVal === "") {
      setTextValErr({ err: true, txt: "Please Enter Comment" });
      valid = false;
    } else {
      setTextValErr({ err: false, txt: "" });
    }

    if (valid) {
      handleSubmit();
    }
  };

  // Commit Create....
  async function handleSubmit() {
    setBtnLoader(true);
    const nData = {
      "TaskComment[task_id]": detail?.id,
      "TaskComment[message]": textAreaVal,
    };
    const url = BaseSetting.endpoints.createCommit;
    const method = "POST";
    try {
      const res = await getApiData(url, method, nData, "", true);
      if (res.status) {
        setTextAreaVal("");
        getChatHistory(1);
      } else {
        Toast.show(res.message);
      }
      setBtnLoader(false);
    } catch (err) {
      Toast.show("something went wrong");
      setBtnLoader(false);
    }
  }
  // END

  useEffect(() => {
    getChatHistory(1);
  }, []);

  const renderComment = ({ item, index }) => {
    const val = item;
    return (
      <View
        style={{
          backgroundColor: BaseColors.offWhite,
          borderWidth: 1,
          marginBottom: 8,
          padding: 3,
          borderRadius: 10,
          borderColor: "#E2E8F0",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            borderRadius: 3,
            marginVertical: 8,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View>
              <Text
                style={{
                  fontSize: 16,
                  color: BaseColors.titleColor,
                  marginLeft: 10,
                  fontWeight: "600",
                }}
              >
                {val?.name || "User Name"}
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <Text
              style={{
                marginLeft: 5,
                color: BaseColors.titleColor,
                fontSize: 16,
                fontWeight: "600",
              }}
            >
              {val?.created_at &&
                moment.unix(val?.created_at).format("DD/MM/YYYY")}{" "}
            </Text>
          </View>
        </View>
        <View
          style={{
            marginHorizontal: 10,
            marginBottom: 5,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              color: BaseColors.titleColor,
              fontWeight: "400",
            }}
          >
            {val?.message}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <>
      <View style={styles.bottomView}>
        <View style={{ width: "84%" }}>
          <TextInput
            placeholderText="Type message..."
            value={textAreaVal}
            textInputStyle={{
              minHeight: 50,
              backgroundColor: BaseColors.offWhite,
              borderRadius: 10,
              // borderColor: BaseColors.offWhite,
            }}
            showError={textValErr.err}
            errorText={textValErr.txt}
            onChange={(value) => {
              if (value) {
                setTextAreaVal(value);
                setTextValErr({ err: false, txt: "" });
              }
            }}
          />
        </View>
        <View style={{ marginBottom: textValErr.err && 50 }}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => validation()}
            style={{
              width: "20%",
              marginHorizontal: 10,
              width: 50,
              height: 50,
              borderRadius: 30,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: BaseColors.primary,
            }}
          >
            <CustomIcon name="Send" size={20} color={BaseColors.white} />
          </TouchableOpacity>
        </View>
      </View>
      {commentLoader ? (
        <ActivityIndicator
          color={BaseColors.primary}
          style={{
            flex: 1,
            justifyContent: "center",
            alignSelf: "center",
          }}
        />
      ) : isEmpty(commentList) ? (
        <NoData />
      ) : (
        <FlatList
          nestedScrollEnabled
          bounces={false}
          showsVerticalScrollIndicator={false}
          data={commentList}
          maxHeight={Dimensions.get("window").height / 2}
          renderItem={renderComment}
          keyExtractor={(item, index) => index.toString()}
          onEndReached={onEndReached}
          onendreachedthreshold={0.8}
          ListFooterComponent={renderListFooter}
        />
      )}
    </>
  );
}
