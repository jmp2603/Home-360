import {combineReducers} from '../../libs/redux';
import auth from './auth/reducer';
import notification from './notification/reducer';

const rootReducer = combineReducers({
  auth,
  notification,
});

export default rootReducer;
