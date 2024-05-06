/* eslint-disable react-native/no-inline-styles */
import React, { useRef, useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  Platform,
  Dimensions,
  Alert,
} from "react-native";
import { createStyles } from "./styles";
import { useTheme } from "@react-navigation/native";
import { BaseColors } from "../../config/theme";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import TextInput from "../../components/TextInput";
import Icon from "react-native-vector-icons/Fontisto";
import ImagePicker from "react-native-image-crop-picker";
import { Button } from "../../components";
import ActionSheet from "react-native-actionsheet";
import RBSheet from "react-native-raw-bottom-sheet";
import CAlert from "../../components/CAlert";
import { isArray, isEmpty, isObject, size } from "lodash";
import FastImage from "react-native-fast-image";
import { chatFilesVal } from "../../utils/CommonFunc";
import OIcon from "react-native-vector-icons/AntDesign";
import PIcon from "react-native-vector-icons/MaterialCommunityIcons";
import BaseSetting from "../../config/setting";
import { getApiData } from "../../utils/apiHelper";
import { ScrollView } from "react-native";
import { ActivityIndicator } from "react-native";

const IOS = Platform.OS === "ios";
export default function CreateTask(props) {
  const { setVisible, visible, selectItem } = props;
  const colors = useTheme();
  const styles = createStyles(colors);
  const [descr, setDescr] = useState("");
  const ActionSheetRef = useRef();
  const ActionSheetRefIOS = useRef();
  const CANCEL_INDEX = 2;
  const DESTRUCTIVE_INDEX = 0;
  const [loader, setLoader] = useState(false);
  const [imageErr, setImageErr] = useState({ err: false, txt: "" });
  const [btnLoading, setBtnLoading] = useState(false);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [multipicLoader, setMultipicLoader] = useState(false);

  // Function for show gallary and camara option..
  function showActionSheet() {
    if (IOS) {
      ActionSheetRefIOS.current.open();
    } else {
      ActionSheetRef.current.show();
    }
  }
  // End

  // Function for Validation..
  const validation = () => {
    let valid = true;
    if (isEmpty(uploadedImages)) {
      setImageErr({ err: true, txt: "Please upload image" });
      valid = false;
    } else {
      setImageErr({ err: false, txt: "" });
    }
    if (valid) {
      completedTask();
    }
  };

  /**
   * Function for Submit Task to Colmpleted.
   * @function completedTask
   */
  const completedTask = async () => {
    setBtnLoading(true);
    let uploadImg = {};
    uploadedImages &&
      uploadedImages.map((li, ind) => {
        uploadImg = { ...uploadImg, [`Task[proofFile][${ind}]`]: li };
      });
    const passData = {
      "Task[status]": "1",
      ...uploadImg,
    };
    console.log("🚀 ~ completedTask ~ passData:", passData);
    const url =
      BaseSetting.endpoints.completeTask + `?taskId=${selectItem?.id}`;
    try {
      const resp = await getApiData(url, "POST", passData, "", true);
      console.log("🚀 ~ completedTask ~ resp:", resp);
      if (resp.status) {
        setVisible(false);
        props.handleSubmit();
        Toast.show(resp?.message);
      }
      setBtnLoading(false);
    } catch (er) {
      setVisible(false);
      setBtnLoading(false);
    }
  };

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
    try {
      setUploadedImages([...uploadedImages, imagData]);
      if (IOS) {
        ActionSheetRefIOS.current.close();
      } else {
        ActionSheetRef.current.hide();
      }
      setImageErr({ err: false, txt: "" });
      setMultipicLoader(false);
    } catch (err) {
      setMultipicLoader(false);
    }
  }

  const openGallery = () => {
    ImagePicker.openPicker({
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
    ImagePicker.openCamera({
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

  function doAction(index) {
    if (index === 0) {
      openGallery(index);
    } else if (index === 1) {
      openCamera();
    }
  }

  const options = [
    <TouchableOpacity
      onPress={() => openGallery()}
      style={[styles.optionsContainer, { paddingVertical: 10 }]}
    >
      <Icon name="picture" size={18} color={BaseColors.primary} />
      <Text style={{ marginLeft: 15, color: BaseColors.primary }}>
        {"Gallery"}
      </Text>
    </TouchableOpacity>,
    <TouchableOpacity
      onPress={() => openCamera()}
      style={[
        styles.optionsContainer,
        {
          borderBottomWidth: IOS ? 5 : 0,
          borderColor: "#e6e6e6",
          paddingBottom: 10,
        },
      ]}
    >
      <Icon name="camera" size={18} color={BaseColors.primary} />
      <Text style={{ marginLeft: 15, color: BaseColors.primary }}>
        {"Camera"}
      </Text>
    </TouchableOpacity>,
    <TouchableOpacity
      onPress={() => {
        if (IOS) {
          ActionSheetRefIOS.current.close();
        } else {
          ActionSheetRef.current.hide();
        }
      }}
      style={[styles.optionsContainer, { marginHorizontal: 20 }]}
    >
      <Text style={{ color: BaseColors.primary }}>{"Cancel"}</Text>
    </TouchableOpacity>,
  ];

  const removeUploadImage = async (ind, array) => {
    setMultipicLoader(true);
    if (!isEmpty(array)) {
      array.splice(ind, 1);
      setUploadedImages(array);
      setMultipicLoader(false);
    }
    return true;
  };

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => setVisible(!visible)}
      style={styles.filterView}
    >
      <TouchableOpacity
        onPress={() => {
          null;
        }}
        activeOpacity={1}
        style={[
          styles.background,
          {
            paddingHorizontal: 30,
            width: "90%",
          },
        ]}
      >
        <KeyboardAwareScrollView
          bounces={false}
          contentContainerStyle={{
            flexGrow: 1,
          }}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          enableOnAndroid={false}
        >
          <View style={styles.titleView}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  color: colors.colors.modalheaderTitle,
                  fontWeight: "500",
                }}
              >
                {"Complete Task"}
              </Text>
            </View>
            {/* <View style={{ marginVertical: 10 }}>
              <TextInput
                textArea
                title={"Description"}
                placeholderText={"Description"}
                value={descr}
                containerSty={{}}
                onChange={(value) => {
                  setDescr(value);
                }}
                textInputStyle={{ color: BaseColors.textColor }}
              />
            </View> */}
            <View style={{ marginVertical: 10 }}>
              <Text style={styles.titleSty}>
                Proof {selectItem?.proof_needed === 1 && <Text>*</Text>}
              </Text>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              >
                {!isEmpty(uploadedImages) && isArray(uploadedImages)
                  ? uploadedImages.map((d, index) => {
                      return (
                        <TouchableOpacity
                          onPress={() => {
                            setTimeout(() => {
                              if (!isEmpty(d[index])) {
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
                                        removeUploadImage(
                                          index,
                                          uploadedImages
                                        );
                                      },
                                    },
                                  ]
                                );
                              }
                            }, 200);
                          }}
                          style={[
                            styles.imageContainer,
                            {
                              width: Dimensions.get("window").width / 5,
                              height: Dimensions.get("window").width / 5,
                              flexDirection: "row",
                              position: "relative",
                              marginHorizontal: 5,
                            },
                          ]}
                          activeOpacity={0.8}
                        >
                          <FastImage
                            style={{
                              width: "100%",
                              height: "100%",
                              borderRadius: 4,
                            }}
                            resizeMode={"cover"}
                            source={{ uri: d?.uri }}
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
                                        removeUploadImage(
                                          index,
                                          uploadedImages
                                        );
                                      },
                                    },
                                  ]
                                );
                              }}
                              style={[
                                styles.mainViewStyMultiple,
                                {
                                  borderColor: BaseColors.primary,
                                  borderWidth: 1,
                                  backgroundColor: BaseColors.primary,
                                },
                              ]}
                            >
                              <View>
                                <OIcon
                                  name={"close"}
                                  size={11}
                                  color={BaseColors.white}
                                />
                              </View>
                            </TouchableOpacity>
                          )}
                        </TouchableOpacity>
                      );
                    })
                  : null}
                {5 !== size(uploadedImages) && (
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => {
                      showActionSheet();
                    }}
                    style={[
                      styles.imageView,
                      {
                        borderWidth: 1,
                        width: Dimensions.get("window").width / 5,
                        height: Dimensions.get("window").width / 5,
                      },
                    ]}
                  >
                    {multipicLoader ? (
                      <View
                        style={[
                          {
                            justifyContent: "center",
                            alignSelf: "center",
                            flex: 1,
                          },
                        ]}
                      >
                        <ActivityIndicator
                          color={BaseColors.primary}
                          size="small"
                          animating
                        />
                      </View>
                    ) : (
                      <PIcon
                        name="plus"
                        size={30}
                        color={BaseColors.inputBorder}
                      />
                    )}
                  </TouchableOpacity>
                )}
              </ScrollView>
              {imageErr.err ? (
                <Text style={styles.errTxt}>{imageErr.txt}</Text>
              ) : null}
            </View>
            <View>
              <Button
                loading={btnLoading}
                onBtnClick={() => {
                  if (selectItem?.proof_needed === 1) {
                    validation();
                  } else {
                    completedTask();
                  }
                }}
              >
                Submit
              </Button>
            </View>
          </View>
        </KeyboardAwareScrollView>
        <RBSheet
          ref={ActionSheetRefIOS}
          closeOnDragDown={true}
          closeOnPressMask={true}
          dragFromTopOnly={true}
          height={150}
          customStyles={{
            container: {
              backgroundColor: "#FFF",
              borderTopRightRadius: 20,
              borderTopLeftRadius: 20,
            },
          }}
        >
          <View>
            {options?.map((item) => {
              return item;
            })}
          </View>
        </RBSheet>
        <ActionSheet
          ref={ActionSheetRef}
          options={options}
          cancelButtonIndex={CANCEL_INDEX}
          destructiveButtonIndex={DESTRUCTIVE_INDEX}
          onPress={(index) => doAction(index)}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}
