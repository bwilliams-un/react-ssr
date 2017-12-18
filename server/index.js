const fs = require('fs');
const path = require('path');

require('babel-polyfill');

const express = require('express');
const noFavIcon = require('express-no-favicons');

const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackHotServerMiddleware = require('webpack-hot-server-middleware');

const configClient = require('../config/webpackClient.dev');
const configServer = require('../config/webpackServer.dev');

const APP_PORT = process.env.PORT || 8080;

const app = express();
app.use(noFavIcon());

// mount API endpoints (ideally should be a separate service)
const apiPath= path.join(__dirname, './api');
const apiFiles = fs.readdirSync(apiPath);
apiFiles.forEach(file => {
    const filename = path.join(apiPath, file);
    console.log('API endpoint loaded: %s', file);
    app.use('/api', require(filename));
});

// Avoid listening a second time when HotServerMiddleware triggers reload
let hasStarted = false;

if (process.env.NODE_ENV === 'development') {
    const compiler = webpack([configClient, configServer]);

    // Dev middleware for compile on demand
    // Serves /static/bootstrap.js /static/main.js
    app.use(webpackDevMiddleware(compiler, {
        publicPath: configClient.output.publicPath,
        stats: {
            colors: true
        },
        noInfo: true,
        serverSideRender: true
    }));

    // Hot middleware for realtime communication of client changes
    app.use(webpackHotMiddleware(compiler.compilers[0])); // configClient compiler

    // Hot Server middleware for realtime update of server changes
    // Passes clientStats to the render middleware automatically
    app.use(webpackHotServerMiddleware(compiler));

    compiler.plugin('done', () => {
        if (!hasStarted) {
            app.listen(APP_PORT, () => {
                hasStarted = true;
                console.log('Startup Complete. Listening on port %d', APP_PORT);
            });
        }
    });
} else {
    console.log('Production config does not exist. Abort.');
    process.abort(-1);

    // TODO create client and server webpack config and populate
    webpack([configClient, configServer]).run((err, stats) => {
        // Pass static stats from the build to the render middleware (server and client compilers, client is index 0)
        const clientStats = stats.toJson().children[0];

        // Bundled render method is the default export (see render.js)
        const render = require('../build/server/main.js').default;

        app.use(configClient.output.publicPath, express.static(configClient.output.path));
        app.use(render({clientStats}));
    });
}

