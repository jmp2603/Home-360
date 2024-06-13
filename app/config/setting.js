const devMode = __DEV__;

// Development Server...
// const baseUrl = !devMode
//   ? 'https://devapi.oceanaut.ca/v1/'
//   : 'https://devapi.oceanaut.ca/v1/';

// const server = 'https://dev.oceanaut.ca';

// Stagin Server...
// const baseUrl = !devMode
//   ? 'https://stagingapi.oceanaut.ca/v1/'
//   : 'https://stagingapi.oceanaut.ca/v1/';

// const server = 'http://staging.oceanaut.ca/';

// Production Server...
const baseUrl = !devMode
  ? "https://api.oceanaut.ca/v1/"
  : "https://api.oceanaut.ca/v1/";

const server = "https://oceanaut.ca/";

const BaseSetting = {
  name: "Oceanaut",
  displayName: "Oceanaut",
  appVersionCode: "1",
  stripeKey: "",
  bugsnagApiKey: "",
  baseUrl,
  api: baseUrl,
  shareEndPoint: baseUrl,
  timeOut: 30000,
  MAPS_API_CALL_KEY: "",
  vesselLiveLocation: "708dbabc-9bb2-4f81-bf76-b365cbfbc159",
  liveLocationUrl: "https://api.datalastic.com/api/v0/",
  googleLoginClientId:
    "875480711780-iqq5uihntntvvgm6e9hafr0dgqlfb1cg.apps.googleusercontent.com",
  emailRegex:
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  endpoints: {
    signup: "user/sign-up",
    signin: "user/login",
  },
  passphrase: "c919055c-9ddf-412b-9f5e-7078ef17ed0a",

  geolocationOptions: {
    enableHighAccuracy: false,
    timeout: 50000,
    maximumAge: 10000,
    distanceFilter: 1,
  },
  geoOptionHighAccurate: {
    enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: 10000,
    distanceFilter: 1,
  },
};

export default BaseSetting;
