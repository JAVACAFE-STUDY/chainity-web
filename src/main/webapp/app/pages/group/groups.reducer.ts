import axios from 'axios';

import { FAILURE, REQUEST, SUCCESS } from 'app/shared/reducers/action-type.util';

export const ACTION_TYPES = {
    GET_GROUP: 'user/GET_GROUP'
};

const initialState = {
    loading: false,
    group: {
        name: ''
    },
    errorMessage: ''
};

export type GroupsState = Readonly<typeof initialState>;

// Reducer
export default (state: GroupsState = initialState, action): GroupsState => {
    switch (action.type) {
        case REQUEST(ACTION_TYPES.GET_GROUP):
            return {
                ...state,
                loading: true
            };
        case FAILURE(ACTION_TYPES.GET_GROUP):
            return {
                ...initialState,
                loading: false,
                errorMessage: action.payload
            };
        case SUCCESS(ACTION_TYPES.GET_GROUP):
            return {
                ...initialState,
                loading: false,
                group: action.payload.data
            };
        default:
            return state;
    }
};

// Actions
export const getGroup = groupId => async dispatch => {
    await dispatch({
        type: ACTION_TYPES.GET_GROUP,
        payload: axios.get(`v1/groups/${groupId}`)
    });
};
