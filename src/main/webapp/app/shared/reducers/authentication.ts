import axios from 'axios';
import { Storage } from 'react-jhipster';

import { FAILURE, REQUEST, SUCCESS } from 'app/shared/reducers/action-type.util';

import config, { API_PREFIX, URL_LOGIN, URL_USERS, GROUP_ID } from 'app/config/constants';

export const ACTION_TYPES = {
    LOGIN: 'authentication/LOGIN',
    GET_SESSION: 'authentication/GET_SESSION',
    LOGOUT: 'authentication/LOGOUT',
    CLEAR_AUTH: 'authentication/CLEAR_AUTH',
    ERROR_MESSAGE: 'authentication/ERROR_MESSAGE',
    UPDATE_USER: 'authentication/UPDATE_USER',
    UPLOAD_FILE: 'authentication/UPLOAD_FILE',
    GET_AVATAR: 'authentication/GET_AVATAR'
};

const AUTH_TOKEN_KEY = 'jhi-authenticationToken';
const AUTH_INFO = 'jhi-authentication';

const initialState = {
    loading: false,
    isAuthenticated: false,
    loginSuccess: false,
    loginError: false, // Errors returned from server side
    showModalLogin: false,
    account: {} as any,
    errorMessage: null as string, // Errors returned from server side
    redirectMessage: null as string,
    sessionHasBeenFetched: false,
    image: null
};

export type AuthenticationState = Readonly<typeof initialState>;

// Reducer
export default (state: AuthenticationState = initialState, action): AuthenticationState => {
    switch (action.type) {
        case REQUEST(ACTION_TYPES.LOGIN):
        case REQUEST(ACTION_TYPES.GET_SESSION):
            return {
                ...state,
                loading: true
            };
        case FAILURE(ACTION_TYPES.LOGIN):
            return {
                ...initialState,
                errorMessage: action.payload.response.data.message,
                showModalLogin: true,
                loginError: true
            };
        case FAILURE(ACTION_TYPES.GET_SESSION):
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                sessionHasBeenFetched: true,
                showModalLogin: true,
                errorMessage: action.payload.response.data.message
            };
        case SUCCESS(ACTION_TYPES.LOGIN):
            return {
                ...state,
                loading: false,
                loginError: false,
                showModalLogin: false,
                loginSuccess: true,
                isAuthenticated: true
            };
        case ACTION_TYPES.LOGOUT:
            return {
                ...initialState
            };
        case SUCCESS(ACTION_TYPES.GET_SESSION): {
            const isAuthenticated = !!action.payload && !!action.payload.data;
            return {
                ...state,
                isAuthenticated,
                loading: false,
                loginSuccess: true,
                sessionHasBeenFetched: true,
                account: action.payload.data
            };
        }
        case ACTION_TYPES.ERROR_MESSAGE:
            return {
                ...initialState,
                showModalLogin: true,
                redirectMessage: action.message
            };
        case ACTION_TYPES.CLEAR_AUTH:
            return {
                ...state,
                loading: false,
                showModalLogin: true,
                isAuthenticated: false
            };
        case ACTION_TYPES.UPDATE_USER:
            return {
                ...state,
                account: {
                    ...state.account,
                    name: action.payload.name,
                    email: action.payload.email
                }
            };
        case ACTION_TYPES.UPLOAD_FILE:
            return {
                ...state
            };
        case SUCCESS(ACTION_TYPES.GET_AVATAR):
            console.log('ACTION_TYPES.GET_AVATAR =>', action.payload.response);
            return {
                ...state,
                image: action.payload.response
            };
        default:
            return state;
    }
};

export const displayAuthError = message => ({ type: ACTION_TYPES.ERROR_MESSAGE, message });

function parseJwt(token) {
    const base64Url = token.split('.')[ 1 ];
    const base64 = decodeURIComponent(atob(base64Url)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''));

    return JSON.parse(base64);
}

export const getSession = () => async dispatch => {
    const sessionValue = Storage.session.get(AUTH_INFO);
    const jwt = sessionValue ? parseJwt(JSON.parse(sessionValue).token) : null;
    if (jwt) {
        await dispatch({
            type: ACTION_TYPES.GET_SESSION,
            // payload: axios.get('/v1/groups/1/users/' + jwt[ '_id' ])
            payload: axios.get(`${API_PREFIX}/${GROUP_ID}${URL_USERS}/` + jwt[ '_id' ])
        });
    }
};

export const login = (username, password) => async dispatch => {
    const result = await dispatch({
        type: ACTION_TYPES.LOGIN,
        // payload: axios.post('/v1/groups/1/login', { email: username, password })
        payload: axios.post(`${API_PREFIX}/${GROUP_ID}${URL_LOGIN}`, { email: username, password })
    });
    Storage.session.set(AUTH_INFO, JSON.stringify(result.value.data));
    Storage.session.set(AUTH_TOKEN_KEY, result.value.data.token);
    await dispatch(getSession());
};

export const clearAuthToken = () => {
    if (Storage.local.get(AUTH_TOKEN_KEY)) {
        Storage.local.remove(AUTH_TOKEN_KEY);
    }
    if (Storage.session.get(AUTH_TOKEN_KEY)) {
        Storage.session.remove(AUTH_TOKEN_KEY);
    }
    if (Storage.local.get(AUTH_INFO)) {
        Storage.local.remove(AUTH_INFO);
    }
    if (Storage.session.get(AUTH_INFO)) {
        Storage.session.remove(AUTH_INFO);
    }
};

export const logout = () => dispatch => {
    clearAuthToken();
    dispatch({
        type: ACTION_TYPES.LOGOUT
    });
};

export const clearAuthentication = messageKey => dispatch => {
    clearAuthToken();
    dispatch(displayAuthError(messageKey));
    dispatch({
        type: ACTION_TYPES.CLEAR_AUTH
    });
};

export const updateUser = (groupId, userId, name, status, role) => {
    // TODO body 에 들어가는 값들은 optional 형태로 처리 하도록 할 것
    const body = {
        'name': name,
        'status': status,
        'role': role
    };
    return async dispatch => {
        await dispatch({
            type: ACTION_TYPES.UPDATE_USER,
            payload: axios.put(`${API_PREFIX}/${groupId}${URL_USERS}/${userId}`, body)
        });
        dispatch(getSession());
    };
};

// PUT /v1/groups/:groupId/users/:userId/avatar
export const uploadFile = (groupId, userId, croppedImg) => async dispatch => {
    // TODO extract function dataUrlToBlob
    const arr = croppedImg.split(',');
    const mime = arr[ 0 ].match(/:(.*?);/)[ 1 ];
    const bstr = atob(arr[ 1 ]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[ n ] = bstr.charCodeAt(n);
    }
    const blobFile = new Blob([ u8arr ], { type: mime });

    const formData = new FormData();
    formData.append('file', blobFile);

    await dispatch({
        type: ACTION_TYPES.UPLOAD_FILE,
        payload: axios.put(`${API_PREFIX}/${groupId}${URL_USERS}/${userId}/avatar`, formData)
        // payload: axios.put(`${API_PREFIX}/${groupId}${URL_USERS}/${userId}/avatar`, formData, config)
    });
    dispatch(getSession());
};
