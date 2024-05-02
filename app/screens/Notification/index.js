/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Modal,
  Platform,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import CHeader from '../../components/Header';
import {BaseColors} from '../../config/theme';
import {createStyles} from './styles';
import {StatusBar} from 'react-native';
import BaseSetting from '../../config/setting';
import {useIsFocused} from '@react-navigation/native';
import Toast from 'react-native-simple-toast';
import {flattenDeep, isEmpty, isNull} from 'lodash';
import {useEffect} from 'react';
import {getApiData} from '../../utils/apiHelper';
import {Duration, urlParams} from '../../utils/CommonFunc';
import Aicon from 'react-native-vector-icons/AntDesign';
import FastImage from 'react-native-fast-image';
import {Images} from '../../config';
import {useTheme} from '@react-navigation/native';
import {Button} from '../../components';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import TextInput from '../../components/TextInput';
import notifiationAuth from '../../redux/reducers/notification/actions';
import {useDispatch} from 'react-redux';
import DeviceInfo from 'react-native-device-info';

export default function UserManagement({navigation, route}) {
  const isTabletDevice = DeviceInfo.isTablet();

  const IOS = Platform.OS === 'ios';
  const dispatch = useDispatch();
  const {setNotificationCount} = notifiationAuth;
  const colors = useTheme();
  const styles = createStyles(colors);
  const isFocused = useIsFocused();
  const type = route?.params?.type;
  const [notificationList, setNotificationList] = useState([]);
  const [page, setPage] = useState(1);
  const [nextPage, setNextPage] = useState(false);
  const [nextLoading, setNextLoading] = useState(false);
  const [filterData, setFilterData] = useState({});
  const [loader, setLoader] = useState(false);
  const [readDisabled, setReadDisabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [reason, setReason] = useState('');
  const [tripID, setTripID] = useState(false);
  const [filterModal, setFilterModal] = useState(false);
  const [declineBtnLoader, setDeclineBtnLoader] = useState(false);
  const [acceptBtnLoader, setAcceptBtnLoader] = useState(false);

  // this is for get list.....
  const getNotificationList = async (p = page, ty) => {
    setLoader(ty == 'onEndreached' ? false : true);
    const data = {page: p, ...filterData, type: type ? type : 'normal'};
    const string = urlParams(data);
    const url = BaseSetting.endpoints.notificationList + string?._j;
    try {
      const resp = await getApiData(url, 'GET');
      if (resp?.status) {
        let tempPArr = resp?.data;
        if (resp?.pagination?.isAllNormalRead) {
          setReadDisabled(true);
        } else {
          setReadDisabled(false);
        }
        if (p > 1) {
          tempPArr = flattenDeep([notificationList, tempPArr]);
        }
        setPage(Number(resp?.pagination?.currentPage));
        dispatch(setNotificationCount(resp?.pagination));
        setNotificationList(tempPArr);
        if (resp?.pagination?.isMore) {
          setNextPage(true);
        } else {
          setNextPage(false);
        }
        setNextLoading(false);
      } else {
        setNotificationList([]);
        // Toast.show(resp?.message);
      }
      setLoader(false);
    } catch (error) {
      setNotificationList([]);
      setLoader(false);
      Toast.show('somethingWentWrong');
    }
  };
  const onEndReached = () => {
    if (nextPage && !nextLoading) {
      setNextLoading(true);
      const tempPage = page + 1;
      setPage(tempPage);
      getNotificationList(tempPage, 'onEndreached');
    }
  };
  const renderListFooter = () => {
    if (!nextPage) {
      return (
        <Text
          style={{
            width: '100%',
            textAlign: 'center',
            textAlignVertical: 'center',
            height: 20,
          }}>
          {/* No more Data */}
        </Text>
      );
    }
    if (nextLoading) {
      return (
        <ActivityIndicator
          style={{color: colors.colors.primary, height: 60}}
          color={colors.colors.primary}
        />
      );
    }
    return null;
  };
  // End

  // Read Notification....
  const readNotification = async item => {
    const ndata = {
      status: 1,
      id: item?.id,
    };
    const string = urlParams(ndata);
    const url = BaseSetting.endpoints.readNotification + string?._j;
    try {
      const resp = await getApiData(url, 'GET');
      if (resp?.status) {
        getNotificationList(1, 'onEndreached');
      } else {
        Toast.show(resp?.message);
      }
    } catch (error) {
      setNotificationList([]);
      Toast.show('somethingWentWrong');
    }
  };
  // Read Notification....
  const readAllNotification = async () => {
    const url = BaseSetting.endpoints.readAllNotification;
    try {
      const resp = await getApiData(url, 'POST', {}, '', true);
      if (resp?.status) {
        getNotificationList(1);
        setReadDisabled(true);
      } else {
        Toast.show(resp?.message);
      }
    } catch (error) {
      setNotificationList([]);
      Toast.show('somethingWentWrong');
    }
  };

  // Accept or Reject Button...
  const getAcceptionOfTrip = async (tripId, status) => {
    try {
      const nData = {
        trip_id: Number(tripId),
        status,
        reason,
      };
      const url = `trip/insert-status`;
      const res = await getApiData(url, 'POST', nData, '', true);
      if (res.status) {
        setVisible(0);
        setReason('');
        setTripID('');
        getNotificationList(1);
        setDeclineBtnLoader(false);
        setAcceptBtnLoader(false);
        Toast.show(res.message);
      } else {
        Toast.show(res.message);
      }
    } catch (err) {
      Toast.show('Something went wrong.');
    }
  };
  // End

  // Get Decline Voyage Member Request
  const handleSubmit = () => {
    getAcceptionOfTrip(tripID, 0);
    setDeclineBtnLoader(true);
  };

  // Render Item List...
  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        disabled={type === 'critical' || item.is_read !== 0}
        onPress={() => {
          readNotification(item);
        }}
        style={[
          styles.mainView,
          {
            backgroundColor:
              item.is_read !== 0 ? colors.colors.whiteSmoke : '#e6ecf0',
          },
        ]}>
        <View
          style={{
            justifyContent: 'center',
            flexDirection: 'row',
            alignSelf: 'center',
          }}>
          {item.is_read == '0' && (
            <View
              style={{
                ...styles.dotIcon,
                backgroundColor: colors.colors.primary,
              }}
            />
          )}
          <FastImage
            source={
              item?.user_profile_url
                ? {uri: item?.user_profile_url}
                : Images.Profile
            }
            style={{
              width: isTabletDevice ? 45 : 35,
              height: isTabletDevice ? 45 : 35,
              borderRadius: isTabletDevice ? 45 / 2 : 20,
              borderWidth: 1,
              borderColor: BaseColors.inactive,
              backgroundColor: BaseColors.inactive,
            }}
          />
        </View>
        <View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              paddingHorizontal: 10,
              justifyContent: 'space-between',
              width: isTabletDevice
                ? Dimensions.get('screen').width / 1.23
                : Dimensions.get('screen').width / 1.32,
            }}>
            <View
              style={{
                flexDirection: 'row',
              }}>
              <View>
                <Text
                  style={{
                    color:
                      item.is_read !== 0
                        ? colors.colors.textColor
                        : BaseColors.textColor,
                    fontSize: isTabletDevice ? 17 : 14,
                    fontWeight: 'bold',
                  }}>
                  {item.user}
                </Text>
              </View>
            </View>

            <View
              style={{
                flex: 1,
                justifyContent: 'flex-end',
              }}>
              <Text
                style={{
                  color: colors.colors.primary,
                  textAlign: 'right',
                  fontSize: isTabletDevice ? 14 : 10,
                }}>
                {Duration(item.created_at)}
              </Text>
            </View>
          </View>
          <View
            style={{
              paddingLeft: 10,
            }}>
            <Text
              style={{
                width: Dimensions.get('window').width / 1.41,
                color:
                  item.is_read !== 0
                    ? colors.colors.msgColor
                    : BaseColors.msgColor,
                fontSize: isTabletDevice ? 15 : 12,
              }}>
              {item?.message}
            </Text>
          </View>
          <View
            style={{flexDirection: 'row', marginTop: 5, paddingHorizontal: 10}}>
            {item.type === 'trip_assigned' &&
              (item.trip_status === 2 || isNull(item.trip_status) ? (
                <>
                  <TouchableOpacity
                    type="primary"
                    activeOpacity={0.8}
                    onPress={() => {
                      getAcceptionOfTrip(item?.data, 1);
                      setAcceptBtnLoader(true);
                    }}
                    style={[
                      styles.btnContainer,
                      {
                        backgroundColor: colors.colors.primary,
                        borderColor: BaseColors.primary,
                        marginRight: 5,
                      },
                    ]}>
                    {acceptBtnLoader ? (
                      <ActivityIndicator
                        size="small"
                        color={BaseColors.white}
                      />
                    ) : (
                      <Text
                        style={{
                          textAlign: 'center',
                          color: BaseColors.white,
                        }}>
                        Accept
                      </Text>
                    )}
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    type="primary"
                    onPress={() => {
                      setVisible(true);
                      setTripID(item?.data);
                    }}
                    style={styles.btnContainer}>
                    <Text
                      style={{textAlign: 'center', color: BaseColors.white}}>
                      Decline
                    </Text>
                  </TouchableOpacity>
                </>
              ) : item.type === 'trip_assigned' && item.trip_status === 3 ? (
                <TouchableOpacity
                  activeOpacity={0.8}
                  type="primary"
                  onPress={() => {}}
                  style={[
                    styles.btnContainer,
                    {
                      backgroundColor: '#f69697',
                      borderColor: '#f69697',
                    },
                  ]}>
                  <Text
                    style={{
                      textAlign: 'center',
                      color: BaseColors.white,
                    }}>
                    Canceled
                  </Text>
                </TouchableOpacity>
              ) : item.type === 'trip_assigned' && !isNull(item.trip_status) ? (
                <View
                  style={{
                    backgroundColor:
                      item.trip_status == 1 ? '#408F3D' : '#BD1616',
                    paddingHorizontal: 5,
                    paddingVertical: 3,
                  }}>
                  <Text
                    style={{
                      color: BaseColors.white,
                    }}>
                    {item.trip_status == 1 ? 'Accepted' : 'Declined'}
                  </Text>
                </View>
              ) : null)}
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  // End

  useEffect(() => {
    getNotificationList(1);
  }, [isFocused, filterData]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.colors.white,
      }}>
      <CHeader
        title={
           'Notification'
        }
        leftIcon={type === 'critical' ? 'Back' : 'drawer'}
        leftIconSty={{fontSize: 22, color: colors.colors.black}}
        rText={'Read All'}
        notification
        defaultRtxtSty={{
          width: isTabletDevice ? '15%' : '20%',
          borderWidth: 1,
          borderColor: BaseColors.inactive,
          borderRadius: 3,
        }}
        rtxtsty={{
          alignSelf: 'center',
          color: readDisabled ? BaseColors.inactive : colors.colors.primary,
          fontSize: 15,
          paddingVertical: isTabletDevice ? 7 : 3,
        }}
        rTextClick={() => readAllNotification()}
        onFilterPress={() => setFilterModal(true)}
        rTextDisabled={readDisabled}
        onLeftPress={() =>
          type === 'critical' ? navigation.goBack() : navigation.toggleDrawer()
        }
      />
      <View style={{marginHorizontal: 15, flex: 1}}>
        <StatusBar
          translucent
          barStyle="dark-content"
          backgroundColor={BaseColors.transparent}
        />
        {loader ? (
          <ActivityIndicator
            color={colors.colors.primary}
            size={IOS ? 'small' : 'large'}
            style={{
              flex: 1,
              justifyContent: 'center',
              alignSelf: 'center',
            }}
          />
        ) : isEmpty(notificationList) ? (
          <View style={styles.emptydata}>
            <Aicon
              name="folder1"
              size={isTabletDevice ? 80 : 60}
              color={BaseColors.secondary}
            />
            <Text style={styles.cleardatatxt}>No Data</Text>
          </View>
        ) : (
          <FlatList
            data={notificationList}
            showsVerticalScrollIndicator={false}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            onEndReached={onEndReached}
            onendreachedthreshold={0.2}
            ListFooterComponent={renderListFooter}
            refreshControl={
              <RefreshControl
                colors={[colors.colors.primary]}
                refreshing={loader}
                tintColor={colors.colors.primary}
                onRefresh={() => {
                  getNotificationList(1);
                }}
              />
            }
            style={{marginBottom: 5}}
          />
        )}
      </View>
      {/* Declined Reason */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        close={() => {
          setVisible(!visible);
        }}
        onRequestClose={() => {
          setVisible(!visible);
        }}>
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
                paddingHorizontal: 20,
                // height: 'auto',
                backgroundColor: colors.colors.modalHeaderColor,
                width: isTabletDevice
                  ? Dimensions.get('screen').width / 1.05
                  : '90%',
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
                      color: colors.colors.modalheaderTitle,
                      fontWeight: '500',
                    }}>
                    {'Voyage Confirmation'}
                  </Text>
                </View>
              </View>
              <>
                <View style={styles.marBtm15}>
                  <Text
                    style={{
                      paddingVertical: 5,
                      color: colors.colors.textColor,
                      fontSize: isTabletDevice ? 18 : 14,
                      fontWeight: '500',
                      paddingBottom: 10,
                    }}>
                    Are you sure, you want to Decline a voyage?
                  </Text>
                  <TextInput
                    textArea
                    mandatory
                    title={'Reason'}
                    placeholderText={'Please Enter Reason'}
                    value={reason}
                    onChange={value => {
                      setReason(value);
                    }}
                  />
                </View>
                <View style={[styles.marBtm15, {flexDirection: 'row'}]}>
                  <Button
                    loading={declineBtnLoader}
                    disabled={!reason}
                    style={{
                      marginRight: 10,
                      width: isTabletDevice
                        ? Dimensions.get('window').width / 9
                        : Dimensions.get('window').width / 6,
                    }}
                    onBtnClick={() => handleSubmit()}>
                    {'Yes'}
                  </Button>
                  <Button
                    type="outlined"
                    onBtnClick={() => setVisible(!visible)}>
                    {'Cancel'}
                  </Button>
                </View>
              </>
            </KeyboardAwareScrollView>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
      {/* End */}
    </View>
  );
}
