const devMode = __DEV__;

// Production Server...
const baseUrl = !devMode
  ? "http://192.168.1.16/home360/v1/"
  : "http://68.183.108.148/v1/";

const BaseSetting = {
  name: "Home 360",
  displayName: "Home 360",
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
    taskList: "task/list",
    taskDetail: "task/detail",
    taskComplete: "task/update-status",
    saveFcmToken: "user/add-token",
    completeTask: "task/update-status",
    notificationList: "notification/list",
    commentList: "task-comment/list",
    createCommit: "task-comment/add-comment",
    deleteNotification: "notification/delete-single",
  },
};

export default BaseSetting;
