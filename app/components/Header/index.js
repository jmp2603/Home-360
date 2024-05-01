import React, {useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  StatusBar,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {BaseColors, FontFamily} from '../../config/theme';
import {CustomIcon} from '../../config/LoadIcons';
import AIcon from 'react-native-vector-icons/AntDesign';
import FastImage from 'react-native-fast-image';
import UserAvatar from 'react-native-user-avatar';
import {useDispatch, useSelector} from 'react-redux';
import {useTheme} from '@react-navigation/native';
import {Images} from '../../config';
import NetInfo from '@react-native-community/netinfo';
import DeviceInfo from 'react-native-device-info';
import Iicon from 'react-native-vector-icons/Feather';
import {isEmpty, isObject, size} from 'lodash';
import offlineAuth from '../../redux/reducers/offline/actions';
import {getApiData} from '../../utils/apiHelper';
import {MMKV} from 'react-native-mmkv';
import {getOnlineReduxSync, urlParams} from '../../utils/CommonFunc';
import BaseSetting from '../../config/setting';
import Popover, {PopoverPlacement} from 'react-native-popover-view';

const mmkv = new MMKV();

const isTabletDevice = DeviceInfo.isTablet();

const IOS = Platform.OS === 'ios';
const isProMax = getStatusBarHeight(true);
const {setIsOnline, setActionSyncData, setIsSyncData} = offlineAuth;
const styles = StyleSheet.create({
  mainCon: {
    width: '100%',
    // height: getStatusBarHeight() + 50,
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: isTabletDevice
      ? getStatusBarHeight() + 20
      : IOS && isProMax <= 20
      ? getStatusBarHeight() + 40
      : IOS
      ? getStatusBarHeight() + 10
      : getStatusBarHeight() + 20,
    // paddingTop: IOS ? getStatusBarHeight() : 0,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  titleCon: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleTxt: {
    textAlign: 'center',
    fontSize: isTabletDevice ? 22 : 18,
    // textTransform: 'capitalize',
    // fontFamily: 'Poppins',
    fontWeight: '600',
  },
  defaultIconSty: {
    fontSize: isTabletDevice ? 30 : 22,
  },
  rTxt: {
    color: BaseColors.textColor,
    fontSize: 16,
  },
  defaultLesticonSty: {
    fontSize: 20,
    // color: "#464E5F",
  },
  defaultRightTextSty: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    width: 50,
  },
});

/**
 *Header component
 * @function CHeader
 *
 */
