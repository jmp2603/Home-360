/* eslint-disable react-native/no-inline-styles */
import React from "react";
import PropTypes from "prop-types";
import { TouchableOpacity, Text, View, ActivityIndicator } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { BaseColors } from "../../config/theme";
import { createStyles } from "./style";
import { CustomIcon } from "../../config/LoadIcons";
import { useTheme } from "@react-navigation/native";

/**
 * Component for Button
 * @function  Button
 *
 */

export default function Button(props) {
  const {
    children,
    type,
    shape,
    raised,
    containerStyle,
    loading,
    onBtnClick,
    style,
    txtSty,
    iconPosition,
    cIconName,
    cIconSty,
    vIconName,
    vIconSty,
    disabled,
    delivered,
    ...rest
  } = props;

  const colors = useTheme();
  const styles = createStyles(colors);

  const renderText = () => (
    <Text
      style={{
        color: type === "outlined" ? BaseColors.primary : BaseColors.white,
        ...styles.btnText,
        ...txtSty,
      }}
    >
      {!loading ? (
        children
      ) : (
        <ActivityIndicator
          animating
          color={type === "outlined" ? BaseColors.primary : BaseColors.white}
        />
      )}
    </Text>
  );

  const renderIcon = (positiontype) => (
    <CustomIcon
      name={cIconName}
      size={20}
      color={type === "primary" ? BaseColors.white : BaseColors.primary}
      style={{
        [positiontype]: 0,
        position: "absolute",
        ...cIconSty,
      }}
    />
  );

  const renderVectorIcon = (positiontype) => (
    <Icon
      name={vIconName}
      size={20}
      color={type === "primary" ? BaseColors.white : BaseColors.primary}
      style={{
        [positiontype]: 20,
        position: "absolute",
        ...vIconSty,
      }}
    />
  );
  return (
    <TouchableOpacity
      disabled={disabled}
      activeOpacity={0.8}
      {...rest}
      onPress={loading ? () => {} : onBtnClick}
      style={{
        opacity: disabled ? 0.4 : 1,
        paddingVertical: 3,
        overflow: "hidden",
        ...styles[shape],
        ...styles[type],
        ...style,
      }}
    >
      {type === "primary" ? (
        <View
          style={{
            ...styles.btnContainer,
            backgroundColor:
              containerStyle.backgroundColor || BaseColors.primary,
            padding: 10,
            borderColor: BaseColors.primary,
            ...containerStyle,
          }}
        >
          {cIconName
            ? renderIcon(iconPosition)
            : renderVectorIcon(iconPosition)}
          {renderText()}
        </View>
      ) : (
        <View
          style={[
            styles.btnContainer,
            containerStyle,
            {
              backgroundColor: BaseColors.white,
              borderWidth: 1,
              borderRadius: 5,
              borderColor: BaseColors.primary,
            },
          ]}
        >
          {cIconName
            ? renderIcon(iconPosition)
            : renderVectorIcon(iconPosition)}
          {renderText()}
        </View>
      )}
    </TouchableOpacity>
  );
}

Button.propTypes = {
  type: PropTypes.oneOf(["primary", "outlined", "text"]),
  shape: PropTypes.oneOf(["round", "square"]),
  raised: PropTypes.bool,
  containerStyle: PropTypes.object,
  loading: PropTypes.bool,
  onBtnClick: PropTypes.func,
  style: PropTypes.object,
  txtSty: PropTypes.object,
  iconPosition: PropTypes.string,
  cIconName: PropTypes.string,
  cIconSty: PropTypes.object,
  disabled: PropTypes.bool,
  delivered: PropTypes.string,
};

Button.defaultProps = {
  type: "primary",
  shape: "square",
  raised: true,
  disabled: false,
  containerStyle: {},
  loading: false,
  onBtnClick: () => {},
  style: {},
  txtSty: {},
  iconPosition: "left",
  cIconName: "",
  cIconSty: {},
  delivered: "",
};
