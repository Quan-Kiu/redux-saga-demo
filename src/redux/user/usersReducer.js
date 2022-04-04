import { MyAction } from '../../constants';

const initialState = {
    loading: false,
    data: [
        {
            id: 1,
            key: 1,
            name: 'user1',
        },
        {
            id: 2,
            key: 2,

            name: 'user2',
        },
        {
            id: 3,
            key: 3,

            name: 'user3',
        },
    ],
};
const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        // Handle Add User
        case MyAction.ADD_USER:
            return { ...state, loading: true };
        case MyAction.ADD_USER_FAILED:
            return { ...state, loading: false };
        case MyAction.ADD_USER_SUCCESS:
            const id = state.data.length + 1;
            return {
                loading: false,
                data: [...state.data, { ...action.payload, id, key: id }],
            };

        // Handle Edit User
        case MyAction.EDIT_USER:
            return { ...state, loading: true };
        case MyAction.EDIT_USER_SUCCESS:
            return {
                loading: false,
                data: action.payload,
            };

        case MyAction.EDIT_USER_FAILED:
            return {
                ...state,
                loading: false,
            };

        // Handle Delete User
        case MyAction.REMOVE_USER:
            return {
                ...state,
                loading: true,
            };

        case MyAction.REMOVE_USER_FAILED:
            return {
                ...state,
                loading: false,
            };
        case MyAction.REMOVE_USER_SUCCESS:
            return {
                loading: false,
                data: action.payload,
            };
        default:
            return state;
    }
};

export default usersReducer;
