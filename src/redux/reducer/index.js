import { combineReducers } from 'redux';
import usersReducer from '../../features/users/usersReducer';

export default combineReducers({
    users: usersReducer,
});
