import { combineReducers } from 'redux';
import authReducer from './auth/authReducer';
import notifyReducer from './notify/notifyReducer';
import usersReducer from './user/usersReducer';

export default combineReducers({
    users: usersReducer,
    auth: authReducer,
    notify: notifyReducer,
});
