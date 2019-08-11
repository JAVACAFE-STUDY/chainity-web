import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { bindActionCreators } from 'redux';
import { AppContainer } from 'react-hot-loader';

import DevTools from './config/devtools';
import initStore from './config/store';
import { registerLocale } from './config/translation';
import setupAxiosInterceptors from './config/axios-interceptor';
import { clearAuthentication, getSession } from './shared/reducers/authentication';
import ErrorBoundary from './shared/error/error-boundary';
import AppComponent from './app';
import { loadIcons } from './config/icon-loader';

import { getGroup  } from 'app/pages/group/groups.reducer';

const devTools = process.env.NODE_ENV === 'development' ? <DevTools /> : null;
const store = initStore();
registerLocale(store);

const actions = bindActionCreators({ clearAuthentication, getSession, getGroup }, store.dispatch);
setupAxiosInterceptors(() => actions.clearAuthentication('login.error.unauthorized'));

loadIcons();

const rootEl = document.getElementById('root');

const render = async Component => {
    await actions.getSession();
    // todo 서비스 오픈 시 groupId를 받아올 방법에 대한 정리가 필요
    await actions.getGroup(1);
    window.document.title = store.getState().groups.group.name || 'chainity';
    ReactDOM.render(
        <ErrorBoundary>
            <AppContainer>
                <Provider store={ store }>
                    <div>
                        {/* If this slows down the app in dev disable it and enable when required  */ }
                        { devTools }
                        <Component/>
                    </div>
                </Provider>
            </AppContainer>
        </ErrorBoundary>,
        rootEl
    );
};

render(AppComponent);

// This is quite unstable
// if (module.hot) {
//   module.hot.accept('./app', () => {
//     const NextApp = require<{ default: typeof AppComponent }>('./app').default;
//     render(NextApp);
//   });
// }
