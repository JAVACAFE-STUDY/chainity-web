import axios from 'axios';

import { FAILURE, REQUEST, SUCCESS } from 'app/shared/reducers/action-type.util';

export const ACTION_TYPES = {
    GET_USERS: 'user/GET_USERS'
};

const initialState = {
    loading: false,
    data : {
        'totalDocs': 100,
        'offset': 0,
        'limit': 10,
        'docs': [
            {
                '_id': '1',
                'email': 'eamil@javacafe.com',
                'name': 'javacafe',
                'status': 'status',
                'role': 'ROLE_USER',
                'createdAt': '2019/03/01 16:03:07',
                'registeredAt': '2019/03/01 16:03:07',
                'avatar': '/avatar.svg',
                'thumbnail': '/thumbnail.svg',
                'keyStore': '{}'
            }
        ]
    },
    errorMessage: ''
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
                ...initialState,
                loading: false,
                data: action.payload.data
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
