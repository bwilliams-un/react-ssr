import React from 'react';
import ReactDOM from 'react-dom/server';

import StaticRouter from 'react-router-dom/StaticRouter';
import { renderRoutes } from 'react-router-config';
import { routes } from '../src/routes';

/* eslint-disable indent */
// Middleware
export default ({ clientStats }) => (req, res) => {
    let context = {};
    const app = ReactDOM.renderToString(
        <StaticRouter location={req.url} context={context}>
            {renderRoutes(routes)}
        </StaticRouter>
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
        <script src="/static/client/bootstrap.js"></script>
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