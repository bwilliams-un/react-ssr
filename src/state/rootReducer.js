import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import itemsReducer from './modules/items';
import settingsReducer from './modules/settings';

const rootReducer = combineReducers({
    routerReducer,
    items: itemsReducer,
    settings: settingsReducer
});

export default rootReducer;