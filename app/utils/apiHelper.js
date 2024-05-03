import { isEmpty, isNull, isObject, isUndefined, omitBy } from "lodash";
import axios from "axios";
import BaseSetting from "../config/setting";
import { store } from "../redux/store/configureStore";

export const getApiData = async (
  endpoint,
  method,
  data,
  headers,
  isFormData = false
) => {
  const authState = store?.getState() || {};
  const token = authState?.auth?.accessToken || "";
  let authHeaders = {
    "Content-Type": "application/json",
    authorization: token ? `Bearer ${token}` : "",
  };

  if (headers) {
    authHeaders = headers;
  }
  if (isFormData) {
    authHeaders = {
      "Content-Type": "multipart/form-data",
      authorization: token ? `Bearer ${token}` : "",
    };
    const query = new FormData();
    if (data && Object.keys(data).length > 0) {
      Object.keys(data).map((k) => query.append(k, data[k]));
    }
    data = query;
  }
  try {
    const obj = {
      method: method,
      url: BaseSetting.api + endpoint,
      timeout: BaseSetting.timeOut,
      headers: authHeaders,
      data: !isEmpty(data) ? data : undefined,
    };

    let response = await axios(obj);
    if (response?.data?.message === "Unauthorized") {
      // logout();
      return;
    }
    return response.data;
  } catch (error) {
    if (error.response) {
      if (error?.response?.data?.message === "Unauthorized") {
        // logout();
        return;
      }
      return (
        error?.response?.data || {
          success: false,
          message: "Something went wrong",
        }
      );
    } else {
      console.error(error);
      return {
        success: false,
        message: error.message || "Something went wrong",
      };
    }
  }
};

export function getApiDataProgress(
  endpoint,
  method,
  data,
  onProgress,
  customUrl = ""
) {
  const authState = store?.getState() || {};
  const token = authState?.auth?.accessToken || "";

  const headers = {
    "Content-Type": "multipart/form-data",
    authorization: token ? `Bearer ${token}` : "",
  };

  return new Promise(async (resolve, reject) => {
    const timeZone = "await TimeZone.getTimeZone()";
    const url = !isEmpty(customUrl) ? customUrl : BaseSetting.api + endpoint;
    const oReq = new XMLHttpRequest();
    // const token = store ? store.getState().auth.token : '';
    oReq.upload.addEventListener("progress", (event) => {
      if (event.lengthComputable) {
        const progress = (event.loaded * 100) / event.total;
        if (onProgress) {
          onProgress(progress);
        }
      } else {
        // Unable to compute progress information since the total size is unknown
      }
    });

    const query = new FormData();
    if (data && Object.keys(data).length > 0) {
      Object.keys(data).map((k) => query.append(k, data[k]));
    }
    const params = query;
    oReq.open(method, url, true);
    oReq.setRequestHeader("Content-Type", "multipart/form-data");
    // oReq.setRequestHeader('X-localization', language);
    if (isObject(headers)) {
      Object.keys(headers).map((hK) => {
        oReq.setRequestHeader(hK, headers[hK]);
      });
    }

    if (token) {
      oReq.setRequestHeader("Authorization", `Bearer ${token}`);
    }

    if (timeZone) {
      oReq.setRequestHeader("timezone", timeZone || "");
    }

    oReq.send(params);
    oReq.onreadystatechange = () => {
      if (oReq.readyState === XMLHttpRequest.DONE) {
        try {
          // console.log('Response Text => ', oReq.responseText);
          const resposeJson = oReq.responseText;
          if (resposeJson && resposeJson.message === "Unauthorized") {
            // logout();
          } else {
            resolve(resposeJson);
          }
        } catch (exe) {
          // bugsnag.notify(exe, function (report) {
          //   report.metadata = {
          //     data: {
          //       url,
          //       params,
          //     },
          //   };
          // });
          console.log(exe);
          reject(exe);
        }
      }
    };
  });
}
