const actions = {
  SET_USER_DATA: 'auth/SET_USER_DATA',
  SET_ACCESSTOKEN: 'auth/SET_ACCESSTOKEN',
  SET_INTRO: 'auth/SET_INTRO',
  LOGOUT: 'auth/LOGOUT',
  SET_DARKMODE: 'auth/SET_DARKMODE',
  SET_USERPERMISSION: 'SET_USERPERMISSION',
  SET_SUBSCRIPTION_ARRAY: 'SET_SUBSCRIPTION_ARRAY',
  SET_IS_TABLET_DEVICE: 'SET_IS_TABLET_DEVICE',
  SET_IS_DEMO: 'SET_IS_DEMO',
  SET_IS_SKIPOFFLINE: 'SET_IS_SKIPOFFLINE',
  SET_LOGIN_TIME: 'SET_LOGIN_TIME',

  setUserData: data => {
    return dispatch =>
      dispatch({
        type: actions.SET_USER_DATA,
        userData: data,
      });
  },

  setAccessToken: accessToken => dispatch =>
    dispatch({
      type: actions.SET_ACCESSTOKEN,
      accessToken,
    }),
  setIntro: introScreens => dispatch =>
    dispatch({
      type: actions.SET_INTRO,
      introScreens,
    }),
  setUserPermission: userPermission => dispatch =>
    dispatch({
      type: actions.SET_USERPERMISSION,
      userPermission,
    }),
  logOut: () => dispatch => {
    dispatch({
      type: actions.LOGOUT,
    });
  },
  setDarkmode: darkmode => dispatch =>
    dispatch({
      type: actions.SET_DARKMODE,
      darkmode,
    }),
  setSubscriptionArr: subscriptionArr => dispatch =>
    dispatch({
      type: actions.SET_SUBSCRIPTION_ARRAY,
      subscriptionArr,
    }),

  setIsTabletDevice: isTabletDevice => dispatch =>
    dispatch({
      type: actions.SET_IS_TABLET_DEVICE,
      isTabletDevice,
    }),
  setIsDemo: isDemo => ({
    type: actions.SET_IS_DEMO,
    isDemo,
  }),
  setSkipOffline: skipOffline => ({
    type: actions.SET_IS_SKIPOFFLINE,
    skipOffline,
  }),
  setLoginTime: loginTime => ({
    type: actions.SET_LOGIN_TIME,
    loginTime,
  }),
};

export default actions;
