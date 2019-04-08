import React from 'react';
import { Switch } from 'react-router-dom';
import Loadable from 'react-loadable';

import Login from 'app/pages/login/login';
import Register from 'app/pages/account/register/register';
import Activate from 'app/pages/account/activate/activate';
import PasswordResetInit from 'app/pages/account/password-reset/init/password-reset-init';
import PasswordResetFinish from 'app/pages/account/password-reset/finish/password-reset-finish';
import Logout from 'app/pages/login/logout';
import Event from 'app/pages/events/event';
import EventDetail from 'app/pages/events/event/event-detail';
import Profile from 'app/pages/profile/profile';
import Rank from 'app/pages/rank/rank';
import Announce from 'app/pages/announce/announce';
import AjaxCall from 'app/pages/demo/ajaxCall';
import Hello from 'app/pages/demo/hello';
import SendProps from 'app/pages/demo/SendProps';
import SendState from 'app/pages/demo/SendState';
import Entities from 'app/entities';
import PrivateRoute from 'app/shared/auth/private-route';
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';
import { AUTHORITIES } from 'app/config/constants';

// tslint:disable:space-in-parens
const Account = Loadable({
    loader: () => import(/* webpackChunkName: "account" */ 'app/pages/account'),
    loading: () => <div>loading ...</div>
});

const Admin = Loadable({
    loader: () => import(/* webpackChunkName: "administration" */ 'app/pages/administration'),
    loading: () => <div>loading ...</div>
});
// tslint:enable

const Routes = () => (
    <div className="view-routes">
        <ErrorBoundaryRoute path="/login" component={ Login }/>
        <Switch>
            <ErrorBoundaryRoute path="/logout" component={ Logout }/>
            <ErrorBoundaryRoute path="/register" component={ Register }/>
            <ErrorBoundaryRoute path="/activate/:key?" component={ Activate }/>
            <ErrorBoundaryRoute path="/reset/request" component={ PasswordResetInit }/>
            <ErrorBoundaryRoute path="/reset/finish/:key?" component={ PasswordResetFinish }/>
            { /* PrivateRoute 는 /admin/health 와 같은 현태로 /admin url 에 하위에 별도 route 를 지정해야하는 경우 사용한다. 로그인 또는 권한 체크 필요한 경우*/ }
            <PrivateRoute path="/admin" component={ Admin } hasAnyAuthorities={ [ AUTHORITIES.ADMIN ] }/>
            <PrivateRoute path="/account" component={ Account }
                          hasAnyAuthorities={ [ AUTHORITIES.ADMIN, AUTHORITIES.USER ] }/>
            <PrivateRoute path="/entity" component={ Entities } hasAnyAuthorities={ [ AUTHORITIES.USER ] }/>
            { /* 나열하는 순서가 중요하다. 하위->상위 */ }
            <ErrorBoundaryRoute path="/demo/ajaxCall" component={ AjaxCall }/>
            <ErrorBoundaryRoute path="/demo/sendState" component={ SendState }/>
            <ErrorBoundaryRoute path="/demo/sendProps" component={ SendProps }/>
            <ErrorBoundaryRoute path="/demo/hello" component={ Hello }/>
            <ErrorBoundaryRoute path="/demo" component={ Hello }/>
            <ErrorBoundaryRoute path="/announce" component={ Announce }/>
            <ErrorBoundaryRoute path="/event/detail/:id" component={ EventDetail }/>
            <ErrorBoundaryRoute path="/event" component={ Event }/>
            <ErrorBoundaryRoute path="/rank" component={ Rank }/>
            <ErrorBoundaryRoute path="/profile" component={ Profile }/>
            <ErrorBoundaryRoute path="/" component={ Event }/>
        </Switch>
    </div>
);

export default Routes;
