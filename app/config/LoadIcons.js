import FORTAB from "../components/MQ";
import { PixelRatio, Platform } from "react-native";
import { createIconSetFromIcoMoon } from "react-native-vector-icons";
import icoMoonConfig from "./selection.json";

const CustomIcon = createIconSetFromIcoMoon(icoMoonConfig);

const iconSize = FORTAB ? 30 : 22;
const navIconSize =
  __DEV__ === false && Platform.OS === "android"
    ? PixelRatio.getPixelSizeForLayoutSize(8)
    : iconSize;
const replaceSuffixPattern = /--(active|big|small|very-big)/g;

const CustIcon = {
  Back: [navIconSize, "#7E87AE"],
  Alert: [navIconSize, "#7E87AE"],
  LeftArrow: [navIconSize, "#7E87AE"],
  Mic: [navIconSize, "#7E87AE"],
  Calendar: [navIconSize, "#7E87AE"],
  Camera: [navIconSize, "#7E87AE"],
  Chat: [navIconSize, "#7E87AE"],
  "Clock-In-Filled": [navIconSize, "#7E87AE"],
  "Clock-In": [navIconSize, "#7E87AE"],
  "Clock-Out-Filled": [navIconSize, "#7E87AE"],
  "notification-filled": [navIconSize, "#7E87AE"],
  Delete: [navIconSize, "#7E87AE"],
  Deliverdmark: [navIconSize, "#7E87AE"],
  Refresh: [navIconSize, "#7E87AE"],
  Notification: [navIconSize, "#7E87AE"],
  warning: [navIconSize, "#7E87AE"],
  Close: [navIconSize, "#7E87AE"],
  "Right-Arrow": [navIconSize, "#7E87AE"],
  "Home-Filled": [navIconSize, "#7E87AE"],
  Home: [navIconSize, "#7E87AE"],
  "Image-2": [navIconSize, "#7E87AE"],
  "Mask-Group": [navIconSize, "#7E87AE"],
  Paper: [navIconSize, "#7E87AE"],
  Attech: [navIconSize, "#7E87AE"],
  Eye: [navIconSize, "#7E87AE"],
  "Side-Menu": [navIconSize, "#7E87AE"],
  Plus: [navIconSize, "#7E87AE"],
  Voice: [navIconSize, "#7E87AE"],
  "Down-Arrow": [navIconSize, "#7E87AE"],
  Filter: [navIconSize, "#7E87AE"],
};

const iconsArray = [[CustIcon, CustomIcon]];

const iconsMap = {};
const iconsLoaded = new Promise((resolve) => {
  const allFonts = [iconsArray].map((iconArrayMain) =>
    Promise.all(
      iconArrayMain.map((iconArray) =>
        Promise.all(
          Object.keys(iconArray[0]).map((iconName) =>
            // IconName--suffix--other-suffix is just the mapping name in iconsMap
            iconArray[1].getImageSource(
              iconName.replace(replaceSuffixPattern, ""),
              iconArray[0][iconName][0],
              iconArray[0][iconName][1]
            )
          )
        ).then(
          (sources) =>
            Object.keys(iconArray[0]).forEach(
              (iconName, idx) => (iconsMap[iconName] = sources[idx])
            )
          // resolve(true);
        )
      )
    ).then(() => {
      resolve(true);
    })
  );
  return Promise.all(allFonts);
});

export { iconsMap, iconsLoaded, CustomIcon };
