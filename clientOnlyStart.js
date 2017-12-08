const express = require('express');
const noFavIcon = require('express-no-favicons');

const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./config/webpackClient.dev');

const APP_PORT = process.env.PORT || 8080;

const app = express();
app.use(noFavIcon());

const compiler = webpack(config);

app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
    stats: {
        colors: true
    },
    noInfo: true,
    serverSideRender: false
}));

// Hot middleware for realtime communication of client changes
app.use(webpackHotMiddleware(compiler));

app.listen(APP_PORT, () => {
    console.log('Startup Complete. Listening on port %d', APP_PORT);
});

app.get('/', (req, res) => {
    res.send(`
<!doctype html>
<html>
    <head>
        <meta charset="utf-8">
        <title>Server Render</title>
    </head>
    <body>
        <div id="root">Server page, no react components rendered yet</div>
        <script src="/static/client/bootstrap.js"></script>
        <script src="/static/client/main.js"></script>
    </body>
</html>
    `);
});