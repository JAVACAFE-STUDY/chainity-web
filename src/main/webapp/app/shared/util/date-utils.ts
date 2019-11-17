import moment from 'moment';

import { APP_LOCAL_DATETIME_FORMAT, APP_TIMESTAMP_FORMAT, DATE_FORMAT } from 'app/config/constants';

export const convertDateTimeFromServer = date => (date ? moment(date).format(APP_LOCAL_DATETIME_FORMAT) : null);
export const convertDate = date => (date ? moment(date).format(DATE_FORMAT) : null);
export const convertDateYMDHMS = date => (date ? moment(date).format(APP_TIMESTAMP_FORMAT) : null);

export function pad(number) {
    if (number < 10) {
        return '0' + number;
    }
    return number;
}

export function dateFormatYMD(date) {
    return date.getFullYear() +
        '-' + pad(date.getMonth() + 1) +
        '-' + pad(date.getDate());
}

export function dateFormatYMDHMS(date) {
    return date.getFullYear() +
        '-' + pad(date.getMonth() + 1) +
        '-' + pad(date.getDate()) +
        ' ' + pad(date.getHours()) +
        ':' + pad(date.getMinutes()) +
        ':' + pad(date.getSeconds());
}
