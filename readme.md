# React Server Side Rendering Framework

This is a demo React project that is designed to deliver server rendered content that is taken over by client-side rendering after load.

## Structure

### Server

The server application is **server/index.js**. This runs an [Express](https://github.com/expressjs/express) HTTP server and uses [webpack-dev-middleware](https://github.com/webpack/webpack-dev-middleware) to compile bundles on-demand. Hot-Module Replacement (HMR) is accomplished using [webpack-hot-middleware](https://github.com/glenjamin/webpack-hot-middleware) and [webpack-hot-server-middleware](https://github.com/60frames/webpack-hot-server-middleware) respectively.

### Client

The client application is a standard React web application in **src/**. index.js is responsible for [hydrating](https://reactjs.org/docs/react-dom.html#hydrate) a container that was delivered by the server to then be managed by the client.

In order to hydrate a delivered container the content must be identical. In basic examples this is always true. In the event this becomes complex enough that this is no longer the case then you will want to pursue Universal components to wrap your Root. In the event a mismatch occurs the client will trigger a re-render which is a performance hit, but not the end of the world.

## Usage

To start the application:
```bash
$ npm start
```

## Demo

To see the difference between the client only rendering and the inclusion of server-side rendering. Do the following:

Using your browsers Developer Tools set:
* Download speed to Fast 3G (or slower)
* Disable Cache

### Client Only

Run the clientOnlyStart.js:

```bash
$ node clientOnlyStart
```

Connect to [http://localhost:8080](http://localhost:8080)

The page should display a message stating it has not rendered the React components yet, as your main.js downloads. Once it is finished you will see the Root component render.

### Server Side Rendering

Stop the clientOnlyStart if it is running and run the server:
```bash
$ npm start
```

Connect to [http://localhost:8080](http://localhost:8080)

The page should display the Root component immediately. If you look at the localhost page returned in your network log you will see it has the component rendered in it already, as the main.js continues to download. It will then hydrate and the client take-over when the download is finished.
