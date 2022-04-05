import { MyAction } from '../../constants';

const initialValue = {
    loading: false,
    isLoggedIn: false,
    user: undefined,
};

const authReducer = (state = initialValue, action) => {
    switch (action.type) {
        case MyAction.LOGIN:
            return {
                ...state,
                loading: true,
            };
        case MyAction.LOGIN_FAILED:
            return {
                ...state,
                loading: false,
            };
        case MyAction.LOGIN_SUCCESS:
            return {
                loading: false,
                isLoggedIn: true,
                user: action.payload,
            };
        case MyAction.LOGOUT:
            return { ...state, loading: true };

        case MyAction.LOGOUT_SUCCESS:
            return {
                loading: false,
                isLoggedIn: false,
                user: undefined,
            };

        default:
            return state;
    }
};

export const selectAuth = (state) => state.auth;

export default authReducer;
