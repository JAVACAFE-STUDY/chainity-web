import axios from 'axios';

import { FAILURE, REQUEST, SUCCESS } from 'app/shared/reducers/action-type.util';

export const ACTION_TYPES = {
    GET_USERS: 'user/GET_USERS',
    GET_USER: 'user/GET_USER'
};

const initialState = {
    loading: false,
    data: {
        'totalDocs': 0,
        'offset': 0,
        'limit': 10,
        'docs': []
    },
    errorMessage: '',
    user: {}
};

export type UsersState = Readonly<typeof initialState>;

// Reducer
export default (state: UsersState = initialState, action): UsersState => {
    switch (action.type) {
        case REQUEST(ACTION_TYPES.GET_USERS):
            return {
                ...state,
                loading: true
            };
        case FAILURE(ACTION_TYPES.GET_USERS):
            return {
                ...initialState,
                loading: false,
                errorMessage: action.payload
            };
        case SUCCESS(ACTION_TYPES.GET_USERS):
            return {
                ...state,
                loading: false,
                data: action.payload.data
            };
        case SUCCESS(ACTION_TYPES.GET_USER):
            return {
                ...state,
                loading: false,
                user: action.payload.data
            };
        default:
            return state;
    }
};

// Actions
export const getUsers = groupId => ({
    type: ACTION_TYPES.GET_USERS,
    payload: axios.get(`v1/groups/${groupId}/users`)
});

export const getUser = (groupId, userId, status, role) => ({
    type: ACTION_TYPES.GET_USER,
    payload: axios.get(`v1/groups/${groupId}/users/${userId}?status=${status}&role=${role}`)
});

// export const createUser: ICrudPutAction<IUser> = user => async dispatch => {
//     const result = await dispatch({
//         type: ACTION_TYPES.CREATE_USER,
//         payload: axios.post(apiUrl, user)
//     });
//     dispatch(getUsers());
//     return result;
// };
