import types from './actions';

const initialState = {
  userData: {},
  accessToken: '',
  introScreens: false,
  darkmode: false,
  userPermission: [],
  subscriptionArr: [],
  isTabletDevice: false,
  isDemo: false,
  skipOffline: false,
  loginTime: 0,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'persist/REHYDRATE':
      if (
        action.payload &&
        action.payload.auth &&
        action.payload.auth.introShown
      ) {
        return {
          ...state,
          ...action.payload.auth,
          introShown: false,
        };
      }
      return state;
    case types.SET_USER_DATA:
      return {
        ...state,
        userData: action.userData,
      };
    case types.SET_ACCESSTOKEN:
      return {
        ...state,
        accessToken: action.accessToken,
      };
    case types.SET_INTRO:
      return {
        ...state,
        introScreens: action.introScreens,
      };
    case types.LOGOUT:
      return {
        ...state,
        userData: {},
        accessToken: '',
        userType: '',
        userPermission: [],
        subscriptionArr: [],
        coins: 0,
        skipOffline: false,
        loginTime: 0,
      };
    case types.SET_DARKMODE:
      return {
        ...state,
        darkmode: action.darkmode,
      };
    case types.SET_USERPERMISSION:
      return {
        ...state,
        userPermission: action.userPermission,
      };
    case types.SET_SUBSCRIPTION_ARRAY:
      return {
        ...state,
        subscriptionArr: action.subscriptionArr,
      };
    case types.SET_IS_TABLET_DEVICE:
      return {
        ...state,
        isTabletDevice: action.isTabletDevice,
      };
    case types.SET_IS_DEMO:
      return {
        ...state,
        isDemo: action.isDemo,
      };
    case types.SET_IS_SKIPOFFLINE:
      return {
        ...state,
        skipOffline: action.skipOffline,
      };
    case types.SET_LOGIN_TIME:
      return {
        ...state,
        loginTime: action.loginTime,
      };
    default:
      return state;
  }
}
