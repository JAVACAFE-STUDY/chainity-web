import axios from 'axios';

import { FAILURE, REQUEST, SUCCESS } from 'app/shared/reducers/action-type.util';

export const ACTION_TYPES = {
    GET_EVENT: 'event/GET_EVENT',
    GET_EVENT_PARTICIPATIONS: 'event/GET_EVENT_PARTICIPATIONS'
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
    participations: [],
    errorMessage: ''
};

export type EventState = Readonly<typeof initialState>;

// Reducer
export default (state: EventState = initialState, action): EventState => {
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
        case REQUEST(ACTION_TYPES.GET_EVENT_PARTICIPATIONS):
            return {
                ...state,
                loading: true
            };
        case FAILURE(ACTION_TYPES.GET_EVENT_PARTICIPATIONS):
            return {
                ...initialState,
                loading: false,
                errorMessage: action.payload
            };
        case SUCCESS(ACTION_TYPES.GET_EVENT_PARTICIPATIONS):
            return {
                ...initialState,
                loading: false,
                participations: action.payload.data
            };
        default:
            return state;
    }
};

// Actions
export const getEvent = (groupId, eventId) => ({
    type: ACTION_TYPES.GET_EVENT,
    payload: axios.get(`v1/groups/${groupId}/events/${eventId}`)
});

// v1/groups/:groupId/events/:eventId/participations
export const getEventParticipations = (groupId, eventId) => ({
    type: ACTION_TYPES.GET_EVENT_PARTICIPATIONS,
    payload: axios.get(`v1/groups/${groupId}/events/${eventId}/participations`)
});
