import { all, call, put, select, take } from 'redux-saga/effects';
import { MyAction } from '../../constants';
import { auth } from '../../constants/auth';
import notifyAction from '../notify/notifyAction';
import authAction from './authAction';
import { selectAuth } from './authReducer';

export function* handleLogin(action) {
    const { username, password } = action.payload;

    if (username === auth.USERNAME && password === auth.PASSWORD) {
        yield put(notifyAction(MyAction.NOTIFY_SUCCESS, 'Login successfully'));
        yield put(authAction(MyAction.LOGIN_SUCCESS, username));
    } else {
        yield put(notifyAction(MyAction.NOTIFY_FAILED, 'Username or password does not exist!'));
        yield put(authAction(MyAction.LOGIN_FAILED));
    }
}

export function* handleLogout() {
    yield put(notifyAction(MyAction.NOTIFY_SUCCESS, 'Logout successfully'));
    yield put(authAction(MyAction.LOGOUT_SUCCESS));
}

export function* loginFlow() {
    while (true) {
        const { isLoggedIn } = yield select(selectAuth);
        if (!isLoggedIn) {
            const action = yield take(MyAction.LOGIN);
            yield call(handleLogin, action);
        } else {
            yield take(MyAction.LOGOUT);
            yield call(handleLogout);
        }
    }
}

export default function* authSaga() {
    yield all([loginFlow()]);
}
