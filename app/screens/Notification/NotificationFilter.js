import React, {useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {Button} from '../../components';
import {createStyles} from './styles';
import {useEffect} from 'react';
import DropDownList from '../../components/DropDownList';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useTheme} from '@react-navigation/native';
import {translate} from '../../lang/Translate';
import DeviceInfo from 'react-native-device-info';
import TextInput from '../../components/TextInput';

export default function NotificationFilter(props) {
  const isTabletDevice = DeviceInfo.isTablet();
  const colors = useTheme();
  const styles = createStyles(colors);
  const {setVisible, visible, submitFilter, selectedFilter} = props;
  const [search, setSearch] = useState(selectedFilter?.name || '');
  const [selectSort, setSelectSort] = useState(selectedFilter?.sort || '');
  const StatusArr = [
    {value: 'ASC', label: 'Ascending'},
    {value: 'DESC', label: 'Descending'},
  ];

  useEffect(() => {}, []);

  const clearAll = () => {
    setSearch('');
    setSelectSort('');
    submitFilter({
      name: '',
      sort: '',
    });
  };

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => setVisible(!visible)}
      style={styles.mainModalView}>
      <TouchableOpacity
        onPress={() => {
          null;
        }}
        activeOpacity={1}
        style={[
          styles.background,
          {
            paddingHorizontal: 30,
            height: 'auto',
            backgroundColor: colors.colors.white,
            width: isTabletDevice ? '94%' : '90%',
          },
        ]}>
        <KeyboardAwareScrollView
          bounces={false}
          contentContainerStyle={{
            flexGrow: 1,
          }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          enableOnAndroid={false}>
          <View style={styles.titleView}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: isTabletDevice ? 22 : 18,
                  color: colors.colors.primary,
                  fontWeight: '500',
                }}>
                {translate('commonFilter')}
              </Text>
            </View>
          </View>
          <>
            <View style={styles.marBtm15}>
              <TextInput
                title={'Search'}
                placeholderText={'Please Enter Reason'}
                value={search}
                onChange={value => {
                  setSearch(value);
                }}
              />
            </View>
            <View style={styles.marBtm15}>
              <DropDownList
                titleText={translate('Sort By')}
                placeholderTxt={translate('Sort By')}
                value={selectSort}
                valueProp="value"
                labelProp="label"
                onChange={value => {
                  setSelectSort(value);
                }}
                data={StatusArr}
              />
            </View>
            <View style={[styles.marBtm15, {flexDirection: 'row'}]}>
              <Button
                style={{marginRight: 10}}
                txtSty={{fontSize: 16}}
                onBtnClick={() => {
                  submitFilter({
                    name: search,
                    sort: selectSort,
                  });
                  setVisible(!visible);
                }}>
                {translate('applybutton')}
              </Button>
              <Button
                type="outlined"
                style={{}}
                onBtnClick={() => clearAll()}
                txtSty={{fontSize: 16}}>
                {translate('ClearAllBtn')}
              </Button>
            </View>
          </>
        </KeyboardAwareScrollView>
      </TouchableOpacity>
    </TouchableOpacity>
  );
}
