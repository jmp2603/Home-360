const devMode = __DEV__;

// Production Server...
const baseUrl = !devMode
  ? "https://api.oceanaut.ca/v1/"
  : "https://api.oceanaut.ca/v1/";

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
    signup: "user/sign-up",
    signin: "user/login",
  },
};

export default BaseSetting;
