/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import PropTypes from 'prop-types';
import {TouchableOpacity, Text, View, ActivityIndicator} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {BaseColors} from '../../config/theme';
import {createStyles} from './style';
import {CustomIcon} from '../../config/LoadIcons';
import {useTheme} from '@react-navigation/native';
import DeviceInfo from 'react-native-device-info';

const isTabletDevice = DeviceInfo.isTablet();
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
        color: type === 'outlined' ? colors.colors.primary : BaseColors.white,

        ...styles.btnText,
        ...txtSty,
      }}>
      {!loading ? (
        children
      ) : (
        <ActivityIndicator
          animating
          color={type === 'outlined' ? BaseColors.primary : BaseColors.white}
        />
      )}
    </Text>
  );

  const renderIcon = positiontype => (
    <CustomIcon
      name={cIconName}
      size={20}
      color={type === 'primary' ? BaseColors.white : BaseColors.primary}
      style={{
        [positiontype]: 0,
        position: 'absolute',

        ...cIconSty,
      }}
    />
  );

  const renderVectorIcon = positiontype => (
    <Icon
      name={vIconName}
      size={20}
      color={type === 'primary' ? BaseColors.white : BaseColors.primary}
      style={{
        [positiontype]: 20,
        position: 'absolute',
        ...vIconSty,
      }}
    />
  );
  return (
    <TouchableOpacity
      disabled={disabled}
      activeOpacity={0.7}
      {...rest}
      onPress={loading ? () => {} : onBtnClick}
      style={{
        overflow: 'hidden',
        ...styles[shape],
        ...styles[type],
        ...style,
      }}>
      {type === 'primary' ? (
        <View
          style={{
            ...styles.btnContainer,
            ...containerStyle,

            backgroundColor: disabled
              ? BaseColors.inactive
              : containerStyle.backgroundColor || colors.colors.primary,
            padding: isTabletDevice ? 12 : 7.5,
          }}>
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
              backgroundColor: disabled
                ? BaseColors.inactive
                : BaseColors.white,
              padding: isTabletDevice ? 12 : 7.5,
              borderWidth: 1,
              borderRadius: 5,
              borderColor: disabled
                ? BaseColors.inactive
                : colors.colors.primary,

              // borderRadius:1
            },
          ]}>
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
  type: PropTypes.oneOf(['primary', 'outlined', 'text']),
  shape: PropTypes.oneOf(['round', 'square']),
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
  type: 'primary',
  shape: 'square',
  raised: true,
  disabled: false,
  containerStyle: {},
  loading: false,
  onBtnClick: () => {},
  style: {},
  txtSty: {},
  iconPosition: 'left',
  cIconName: '',
  cIconSty: {},
  delivered: '',
};
