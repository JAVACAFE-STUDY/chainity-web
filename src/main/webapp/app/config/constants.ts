const config = {
  VERSION: process.env.VERSION
};

export default config;

export const SERVER_API_URL = process.env.SERVER_API_URL;
export const PROTOCOL = process.env.PROTOCOL;
export const API_SERVER_DOMAIN = process.env.API_SERVER_DOMAIN;
export const API_SERVER_PORT = process.env.API_SERVER_PORT;
export const API_PREFIX = process.env.API_PREFIX;
// TODO : 동적으로 groupId를 받아오도록 설계되면 GROUP_ID 제거
export const GROUP_ID = process.env.GROUP_ID;
// export const API_SERVER_URL = `${PROTOCOL}://${API_SERVER_DOMAIN}:${API_SERVER_PORT}${API_PREFIX}`;
export const URL_LOGIN = process.env.URL_LOGIN;
export const URL_USERS = process.env.URL_USERS;
export const URL_REWARDS = process.env.URL_REWARDS;

export const AUTHORITIES = {
  ADMIN: 'ROLE_ADMIN',
  USER: 'ROLE_USER'
};

export const messages = {
  DATA_ERROR_ALERT: 'Internal Error'
};

export const DATE_FORMAT = 'YYYY-MM-DD';
export const APP_DATE_FORMAT = 'DD/MM/YY HH:mm';
export const APP_TIMESTAMP_FORMAT = 'DD/MM/YY HH:mm:ss';
export const APP_LOCAL_DATE_FORMAT = 'DD/MM/YYYY';
export const APP_LOCAL_DATETIME_FORMAT = 'YYYY-MM-DDThh:mm';
export const APP_WHOLE_NUMBER_FORMAT = '0,0';
export const APP_TWO_DIGITS_AFTER_POINT_NUMBER_FORMAT = '0,0.[00]';
