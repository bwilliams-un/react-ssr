import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import rootReducer from './rootReducer';

// Use default functional compose or automatically add Redux DevTools enhancer if we're in a browser
const composeEnhancers = (typeof window !== 'undefined') ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose : compose;

/**
 * Creates our state store from root reducer
 * @param initialState
 * @param history
 * @returns {Store<any>}
 */
const configureStore = (initialState, history) => {
    const middleware = [
        routerMiddleware(history)
    ];

    const store = createStore(
        rootReducer,
        initialState,
        composeEnhancers(applyMiddleware(...middleware))
    );

    // Hot swapping reducers requires explicit replaceReducer call
    if (process.env.NODE_ENV === 'development' && module.hot) {
        module.hot.accept('./rootReducer', () => {
            const newRootReducer = require('./rootReducer');
            store.replaceReducer(newRootReducer);
        });
    }

    return store;
};

export default configureStore;