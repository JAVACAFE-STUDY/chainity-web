import { combineReducers } from 'redux';
import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';

import locale, { LocaleState } from './locale';
import authentication, { AuthenticationState } from './authentication';
import applicationProfile, { ApplicationProfileState } from './application-profile';

import administration, { AdministrationState } from 'app/pages/administration/administration.reducer';
import userManagement, { UserManagementState } from 'app/pages/administration/user-management/user-management.reducer';
import register, { RegisterState } from 'app/pages/account/register/register.reducer';
import activate, { ActivateState } from 'app/pages/account/activate/activate.reducer';
import password, { PasswordState } from 'app/pages/account/password/password.reducer';
import settings, { SettingsState } from 'app/pages/account/settings/settings.reducer';
import passwordReset, { PasswordResetState } from 'app/pages/account/password-reset/password-reset.reducer';
import event, { EventState } from 'app/pages/events/event.reducer';
import users, { UsersState } from 'app/pages/users/users.reducer';

/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

export interface IRootState {
    readonly authentication: AuthenticationState;
    readonly locale: LocaleState;
    readonly applicationProfile: ApplicationProfileState;
    readonly administration: AdministrationState;
    readonly userManagement: UserManagementState;
    readonly register: RegisterState;
    readonly activate: ActivateState;
    readonly passwordReset: PasswordResetState;
    readonly password: PasswordState;
    readonly settings: SettingsState;
    readonly event: EventState;
    readonly users: UsersState;
    /* jhipster-needle-add-reducer-type - JHipster will add reducer type here */
    readonly loadingBar: any;
}

const rootReducer = combineReducers<IRootState>({
    authentication,
    locale,
    applicationProfile,
    administration,
    userManagement,
    register,
    activate,
    passwordReset,
    password,
    settings,
    event,
    users,
    /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
    loadingBar
});

export default rootReducer;
