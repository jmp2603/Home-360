import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  KeyboardAvoidingViewBase,
  ScrollView,
  Text,
  View,
} from "react-native";
import { BaseColors } from "../../config/theme";
import { flattenDeep, size } from "lodash";
import styles from "./styles";
import Button from "../../components/Button";
import { getApiData } from "../../utils/apiHelper";
import BaseSetting from "../../config/setting";
import Toast from "react-native-simple-toast";
import { useTheme } from "@react-navigation/native";
import DeviceInfo from "react-native-device-info";
import { urlParams } from "../../utils/CommonFunc";
import TextInput from "../../components/TextInput";
import moment from "moment";

export default function CommentView(props) {
  const colors = useTheme();
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
  async function getChatHistory(p = page) {
    setCommentLoader(true);
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
        Toast.show(resp?.message);
      }
      setCommentLoader(false);
    } catch (error) {
      setCommentList([]);
      Toast.show("something went wrong");
    }
  }
  // End

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

  const renderComment = (item, index) => {
    const val = item;
    return (
      <View
        style={{
          backgroundColor: "#ffffff",
          borderWidth: 1,
          marginBottom: 8,
          padding: 5,
          borderRadius: 6,
          borderColor: BaseColors.inputBorder,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            padding: 5,
            borderRadius: 3,
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
                  fontSize: 14,
                  color: "#7c8287",
                  marginLeft: 10,
                }}
              >
                {val?.user_name || "User Name"}
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <Text style={{ marginLeft: 5, color: "#7c8287", fontSize: 14 }}>
              {val?.created_at &&
                moment.unix(val?.created_at).format("DD/MM/YYYY")}{" "}
            </Text>
          </View>
        </View>
        <View
          style={{
            marginHorizontal: 15,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              color: "#000000",
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
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          ...styles.bottomView,
          backgroundColor: BaseColors.white,
          maxHeight: Dimensions.get("window").height / 1.6,
        }}
      >
        <View style={{ marginVertical: 10 }}>
          {commentLoader ? (
            <ActivityIndicator color={BaseColors.primary} />
          ) : (
            size(commentList) > 0 &&
            commentList.map((li, index) => {
              return renderComment(li, index);
            })
          )}
        </View>
      </ScrollView>
      <View style={styles.bottomView}>
        <View>
          <TextInput
            textArea
            placeholderText="Add Comment..."
            value={textAreaVal}
            numberOfLines={4}
            showError={textValErr.err}
            errorText={textValErr.txt}
            numberofLine={4}
            onChange={(value) => {
              setTextAreaVal(value);
            }}
          />
        </View>
        <View style={{ marginVertical: 20 }}>
          <Button
            loading={btnLoader}
            type="primary"
            onBtnClick={() => {
              validation();
            }}
          >
            {"Send"}
          </Button>
        </View>
      </View>
    </>
  );
}
