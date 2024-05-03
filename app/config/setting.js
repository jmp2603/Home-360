const devMode = __DEV__;

// Production Server...
const baseUrl = !devMode
  ? "http://192.168.1.16/home360/v1/"
  : "http://192.168.1.16/home360/v1/";

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
  emailRegex:
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  endpoints: {
    signin: "user/login",
  },
};

export default BaseSetting;
