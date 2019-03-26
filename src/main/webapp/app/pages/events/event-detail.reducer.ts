import axios from 'axios';

import { FAILURE, REQUEST, SUCCESS } from 'app/shared/reducers/action-type.util';

export const ACTION_TYPES = {
    GET_EVENT: 'event/GET_EVENT'
};

const initialState = {
    loading: false,
    event: {
        '_id': '1',
        'title': '',
        'description': '',
        'tokens': 0,
        'maxNumberOfParticipants': 0,
        'startDate': '',
        'finishDate': '',
        'isClosed': false,
        'createdAt': '2019/03/01 16:03:07',
        'createdBy': 'admin'
    },
    errorMessage: ''
};

export type EventDetailState = Readonly<typeof initialState>;

// Reducer
export default (state: EventDetailState = initialState, action): EventDetailState => {
    switch (action.type) {
        case REQUEST(ACTION_TYPES.GET_EVENT):
            return {
                ...state,
                loading: true
            };
        case FAILURE(ACTION_TYPES.GET_EVENT):
            return {
                ...initialState,
                loading: false,
                errorMessage: action.payload
            };
        case SUCCESS(ACTION_TYPES.GET_EVENT):
            return {
                ...initialState,
                loading: false,
                event: action.payload.data
            };
        default:
            return state;
    }
};

// Actions
export const getEventDetail = (groupId, eventId) => ({
    type: ACTION_TYPES.GET_EVENT,
    payload: axios.get(`v1/groups/${groupId}/events/${eventId}`)
});
