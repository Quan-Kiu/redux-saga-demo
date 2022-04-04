import { combineReducers } from 'redux';
import usersReducer from '../user/usersReducer';

export default combineReducers({
    users: usersReducer,
});
