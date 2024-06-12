import { fileTypes } from "../config/staticData";
import AuthAction from "../redux/reducers/auth/actions";
import { store } from "../redux/store/configureStore";
import Toast from "react-native-simple-toast";
import {
  has,
  isArray,
  isEmpty,
  isNull,
  isObject,
  isUndefined,
  omitBy,
  size,
} from "lodash";
import { Platform, processColor } from "react-native";
import ReactNativeBlobUtil from "react-native-blob-util";
import { MMKV } from "react-native-mmkv";
import CryptoJS from "react-native-crypto-js";
import BaseSetting from "../config/setting";

const mmkv = new MMKV();

const IOS = Platform.OS === "ios";
export const logout = () => {
  store.dispatch(AuthAction.logOut());
  mmkv.clearAll(); // Clear all Data from mmkv storage..
  // store.dispatch(NotificationAction.clearData());
  // store.dispatch(FavouriteAction.clearData());
};

const CryptoJSAesJson = {
  stringify: function (cipherParams) {
    var j = { ct: cipherParams.ciphertext.toString(CryptoJS.enc.Base64) };
    if (cipherParams.iv) j.iv = cipherParams.iv.toString();
    if (cipherParams.salt) j.s = cipherParams.salt.toString();
    return JSON.stringify(j);
  },
  parse: function (jsonStr) {
    var j = JSON.parse(jsonStr);
    var cipherParams = CryptoJS.lib.CipherParams.create({
      ciphertext: CryptoJS.enc.Base64.parse(j.ct),
    });
    if (j.iv) cipherParams.iv = CryptoJS.enc.Hex.parse(j.iv);
    if (j.s) cipherParams.salt = CryptoJS.enc.Hex.parse(j.s);
    return cipherParams;
  },
};

// For encrypt data we create below function
export const encryptRequestData = (request) => {
  try {
    const cipherText = CryptoJS.AES.encrypt(request, BaseSetting.passphrase, {
      format: CryptoJSAesJson,
    });
    return JSON.parse(cipherText.toString());
  } catch (error) {
    console.error("Encryption error:", error);
    return null;
  }
};
// End

// For decrypt data we create a below function
export const decryptResponseData = (response) => {
  let bytes;
  try {
    bytes = CryptoJS.AES.decrypt(response, BaseSetting.passphrase, {
      format: CryptoJSAesJson,
    }).toString(CryptoJS.enc.Utf8);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    return JSON.parse(decrypted);
  } catch (err) {
    console.log("UNABLE TO DECIPHER", err);
  }
};
export function chatFilesVal(type, size) {
  const fTypes = isObject(fileTypes) ? fileTypes : {};
  if (has(fTypes, type)) {
    if (size > 1024 * 1024 * 10) {
      return false;
    } else {
      return true;
    }
  }
}

// Get User Default time-zone
export function getMyTimeZone() {
  const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  return userTimezone;
}

// End

// generate randome Number..
export const getRandomNumber = (length, excludedArray = []) => {
  // Function to generate a random number not in the excluded array
  let randomNumber;
  do {
    // Generate a random number within a certain range
    randomNumber = Math.floor(
      Math.pow(10, length - 1) + Math.random() * 9 * Math.pow(10, length - 1)
    ); // Adjust the range as needed
  } while (excludedArray.includes(randomNumber)); // Check if it's in the excluded array
  return randomNumber;
};

function checkPermission(list) {
  const {
    auth: { userPermission, userData },
  } = store.getState();
  const { isAdmin } = userData ? userData : 0;
  if (isArray(userPermission)) {
    if (isAdmin) {
      // If admin then we can give all the access
      return 1;
    }
    // create below function to check for permission
    const fIndex = userPermission.findIndex((item) => item === list);
    return fIndex;
    // End
  }
  return 0;
}
export default checkPermission;

