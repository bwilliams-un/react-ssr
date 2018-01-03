import React from 'react';
import ReactDOM from 'react-dom/server';

import { ConnectedRouter } from 'react-router-redux';
import { renderRoutes, matchRoutes } from 'react-router-config';
import { routes } from '../src/routes';
import { Provider as ReduxProvider } from 'react-redux';
import configureStore from '../src/state/configureStore';
import createHistory from 'history/createMemoryHistory';
import { parsePath } from 'history/PathUtils';

const loadRouteData = (location, dispatch) => {
    // Get the route branch for the current location
    const routeBranch = matchRoutes(routes, location);

    // Load function on each route. Keeps it separate from components. Allows configurable lazy load per route.
    const promises = routeBranch.map(({route, match}) => {
        return (route.loadData) ? route.loadData(match, dispatch) : Promise.resolve(null);
    });

    // Execute all prefetch promises
    return Promise.all(promises);
};

/* eslint-disable indent */
// Middleware
export default ({ clientStats }) => async (req, res, next) => {

    // replaces location={req.url} from StaticRouter
    const initialLocation = parsePath(req.url);
    const history = createHistory({
        initialEntries: [initialLocation]
    });

    // create the state store with initial state
    let initialState = {};
    const store = configureStore(initialState, history);

    // Iterate through routes from config and load data for the matching routes. Wait until complete
    try {
        await loadRouteData(initialLocation.pathname, store.dispatch);
    } catch (e) {
        next(e);
    }

    const app = ReactDOM.renderToString(
        <ReduxProvider store={store}>
            <ConnectedRouter history={history}>
                {renderRoutes(routes)}
            </ConnectedRouter>
        </ReduxProvider>
    );
    const assets = Array.isArray(clientStats.assetsByChunkName.main) ? clientStats.assetsByChunkName.main : [clientStats.assetsByChunkName.main]; // if it's not an array, make it one

    console.log('Server Render: PATH', req.path);

    // Template literal
    res.send(`
<!doctype html>
<html>
    <head>
        <meta charset="utf-8">
        <title>Server Render</title>
        ${
            // Output link element for each stylesheet webpack chunk
            assets.filter(path => path.endsWith('.css'))
                .map(path => `<link rel="stylesheet" href="/static/client/${path}" />`)
                .join('\n')
        }
    </head>
    <body>
        <div id="root">${app}</div>
        <script>
          window.__INITIAL_STATE__ = ${JSON.stringify(store.getState()).replace(/</g, '\\\u003c')}
        </script>
        <script src="/static/client/bootstrap.js"></script>
        <script src="/static/client/vendor.js"></script>
        ${
            // Output script elements for each javascript webpack chunk 
            assets.filter(path => path.endsWith('.js'))
                .map(path => `<script src="/static/client/${path}"></script>`)
                .join('\n')
        }
    </body>
</html>
    `);

};