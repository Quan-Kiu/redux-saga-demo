import { MyAction } from '../../constants';

const initialState = {
    success: '',
    failed: '',
};

const notifyReducer = (state = initialState, action) => {
    switch (action.type) {
        case MyAction.NOTIFY_SUCCESS:
            return {
                success: action.payload,
                failed: '',
            };
        case MyAction.NOTIFY_FAILED:
            return {
                success: '',
                failed: action.payload,
            };

        default:
            return state;
    }
};

export const selectNotify = (state) => state.notify;

export default notifyReducer;
