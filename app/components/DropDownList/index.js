/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {View, Text, Platform, Dimensions} from 'react-native';
import {Dropdown, MultiSelect} from 'react-native-element-dropdown';
import {BaseColors, FontFamily} from '../../config/theme';
import {createStyles} from './styles';
import {CustomIcon} from '../../config/LoadIcons';
import {useTheme} from '@react-navigation/native';
import {isArray} from 'lodash';
import DeviceInfo from 'react-native-device-info';
import {TouchableOpacity} from 'react-native';

const isTabletDevice = DeviceInfo.isTablet();

const IOS = Platform.OS === 'ios';

/**
 *
 * Component for dropdown selction list
 * @module DropDownList
 * @param Props to handle component props
 * @author Rudra
 */

export default function DropDownList(props) {
  const {
    containerSty,
    data,
    value,
    onChange,
    onClick,
    valueProp,
    labelProp,
    titleText,
    placeholderTxt,
    titleSty,
    mandatory = false,
    dropDownSty,
    showError,
    multiSelection,
    errorText,
    search,
    userList,
    hidetitle,
    disable = false,
    inputSearchStyle,
  } = props;

  const [isFocus, setIsFocus] = useState(false);
  const colors = useTheme();
  const styles = createStyles(colors);

  const renderLabel = () => {
    return (
      !multiSelection && (
        <Text
          style={[
            styles.titleTxt,
            titleSty,
            {
              color: disable ? BaseColors.inactive : colors.colors.textColor,
              fontSize: isTabletDevice ? 18 : 14,
            },
          ]}>
          {titleText}
          <Text
            style={{
              fontSize: isTabletDevice ? 18 : 15,
            }}>
            {mandatory ? ' *' : ''}
          </Text>{' '}
        </Text>
      )
    );
  };

  const renderIcon = () => (
    <View style={{marginRight: 10}}>
      <CustomIcon
        name="Down-Vector"
        size={12}
        style={{
          color: disable ? BaseColors.inactive : colors.colors.textColor,
        }}
      />
    </View>
  );

  const renderMultiIcon = () => {
    return (
      <View>
        <CustomIcon
          name="Down-Vector"
          size={12}
          style={{
            color: disable ? BaseColors.inactive : colors.colors.textColor,
          }}
        />
      </View>
    );
  };
  const renderItem = (item, selected) => {
    const isLabelDisabled = item.isLabel;
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        style={{backgroundColor: colors.colors.white}}
        disabled={
          item.value === 'label-My Ports' || item?.value === 'label-All Ports'
            ? false
            : true
        }>
        <View style={styles.listItem}>
          <Text
            style={[
              styles.listItemTxt,
              {
                color: isLabelDisabled
                  ? 'gray'
                  : disable
                  ? BaseColors.inactive
                  : selected
                  ? colors.colors.primary
                  : colors.colors.textColor,
                fontSize: isLabelDisabled ? 12 : 16,
              },
            ]}>
            {userList
              ? `${item.first_name} ${item.last_name}`
              : item[labelProp]}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderMultiItem = item => {
    const isLabelDisabled = item.isLabel;
    return (
      <View style={styles.listItem}>
        <Text
          style={[
            styles.listItemTxt,
            {
              color: isLabelDisabled
                ? 'gray'
                : disable
                ? BaseColors.inactive
                : colors.colors.dropdownTextColor,
              fontSize: isLabelDisabled ? 12 : 16,
            },
          ]}>
          {item[labelProp]}
        </Text>
      </View>
    );
  };

  return (
    <>
      {hidetitle ? null : renderLabel()}
      <View
        style={{
          backgroundColor: '#0000',
          marginBottom: showError ? 5 : 0,
          borderColor: disable ? BaseColors.inactive : BaseColors.inputBorder,
          borderRadius: 5,
          borderWidth: multiSelection ? 0 : 1,
          ...containerSty,
        }}>
        {multiSelection ? (
          <MultiSelect
            statusBarIsTranslucent={true}
            selectedItemIconColor="#ffffff"
            style={[
              styles.dropdown,
              dropDownSty,
              {
                backgroundColor: 'transparent',
                borderBottomColor: disable
                  ? BaseColors.inactive
                  : colors.colors.inputBorder,
                borderBottomWidth: 0.5,
                paddingTop: 10,
              },
            ]}
            placeholderStyle={[
              {
                color: disable
                  ? colors.colors.inactive
                  : colors.colors.textColor,
                fontSize: isTabletDevice ? 18 : 14,
                fontWeight: '500',
              },
            ]}
            selectedTextStyle={[styles.showTextSty]}
            renderRightIcon={renderMultiIcon}
            data={data}
            value={isArray(value) ? value : []}
            itemTextStyle={{color: 'black'}}
            activeColor={colors.colors.whiteSmoke}
            renderItem={(item, sel) => renderMultiItem(item)}
            search={search}
            inputSearchStyle={inputSearchStyle}
            maxHeight={220}
            labelField={labelProp}
            valueField={valueProp}
            placeholder={
              mandatory ? `${placeholderTxt} * ` : `${placeholderTxt}`
            }
            onChange={onChange}
            onChangeValue={e => {}}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            disable={disable}
            selectedStyle={[
              styles.multipleSelectItem,
              {
                backgroundColor: disable
                  ? BaseColors.inactiveIndex
                  : BaseColors.white,
              },
            ]}
          />
        ) : (
          <Dropdown
            statusBarIsTranslucent={true}
            autoScroll={false}
            dropdownPosition="bottom"
            style={[styles.dropdown, dropDownSty]}
            placeholderStyle={[
              styles.showTextSty,
              {
                color: disable ? BaseColors.inactive : '#c2c2c2',
                fontSize: isTabletDevice ? 16 : 14,
              },
            ]}
            selectedTextStyle={[
              styles.showTextSty,
              {
                color: disable ? BaseColors.inactive : colors.colors.textColor,
                fontSize: isTabletDevice ? 16 : 14,
              },
            ]}
            fontFamily={FontFamily.regular}
            renderRightIcon={renderIcon}
            data={data}
            disable={disable}
            renderItem={(item, sel) => renderItem(item, sel, labelProp)}
            search={search}
            maxHeight={200}
            labelField={labelProp}
            valueField={valueProp}
            placeholder={placeholderTxt}
            value={isArray(value) ? '' : value}
            onFocus={() => {
              onClick && onClick();
              setIsFocus(true);
            }}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              onChange(item[valueProp]);
              setIsFocus(false);
            }}
            activeColor={BaseColors.white}
            inputSearchStyle={inputSearchStyle}
            containerStyle={{backgroundColor: colors.colors.white}}
          />
        )}
      </View>
      {showError && errorText && (
        <Text style={styles.errorTxt}>{errorText}</Text>
      )}
    </>
  );
}

DropDownList.propTypes = {
  data: PropTypes.array,
  onChange: PropTypes.func,
  labelProp: PropTypes.string,
  valueProp: PropTypes.string,
  value: PropTypes.string,
  titleText: PropTypes.string,
  placeholderTxt: PropTypes.string,
  rIcon: PropTypes.string,
  dropDownSty: PropTypes.object,
  errorText: PropTypes.string,
  showError: PropTypes.bool,
  multiSelection: PropTypes.bool,
  search: PropTypes.bool,
};

DropDownList.defaultProps = {
  data: [
    {lable: 'name1', value: 12, id: 1},
    {lable: 'name2', value: 34, id: 2},
    {lable: 'name3', value: 56, id: 3},
    {lable: 'name4', value: 78, id: 4},
    {lable: 'name5', value: 90, id: 5},
  ],
  onChange: () => {},
  labelProp: 'lable',
  valueProp: 'value',
  value: '',
  titleText: 'Name',
  placeholderTxt: 'Select Name',
  rIcon: 'dropdown',
  dropDownSty: {},
  errorText: '',
  showError: false,
  search: false,
  multiSelection: false,
};