export function getSlug(string, type) {
  if (!isEmpty(type)) {
    return string
      .toString()
      .trim()
      .toLowerCase()
      .replace("&", "and")
      .replace(/[&_\/\\#,+()$~%.'":*?<>{}]/g, "_")
      .replace(/\s+/g, "_")
      .replace(/[^\w\-]+/g, "")
      .replace(/\-\-+/g, "_")
      .replace(/^-+/, "")
      .replace(/-+$/, "");
  }
  return string
    .toString()
    .trim()
    .toLowerCase()
    .replace("&", "and")
    .replace(/[&_\/\\#,+()$~%.'":*?<>{}]/g, "-")
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
}

export const getRandomAlphaNumeric = (length, excludedArray = []) => {
  const characters = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  let randomString;
  do {
    // Generate a random string of the specified length
    randomString = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomString += characters[randomIndex];
    }
  } while (excludedArray.includes(randomString));

  return randomString;
};

// Time Converrsation...
export function Duration(time) {
  const today = Math.floor(Date.now() / 1000);
  const diff = today - time;
  const minutes = Math.floor(diff / 60);
  const hours = Math.floor(diff / 60 / 60);
  const days = Math.floor(diff / 60 / 60 / 24);
  const weeks = Math.floor(diff / 60 / 60 / 24 / 7);
  const months = Math.floor(diff / 60 / 60 / 24 / 7 / 4);
  const years = Math.floor(diff / 60 / 60 / 24 / 7 / 4 / 12);
  return diff < 60
    ? `${diff}s ago`
    : diff < 3600
    ? `${minutes}m ago`
    : diff < 86400
    ? `${hours}h ago`
    : diff < 604800
    ? `${days}d ago`
    : diff < 2629743
    ? `${weeks}w ago`
    : diff < 31556926
    ? `${months}M ago`
    : `${years}y ago`;
}
// End

// Common Func for Download PDF
export const downloadFile = async (fileUrl, formName) => {
  const a = formName;
  try {
    const { config, fs } = ReactNativeBlobUtil;
    const { DownloadDir, DocumentDir } = fs.dirs;
    const saveFilePath = IOS ? DocumentDir : DownloadDir;
    let options = {};
    if (IOS) {
      options = {
        fileCache: true,
        path: saveFilePath + `/${a}`,
        notification: true,
      };
    } else {
      options = {
        fileCache: true,
        timeout: 1000 * 15,
        addAndroidDownloads: {
          useDownloadManager: true,
          notification: true,
          path: `/storage/emulated/0/Download/${a}`, // path for direct show into Download folder
          description: "downloading file...",
        },
      };
    }
    config(options)
      .fetch("GET", fileUrl)
      .then((res) => {
        if (IOS) {
          ReactNativeBlobUtil.ios.openDocument(res.path());
        }
        if (!IOS) {
          Toast.show(`${"File downloaded"}`);
        }
      })
      .catch((e) => {
        Toast.show("C2Something went wrong!");
      });
  } catch (e) {
    Toast.show("C3Something went wrong!");
  }
};
// End

export const urlParams = async (data) => {
  const apiData = omitBy(data, (v) => isUndefined(v) || isNull(v));
  let querry = "";
  let qs = "";
  const dataLength = apiData ? Object.keys(apiData).length : 0;
  if (dataLength > 0) {
    Object.keys(apiData).forEach((key, i) => {
      const sep = i === dataLength - 1 ? "" : "&";
      querry += `${encodeURIComponent(key)}=${encodeURIComponent(
        apiData[key]
      )}${sep}`;
    });
    qs = `?${querry}`;
  }
  return qs;
};

//this is for generate random light color
export const rendomColor = async (numColors) => {
  const colors = [];

  function getRandomHexColor() {
    let color = "#";
    // Generate a color that is lighter but not fully light by selecting values between 128 and 191 for each color component (R, G, B)
    for (let i = 0; i < 3; i++) {
      const component = Math.floor(Math.random() * 118) + 128; // Limiting to values between 128 and 191
      const hex = component.toString(16).padStart(2, "0"); // Convert to hexadecimal and ensure two-digit representation
      color += hex;
    }
    return processColor(color);
  }

  for (let i = 0; i < numColors; i++) {
    colors.push(getRandomHexColor());
  }

  return colors;
};

// Function for Number Formating...
export const formatNumber = (number) => {
  if (number >= 1000 && number < 1000000) {
    return (number / 1000).toFixed(1) + "k";
  } else if (number >= 1000000) {
    return (number / 1000000).toFixed(1) + "m";
  } else {
    return number.toString();
  }
};
