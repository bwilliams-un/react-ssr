import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import AppContainer from 'react-hot-loader/lib/AppContainer';
import { renderRoutes } from 'react-router-config';
import { routes } from './routes';
import { Provider as ReduxProvider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import configureStore from './state/configureStore';
import createHistory from 'history/createBrowserHistory';

// Create a history object, define initial state from the server if provided
const history = createHistory();

// From server/render.js
const initialState = window.__INITIAL_STATE__;

// No longer needed in the global space
delete window.__INITIAL_STATE__;

// Create a state store
const store = configureStore(initialState, history);

const render = () =>
    // Hydrate is like render but it ties server provided content to the client so it can take over render
    // Mismatches will cause a re-render and lose you the benefits of SSR
    ReactDOM.hydrate(
        <AppContainer>
            <ReduxProvider store={store}>
                <ConnectedRouter history={history}>
                    {renderRoutes(routes)}
                </ConnectedRouter>
            </ReduxProvider>
        </AppContainer>,
        document.getElementById('root')
    );


if (process.env.NODE_ENV === 'development' && module.hot) {
    console.log('Development mode. Client Hot Swap enabled'); // eslint-disable-line no-console
    module.hot.accept();
}

render();