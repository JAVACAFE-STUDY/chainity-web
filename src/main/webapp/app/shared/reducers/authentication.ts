import axios from 'axios';
import { Storage } from 'react-jhipster';

import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

export const ACTION_TYPES = {
    LOGIN: 'authentication/LOGIN',
    GET_SESSION: 'authentication/GET_SESSION',
    LOGOUT: 'authentication/LOGOUT',
    CLEAR_AUTH: 'authentication/CLEAR_AUTH',
    ERROR_MESSAGE: 'authentication/ERROR_MESSAGE',
    UPDATE_USER: 'authentication/UPDATE_USER'
};

const AUTH_TOKEN_KEY = 'jhi-authenticationToken';

const initialState = {
    loading: false,
    isAuthenticated: false,
    loginSuccess: false,
    loginError: false, // Errors returned from server side
    showModalLogin: false,
    account: {} as any,
    errorMessage: null as string, // Errors returned from server side
    redirectMessage: null as string,
    sessionHasBeenFetched: false
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
                errorMessage: action.payload
            };
        case SUCCESS(ACTION_TYPES.LOGIN):
            return {
                ...state,
                loading: false,
                loginError: false,
                showModalLogin: false,
                loginSuccess: true
            };
        case ACTION_TYPES.LOGOUT:
            return {
                ...initialState
            };
        case SUCCESS(ACTION_TYPES.GET_SESSION): {
            const isAuthenticated = action.payload && action.payload.data && action.payload.data.activated;
            return {
                ...state,
                isAuthenticated,
                loading: false,
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
        default:
            return state;
    }
};

export const displayAuthError = message => ({ type: ACTION_TYPES.ERROR_MESSAGE, message });

export const getSession = (email?) => async dispatch => {
    await dispatch({
        type: ACTION_TYPES.GET_SESSION,
        payload: axios.get('/v1/groups/1/users/' + email)
    });
};

export const login = (username, password) => async dispatch => {
    const result = await dispatch({
        type: ACTION_TYPES.LOGIN,
        payload: axios.post('/v1/groups/1/login', { email: username, password })
    });
    const { token, email } = result.value.data;
    Storage.session.set(AUTH_TOKEN_KEY, token);
    await dispatch(getSession(email));
};

export const clearAuthToken = () => {
    if (Storage.local.get(AUTH_TOKEN_KEY)) {
        Storage.local.remove(AUTH_TOKEN_KEY);
    }
    if (Storage.session.get(AUTH_TOKEN_KEY)) {
        Storage.session.remove(AUTH_TOKEN_KEY);
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

export const updateUser = (username, useremail) => dispatch => {
    dispatch({
        type: ACTION_TYPES.UPDATE_USER,
        payload: { name: username, email: useremail }
    });
};
