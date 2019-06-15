import moment from 'moment';

import { APP_LOCAL_DATETIME_FORMAT, DATE_FORMAT } from 'app/config/constants';

export const convertDateTimeFromServer = date => (date ? moment(date).format(APP_LOCAL_DATETIME_FORMAT) : null);
export const convertDate = date => (date ? moment(date).format(DATE_FORMAT) : null);
