import { all, put, take } from 'redux-saga/effects';
import { MyAction } from '../../constants';
import store from '../../redux/store';
import usersAction from './usersAction';

export function* handleAddUser() {
    while (true) {
        const action = yield take(MyAction.ADD_USER);
        if (action.payload) {
            yield put(usersAction(MyAction.ADD_USER_SUCCESS, action.payload));
        } else {
            yield put(usersAction(MyAction.ADD_USER_FAILED, 'Has errors'));
        }
    }
}

export function* handleRemoveUser() {
    while (true) {
        const action = yield take(MyAction.REMOVE_USER);
        if (action.payload) {
            const user = action.payload;
            const users = store.getState().users;

            const newUser = users.data.filter((current) => current.id !== user.id);

            yield put(usersAction(MyAction.REMOVE_USER_SUCCESS, newUser));
        }
    }
}

export function* handleEditUser() {
    while (true) {
        const action = yield take(MyAction.EDIT_USER);
        if (action.payload) {
            const user = action.payload;
            const users = store.getState().users;
            const index = users.data.findIndex((current) => current.id === user.id);
            if (index >= 0) {
                const newUser = [...users.data];
                newUser.splice(index, 1, user);
                yield put(usersAction(MyAction.EDIT_USER_SUCCESS, newUser));
            } else {
                yield put(usersAction(MyAction.EDIT_USER_FAILED, 'Has errors'));
            }
        }
    }
}

export default function* userSaga() {
    yield all([handleAddUser(), handleRemoveUser(), handleEditUser()]);
}
