import i18n from 'i18n-js';

import actions from '../redux/reducers/language/actions';
import {store} from '../redux/store/configureStore';

const translationGetters = {
  en: () => require('./en.json'),
  fr: () => require('./fr.json'),
};

export const translate = (key, config = {}) => {
  if (!config) {
    config = {};
  }
  initTranslate(store);
  config.defaultValue = key;
  return i18n.t(key, config);
};
/**
 * set Language
 *@function  setI18nConfig
 */
const setI18nConfig = (language, store, bool, lang) => {
  const isRTL = false;
  let appLanguage = language;
  if (language === null) {
    appLanguage = 'en';
    store.dispatch({
      type: actions.SET_LANGUAGE,
      languageData: appLanguage,
    });
  }

  const ReactNative = require('react-native');
  try {
    ReactNative.I18nManager.allowRTL(isRTL);
    ReactNative.I18nManager.forceRTL(isRTL);
  } catch (e) {
  }
  i18n.translations = {[appLanguage]: translationGetters[appLanguage]()};
  i18n.locale = appLanguage;
  store.dispatch({
    type: actions.UPDATE_LANGUAGE,
    updateLanguage: !lang,
  });
};

export const initTranslate = (store, bool = false) => {
  const {
    language: {languageData, updateLanguage},
  } = store.getState();
  setI18nConfig(languageData, store, bool, updateLanguage);
};
