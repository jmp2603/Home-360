import FORTAB from '../components/MQ';
import {PixelRatio, Platform} from 'react-native';
import {createIconSetFromIcoMoon} from 'react-native-vector-icons';
import icoMoonConfig from './selection.json';

const CustomIcon = createIconSetFromIcoMoon(icoMoonConfig);

const iconSize = FORTAB ? 30 : 22;
const navIconSize =
  __DEV__ === false && Platform.OS === 'android'
    ? PixelRatio.getPixelSizeForLayoutSize(8)
    : iconSize;
const replaceSuffixPattern = /--(active|big|small|very-big)/g;

const CustIcon = {
  ElogPreference: [navIconSize, '#7E87AE'],
  LightMode: [navIconSize, '#7E87AE'],
  HowToVideo: [navIconSize, '#7E87AE'],
  Personnel: [navIconSize, '#7E87AE'],
  FisheriesElog: [navIconSize, '#7E87AE'],
  Profile: [navIconSize, '#7E87AE'],
  Language: [navIconSize, '#7E87AE'],
  Analytics: [navIconSize, '#7E87AE'],
  Management: [navIconSize, '#7E87AE'],
  Home: [navIconSize, '#7E87AE'],
  Configuration: [navIconSize, '#7E87AE'],
  SafetyManagement: [navIconSize, '#7E87AE'],
  eye: [navIconSize, '#7E87AE'],
  CloseEye: [navIconSize, '#7E87AE'],
  ScheduleTrip: [navIconSize, '#7E87AE'],
  calender: [navIconSize, '#7E87AE'],
  up: [navIconSize, '#7E87AE'],
  doc: [navIconSize, '#7E87AE'],
  download: [navIconSize, '#7E87AE'],
  star: [navIconSize, '#7E87AE'],
  starfill: [navIconSize, '#7E87AE'],
  play: [navIconSize, '#7E87AE'],
  filter: [navIconSize, '#7E87AE'],
  file: [navIconSize, '#7E87AE'],
  check: [navIconSize, '#7E87AE'],
  certificate: [navIconSize, '#7E87AE'],
  search: [navIconSize, '#7E87AE'],
  inform: [navIconSize, '#7E87AE'],
  downside: [navIconSize, '#7E87AE'],
  time: [navIconSize, '#7E87AE'],
  upside: [navIconSize, '#7E87AE'],
  edit: [navIconSize, '#7E87AE'],
  delete: [navIconSize, '#7E87AE'],
  vessele: [navIconSize, '#7E87AE'],
  fire: [navIconSize, '#7E87AE'],
  question: [navIconSize, '#7E87AE'],
  Back: [navIconSize, '#7E87AE'],
  information: [navIconSize, '#7E87AE'],
  Next: [navIconSize, '#7E87AE'],
  drawer: [navIconSize, '#7E87AE'],
  Notification: [navIconSize, '#7E87AE'],
  Video: [navIconSize, '#7E87AE'],
  Forms: [navIconSize, '#7E87AE'],
  ActivityLog: [navIconSize, '#7E87AE'],
  VoyageReporting: [navIconSize, '#7E87AE'],
  down: [navIconSize, '#7E87AE'],
  fish: [navIconSize, '#7E87AE'],
  home: [navIconSize, '#7E87AE'],
  announcement: [navIconSize, '#7E87AE'],
  'fish-selected': [navIconSize, '#7E87AE'],
  'home-selected': [navIconSize, '#7E87AE'],
  'Notification-selected': [navIconSize, '#7E87AE'],
  'Profile-selected': [navIconSize, '#7E87AE'],
  'Fisheries-Elog': [navIconSize, '#7E87AE'],
  'User-Management': [navIconSize, '#7E87AE'],
  'How-to-Video': [navIconSize, '#7E87AE'],
  'Vessele-Management': [navIconSize, '#7E87AE'],
  'Down-Vector': [navIconSize, '#7E87AE'],
  'announcement-select': [navIconSize, '#7E87AE'],
  Revert: [navIconSize, '#7E87AE'],
  revertHistory: [navIconSize, '#7E87AE'],
  closureForm: [navIconSize, '#7E87AE'],
  ViewClosure: [navIconSize, '#7E87AE'],
  navigation: [navIconSize, '#7E87AE'],
};

const iconsArray = [[CustIcon, CustomIcon]];

const iconsMap = {};
const iconsLoaded = new Promise(resolve => {
  const allFonts = [iconsArray].map(iconArrayMain =>
    Promise.all(
      iconArrayMain.map(iconArray =>
        Promise.all(
          Object.keys(iconArray[0]).map(iconName =>
            // IconName--suffix--other-suffix is just the mapping name in iconsMap
            iconArray[1].getImageSource(
              iconName.replace(replaceSuffixPattern, ''),
              iconArray[0][iconName][0],
              iconArray[0][iconName][1],
            ),
          ),
        ).then(
          sources =>
            Object.keys(iconArray[0]).forEach(
              (iconName, idx) => (iconsMap[iconName] = sources[idx]),
            ),
          // resolve(true);
        ),
      ),
    ).then(() => {
      resolve(true);
    }),
  );
  return Promise.all(allFonts);
});

export {iconsMap, iconsLoaded, CustomIcon};
