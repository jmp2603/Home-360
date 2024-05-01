import {BaseColors, FontFamily} from '../../config/theme';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  btnContainer: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: BaseColors.inputBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default styles;
