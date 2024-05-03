import {Platform} from 'react-native';

const IOS = Platform.OS === 'ios';
export const BaseColors = {
  primary: '#0c476a',
  drawerPrimary: '#0c476a',
  secondary: '#7C7C7A',
  textLighBlue: '#3CC4DB80',
  descriptionTxt: '#535353',
  lightPink: '#FFF9FC',
  lightWhite: '#F3F3F3',
  textColor: '#464E5F',
  msgColor: '#676767',
  lightYellow: '#FFFCF2',
  yellow: '#F8C102',
  red: '#FF0000',
  lightblue: '#F0FDFF',
  primaryLight: '#67ffff',
  primaryDark: '#00a49b',
  lightBlack: '#121212',
  lightRed: '#FEE9E6',
  offWhite: '#F5F5F5',
  transparent: '#0000',
  inactive: '#c2c2c2',
  transparentWhite: '#ffffff45',
  borderColor: '#C9C9C9',
  textGrey: '#484848',
  textSecondary: '#858585',
  backgroundColor: '#F6F6F6',
  lightGrey: '#585858',
  inputBorder: '#C1C1C1',
  white: '#ffffff',
  whiteSmoke: '#F1F1F1',
  black: '#000000',
  tabinActive: '#6D6D6D',
  activeIndex: '#e5e9fb',
  inactiveIndex: '#f7f7f7',
  headerColor: '#343A40;',
  white10: '#ffffff10',
  white20: '#ffffff20',
  white30: '#ffffff30',
  placeHoldertxtcolor: '#c2c2c2',
  notiTxtColor: '#465164',
  dropdownTextColor: '#464E5F',
  lmsborderColor: '#F1F1F1',
  modalHeaderColor: '#ffffff',
  modalheaderTitle: '#0c476a',
  matrixColor: '#f1f2f4',
  annoucementBackground: '#f2f2f2',
  multipledropdownSty: '#F1F1F1',
  NotificationCheckColor: '#7C7C7A',
  RoleBackground: '#f7f7f7',
};

export const DarkBaseColor = {
  primary: '#556ee6',
  drawerPrimary: '#333332',
  secondary: '#F1F1F1',
  primaryLight: '#67ffff',
  primaryDark: '#00a49b',
  blueLight: '#e0e0e0',
  blueLightTxt: '#90a4ae90',
  blueDark: '#37474f',
  orange: '#FF5B30',
  textGrey: '#e5e9fb',
  textColor: '#fff',
  btnBlue: '#61C9D3',
  alertRed: '#FF0B1E',
  green: '#4caf50',
  red: '#f44336',
  yellow: '#ffeb3b',
  amber: '#ffc107',
  whiteColor: '#000000',
  blackColor: '#ffffff',
  transparentWhite: '#00000045',
  placeHolderColor: '#00000099',
  inactive: '#F1F1F1',
  lightBlack: '#F6F6F6',
  textSecondary: '#ffffff',
  backgroundColor: '#393838',
  borderColor: '#D8D8D8',
  activeIndex: '#e5e9fb',
  white: '#393838',
  whiteSmoke: '#393838',
  black: '#ffffff',
  shadowBackground: '#f7f7fa',
  placeHoldertxtcolor: '#333333',
  notiTxtColor: '#F6F6F6',
  msgColor: '#f0f0f0',
  headerColor: '#fff',
  inputBorder: '#F1F1F1',
  dropdownTextColor: '#464E5F',
  lmsborderColor: '#393838',
  inactiveIndex: '#393838',
  modalHeaderColor: '#0d0d0d',
  modalheaderTitle: '#ffffff',
  descriptionTxt: '#ffffff',
  matrixColor: '#000',
  annoucementBackground: '#000',
  multipledropdownSty: '#464E5F',
  NotificationCheckColor: '#00BBE1',
  RoleBackground: '#393838',
};

export const BaseStyles = {
  shadow: {
    shadowColor: BaseColors.black40,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  roundCorner: {
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
    borderBottomStartRadius: 10,
    borderBottomEndRadius: 10,
  },
};

export const FontFamily = {
  regular: 'Poppins-Regular',
  medium: 'Poppins-Medium',
  bold: 'Poppins-Bold',
  AguafinaScrip: 'AguafinaScript-Regular',
};