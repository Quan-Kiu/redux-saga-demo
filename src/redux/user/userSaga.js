import { all, put, select, take } from 'redux-saga/effects';
import { MyAction } from '../../constants';
import notifyAction from '../notify/notifyAction';
import usersAction from './usersAction';
import { selectUsers } from './usersReducer';

export function* handleAddUser() {
    while (true) {
        const action = yield take(MyAction.ADD_USER);
        const { name } = action.payload;
        if (name) {
            yield put(notifyAction(MyAction.NOTIFY_SUCCESS, 'Add User Successful!'));
            yield put(usersAction(MyAction.ADD_USER_SUCCESS, action.payload));
        } else {
            yield put(notifyAction(MyAction.NOTIFY_FAILED, 'Name is required'));
            yield put(usersAction(MyAction.ADD_USER_FAILED));
        }
    }
}

export function* handleRemoveUser() {
    while (true) {
        const action = yield take(MyAction.REMOVE_USER);
        if (action.payload) {
            const user = action.payload;
            const users = yield select(selectUsers);

            const newUser = users.filter((current) => current.id !== user.id);
            yield put(notifyAction(MyAction.NOTIFY_SUCCESS, 'Remove User Successful!'));
            yield put(usersAction(MyAction.REMOVE_USER_SUCCESS, newUser));
        } else {
            yield put(notifyAction(MyAction.NOTIFY_FAILED, 'Has errors!'));
            yield put(usersAction(MyAction.REMOVE_USER_FAILED));
        }
    }
}

export function* handleEditUser() {
    while (true) {
        const action = yield take(MyAction.EDIT_USER);
        if (action.payload) {
            const user = action.payload;
            const users = yield select(selectUsers);
            const index = users.findIndex((current) => current.id === user.id);
            if (index >= 0) {
                const newUser = [...users];
                newUser.splice(index, 1, user);
                yield put(notifyAction(MyAction.NOTIFY_SUCCESS, 'Edit User Successful!'));
                yield put(usersAction(MyAction.EDIT_USER_SUCCESS, newUser));
            } else {
                yield put(notifyAction(MyAction.NOTIFY_FAILED, 'User NotFound!'));
                yield put(usersAction(MyAction.EDIT_USER_FAILED));
            }
        } else {
            yield put(notifyAction(MyAction.NOTIFY_FAILED, 'Has errors!'));
            yield put(usersAction(MyAction.EDIT_USER_FAILED));
        }
    }
}

export default function* userSaga() {
    yield all([handleAddUser(), handleRemoveUser(), handleEditUser()]);
}
