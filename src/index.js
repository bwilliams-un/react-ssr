import React from 'react';
import ReactDOM from 'react-dom';
import AppContainer from 'react-hot-loader/lib/AppContainer';
import BrowserRouter from 'react-router-dom/BrowserRouter';
import { renderRoutes } from 'react-router-config';
import { routes } from './routes';

const render = () =>
    // Hydrate is like render but it ties server provided content to the client so it can take over render
    // Mismatches will cause a re-render and lose you the benefits of SSR
    ReactDOM.hydrate(
        <AppContainer>
            <BrowserRouter>
                {renderRoutes(routes)}
            </BrowserRouter>
        </AppContainer>,
        document.getElementById('root')
    );


if (process.env.NODE_ENV === 'development' && module.hot) {
    console.log('Development mode. Client Hot Swap enabled'); // eslint-disable-line no-console
    module.hot.accept();
}

render();