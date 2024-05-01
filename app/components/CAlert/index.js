import _ from 'lodash';
import {Alert} from 'react-native';
/**
 * Alert Default
 *@function CAlert
 * @param {string} message
 * @param {string} heading
 * @param {function} onOk
 * @param {function} onCancel
 * @param {string} okMsg
 * @param {string} cancelMsg
 */
function CAlert(message, heading, onOk, onCancel, okMsg, cancelMsg) {
  const buttons = [
    {
      text: _.isString(okMsg) && !_.isEmpty(okMsg) ? okMsg : 'Ok',
      onPress: _.isFunction(onOk) ? onOk : () => {},
    },
  ];
  if (_.isFunction(onCancel)) {
    buttons.push({
      text:
        _.isString(cancelMsg) && !_.isEmpty(cancelMsg) ? cancelMsg : 'Cancel',
      onPress: onCancel,
    });
  }
  Alert.alert(heading || 'Alert', message, buttons, {
    cancelable: false,
  });
}

export default CAlert;