export default function CHeader(props) {
  const {
    dark,
    barColor,
    onHeaderPress,
    ContainerSty,
    title,
    titleSty,
    leftIcon,
    leftIconSty,
    onLeftPress,
    rText,
    rTextClick,
    rightFilter,
    rightIcon,
    rightIconSty,
    onRightPress,
    Rsize,
    defaultRtxtSty,
    rtxtsty,
    rightdashboardicon,
    onimageclick,
    disabled,
    rTextDisabled = false,
    notification,
    onFilterPress,
  } = props;
  const headerRef = useRef(null);
  const {userData, skipOffline} = useSelector(state => state.auth);
  const {isOnline, actionSyncData, isSyncedData} = useSelector(
    state => state.offline,
  );
  const colors = useTheme();
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      if (isOnline !== state.isConnected)
        dispatch(setIsOnline(state.isConnected));
    });
    return () => {
      unsubscribe();
    };
  }, [isOnline]);
  const {notificationCount} = useSelector(state => state.notification);
  const isAuthenticated =
    isObject(userData) && userData.is_authenticated_admin
      ? userData.is_authenticated_admin
      : 0;
  const offlineData =
    mmkv.contains('offlineData') && !skipOffline
      ? JSON.parse(mmkv.getString('offlineData'))
      : [];
  const [showPopover, setShowPopover] = useState(false);

  // Change Trip id of offline Data..
  const changedOfflineTripData = async (old_id, id) => {
    const nData = [...offlineData];
    const moduleIndex = nData.findIndex(li => li.role === 'trips'); // Module Index
    const childIndex = nData[moduleIndex].moduleResult.findIndex(
      ex => ex.name === 'schedule_trip',
    );
    const tripDetailIndex = nData[moduleIndex].moduleResult.findIndex(
      ex => ex.name === 'all_trip_details',
    );
    const tripList = nData[moduleIndex].moduleResult[childIndex].data.data;
    const tripDetails =
      nData[moduleIndex].moduleResult[tripDetailIndex].data.data;
    const index = tripList.findIndex(ex => ex.id === old_id);
    if (index > -1) {
      tripList[index].id = id;
      tripDetails[index].id = id;
    }
    nData[moduleIndex].moduleResult[childIndex].data.data = tripList;
    nData[moduleIndex].moduleResult[tripDetailIndex].data.data = tripDetails;
    mmkv.set('offlineData', JSON.stringify(nData));
  };

  // Sync Offline data of Trip Create and Edit.
  const syncOfflineData = async (id, type, array) => {
    const sampleArr = getOnlineReduxSync('trips', 'schedule_trip');
    const trips = sampleArr.filter(ex => ex.id === id);
    const userDetail = getOnlineReduxSync('users', 'userdetail');
    if (size(trips) > 0) {
      const tripDetail = trips[0];
      const editData = {
        company_id: userDetail?.user?.company_id,
        user_id: userDetail?.user?.id,
        trip_json: tripDetail?.trip_json,
        id: id,
        status: tripDetail?.status,
      };
      const createDta = {
        company_id: userDetail?.user?.company_id,
        user_id: userDetail?.user?.id,
        trip_json: tripDetail?.trip_json,
        id: 0,
        status: tripDetail?.status,
      };
      const nData = type === 'create' ? createDta : editData;
      const url = 'trip/offline-trip-synchronization';
      const res = await getApiData(url, 'POST', nData, '', true);
      if (res.status) {
        changedOfflineTripData(id, Number(res?.data));
        const index = array.findIndex(li => li === id);
        array.splice(index, 1);
        dispatch(setActionSyncData(actionSyncData, array));
        dispatch(setIsSyncData(false));
      }
    }
  };
  // End

  // Sync Delete Trip Offline..
  const syncDeleteTripOffline = async (id, array) => {
    const userDetail = getOnlineReduxSync('users', 'userdetail');
    if (id) {
      const deleteData = {
        company_id: userDetail?.user?.company_id,
        trip_id: id,
      };
      const string = urlParams(deleteData);
      const url = BaseSetting.endpoints.offlineTripDelete + string?._j;
      const res = await getApiData(url, 'GET');
      if (res.status) {
        const index = array.findIndex(li => li === id);
        array.splice(index, 1);
        dispatch(setActionSyncData(actionSyncData, array));
        dispatch(setIsSyncData(false));
      }
    }
  };
  // End

  // Manage Sync Ids in Offline Trip..
  const syncOfflineTrip = async () => {
    const filterData =
      actionSyncData && actionSyncData.filter(li => li.key === 'trips');
    const createIds = filterData && filterData[0].create;
    const edtIds = filterData && filterData[0].edit;
    const deleteIds = filterData && filterData[0].delete;
    (await createIds) &&
      createIds.map(li => syncOfflineData(li, 'create', createIds));
    (await edtIds) && edtIds.map(li => syncOfflineData(li, 'edit', edtIds));
    (await deleteIds) &&
      deleteIds.map(li => syncDeleteTripOffline(li, deleteIds));
  };
  // End

  // Sync Complete Voyage reporting / Audit and Inspection..
  const syncCompleteVoyage = async (old_id, id, category, array) => {
    let sampleArr = [];
    if (category === 'voyage_reporting') {
      sampleArr = getOnlineReduxSync(
        'voyage_reporting',
        'voyage_reporting_list',
      );
    } else if (category === 'audit') {
      sampleArr = getOnlineReduxSync('vessels_management', 'audit_report');
    } else {
      sampleArr = getOnlineReduxSync('vessels_management', 'inspection_report');
    }
    const voyage = sampleArr.filter(ex =>
      category === 'voyage_reporting'
        ? ex.vessel_trip_form_id === old_id
        : ex.audit_id === old_id,
    );
    const userDetail = getOnlineReduxSync('users', 'userdetail');
    if (id) {
      const voyageList = voyage[0];
      const deleteData = {
        user_id: userDetail?.user?.id,
        id: id,
        type: category,
        allocated_form_id: voyageList?.allocatedForm_id,
        lattitude: '',
        longitude: '',
        trip_id: voyageList?.trip_id || '',
      };
      const string = urlParams(deleteData);
      const url = BaseSetting.endpoints.offlineChangeStatus + string?._j;
      const res = await getApiData(url, 'GET');
      if (res?.status) {
        const arrayIndex = array.findIndex(li => li.old_id === old_id);
        array.splice(arrayIndex, 1);
        dispatch(setActionSyncData(actionSyncData, array));
        dispatch(setIsSyncData(false));
      }
    } else {
    }
  };

  // Sync Create and Update Voyage reporting..
  const syncEditCreateVoyage = async (id, type, array, category) => {
    const sampleArr = getOnlineReduxSync(
      'voyage_reporting',
      'voyage_reporting_list',
    );
    const voyage = sampleArr.filter(ex => ex.vessel_trip_form_id === id);
    const userDetail = getOnlineReduxSync('users', 'userdetail');
    const filterData =
      actionSyncData &&
      actionSyncData.filter(li => li.key === 'voyage_reporting');
    const completedID = filterData && filterData[0].completed;
    if (size(voyage) > 0) {
      const voyageList = voyage[0];
      const nData = {
        company_id: userDetail?.user?.company_id,
        user_id: userDetail?.user?.id,
        'VesselTripForms[json]': voyageList?.voyage_reporting_json,
        'VesselTripForms[formId]': voyageList?.allocatedForm_id,
        'VesselTripForms[latitude]': '',
        'VesselTripForms[longitude]': '',
        'VesselTripForms[trip_id]': voyageList?.trip_id || '',
      };
      if (type === 'edit') {
        nData[`VesselTripForms[id]`] = id;
      }
      const url =
        type === 'create'
          ? 'trip/offline-voyage-reporting-submit'
          : 'trip/offline-voyage-reporting-update';
      const res = await getApiData(url, 'POST', nData, {}, true);
      if (res?.status) {
        const newIds =
          completedID && completedID.filter(li => li.old_id === id);
        let nObj = {};
        if (newIds) {
          nObj = {
            new_id: res?.data?.id,
            old_id: id,
          };
        }
        const index =
          completedID && completedID.findIndex(li => li.old_id === id);
        if (index > -1) {
          completedID[index] = nObj;
        }
        completedID &&
          completedID.map(li =>
            syncCompleteVoyage(li.old_id, li.new_id, category, completedID),
          );
        const arrayIndex = array.findIndex(li => li === id);
        array.splice(arrayIndex, 1);
        dispatch(setActionSyncData(actionSyncData, array));
        dispatch(setIsSyncData(false));
      }
    }
  };

  // Sync Offlline Delete Voyage ..
  const syncDeleteVoyageOffline = async (id, array) => {
    if (id) {
      const deleteData = {
        // company_id: userDetail?.user?.company_id,
        formId: id,
      };
      const string = urlParams(deleteData);
      const url = BaseSetting.endpoints.deleteVoyage + string?._j;
      const res = await getApiData(url, 'GET');
      if (res?.status) {
        const index = array.findIndex(li => li === id);
        array.splice(index, 1);
        dispatch(setActionSyncData(actionSyncData, array));
        dispatch(setIsSyncData(false));
      }
    }
  };

  // Manage Ids of Voyage reporting in vopyage forms..
  const syncOfflineVoyage = async () => {
    const filterData =
      actionSyncData &&
      actionSyncData.filter(li => li.key === 'voyage_reporting');
    const createIds = filterData && filterData[0].create;
    const edtIds = filterData && filterData[0].edit;
    const deleteIds = filterData && filterData[0].delete;
    const completedIds = filterData && filterData[0].completed;
    (await createIds) &&
      createIds.map(li =>
        syncEditCreateVoyage(li, 'create', createIds, 'voyage_reporting'),
      );
    (await edtIds) &&
      edtIds.map(li =>
        syncEditCreateVoyage(li, 'edit', edtIds, 'voyage_reporting'),
      );
    (await completedIds) &&
      (await completedIds) &&
      completedIds.map(li =>
        syncCompleteVoyage(
          li.old_id,
          li.old_id,
          'voyage_reporting',
          completedIds,
        ),
      );
    (await deleteIds) &&
      deleteIds.map(li => syncDeleteVoyageOffline(li, deleteIds));
  };
  // Change Trip id of offline Data..
  const chnageOfflineAuditInspect = async (old_id, id, category) => {
    let auditInspect = [];
    if (category === 'audit') {
      auditInspect = getOnlineReduxSync('vessels_management', 'audit_report');
    } else {
      auditInspect = getOnlineReduxSync(
        'vessels_management',
        'inspection_report',
      );
    }
    const index = auditInspect.findIndex(ex => ex.id === old_id);
    if (index > -1) {
      auditInspect[index].audit_id = id;
    }
  };

  // Sync Create and Update Audit Inspect..
  const syncEditCreateAuditInspect = async (id, type, category, array) => {
    let sampleArr = [];
    if (category === 'audit') {
      sampleArr = getOnlineReduxSync('vessels_management', 'audit_report');
    } else {
      sampleArr = getOnlineReduxSync('vessels_management', 'inspection_report');
    }
    const auidtInspect = sampleArr.filter(ex => ex.audit_id === id);
    const userDetail = getOnlineReduxSync('users', 'userdetail');
    let completedID = [];
    if (category === 'audit') {
      const filterData =
        actionSyncData &&
        actionSyncData.filter(li => li.key === 'audit_schedule_list');
      completedID = filterData && filterData[0].completed;
    } else {
      const filterData =
        actionSyncData &&
        actionSyncData.filter(li => li.key === 'inspection_schedule_list');
      completedID = filterData && filterData[0].completed;
    }
    if (size(auidtInspect) > 0) {
      const voyageList = auidtInspect[0];

      const nData = {
        company_id: userDetail?.user?.company_id,
        user_id: userDetail?.user?.id,
        vessel_id: voyageList?.vessel_id,
        allocated_form_id: voyageList?.allocatedForm_id,
        json: voyageList?.json,
        custom_form_id: voyageList?.custom_form_id,
        audit_detail_id: type === 'create' ? 0 : voyageList?.audit_id,
        deficiency_list: JSON.stringify(voyageList?.deficiency_list),
      };

      const url = 'vessels/offline-audit-update';
      const res = await getApiData(url, 'POST', nData, {}, true);
      const newIds = completedID && completedID.filter(li => li.old_id === id);
      let nObj = {};
      if (newIds) {
        nObj = {
          new_id: res?.data?.id,
          old_id: id,
        };
      }
      const index =
        completedID && completedID.findIndex(li => li.old_id === id);
      if (index > -1) {
        completedID[index] = nObj;
      }
      completedID &&
        completedID.map(li =>
          syncCompleteVoyage(li.old_id, li.new_id, category, completedID),
        );
      if (res?.status) {
        const index = array.findIndex(li => li === id);
        array.splice(index, 1);
        chnageOfflineAuditInspect(id, res?.data?.id, category);
        dispatch(setActionSyncData(actionSyncData, array));
        dispatch(setIsSyncData(false));
      }
    }
  };

  // Sync Offlline Delete AuditInspect ..
  const syncDeleteAuditInspectOffline = async (id, array) => {
    if (id) {
      const deleteData = {
        id: id,
      };
      const string = urlParams(deleteData);
      const url = BaseSetting.endpoints.deleteDrill + string?._j;
      const res = await getApiData(url, 'GET');
      if (res?.status) {
        const index = array.findIndex(li => li === id);
        array.splice(index, 1);
        dispatch(setActionSyncData(actionSyncData, array));
        dispatch(setIsSyncData(false));
      }
    } else {
    }
  };

  // Manage Ids of Audit / Inspect in vopyage forms..
  const syncOfflineAudit = async () => {
    const filterData =
      actionSyncData &&
      actionSyncData.filter(li => li.key === 'audit_schedule_list');
    const createIds = filterData && filterData[0].create;
    const edtIds = filterData && filterData[0].edit;
    const deleteIds = filterData && filterData[0].delete;
    const completedIds = filterData && filterData[0].completed;
    (await createIds) &&
      createIds.map(li =>
        syncEditCreateAuditInspect(li, 'create', 'audit', createIds),
      );
    (await edtIds) &&
      edtIds.map(li => syncEditCreateAuditInspect(li, 'edit', 'audit', edtIds));
    (await completedIds) &&
      (await completedIds) &&
      completedIds.map(li =>
        syncCompleteVoyage(li.old_id, li.new_id, 'audit', completedIds),
      );
    (await deleteIds) &&
      deleteIds.map(li => syncDeleteAuditInspectOffline(li, deleteIds));
  };

  // Manage Ids of Audit / Inspect in vopyage forms..
  const syncOfflineInspection = async () => {
    const filterData =
      actionSyncData &&
      actionSyncData.filter(li => li.key === 'inspection_schedule_list');
    const createIds = filterData && filterData[0].create;
    const edtIds = filterData && filterData[0].edit;
    const deleteIds = filterData && filterData[0].delete;
    const completedIds = filterData && filterData[0].completed;
    (await createIds) &&
      createIds.map(li =>
        syncEditCreateAuditInspect(li, 'create', 'inspection', createIds),
      );
    (await edtIds) &&
      edtIds.map(li =>
        syncEditCreateAuditInspect(li, 'edit', 'inspection', edtIds),
      );
    (await completedIds) &&
      (await completedIds) &&
      completedIds.map(li =>
        syncCompleteVoyage(li.old_id, li.new_id, 'inspection', completedIds),
      );
    (await deleteIds) &&
      deleteIds.map(li => syncDeleteAuditInspectOffline(li, deleteIds));
    dispatch(setIsSyncData(false));
  };

  useEffect(() => {
    if (isOnline && !isEmpty(actionSyncData)) {
      setTimeout(async () => {
        dispatch(setIsSyncData(true));
        syncOfflineTrip();
        syncOfflineVoyage();
        syncOfflineAudit();
        syncOfflineInspection();
      }, 10000);
    }
  }, [isOnline]);

  return (
    <>
      <View
        style={[
          styles.mainCon,
          {
            backgroundColor: colors.colors.white,
          },
          ContainerSty,
        ]}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor={BaseColors.transparent}
          translucent
        />
        {leftIcon ? (
          <TouchableOpacity
            disabled={disabled}
            activeOpacity={0.5}
            onPress={onLeftPress}
            style={[
              styles.defaultLesticonSty,
              {
                alignItems: 'flex-start',
                justifyContent: 'center',
                width: isTabletDevice ? 65 : 50,
              },
            ]}>
            <CustomIcon
              name={leftIcon}
              style={[
                styles.defaultIconSty,
                {
                  fontWeight: '600',
                  color: colors.colors.textColor,
                },
                leftIconSty,
              ]}
            />
          </TouchableOpacity>
        ) : (
          <View style={{width: 50}} />
        )}

        <TouchableOpacity
          ref={headerRef}
          activeOpacity={0.7}
          onPress={() => {
            setShowPopover(true);
            if (skipOffline) {
              mmkv.clearAll();
            }
          }}
          style={{
            width: 12,
            height: 12,
            borderRadius: 20,
            backgroundColor: isOnline ? '#00bc00' : '#ff0000',
          }}
        />

        <Popover
          from={headerRef}
          statusBarTranslucent={true}
          popoverStyle={{width: 100}} // Adjust as needed
          isVisible={showPopover}
          placement={PopoverPlacement.BOTTOM}
          onRequestClose={() => setShowPopover(false)}>
          {isOnline ? (
            <View
              style={{
                alignSelf: 'center',
                paddingVertical: 5,
              }}>
              <Text
                style={{
                  color: '#00bc00',
                  fontSize: 16,
                  fontWeight: '700',
                }}>
                ONLINE
              </Text>
              {!isEmpty(offlineData) ? (
                <Text
                  style={{
                    color: '#00bc00',
                    fontSize: 12,
                    fontWeight: '500',
                  }}>
                  Offline Ready
                </Text>
              ) : (
                <Text
                  style={{
                    color: '#ff0000',
                    fontSize: 12,
                    fontWeight: '500',
                  }}>
                  Offline Not Ready
                </Text>
              )}
            </View>
          ) : (
            <View
              style={{
                alignSelf: 'center',
                paddingVertical: 5,
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  color: '#ff0000',
                  fontSize: 16,
                  fontWeight: '700',
                }}>
                OFFLINE
              </Text>
            </View>
          )}
        </Popover>
        {title ? (
          <TouchableOpacity
            activeOpacity={1}
            onPress={null}
            style={[
              styles.titleCon,
              {
                paddingLeft:
                  notification &&
                  isTabletDevice &&
                  Dimensions.get('window').width / 8,
              },
            ]}>
            <Text
              numberOfLines={1}
              onPress={onHeaderPress}
              style={[
                styles.titleTxt,
                titleSty,
                {color: colors.colors.textColor}, // fontFamily: 'Poppins'}
              ]}>
              {title}
            </Text>
          </TouchableOpacity>
        ) : null}

        {rightIcon ? (
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={onRightPress}
            style={[
              {
                alignItems: 'flex-end',
                justifyContent: 'center',
                width: 50,
              },
            ]}>
            <CustomIcon
              name={rightIcon}
              size={Rsize}
              // color={colors.colors.textColor}
              style={[
                styles.defaultIconSty,
                {color: colors.colors.primary},
                rightIconSty,
              ]}
            />
          </TouchableOpacity>
        ) : rText ? (
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={rTextClick}
            disabled={rTextDisabled}
            style={[styles.defaultRightTextSty, defaultRtxtSty]}>
            <Text style={[styles.rTxt, rtxtsty]}>{rText}</Text>
          </TouchableOpacity>
        ) : rightdashboardicon ? (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              width: 50,
              // backgroundColor: "pink",
              // paddingRight: 20,
            }}>
            <View>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={onRightPress}
                style={[
                  {
                    alignItems: 'flex-end',
                    justifyContent: 'center',
                    // width: 50,
                    paddingRight: 20,
                  },
                ]}>
                {notificationCount?.criticalCount > 0 && (
                  <View
                    style={{
                      zIndex: 1,
                      position: 'relative',
                      top: 30,
                      left: -1,
                    }}>
                    <View
                      style={{
                        flex: 1,
                        backgroundColor: BaseColors.red,
                        position: 'absolute',
                        bottom: 15,
                        borderRadius: 30,
                        justifyContent: 'center',
                        alignSelf: 'center',
                        height: 18,
                        width: 18,
                      }}>
                      <Text
                        style={{
                          color: BaseColors.white,
                          fontSize: 10,
                          justifyContent: 'center',
                          alignSelf: 'center',
                        }}>
                        {notificationCount?.criticalCount > 100
                          ? '99+'
                          : notificationCount?.criticalCount}
                      </Text>
                    </View>
                  </View>
                )}
                <AIcon
                  name="warning"
                  style={[
                    styles.defaultIconSty,
                    {color: dark ? BaseColors.white : BaseColors.red},
                    rightIconSty,
                  ]}
                  size={Rsize}
                />
              </TouchableOpacity>
            </View>
            <View
              style={[
                {
                  alignItems: 'flex-end',
                  justifyContent: 'center',
                  // width: 50,
                  paddingRight: 26.5,
                },
              ]}>
              <TouchableOpacity
                activeOpacity={1}
                onPress={onimageclick}
                style={{width: 30, height: 30, borderRadius: 15}}>
                {userData?.user_profile_url ? (
                  <FastImage
                    source={
                      userData?.user_profile_url
                        ? {uri: userData?.user_profile_url}
                        : Images.Profile
                    }
                    style={{width: '100%', height: '100%', borderRadius: 15}}
                    resizeMode="contain"
                  />
                ) : (
                  <UserAvatar
                    style={{width: '100%', height: '100%', borderRadius: 15}}
                    name={`${userData.first_name} ${userData.last_name}`}
                  />
                )}
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={{width: 50}} />
        )}
        {notification ? (
          <CustomIcon
            name={'filter'}
            onPress={onFilterPress}
            style={[
              styles.defaultIconSty,
              {color: colors.colors.primary, paddingLeft: 10},
            ]}
          />
        ) : null}
      </View>
      {isSyncedData ? (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            backgroundColor: BaseColors.primary,
            paddingVertical: 5,
          }}>
          <ActivityIndicator
            color={BaseColors.white}
            size={'small'}
            style={{paddingHorizontal: 5}}
          />
          <Text style={{fontSize: 14, color: 'white'}}>Sync Data</Text>
        </View>
      ) : null}
      {userData && !isAuthenticated ? (
        <View
          style={{
            backgroundColor: '#fffbe6',
            padding: 10,
            margin: 10,
            borderWidth: 1,
            borderColor: '#faad13',
          }}>
          <View style={{flexDirection: 'row', marginBottom: 5}}>
            <Iicon name="alert-circle" size={25} color={'#faad13'} />
            <Text style={{marginTop: 5, marginHorizontal: 10, color: '#000'}}>
              Note
            </Text>
          </View>
          <View>
            <Text style={{color: BaseColors.textColor}}>
              Your account is currently in the verification stage. Once your
              account has been verified, you can access the Application. we will
              notify you via Email once your account is verified.
            </Text>
          </View>
        </View>
      ) : null}
    </>
  );
}

CHeader.propTypes = {
  title: PropTypes.string,
  rText: PropTypes.string,
  dark: PropTypes.bool,
  barColor: PropTypes.string,
  onHeaderPress: PropTypes.func,
  leftIcon: PropTypes.string,
  onLefttPress: PropTypes.func,
  rightIcon: PropTypes.string,
  onRightPress: PropTypes.func,
  onFilterPress: PropTypes.func,
};

CHeader.defaultProps = {
  title: ' ',
  rText: '',
  dark: false,
  barColor: BaseColors.primary,
  onHeaderPress: () => {},
  leftIcon: '',
  onLefttPress: () => {},
  rightIcon: '',
  onRightPress: () => {},
  onFilterPress: () => {},
};
