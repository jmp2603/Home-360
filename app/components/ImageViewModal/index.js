/* eslint-disable react-native/no-inline-styles */
import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  Modal,
  Platform,
  Dimensions,
  Text,
  ActivityIndicator,
} from "react-native";
import PropTypes from "prop-types";
import Image from "react-native-fast-image";
import { createStyles } from "./styles";
import { Images } from "../../config";
import { BaseColors } from "../../config/theme";
import { useTheme } from "@react-navigation/native";

/**
 * Module ImageViewModal
 * @module ImageViewModal
 *
 */

const IOS = Platform.OS === "ios";

export default function ImageViewModal(props) {
  const { visible, onRequestClose, onPress = () => {}, content } = props;
  const colors = useTheme();
  const styles = createStyles(colors);
  const [imageLoading, setImageLoading] = useState(true);
  return (
    <Modal
      statusBarTranslucent={true}
      visible={visible}
      onRequestClose={onRequestClose}
      transparent={true}
      style={styles.modalSty}
    >
      <TouchableOpacity
        activeOpacity={1}
        style={styles.modalViewSty}
        onPress={onPress}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {}}
          style={styles.ImageViewSty}
        >
          <View
            style={{
              width: Dimensions.get("window").width / 1.8,
              aspectRatio: 3 / 4, // Aspect ratio 2:3, change as needed
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {imageLoading && (
              <ActivityIndicator
                size="small"
                color={BaseColors.primary}
                style={{ position: "absolute" }}
              /> // Replace this with your custom loader
            )}
            <Image
              source={
                content.source || content.file
                  ? { uri: content.source || content.file }
                  : Images.noImage
              }
              style={{ width: "100%", height: "100%" }}
              resizeMode="contain"
              onLoad={() => setImageLoading(false)} // Set loading to false once image loads
              onLoadEnd={() => setImageLoading(false)} // Also handle onLoadEnd event
            />
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
}

ImageViewModal.propTypes = {
  btnNloader: PropTypes.bool,
  onClose: PropTypes.func,
  content: PropTypes.shape({
    type: PropTypes.oneOf(["image", "document"]),
  }),
};
