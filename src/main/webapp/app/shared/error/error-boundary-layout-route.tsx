import React from 'react';
import { Route, RouteProps, Redirect } from 'react-router-dom';
import ErrorBoundary from 'app/shared/error/error-boundary';
import MenuDrawer from 'app/shared/layout/menudrawer/menudrawer';
import { IRootState } from 'app/shared/reducers';
import { connect } from 'react-redux';

const ErrorBoundaryLayoutRoute = ({ component: Component, ...rest }: RouteProps) => {
    // @ts-ignore
    const encloseInErrorBoundary = !rest.loginSuccess
        ? () => (
            <Redirect to={ { pathname: '/' } }/>
        )
        : () => (
            <ErrorBoundary>
                {/*
                // @ts-ignore */}
                <MenuDrawer component={ Component } {...rest}/>
            </ErrorBoundary>
        );

    if (!Component) throw new Error(`A component needs to be specified for path ${ (rest as any).path }`);
    return <Route { ...rest } render={ encloseInErrorBoundary }/>;
};

const mapStateToProps = ({ authentication }: IRootState) => ({
    loginSuccess: authentication.loginSuccess
});

export default connect(mapStateToProps)(ErrorBoundaryLayoutRoute);
