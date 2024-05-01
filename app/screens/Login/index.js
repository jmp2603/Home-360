/* eslint-disable handle-callback-err */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState, useRef} from 'react';
import {Button} from '../../components';
import TextInput from '../../components/TextInput';
import {Images} from '../../config';
import {BaseColors} from '../../config/theme';
import {
  Keyboard,
  Platform,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  BackHandler,
  Dimensions,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import styles from './styles';
import BackgroundImage from '../../components/BackgroundImage';
import AIcon from 'react-native-vector-icons/AntDesign';
import FIcon from 'react-native-vector-icons/Feather';
import Toast from 'react-native-simple-toast';
import {getApiData} from '../../utils/apiHelper';
import BaseSetting from '../../config/setting';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {CustomIcon} from '../../config/LoadIcons';
import AuthAuthentication from '../../redux/reducers/auth/actions';
import {useDispatch, useSelector} from 'react-redux';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {isEmpty} from 'lodash';
import {translate} from '../../lang/Translate';
import DeviceInfo from 'react-native-device-info';

const IOS = Platform.OS === 'ios';
const {
  setUserData,
  setAccessToken,
  setUserPermission,
  setSubscriptionArr,
  setIsDemo,
  setLoginTime,
} = AuthAuthentication;
export default function Login({navigation}) {
  let backPressed = 0;
  const emailRef = useRef();
  const passwordRef = useRef();
  const dispatch = useDispatch();
  const {fcmToken} = useSelector(state => state.notification);
  const [email, setEmail] = useState(__DEV__ ? 'mohit.shah@groovyweb.co' : '');
  const [password, setPassword] = useState(__DEV__ ? 'Mohit@1234567' : '');
  const [emailErr, setEmailErr] = useState({err: false, txt: ''});
  const [passwordErr, setPasswordErr] = useState({err: false, txt: ''});
  const [checkBoxErr, setCheckBoxErr] = useState({err: false, txt: ''});
  const [btnLoader, setBtnLoader] = useState(false);
  const [click, setClick] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);
  const isTabletDevice = DeviceInfo.isTablet();
  const version = DeviceInfo.getVersion();

  const togglePasswordVisibility = () => {
    setHidePassword(!hidePassword);
  };

  // Validation for Login...
  const loginValidate = async () => {
    let valid = true;
    if (email === '') {
      setEmailErr({err: true, txt: translate('emailvalidation')});
      valid = false;
    } else {
      if (BaseSetting.emailRegex.test(email) === false) {
        setEmailErr({err: true, txt: translate('entervalidemail')});
        valid = false;
      } else {
        setEmailErr({err: false, txt: ''});
      }
    }
    if (password === '') {
      valid = false;
      setPasswordErr({err: true, txt: translate('passwordvalidation')});
    } else {
      if (password.length < 6) {
        valid = false;
        setPasswordErr({err: true, txt: translate('entervalidpassword')});
      } else {
        setPasswordErr({err: false, txt: ''});
      }
    }
    if (valid) {
      userLogin();
    }
  };

  // Function for FCM Token Save...
  const saveFcmToken = () => {
    let url = BaseSetting.endpoints.saveFcmToken;
    const userData = {
      token: fcmToken,
    };
    getApiData(url, 'POST', userData, '', true)
      .then(async resp => {})
      .catch(err => {
        Toast.show('somethingWentWrong');
      });
  };

  // User Login API Integration..
  const userLogin = () => {
    setBtnLoader(true);
    let url = BaseSetting.endpoints.signin;
    const userData = {
      email: email || '',
      password: password || '',
      language_id: 'en' || '',
      app_login: 1,
    };
    getApiData(url, 'POST', userData)
      .then(async resp => {
        if (resp.status) {
          console.log('🚀 ~ userLogin ~ resp:', resp);
          dispatch(setUserData(resp?.data?.user));
          dispatch(setUserPermission(JSON.parse(resp?.data?.permission)));
          dispatch(setAccessToken(resp?.data?.token));
          dispatch(setSubscriptionArr(resp?.data?.subscription));
          dispatch(setIsDemo(resp?.data?.user?.is_demo));
          dispatch(setLoginTime(resp?.data?.user?.user_login_time));
          Toast.show(resp?.message);
          setBtnLoader(false);
          saveFcmToken(); // Save FCM token
          if (resp?.data?.user?.isAdmin === false) {
            setTimeout(() => {
              navigation.navigate('Syncronize');
            }, 500);
          } else {
            navigation.navigate('Dashbaord');
          }
        } else {
          Toast.show(resp?.message);
          setBtnLoader(false);
        }
      })
      .catch(err => {
        Toast.show('somethingWentWrong');
        setBtnLoader(false);
      });
  };

  // Below function for call the google sign in API
  const handleGoogleSignIn = async response => {
    if (!isEmpty(response)) {
      const userDetail = response?.user;
      const passData = {
        first_name: userDetail.givenName,
        last_name: userDetail.familyName,
        email: userDetail.email,
        full_name: userDetail.name,
      };
      const url = BaseSetting.endpoints.googleLogin;
      try {
        const resp = await getApiData(url, 'POST', passData, '', true);
        // reset the result json
        if (resp.status) {
          dispatch(setUserData(resp?.data?.user));
          dispatch(setAccessToken(resp?.data?.token));
          dispatch(setIsDemo(resp?.data?.user?.is_demo));
          Toast.show(resp?.message);
          saveFcmToken(); // Save FCM token
          setBtnLoader(false);
          navigation.navigate('Dashbaord');
        } else {
          Toast.show(resp?.message);
        }
        // end
      } catch (er) {}
    }
  };
  // End

  // Google Sign in function
  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userData = await GoogleSignin.signIn();
      handleGoogleSignIn(userData, 'google');
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  // this is for hard back from app....
  function handleBackButtonClick() {
    if (backPressed > 0) {
      BackHandler.exitApp();
      backPressed = 0;
    } else {
      backPressed++;
      // Toast.show("Press again to exit");
      setTimeout(() => {
        backPressed = 0;
      }, 2000);
      return true;
    }
    return true;
  }
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonClick,
      );
    };
  }, []);

  useEffect(() => {
    GoogleSignin.configure();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        paddingTop: getStatusBarHeight(),
        backgroundColor: BaseColors.white,
      }}>
      <KeyboardAwareScrollView
        bounces={false}
        contentContainerStyle={{
          flexGrow: 1,
        }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        enableOnAndroid={false}>
        <StatusBar
          translucent
          barStyle="dark-content"
          backgroundColor={BaseColors.transparent}
        />

          <View style={styles.container}>
            <View
              style={[
                styles.imageView,
                {
                  paddingTop: isTabletDevice
                    ? Dimensions.get('window').height / 6.8
                    : Dimensions.get('window').height / 9.3,
                },
              ]}>
              <FastImage
                source={Images.oceananutLogo}
                style={[
                  styles.logoSty,
                  {
                    width: isTabletDevice
                      ? Dimensions.get('window').width / 2
                      : Dimensions.get('window').width / 1.5,
                    height: isTabletDevice ? 210 : 150,
                  },
                ]}
                // resizeMode="contain"
              />
            </View>

            <View>
              <Text style={styles.titletxt}>{translate('logintitle')}</Text>
              <Text style={styles.txtsty}>
                {translate('logindiscription')}{' '}
              </Text>
              <View style={{paddingVertical: 15}}>
                <TextInput
                  ref={emailRef}
                  title={translate('commonEmail')}
                  placeholderText={translate('commonEmail')}
                  value={email}
                  containerSty={{}}
                  onChange={value => {
                    setEmail(value);
                    if (value?.length > 0) {
                      setEmailErr(false);
                    }
                  }}
                  showError={emailErr.err}
                  errorText={emailErr.txt}
                  onSubmit={() => {
                    passwordRef.current.focus();
                  }}
                  returnKeyType="next"
                  textInputStyle={{color: BaseColors.textColor}}
                />
              </View>
              <View style={{flexDirection: 'row'}}>
                <View style={{paddingBottom: 15}}>
                  <TextInput
                    ref={passwordRef}
                    title={translate('commonPassword')}
                    placeholderText={translate('commonPassword')}
                    value={password}
                    secureText={hidePassword}
                    containerSty={{}}
                    onChange={value => {
                      setPassword(value);
                      if (value.length > 0) {
                        setPasswordErr(false);
                      }
                    }}
                    onSubmit={() => {
                      Keyboard.dismiss();
                    }}
                    showError={passwordErr.err}
                    errorText={passwordErr.txt}
                    textInputStyle={{color: BaseColors.textColor}}
                    returnKeyType="done"
                  />
                </View>
                <TouchableOpacity
                  style={{
                    position: 'absolute',
                    top: isTabletDevice
                      ? Dimensions.get('window').height / 32
                      : IOS
                      ? 32
                      : 34,
                    right: 10,
                  }}
                  onPress={togglePasswordVisibility}>
                  <CustomIcon
                    size={20}
                    name={hidePassword ? 'CloseEye' : 'eye'}
                    style={{color: BaseColors.inputBorder}}
                  />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                }}>
                <View
                  style={{
                    alignItems: 'center',
                    flexDirection: 'row',
                  }}>
                  <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => {
                      setClick(!click);
                    }}
                    style={[
                      styles.clickSty,
                      {
                        borderColor: click ? BaseColors.primary : '#343A40',
                        backgroundColor: click
                          ? BaseColors.primary
                          : BaseColors.transparent,
                        height: isTabletDevice ? 26 : 18,
                        width: isTabletDevice ? 26 : 18,
                      },
                    ]}>
                    {click ? (
                      <AIcon
                        name="check"
                        style={{color: 'white'}}
                        size={isTabletDevice ? 19 : 9}
                      />
                    ) : null}
                  </TouchableOpacity>
                  <Text style={styles.notetxtSty}>
                    {translate('loginRemember')}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('ForgotPassword');
                  }}
                  style={{flexDirection: 'row', alignItems: 'center'}}>
                  <FIcon
                    name="lock"
                    size={isTabletDevice ? 30 : 20}
                    style={{color: '#343A40'}}
                  />
                  <Text style={styles.notetxtSty}>
                    {translate('loginForgot')}
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.errView}>
                {checkBoxErr.err && (
                  <Text style={styles.checkboxErr}>{checkBoxErr.txt}</Text>
                )}
              </View>
              <Button
                containerStyle={{backgroundColor: BaseColors.primary}}
                style={{marginTop: 30}}
                loading={btnLoader}
                onBtnClick={() => {
                  loginValidate();
                }}>
                {translate('pagesignin')}
              </Button>
              <View
                style={{
                  paddingTop: 30,
                  flexDirection: 'row',
                  display: 'flex',
                  justifyContent: 'center',
                  alignSelf: 'center',
                }}>
                <View style={styles.bordersty} />
                <Text
                  style={{
                    textAlign: 'center',
                    paddingBottom: 20,
                    color: '#464E5F',
                    paddingHorizontal: 10, // Add some padding to separate the line from the text
                    fontSize: isTabletDevice ? 24 : 0,
                  }}>
                  {translate('loginTxt')}
                </Text>
                <View style={styles.bordersty} />
              </View>
              <TouchableOpacity onPress={() => signIn()} activeOpacity={0.8}>
                <FastImage
                  source={Images.Googleicon}
                  style={[
                    styles.gogleiconSty,
                    {
                      height: isTabletDevice ? 50 : 40,
                      width: isTabletDevice ? 50 : 40,
                    },
                  ]}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              alignItems: 'center',
              marginTop: isTabletDevice
                ? Dimensions.get('window').height / 7
                : IOS
                ? Dimensions.get('window').height / 11
                : Dimensions.get('window').height / 20 - 35,
            }}>
            <Text style={{color: '#464E5F'}}>{`Version: ${version}`}</Text>
          </View>
      </KeyboardAwareScrollView>
    </View>
  );
}
