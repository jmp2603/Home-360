/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {Dimensions, Text, TouchableOpacity, View} from 'react-native';
import styles from './styles';
import {BaseColors} from '../../config/theme';
import {useTheme} from '@react-navigation/native';
import DeviceInfo from 'react-native-device-info';

export default function RadioButton(props) {
  const {
    containerStyle,
    options = [],
    selectedOption,
    onSelect,
    label,
    disabled = false,
  } = props;

  const isTabletDevice = DeviceInfo.isTablet();
  const [selected, setSelected] = useState(selectedOption);
  const colors = useTheme();
  const handleSelect = option => {
    setSelected(option);
    if (onSelect) {
      onSelect(option);
    }
  };

  return (
    <View style={{flexDirection: 'column'}}>
      <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
        {options &&
          options.map(option => (
            <TouchableOpacity
              activeOpacity={0.8}
              key={option.value}
              disabled={disabled}
              onPress={() => handleSelect(option.value)}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginVertical: 0,
                width: isTabletDevice
                  ? Dimensions.get('window').width / 5.9
                  : Dimensions.get('window').width / 2 - 30, // Adjusted width for smaller devices
                marginBottom: 10,
              }}>
              <View
                style={{
                  height: 20,
                  width: 20,
                  borderRadius: 12,
                  borderWidth: 2,
                  borderColor: BaseColors.inputBorder,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: 8, // Added margin to separate radio button and text
                }}>
                {selected === option.value && (
                  <View
                    style={{
                      height: 12,
                      width: 12,
                      borderRadius: 6,
                      backgroundColor: colors.colors.primary,
                    }}
                  />
                )}
              </View>
              <Text
                // numberOfLines={1}
                style={{
                  fontSize: 14,
                  textTransform: 'capitalize',
                  color: colors.colors.textColor,
                  fontWeight: '500',
                  flexShrink: 1, // Allow text to shrink instead of overflow
                  width: isTabletDevice ? '70%' : '80%', // Maximum width for text
                }}>
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
      </View>
      {options.map(
        option =>
          option.error && (
            <Text key={option.value} style={{color: 'red'}}>
              {option.error}
            </Text>
          ),
      )}
    </View>
  );
}
